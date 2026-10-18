# Ticonderoga kartieren

Ticonderoga ist eine Stadt im Essex County, New York, USA. Auf OpenStreetMap (OSM) war innerhalb der Stadtgrenze vieles leer – mit [JOSM](https://josm.openstreetmap.de/) habe ich die Lücken gefüllt.

Ich habe in zwei Phasen kartiert: im Frühjahr 2020 und wieder vom Herbst 2024 bis Januar 2025. Insgesamt sind es 434 Changesets in und um die Stadt. Drücken Sie auf Abspielen oder schauen Sie einfach zu: Die Karte unten zeigt jedes Objekt, das ich ergänzt habe, in der Reihenfolge meiner Arbeit.

<EditReplay />

## Was ich ergänzt habe

- **3.535 Gebäude**, abgezeichnet aus Luftbildern
- **888 Straßen und Wege** (39 km), darunter Gehwege, Zufahrten und Erschließungsstraßen
- **353 Flächen**, etwa Ackerland, Wohngebiete und Parks
- **3.809 Punktobjekte**, etwa Strommasten, Stoppschilder und Geschäfte

## So funktioniert die Wiedergabe

1. Über die [OSM-API](https://wiki.openstreetmap.org/wiki/API_v0.6) habe ich meine Changesets im Umkreis der Stadt abgefragt und jeden einzeln heruntergeladen.
2. Ein kleines Skript hat nur die Objekte behalten, die ich innerhalb der Stadtgrenze *neu angelegt* habe, und jedem seinen Changeset zugeordnet.
3. Die Koordinaten sind als ganze Zahlen mit etwa einem Meter Genauigkeit gespeichert. Das hält die Datei klein.
4. Die Seite zeichnet alles auf ein Canvas, Changeset für Changeset. Neue Objekte leuchten kurz grün auf und kommen dann zur Ruhe.

Die Karte nutzt keine Kacheln im Hintergrund, es wird also nichts von fremden Servern geladen.
