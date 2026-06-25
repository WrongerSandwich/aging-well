import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SourcesTable from "./SourcesTable";

const data = [
  { id: "S001", citation: "Jha et al.", url: "https://example.com/a", tier: "T1" },
  { id: "S002", citation: "Cho et al.", url: null, tier: "T2" },
];

describe("SourcesTable", () => {
  it("renders all sources by default", () => {
    render(<SourcesTable sources={data} />);
    expect(screen.getByText("Jha et al.")).toBeInTheDocument();
    expect(screen.getByText("Cho et al.")).toBeInTheDocument();
  });
  it("filters by tier", async () => {
    render(<SourcesTable sources={data} />);
    await userEvent.click(screen.getByRole("button", { name: "T1" }));
    expect(screen.getByText("Jha et al.")).toBeInTheDocument();
    expect(screen.queryByText("Cho et al.")).not.toBeInTheDocument();
  });
});
