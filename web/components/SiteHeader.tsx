import Link from "next/link";
import { derived } from "@/lib/derived";
import { NavLinks } from "./nav-links";
import MobileNav from "./MobileNav";

// derived.generatedAt is the last content build/sync; surfaced as a durable
// "last updated" currency line (month + year), not a provisional snapshot.
function formatUpdated(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function SiteHeader() {
  const updated = `Updated · ${formatUpdated(derived.generatedAt)}`;
  return (
    <header className="site-header">
      <a className="skip-link" href="#top">Skip to content</a>
      <Link className="brand" href="/" aria-label="Aging Well home">
        <span className="brand-mark" aria-hidden="true"></span>
        <span>Aging Well</span>
      </Link>
      <nav aria-label="Primary navigation">
        <NavLinks />
      </nav>
      <span className="snapshot">{updated}</span>
      <MobileNav updated={updated} />
    </header>
  );
}
