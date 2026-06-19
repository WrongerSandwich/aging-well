import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusSection from "./StatusSection";

describe("StatusSection", () => {
  it("renders a Complete label for a researched lever", () => {
    render(<StatusSection />);
    expect(screen.getAllByText("Complete").length).toBeGreaterThan(0);
  });
  it("renders the progress track region", () => {
    render(<StatusSection />);
    expect(
      screen.getByLabelText(/research levers complete/i),
    ).toBeInTheDocument();
  });
});
