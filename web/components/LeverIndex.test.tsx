import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import LeverIndex from "./LeverIndex";
import type { LeverDetail } from "@/lib/sync/parse";

function lever(over: Partial<LeverDetail> = {}): LeverDetail {
  return {
    slug: "sleep",
    name: "Sleep",
    status: "complete",
    scope: "Duration, consolidation, circadian alignment, recovery. The downstream lever.",
    claims: [
      { number: 1, text: "", systems: "", tier: "T1", tierGroup: "primary", effect: "", reversibility: "", confidence: "", sources: [] },
      { number: 2, text: "", systems: "", tier: "T2", tierGroup: "primary", effect: "", reversibility: "", confidence: "", sources: [] },
      { number: 3, text: "", systems: "", tier: "T3", tierGroup: "informational", effect: "", reversibility: "", confidence: "", sources: [] },
    ],
    dose: "",
    actions: "",
    caveats: "",
    openQuestions: "",
    ...over,
  };
}

describe("LeverIndex", () => {
  it("links each lever to its detail page and uses the scope's first sentence as the descriptor", () => {
    render(<LeverIndex levers={[lever()]} />);
    const heading = screen.getByRole("heading", { name: "Sleep" });
    expect(within(heading).getByRole("link")).toHaveAttribute("href", "/levers/sleep");
    expect(
      screen.getByText("Duration, consolidation, circadian alignment, recovery."),
    ).toBeInTheDocument();
  });

  it("splits the claim counts into act-on (primary) vs informational", () => {
    const { container } = render(<LeverIndex levers={[lever()]} />);
    const counts = container.querySelector(".lever-counts")!;
    expect(counts).toHaveTextContent("2 to act on");
    expect(counts).toHaveTextContent("1 informational");
  });

  it("renders one entry per lever, in the order given, without numbering them", () => {
    const { container } = render(
      <LeverIndex
        levers={[
          lever({ slug: "substances", name: "Substances" }),
          lever({ slug: "exercise", name: "Exercise" }),
        ]}
      />,
    );
    expect(container.querySelector("ol")).toBeNull();
    const names = screen
      .getAllByRole("heading", { level: 2 })
      .map((h) => h.textContent);
    expect(names).toEqual(["Substances", "Exercise"]);
  });
});
