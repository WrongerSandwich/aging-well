import type { ReactNode } from "react";
import type { Source } from "./sync/parse";

// Renders claim/effect text: **bold** → <strong>, [S###] → citation link
// (or plain text when the source or its url is unknown).
export function renderClaim(
  text: string,
  sources: Record<string, Source>,
): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(S\d+)\]/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      nodes.push(<strong key={key++}>{m[1]}</strong>);
    } else {
      const id = m[2];
      const src = sources[id];
      if (src?.url) {
        nodes.push(
          <a
            key={key++}
            className="citation"
            href={src.url}
            title={src.citation}
            target="_blank"
            rel="noopener noreferrer"
          >
            [{id}]
          </a>,
        );
      } else {
        nodes.push(
          <span key={key++} className="citation">
            [{id}]
          </span>,
        );
      }
    }
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
