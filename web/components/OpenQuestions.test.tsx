import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OpenQuestions from "./OpenQuestions";

describe("OpenQuestions (home teaser)", () => {
  it("renders the section heading", () => {
    render(<OpenQuestions />);
    expect(screen.getByText(/Uncertainty stays visible/i)).toBeInTheDocument();
  });
  it("shows at most three unresolved questions and links to the full page", () => {
    render(<OpenQuestions />);
    expect(screen.getAllByRole("listitem").length).toBeLessThanOrEqual(3);
    expect(screen.getByRole("link", { name: /all open questions/i })).toHaveAttribute(
      "href",
      "/open-questions",
    );
  });
});
