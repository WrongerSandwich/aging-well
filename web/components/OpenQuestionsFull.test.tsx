import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OpenQuestionsFull from "./OpenQuestionsFull";

const groups = [
  {
    lever: "Sleep",
    slug: "sleep",
    questions: [
      { question: "Is short-sleep causally harmful?", resolved: false, whyUnresolved: "metas disagree", bestGuess: "small effect", tier: "T1", revisitWhen: "later" },
      { question: "Reversibility tiers?", resolved: true, whyUnresolved: "—", bestGuess: "—", tier: "none", revisitWhen: "—" },
    ],
  },
];

describe("OpenQuestionsFull", () => {
  it("renders a section per lever and the questions", () => {
    render(<OpenQuestionsFull groups={groups} />);
    expect(screen.getByText("Sleep")).toBeInTheDocument();
    expect(screen.getByText(/short-sleep/)).toBeInTheDocument();
  });
  it("anchors each lever group by slug for deep links from lever pages", () => {
    const { container } = render(<OpenQuestionsFull groups={groups} />);
    expect(container.querySelector("section#sleep")).not.toBeNull();
  });
  it("marks resolved questions with a data attribute", () => {
    render(<OpenQuestionsFull groups={groups} />);
    const resolved = screen.getByText(/Reversibility tiers/);
    expect(resolved.closest("[data-resolved='true']")).not.toBeNull();
  });
});
