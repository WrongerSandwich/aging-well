import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SourcesTable from "./SourcesTable";

const data = [
  { id: "S001", citation: "Jha et al., NEJM 2013", url: "https://example.com/a", tier: "T1" },
  { id: "S002", citation: "Cho et al., NEJM Evidence 2024", url: null, tier: "T2" },
  { id: "S003", citation: "Smith caloric-restriction RCT", url: null, tier: "T3" },
];

// Reads the Source-column cell text in row order, ignoring the header row.
function sourceColumn(): string[] {
  return screen
    .getAllByRole("row")
    .slice(1)
    .map((row) => row.children[1].textContent ?? "");
}

describe("SourcesTable", () => {
  it("renders all sources by default", () => {
    render(<SourcesTable sources={data} />);
    expect(screen.getByText("Jha et al., NEJM 2013")).toBeInTheDocument();
    expect(screen.getByText("Cho et al., NEJM Evidence 2024")).toBeInTheDocument();
  });

  it("filters by tier", async () => {
    render(<SourcesTable sources={data} />);
    await userEvent.click(screen.getByRole("button", { name: "T1" }));
    expect(screen.getByText("Jha et al., NEJM 2013")).toBeInTheDocument();
    expect(screen.queryByText("Cho et al., NEJM Evidence 2024")).not.toBeInTheDocument();
  });

  it("searches across the citation text", async () => {
    render(<SourcesTable sources={data} />);
    await userEvent.type(screen.getByRole("searchbox"), "evidence");
    expect(screen.getByText("Cho et al., NEJM Evidence 2024")).toBeInTheDocument();
    expect(screen.queryByText("Jha et al., NEJM 2013")).not.toBeInTheDocument();
  });

  it("shows a search-specific empty state when nothing matches", async () => {
    render(<SourcesTable sources={data} />);
    await userEvent.type(screen.getByRole("searchbox"), "zzzznomatch");
    expect(screen.getByText("No sources match your search.")).toBeInTheDocument();
  });

  it("sorts by a column header and toggles direction on re-click", async () => {
    render(<SourcesTable sources={data} />);
    const tierHeader = screen.getByRole("button", { name: /Tier/ });
    await userEvent.click(tierHeader); // ascending: T1, T2, T3
    expect(sourceColumn()[0]).toContain("Jha");
    await userEvent.click(tierHeader); // descending: T3, T2, T1
    expect(sourceColumn()[0]).toContain("Smith");
  });

  it("year sort orders newest-first and sinks year-less sources last", async () => {
    render(<SourcesTable sources={data} />);
    await userEvent.click(screen.getByRole("button", { name: /Year/ }));
    const col = sourceColumn();
    expect(col[0]).toContain("2024"); // Cho, newest
    expect(col[1]).toContain("2013"); // Jha
    expect(col[2]).toContain("Smith"); // no year → last
  });
});
