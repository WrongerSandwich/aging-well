import Link from "next/link";
import { derived } from "@/lib/derived";
import { NavLinks } from "./nav-links";
import MobileNav from "./MobileNav";

function formatSnapshot(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function SiteHeader() {
  const snapshot = `Snapshot · ${formatSnapshot(derived.generatedAt)}`;
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
      <span className="snapshot">{snapshot}</span>
      <MobileNav snapshot={snapshot} />
    </header>
  );
}
