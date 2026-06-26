"use client";

import { useEffect, useRef } from "react";
import { NavLinks } from "./nav-links";

// Progressive enhancement over a native <details>: it still opens/closes with no
// JS, but when JS is present we add the dismissal contract users expect from a
// menu, close on link follow, Escape, and any click outside. Escape returns
// focus to the trigger so keyboard users aren't stranded.
export default function MobileNav({ updated }: { updated: string }) {
  const ref = useRef<HTMLDetailsElement>(null);

  function close({ refocus = false } = {}) {
    const el = ref.current;
    if (!el || !el.open) return;
    el.open = false;
    if (refocus) el.querySelector("summary")?.focus();
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close({ refocus: true });
    };
    const onPointerDown = (e: PointerEvent) => {
      if (el.open && !el.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <details className="mobile-nav" ref={ref}>
      <summary aria-label="Open navigation menu">Menu</summary>
      <nav aria-label="Primary navigation">
        <NavLinks onNavigate={() => close()} />
        <span className="mobile-nav-snapshot">{updated}</span>
      </nav>
    </details>
  );
}
