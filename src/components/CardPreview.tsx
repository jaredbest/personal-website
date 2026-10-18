// Live previews that replace a static image on blog and project cards.
import type { PreviewKind } from "../data/types";
import { EditPreview } from "./EditPreview";
import { OrientationReel } from "./OrientationReel";
import { RepoPreview } from "./RepoPreview";
import { TrainingLoopPreview } from "./TrainingLoopPreview";
import { VsCodePreview } from "./VsCodePreview";

export function CardPreview({ kind, url, language }: { kind: PreviewKind; url?: string; language?: string }) {
  if (kind === "london-orientations") return <OrientationReel />;
  if (kind === "training-loop") return <TrainingLoopPreview />;
  if (kind === "vscode-theme") return <VsCodePreview />;
  if (kind === "repo" && url) return <RepoPreview url={url} language={language} />;
  return <EditPreview />;
}
