import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RankedTable from "./RankedTable";

const rows = [
  { rank: 1, action: "Don't smoke", lever: "Substances", slug: "substances", impact: 5, certainty: 5, rev: 3, evidenceOnly: 75, conditional: false, claimRef: { slug: "substances", claimNum: 1 } },
  { rank: 3, action: "Treat high blood pressure", lever: "Medical", slug: "medical-screening", impact: 5, certainty: 5, rev: 3, evidenceOnly: 75, conditional: true },
];

describe("RankedTable", () => {
  it("renders one row per action with its score", () => {
    render(<RankedTable rows={rows} />);
    expect(screen.getByText("Don't smoke")).toBeInTheDocument();
    expect(screen.getAllByText("75")).toHaveLength(2);
  });
  it("marks conditional actions", () => {
    render(<RankedTable rows={rows} />);
    expect(screen.getByText(/conditional/i)).toBeInTheDocument();
  });
  it("deep-links to the specific claim when claimRef is present", () => {
    render(<RankedTable rows={rows} />);
    expect(screen.getByRole("link", { name: /Substances/ })).toHaveAttribute(
      "href",
      "/levers/substances#claim-substances-1",
    );
  });
  it("falls back to #claims section when no claimRef", () => {
    render(<RankedTable rows={rows} />);
    expect(screen.getByRole("link", { name: /Medical/ })).toHaveAttribute(
      "href",
      "/levers/medical-screening#claims",
    );
  });
});
