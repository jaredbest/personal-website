# Straßenausrichtungen in London

Viele kennen [Geoff Boeings](https://geoffboeing.com/) Arbeit an der Open-Source-Bibliothek [OSMnx](https://github.com/gboeing/osmnx) durch die bekannten Polar-Histogramme, die zeigen, wie die Straßennetze von Städten in den [USA](https://i1.wp.com/geoffboeing.com/wp-content/uploads/2018/07/city-street-orientations-usa-osmnx.png?ssl=1) und der [ganzen Welt](https://i0.wp.com/geoffboeing.com/wp-content/uploads/2019/09/city-street-network-polar-histograms-alpha.jpg?ssl=1) ausgerichtet sind. Die Diagramme zeigen, wie das Straßennetz einer Stadt oder Region im Verhältnis zu den Himmelsrichtungen verläuft.

Geoff hat solche Diagramme auch für die Bezirke einer einzelnen Stadt erstellt, wie in [diesem Tweet](https://twitter.com/gboeing/status/1017848936373993473) zu sehen. Nach seinem Vorbild habe ich die Straßenausrichtungen der Londoner Boroughs dargestellt. Den Code dazu finden Sie in [diesem GitHub-Repository](https://github.com/jaredbest/osmnx-examples-london-boroughs).

<StreetOrientations />

## Was die Diagramme zeigen

Jedes Diagramm ist ein Kompass. Die Länge eines Balkens zeigt, wie viele Straßenabschnitte im Borough in diese Richtung verlaufen. Eine Straße führt in beide Richtungen, deshalb ist jedes Diagramm symmetrisch.

Der Wert **φ** ist Boeings *Ordnung der Ausrichtung*. Er ist 0, wenn Straßen gleichmäßig in alle Richtungen zeigen, und 1 bei einem perfekten Raster. Sortiert man die Diagramme danach, zeigt sich ein Muster:

- **Kensington & Chelsea** ist der geordnetste Borough (φ ≈ 0,20), gefolgt von Newham, Hackney, Tower Hamlets und der City of Westminster.
- Am ungeordnetsten sind vor allem äußere Vororte wie **Barnet**, Bromley, Hounslow und Hillingdon mit φ nahe 0. Lambeth ist die Ausnahme in der Innenstadt.
- Kein Borough kommt einem Raster auch nur nahe. Amerikanische Rasterstädte wie Chicago liegen nahe 1.

Die Werte sind grob: Ich habe sie aus meinen ursprünglichen Diagrammen von 2020 abgelesen, nicht neu berechnet.

## Was ist OSMnx?

OSMnx ist ein [Python](https://www.python.org/)-Paket, mit dem Sie Straßennetze und andere räumliche Daten über die API von [OpenStreetMap](https://www.openstreetmap.org/) abrufen, modellieren, analysieren und darstellen können. [1]

Mit einer einzigen Zeile Python-Code lassen sich Fuß-, Auto- oder Radwegenetze einer Stadt herunterladen, darstellen und analysieren. Ebenso einfach erhalten Sie Points of Interest (POIs), Gebäudegrundrisse, Höhendaten, Straßenausrichtungen und Routen im Netz. [2]

Mehr dazu steht in der [OSMnx-Dokumentation](https://osmnx.readthedocs.io/en/stable/).

## OSMnx in einem Docker-Container

Sie können OSMnx für Verkehrsmodellierung und Netzanalysen nutzen, ohne Python, das OSMnx-Paket oder seine Abhängigkeiten zu installieren: Es läuft in einem [Docker-Container](https://www.docker.com/resources/what-container), einer Standardeinheit für Software, die Code und alle Abhängigkeiten bündelt. [3]

Geoff pflegt ein Docker-Image mit OSMnx, Jupyter und dem übrigen Python-Geodaten-Stack, [verfügbar auf Docker Hub](https://hub.docker.com/r/gboeing/osmnx). Ein Container-Image ist ein schlankes, eigenständiges und ausführbares Paket, das alles enthält, was eine Anwendung braucht: Code, Laufzeitumgebung, Systemwerkzeuge, Systembibliotheken und Einstellungen. [4]

Von null an sind es vier Schritte.

**Schritt 1:** Laden Sie [Docker](https://docs.docker.com/get-docker/) herunter und installieren Sie es.

**Schritt 2:** Öffnen Sie ein Terminal und wechseln Sie in einen Ordner mit einem Jupyter Notebook, das Sie ausführen möchten, zum Beispiel eines [dieser OSMnx-Beispiele](https://github.com/jaredbest/osmnx-examples-london-boroughs).

**Schritt 3:** Unter Windows führen Sie in der Eingabeaufforderung aus:

```
docker run --rm -it --name osmnx -p 8888:8888 -v "%cd%":/home/jovyan/work gboeing/osmnx
```

Unter macOS oder Linux führen Sie im Terminal aus:

```
docker run --rm -it --name osmnx -p 8888:8888 -v "$PWD":/home/jovyan/work gboeing/osmnx
```

**Schritt 4:** Öffnen Sie <http://localhost:8888> im Browser. Dort startet [JupyterLab](https://jupyterlab.readthedocs.io/en/stable/) in einem Container mit OSMnx, networkx, igraph, geopandas, pysal, matplotlib und dem übrigen Geodaten-Stack. [3]

## Quellen:

1. Boeing, G. (2017). OSMnx: New methods for acquiring, constructing, analyzing, and visualizing complex street networks. Computers, Environment and Urban Systems, 65, 126-139\. <https://doi.org/10.1016/j.compenvurbsys.2017.05.004>.

2. Boeing, G. (2019). Urban spatial order: Street network orientation, configuration, and entropy. Applied Network Science, 4(1), 67\. <https://doi.org/10.1007/s41109-019-0189-1>.

3. Boeing, G. (2019). Street network analysis in a Docker container. <https://geoffboeing.com/2019/02/osmnx-docker-container/>.

4. What is a Container? (o. J.). Abgerufen am 24. Mai 2020 von <https://www.docker.com/resources/what-container>.
