"""Builds the data for the "Mapping Ticonderoga" post from Jared's OpenStreetMap history.

Run from the repo root (Python 3.10+, no extra packages):

    python3 scripts/ticonderoga_edits.py

Steps:
1. Look up the town and village boundaries (Nominatim).
2. List every changeset by the user inside the town's bounding box (OSM API).
3. Download each changeset once into .cache/osm (re-runs only fetch new ones).
4. Keep only the features the user *created* inside the town boundary, and write:
   - src/content/posts/ticonderoga-edits.json   (full replay on the post page)
   - src/content/posts/ticonderoga-preview.json (small village-only file for the blog card)

Coordinates are stored as whole numbers: (degrees - south-west corner) * 100,000, roughly 1 m.
Each feature is [step, kind, x0, y0, dx1, dy1, ...]: the first point is absolute, the rest are offsets.
Kinds: b = building, r = road or path, a = land use, o = other line, p = tagged point.
"""

import json
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

USER = "Jared Best"
TOWN_RELATION = 13563311  # Town of Ticonderoga
VILLAGE_RELATION = 176233  # Ticonderoga village (hamlet)
CACHE = Path(".cache/osm")
OUT = Path("src/content/posts")
HEADERS = {"User-Agent": "jaredbest.com-build/1.0 (me@jaredbest.com)"}
PREVIEW_COARSENING = 4  # preview coordinates are ~4 m


def get_json(url: str):
    with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=60) as response:
        return json.load(response)


def lookup_places() -> dict:
    """Returns {relation id: Nominatim result} for the town and the village."""
    url = "https://nominatim.openstreetmap.org/lookup?" + urllib.parse.urlencode(
        {"osm_ids": f"R{TOWN_RELATION},R{VILLAGE_RELATION}", "format": "json", "polygon_geojson": 1}
    )
    return {place["osm_id"]: place for place in get_json(url)}


def list_changesets(bbox: str) -> list[dict]:
    """All of the user's changesets touching the bounding box, oldest first. The API pages back in time."""
    found, before = {}, "2100-01-01T00:00:00Z"
    while True:
        query = urllib.parse.urlencode(
            {"display_name": USER, "bbox": bbox, "limit": 100, "time": f"2005-01-01,{before}"}
        )
        batch = get_json(f"https://api.openstreetmap.org/api/0.6/changesets.json?{query}")["changesets"]
        new = [c for c in batch if c["id"] not in found]
        found.update({c["id"]: c for c in new})
        if len(batch) < 100 or not new:
            break
        before = min(c["created_at"] for c in batch)
        time.sleep(1)
    return sorted(found.values(), key=lambda c: c["created_at"])


def download(changesets: list[dict]) -> None:
    """Saves each changeset's osmChange file once. One request per second, as the OSM API asks."""
    CACHE.mkdir(parents=True, exist_ok=True)
    for changeset in changesets:
        path = CACHE / f"{changeset['id']}.osc"
        if path.exists():
            continue
        request = urllib.request.Request(
            f"https://api.openstreetmap.org/api/0.6/changeset/{changeset['id']}/download", headers=HEADERS
        )
        with urllib.request.urlopen(request, timeout=60) as response:
            path.write_bytes(response.read())
        time.sleep(1)


def point_in_ring(lon: float, lat: float, ring: list[list[float]]) -> bool:
    """Ray-casting test: is the point inside the polygon?"""
    inside = False
    for (x1, y1), (x2, y2) in zip(ring, ring[1:] + ring[:1]):
        if (y1 > lat) != (y2 > lat) and lon < (x2 - x1) * (lat - y1) / (y2 - y1) + x1:
            inside = not inside
    return inside


def kind_of(tags: dict) -> str:
    if "building" in tags:
        return "b"
    if "highway" in tags or "railway" in tags:
        return "r"
    if any(key in tags for key in ("landuse", "natural", "leisure", "amenity", "waterway", "water", "golf")):
        return "a"
    return "o"


