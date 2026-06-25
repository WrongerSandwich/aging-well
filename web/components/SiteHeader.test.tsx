import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// usePathname drives current-page state; next/link is reduced to a plain anchor
// so clicks exercise our onClick (menu dismissal) without an App Router provider.
let mockPath = "/";
vi.mock("next/navigation", () => ({ usePathname: () => mockPath }));
vi.mock("next/link", () => ({
  // href is collapsed to "#" so a click in jsdom doesn't attempt real navigation.
  default: ({ href: _href, children, ...rest }: any) => (
    <a href="#" {...rest}>
      {children}
    </a>
  ),
}));

import { NavLinks } from "./nav-links";
import MobileNav from "./MobileNav";

beforeEach(() => {
  mockPath = "/";
});

describe("NavLinks active state", () => {
  it("marks the matching sub-page as the current page", () => {
    mockPath = "/sources";
    render(
      <nav>
        <NavLinks />
      </nav>,
    );
    const current = screen.getByRole("link", { name: "Sources" });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).toHaveClass("nav-active");
    expect(screen.getByRole("link", { name: "Ranking" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("marks nothing current on the home brief, including its hash links", () => {
    mockPath = "/";
    render(
      <nav>
        <NavLinks />
      </nav>,
    );
    for (const name of ["Takeaways", "Ranking", "Evidence", "Sources", "Questions"]) {
      expect(screen.getByRole("link", { name })).not.toHaveAttribute("aria-current");
    }
  });
});

describe("MobileNav dismissal", () => {
  function open(container: HTMLElement) {
    const details = container.querySelector("details") as HTMLDetailsElement;
    details.open = true;
    return details;
  }

  it("closes when a nav link is followed", async () => {
    const { container } = render(<MobileNav snapshot="Snapshot · Jun 24, 2026" />);
    const details = open(container);
    await userEvent.click(screen.getByRole("link", { name: "Sources" }));
    expect(details.open).toBe(false);
  });

  it("closes on Escape and returns focus to the trigger", () => {
    const { container } = render(<MobileNav snapshot="Snapshot · Jun 24, 2026" />);
    const details = open(container);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(details.open).toBe(false);
    expect(document.activeElement).toBe(container.querySelector("summary"));
  });

  it("closes when clicking outside the menu", () => {
    const { container } = render(<MobileNav snapshot="Snapshot · Jun 24, 2026" />);
    const details = open(container);
    fireEvent.pointerDown(document.body);
    expect(details.open).toBe(false);
  });

  it("carries the relocated snapshot inside the panel", () => {
    render(<MobileNav snapshot="Snapshot · Jun 24, 2026" />);
    expect(screen.getByText("Snapshot · Jun 24, 2026")).toBeInTheDocument();
  });
});
