import { derived } from "@/lib/derived";

function formatSnapshot(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Aging Well home">
        <span className="brand-mark" aria-hidden="true"></span>
        <span>Aging Well</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#takeaways">Takeaways</a>
        <a href="#evidence">Evidence</a>
        <a href="#status">Status</a>
      </nav>
      <span className="snapshot">Snapshot · {formatSnapshot(derived.generatedAt)}</span>
    </header>
  );
}
