# ML-Agents Setup with Anaconda

*Updated October 2026 for ML-Agents Release 23. The original 2021 version used Python 3.7 and PyTorch 1.7, which no longer work with current releases.*

The Unity Machine Learning Agents Toolkit (ML-Agents) enables games and simulations to serve as environments for training intelligent agents. [1] It is an open-source project managed in [this GitHub repo](https://github.com/Unity-Technologies/ml-agents). The toolkit provides PyTorch-based implementations of algorithms to train agents with reinforcement learning, imitation learning, neuroevolution and other methods.

I use Anaconda to manage my many Python environments. This post explains how to set up an Anaconda environment for ML-Agents on Windows.

## What I used it for

I used this setup to train vehicles in a Unity environment to learn how to park in different situations.

![A car agent in the Unity Editor, with red lines showing its ray-perception sensors](/images/blog/ml-agents-parking.webp)

*The car agent in the Unity Editor. The red lines are its ray-perception sensors: they tell the agent how far it is from nearby obstacles such as curbs, walls and trees.*

## What you need

| | Version |
|---|---|
| Unity | 6000.0 or later |
| Python | 3.10.12 (supported range: 3.10.1 to 3.10.12) |
| ML-Agents Python package | `mlagents` 1.1.0 |
| PyTorch | 2.2 |

The Python package version must match the version of the ML-Agents Unity package in your project. Check the [release history](https://github.com/Unity-Technologies/ml-agents/releases) if you use an older release.

## Anaconda installation

There are several ways to install Python and manage multiple environments, but [Anaconda](https://www.anaconda.com/download) is one of the most straightforward. It is free and runs on Windows, macOS and Linux. If you prefer a smaller install, Miniconda gives you the same `conda` command without the extra packages.

1. Download the Windows installer (or the one for your operating system).
2. Run the installer. If you run into problems, see the [Anaconda documentation](https://docs.anaconda.com/).

## Environment setup

1. From the Start menu, open **Anaconda Prompt**.

2. Create and activate a Python 3.10.12 environment named "mlagents":

   ```
   conda create -n mlagents python=3.10.12 && conda activate mlagents
   ```

   The environment is active when its name appears in parentheses at the start of the prompt.

3. Install PyTorch with GPU support. On Windows, install it before ML-Agents, or pip may pick the CPU-only version:

   ```
   pip3 install torch~=2.2.1 --index-url https://download.pytorch.org/whl/cu121
   ```

4. Install the ML-Agents Python package:

   ```
   python -m pip install mlagents==1.1.0
   ```

   If building `grpcio` fails, run this first and then try again:

   ```
   conda install "grpcio=1.48.2" -c conda-forge
   ```

5. Confirm the install. You should see a list of available arguments:

   ```
   mlagents-learn --help
   ```

6. Change to the folder of your Unity project:

   ```
   cd C:/Users/USERNAME/Documents/ml-agents-project
   ```

7. Start training. You should see the Unity logo and version information, followed by a prompt to press **Play** in the Unity Editor:

   ```
   mlagents-learn
   ```

You are now ready to train your agents in Unity.

## References:

1. Juliani, A., Berges, V., Teng, E., Cohen, A., Harper, J., Elion, C., Goy, C., Gao, Y., Henry, H., Mattar, M., Lange, D. (2020). Unity: A General Platform for Intelligent Agents. arXiv preprint arXiv:1809.02627. <https://github.com/Unity-Technologies/ml-agents>.

2. Unity Technologies. ML-Agents Installation (Release 23). <https://github.com/Unity-Technologies/ml-agents/blob/release_23/com.unity.ml-agents/Documentation~/Installation.md>.
