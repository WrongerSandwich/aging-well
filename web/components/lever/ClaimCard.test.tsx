import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ClaimCard from "./ClaimCard";
import type { Claim, Source } from "@/lib/sync/parse";

const sources: Record<string, Source> = {
  S048: { id: "S048", citation: "Smith 2020", url: "https://example.com/s048", tier: "T1" },
};
const claim: Claim = {
  number: 1,
  text: "Sleep ~7.5h is the nadir",
  systems: "Cardio, Neuro",
  tier: "T1 (observational)",
  tierGroup: "primary",
  effect: "Short <7h HR **1.14**",
  reversibility: "SLOW",
  confidence: "H",
  sources: ["S048"],
};

describe("ClaimCard", () => {
  it("renders the claim text, tier badge, meta, and a resolved citation link", () => {
    render(<ClaimCard claim={claim} sources={sources} />);
    expect(screen.getByText("Sleep ~7.5h is the nadir")).toBeInTheDocument();
    expect(screen.getByText("T1 (observational)")).toBeInTheDocument();
    expect(screen.getByText("Cardio, Neuro")).toBeInTheDocument();
    expect(screen.getByText("1.14").tagName).toBe("STRONG");
    expect(screen.getByRole("link", { name: "[S048]" })).toHaveAttribute(
      "href",
      "https://example.com/s048",
    );
  });
});
