"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV_ITEMS = [
  { label: "Overview", href: "/" },
  { label: "Ranking", href: "/actions" },
  { label: "Levers", href: "/levers" },
  { label: "Sources", href: "/sources" },
  { label: "Questions", href: "/open-questions" },
] as const;

// Every nav item is a real route, so a click always means "go to this page",
// never "scroll the current one". Exactly one item is current on every page,
// including the home brief: "/" matches the home route only when it's an exact
// match, and the others match their route plus any nested path beneath it (so
// /levers/sleep keeps "Levers" current). The home sections that used to live in
// this bar (#takeaways, #evidence) are still reachable by scrolling and via the
// hero's in-page link.
export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
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
