import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import VoirPlus from "../VoirPlus";

describe("VoirPlus", () => {
  it("affiche le texte 'Voir plus'", () => {
    render(<VoirPlus />);
    expect(screen.getByText("Voir plus")).toBeInTheDocument();
  });

  it("a un curseur pointer", () => {
    const { container } = render(<VoirPlus />);
    expect(container.firstChild).toHaveClass("cursor-pointer");
  });
});
