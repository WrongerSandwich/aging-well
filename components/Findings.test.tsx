import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Findings from "./Findings";

describe("Findings", () => {
  it("toggles a card's evidence open and closed", async () => {
    const user = userEvent.setup();
    render(<Findings />);
    const toggles = screen.getAllByRole("button", { name: /view evidence/i });
    const first = toggles[0];
    expect(first).toHaveAttribute("aria-expanded", "false");
    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveTextContent(/hide evidence/i);
    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(first).toHaveTextContent(/view evidence/i);
  });

  it("hides non-matching cards when a category filter is active", async () => {
    const user = userEvent.setup();
    const { container } = render(<Findings />);
    await user.click(screen.getByRole("button", { name: "Exercise" }));
    const hiddenSubstance = container.querySelector(
      '.finding[data-category="substances"]',
    );
    expect(hiddenSubstance?.className).toContain("hidden");
    const visibleExercise = container.querySelector(
      '.finding[data-category="exercise"]',
    );
    expect(visibleExercise?.className).not.toContain("hidden");
  });

  it("renders the new oral-sensory cards and the new filter pills", () => {
    render(<Findings />);
    expect(
      screen.getByRole("button", { name: "Medical & screening" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Oral & sensory" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Treat hearing/)).toBeInTheDocument();
    expect(screen.getByText(/Treat your blood/)).toBeInTheDocument();
  });

  it("filters to oral-sensory and hides medical-screening cards", async () => {
    const user = userEvent.setup();
    const { container } = render(<Findings />);
    await user.click(screen.getByRole("button", { name: "Oral & sensory" }));
    const sensory = container.querySelector(
      '.finding[data-category="oral-sensory"]',
    );
    expect(sensory?.className).not.toContain("hidden");
    const medical = container.querySelector(
      '.finding[data-category="medical-screening"]',
    );
    expect(medical?.className).toContain("hidden");
  });
});
