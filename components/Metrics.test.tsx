import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Metrics from "./Metrics";
import { derived } from "@/lib/derived";

describe("Metrics", () => {
  it("renders the derived lever ratio and counts", () => {
    render(<Metrics />);
    expect(screen.getByText("Levers researched")).toBeInTheDocument();
    expect(
      screen.getByText(`/${derived.totals.leversTotal}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(String(derived.totals.sourcesTotal)),
    ).toBeInTheDocument();
  });
});
