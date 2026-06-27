import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OpenQuestions from "./OpenQuestions";

describe("OpenQuestions (home teaser)", () => {
  it("renders the section heading", () => {
    render(<OpenQuestions />);
    expect(screen.getByText(/Uncertainty stays visible/i)).toBeInTheDocument();
  });
  it("shows a single representative question, not a lever-skewed list of three", () => {
    render(<OpenQuestions />);
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });
  it("links to the full page with a breadth-conveying count", () => {
    render(<OpenQuestions />);
    const link = screen.getByRole("link", { name: /more across .* levers/i });
    expect(link).toHaveAttribute("href", "/open-questions");
  });
});
