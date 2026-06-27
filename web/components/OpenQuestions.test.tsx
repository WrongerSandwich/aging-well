import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OpenQuestions from "./OpenQuestions";

describe("OpenQuestions (home teaser)", () => {
  it("renders the section heading", () => {
    render(<OpenQuestions />);
    expect(screen.getByText(/Uncertainty stays visible/i)).toBeInTheDocument();
  });
  it("shows three questions drawn from distinct levers, not a lever-skewed run", () => {
    render(<OpenQuestions />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
  it("links to the full open-questions page", () => {
    render(<OpenQuestions />);
    expect(
      screen.getByRole("link", { name: /all open questions/i }),
    ).toHaveAttribute("href", "/open-questions");
  });
});
