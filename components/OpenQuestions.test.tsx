import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OpenQuestions from "./OpenQuestions";

describe("OpenQuestions", () => {
  it("renders the refreshed statin open question", () => {
    render(<OpenQuestions />);
    expect(
      screen.getByText(/statins stop extending life/i),
    ).toBeInTheDocument();
  });

  it("no longer references the retired cannabis question", () => {
    render(<OpenQuestions />);
    expect(screen.queryByText(/cannabis/i)).not.toBeInTheDocument();
  });
});
