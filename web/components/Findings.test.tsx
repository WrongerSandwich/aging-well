import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Findings from "./Findings";
import { synthesis } from "@/lib/synthesis";

describe("Findings (home takeaways teaser)", () => {
  it("renders the plain-language summary from the canonical synthesis source", () => {
    render(<Findings />);
    for (const line of synthesis.rankedActions.plainLanguage) {
      expect(screen.getByText(line)).toBeInTheDocument();
    }
  });

  it("links to the full ranking and names the canonical action count", () => {
    render(<Findings />);
    const cta = screen.getByRole("link", {
      name: new RegExp(
        `see all ${synthesis.rankedActions.rows.length} ranked actions`,
        "i",
      ),
    });
    expect(cta).toHaveAttribute("href", "/actions");
  });

  it("is a teaser, not a competing ranking: no filters or per-card evidence toggles", () => {
    render(<Findings />);
    expect(
      screen.queryByRole("button", { name: /view evidence/i }),
    ).toBeNull();
    expect(
      screen.queryByRole("group", { name: /filter takeaways/i }),
    ).toBeNull();
  });
});
