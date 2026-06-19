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
});
