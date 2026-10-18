# ML-Agents mit Anaconda einrichten

*Aktualisiert im Oktober 2026 für ML-Agents Release 23. Die ursprüngliche Version von 2021 nutzte Python 3.7 und PyTorch 1.7, die mit aktuellen Releases nicht mehr funktionieren.*

Mit dem Unity Machine Learning Agents Toolkit (ML-Agents) werden Spiele und Simulationen zu Umgebungen, in denen intelligente Agenten trainiert werden. [1] Das Open-Source-Projekt wird in [diesem GitHub-Repository](https://github.com/Unity-Technologies/ml-agents) gepflegt. Das Toolkit bietet auf PyTorch basierende Algorithmen, um Agenten mit Reinforcement Learning, Imitation Learning, Neuroevolution und anderen Methoden zu trainieren.

Ich verwalte meine vielen Python-Umgebungen mit Anaconda. In diesem Beitrag erkläre ich, wie Sie unter Windows eine Anaconda-Umgebung für ML-Agents einrichten.

## Wofür ich das genutzt habe

Mit diesem Setup habe ich in einer Unity-Umgebung Fahrzeuge darauf trainiert, in verschiedenen Situationen einzuparken.

![Ein Fahrzeug-Agent im Unity Editor, rote Linien zeigen seine Raycast-Sensoren](/images/blog/ml-agents-parking.webp)

*Der Fahrzeug-Agent im Unity Editor. Die roten Linien sind seine Raycast-Sensoren: Sie messen den Abstand zu Hindernissen in der Nähe, etwa Bordsteinen, Mauern und Bäumen.*

## Was Sie brauchen

| | Version |
|---|---|
| Unity | 6000.0 oder neuer |
| Python | 3.10.12 (unterstützt: 3.10.1 bis 3.10.12) |
| ML-Agents-Python-Paket | `mlagents` 1.1.0 |
| PyTorch | 2.2 |

Die Version des Python-Pakets muss zur Version des ML-Agents-Unity-Pakets in Ihrem Projekt passen. Bei älteren Releases hilft die [Release-Übersicht](https://github.com/Unity-Technologies/ml-agents/releases).

## Anaconda installieren

Es gibt mehrere Wege, Python zu installieren und mehrere Umgebungen zu verwalten. [Anaconda](https://www.anaconda.com/download) ist einer der einfachsten. Es ist kostenlos und läuft unter Windows, macOS und Linux. Wer es schlanker mag, nimmt Miniconda: gleicher `conda`-Befehl, weniger vorinstallierte Pakete.

1. Laden Sie den Windows-Installer herunter (oder den für Ihr Betriebssystem).
2. Starten Sie den Installer. Bei Problemen hilft die [Anaconda-Dokumentation](https://docs.anaconda.com/).

## Umgebung einrichten

1. Öffnen Sie im Startmenü den **Anaconda Prompt**.

2. Legen Sie eine Python-3.10.12-Umgebung namens „mlagents“ an und aktivieren Sie sie:

   ```
   conda create -n mlagents python=3.10.12 && conda activate mlagents
   ```

   Die Umgebung ist aktiv, wenn ihr Name in Klammern am Anfang der Eingabezeile steht.

3. Installieren Sie PyTorch mit GPU-Unterstützung. Unter Windows muss das vor ML-Agents geschehen, sonst installiert pip womöglich die reine CPU-Version:

   ```
   pip3 install torch~=2.2.1 --index-url https://download.pytorch.org/whl/cu121
   ```

4. Installieren Sie das ML-Agents-Python-Paket:

   ```
   python -m pip install mlagents==1.1.0
   ```

   Schlägt das Bauen von `grpcio` fehl, führen Sie zuerst diesen Befehl aus und versuchen es dann erneut:

   ```
   conda install "grpcio=1.48.2" -c conda-forge
   ```

5. Prüfen Sie die Installation. Sie sollten eine Liste der verfügbaren Argumente sehen:

   ```
   mlagents-learn --help
   ```

6. Wechseln Sie in den Ordner Ihres Unity-Projekts:

   ```
   cd C:/Users/USERNAME/Documents/ml-agents-project
   ```

7. Starten Sie das Training. Es erscheinen das Unity-Logo und die Versionsinformationen, danach die Aufforderung, im Unity Editor auf **Play** zu drücken:

   ```
   mlagents-learn
   ```

Jetzt können Sie Ihre Agenten in Unity trainieren.

## Quellen:

1. Juliani, A., Berges, V., Teng, E., Cohen, A., Harper, J., Elion, C., Goy, C., Gao, Y., Henry, H., Mattar, M., Lange, D. (2020). Unity: A General Platform for Intelligent Agents. arXiv preprint arXiv:1809.02627. <https://github.com/Unity-Technologies/ml-agents>.

2. Unity Technologies. ML-Agents Installation (Release 23). <https://github.com/Unity-Technologies/ml-agents/blob/release_23/com.unity.ml-agents/Documentation~/Installation.md>.
