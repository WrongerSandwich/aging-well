import type { Source } from "@/lib/sync/parse";

export default function Citations({
  ids,
  sources,
}: {
  ids: string[];
  sources: Record<string, Source>;
}) {
  if (ids.length === 0) return null;
  return (
    <p className="claim-citations">
      {ids.map((id) => {
        const src = sources[id];
        return src?.url ? (
          <a
            key={id}
            className="citation"
            href={src.url}
            title={src.citation}
            target="_blank"
            rel="noopener noreferrer"
          >
            [{id}]
          </a>
        ) : (
          <span key={id} className="citation" title={src?.citation}>
            [{id}]
          </span>
        );
      })}
    </p>
  );
}
