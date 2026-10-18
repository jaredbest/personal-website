# Mapping Ticonderoga

Ticonderoga is a town in Essex County, New York, USA. On OpenStreetMap (OSM), there was quite a bit of emptiness within the town boundary, so I used [JOSM](https://josm.openstreetmap.de/) to fill in the gaps.

I mapped in two bursts: spring 2020, and again from autumn 2024 into January 2025. In total I made 434 changesets in and around the town. Press play, or just watch: the map below replays every feature I added, in the order I added it.

<EditReplay />

## What I added

- **3,535 buildings**, traced from aerial imagery
- **897 roads and paths** (45 km), including sidewalks, driveways and service roads
- **358 land-use areas**, such as farmland, residential areas and parks
- **3,809 point features**, such as utility poles, stop signs and shops

## How the replay works

1. I listed my changesets inside the town's bounding box through the [OSM API](https://wiki.openstreetmap.org/wiki/API_v0.6) and downloaded each one.
2. A small script kept only the features I *created* inside the town boundary, and tagged each with the changeset it came from.
3. Coordinates are stored as whole numbers with roughly one-metre precision, which keeps the file small.
4. The page draws everything on a canvas, changeset by changeset. New features light up green for a moment, then settle.

The map has no background tiles, so nothing loads from other servers.
