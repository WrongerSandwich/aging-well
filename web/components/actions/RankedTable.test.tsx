import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RankedTable from "./RankedTable";

const rows = [
  { rank: 1, action: "Don't smoke", lever: "Substances", slug: "substances", impact: 5, certainty: 5, rev: 3, evidenceOnly: 75, conditional: false },
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
  it("links the lever to its act-on evidence (claims section), not the page top", () => {
    render(<RankedTable rows={rows} />);
    expect(screen.getByRole("link", { name: /Substances/ })).toHaveAttribute(
      "href",
      "/levers/substances#claims",
    );
  });
});
