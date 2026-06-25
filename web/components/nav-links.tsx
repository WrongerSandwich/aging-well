"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV_ITEMS = [
  { label: "Takeaways", href: "/#takeaways" },
  { label: "Ranking", href: "/actions" },
  { label: "Evidence", href: "/#evidence" },
  { label: "Sources", href: "/sources" },
  { label: "Questions", href: "/open-questions" },
] as const;

// In-page anchors (e.g. "/#takeaways") resolve to the home route and never carry
// a current-page mark; only the three distinct sub-pages do, so exactly one item
// is ever "current" and the home brief is left unmarked.
export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const route = item.href.split("#")[0];
        const isActive = route !== "/" && pathname === route;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={isActive ? "nav-active" : undefined}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
