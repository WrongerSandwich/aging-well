import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Findings from "./Findings";
import { synthesis } from "@/lib/synthesis";

describe("Findings (home top-5 ranked actions)", () => {
  it("renders the literal top 5 action texts from the canonical synthesis source", () => {
    render(<Findings />);
    for (const row of synthesis.rankedActions.rows.slice(0, 5)) {
      expect(screen.getByText(row.action)).toBeInTheDocument();
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

  it("shows no more than 5 items", () => {
    render(<Findings />);
    const list = document.querySelector(".top-actions-list");
    expect(list?.querySelectorAll("li").length).toBe(5);
  });
});