def encode(points: list[tuple[int, int]]) -> list[int]:
    """[(x, y), ...] → [x0, y0, dx1, dy1, ...]"""
    flat, previous = [], None
    for x, y in points:
        flat += [x, y] if previous is None else [x - previous[0], y - previous[1]]
        previous = (x, y)
    return flat


def build_replay(changesets: list[dict], ring: list[list[float]], village_bbox: list[str]) -> dict:
    west = min(p[0] for p in ring)
    south = min(p[1] for p in ring)
    grid = lambda lon, lat: (round((lon - west) * 1e5), round((lat - south) * 1e5))

    coords: dict[str, tuple[float, float]] = {}
    steps, features = [], []
    for changeset in changesets:
        path = CACHE / f"{changeset['id']}.osc"
        if not path.exists():
            continue
        root = ET.parse(path).getroot()
        # Remember every node position first, so ways can be drawn even if their nodes came earlier.
        for block in root:
            for node in block.findall("node"):
                if node.get("lat"):
                    coords[node.get("id")] = (float(node.get("lon")), float(node.get("lat")))

        step, added = len(steps), 0
        for block in root.findall("create"):
            for node in block.findall("node"):
                lon, lat = coords[node.get("id")]
                if node.find("tag") is not None and point_in_ring(lon, lat, ring):
                    features.append([step, "p", *grid(lon, lat)])
                    added += 1
            for way in block.findall("way"):
                points = [coords[nd.get("ref")] for nd in way.findall("nd") if nd.get("ref") in coords]
                if len(points) < 2 or not point_in_ring(*points[0], ring):
                    continue
                tags = {tag.get("k"): tag.get("v") for tag in way.findall("tag")}
                features.append([step, kind_of(tags), *encode([grid(lon, lat) for lon, lat in points])])
                added += 1
        if added:
            steps.append(changeset["created_at"][:10])

    south_v, north_v, west_v, east_v = map(float, village_bbox)
    return {
        "boundary": [list(grid(lon, lat)) for lon, lat in ring],
        "village": [*grid(west_v, south_v), *grid(east_v, north_v)],
        "steps": steps,
        "features": features,
    }


def build_preview(replay: dict) -> dict:
    """Village only, buildings and roads only, coarser coordinates: small enough for a blog card."""
    west, south, east, north = replay["village"]
    k = PREVIEW_COARSENING
    shapes = []
    for step, kind, x0, y0, *rest in replay["features"]:
        if kind not in ("b", "r") or not (west <= x0 <= east and south <= y0 <= north):
            continue
        points, x, y = [(x0, y0)], x0, y0
        for i in range(0, len(rest), 2):
            x, y = x + rest[i], y + rest[i + 1]
            points.append((x, y))
        coarse = []
        for px, py in points:
            point = (round((px - west) / k), round((py - south) / k))
            if not coarse or coarse[-1] != point:
                coarse.append(point)
        if len(coarse) >= 2 or kind == "b":
            shapes.append([step, kind, *encode(coarse)])
    return {"size": [round((east - west) / k), round((north - south) / k)], "steps": len(replay["steps"]), "features": shapes}


def main() -> None:
    places = lookup_places()
    town, village = places[TOWN_RELATION], places[VILLAGE_RELATION]
    ring = town["geojson"]["coordinates"][0]
    south, north, west, east = town["boundingbox"]
    changesets = list_changesets(f"{west},{south},{east},{north}")
    print(f"{len(changesets)} changesets")
    download(changesets)

    replay = build_replay(changesets, ring, village["boundingbox"])
    preview = build_preview(replay)
    for name, data in (("ticonderoga-edits.json", replay), ("ticonderoga-preview.json", preview)):
        (OUT / name).write_text(json.dumps(data, separators=(",", ":")))
    print(f"{len(replay['features'])} features over {len(replay['steps'])} steps; preview has {len(preview['features'])}")


if __name__ == "__main__":
    main()
