import Link from "next/link";
import { derived } from "@/lib/derived";

function formatSnapshot(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Aging Well home">
        <span className="brand-mark" aria-hidden="true"></span>
        <span>Aging Well</span>
      </Link>
      <nav aria-label="Primary navigation">
        <a href="/#takeaways">Takeaways</a>
        <Link href="/actions">Ranking</Link>
        <a href="/#evidence">Evidence</a>
        <Link href="/sources">Sources</Link>
        <Link href="/open-questions">Questions</Link>
      </nav>
      <span className="snapshot">Snapshot · {formatSnapshot(derived.generatedAt)}</span>
      <details className="mobile-nav">
        <summary aria-label="Open navigation menu">Menu</summary>
        <nav aria-label="Primary navigation">
          <a href="/#takeaways">Takeaways</a>
          <Link href="/actions">Ranking</Link>
          <a href="/#evidence">Evidence</a>
          <Link href="/sources">Sources</Link>
          <Link href="/open-questions">Questions</Link>
        </nav>
      </details>
    </header>
  );
}
