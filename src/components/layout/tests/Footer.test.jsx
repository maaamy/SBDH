import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "../Footer";

describe("Footer", () => {
  it("affiche 'A propos'", () => {
    render(<Footer />);
    expect(screen.getByText("A propos")).toBeInTheDocument();
  });

  it("affiche 'Contact'", () => {
    render(<Footer />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("affiche 'Carrière'", () => {
    render(<Footer />);
    expect(screen.getByText("Carrière")).toBeInTheDocument();
  });

  it("affiche 3 liens", () => {
    render(<Footer />);
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });
});
