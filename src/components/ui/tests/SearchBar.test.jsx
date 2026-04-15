import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  it("affiche le placeholder 'Rechercher'", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("Rechercher")).toBeInTheDocument();
  });

  it("démarre avec une valeur vide", () => {
    render(<SearchBar />);
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("met à jour la valeur quand on tape", () => {
    render(<SearchBar />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "sac" } });
    expect(input).toHaveValue("sac");
  });

  it("affiche l'icône de recherche", () => {
    const { container } = render(<SearchBar />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
