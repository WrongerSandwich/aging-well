import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderClaim } from "./renderClaim";
import type { Source } from "./sync/parse";

const sources: Record<string, Source> = {
  S048: { id: "S048", citation: "Smith 2020", url: "https://example.com/s048", tier: "T1" },
  S099: { id: "S099", citation: "No link source", url: null, tier: "T2" },
};

describe("renderClaim", () => {
  it("renders bold segments as <strong>", () => {
    render(<p>{renderClaim("Short sleep HR **1.14** overall", sources)}</p>);
    const strong = screen.getByText("1.14");
    expect(strong.tagName).toBe("STRONG");
  });

  it("renders a known citation as a link to its url", () => {
    render(<p>{renderClaim("Big effect [S048]", sources)}</p>);
    const link = screen.getByRole("link", { name: "[S048]" });
    expect(link).toHaveAttribute("href", "https://example.com/s048");
    expect(link).toHaveAttribute("title", "Smith 2020");
  });

  it("renders a citation with no url as plain text, not a link", () => {
    render(<p>{renderClaim("Weak [S099]", sources)}</p>);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("[S099]")).toBeInTheDocument();
  });

  it("leaves an unknown citation id as plain text", () => {
    render(<p>{renderClaim("Mystery [S404]", sources)}</p>);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("[S404]")).toBeInTheDocument();
  });
});
