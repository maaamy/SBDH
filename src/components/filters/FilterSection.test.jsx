import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FilterSection from "./FilterSection";

describe("FilterSection", () => {
  it("affiche le titre", () => { 
    render(<FilterSection title="Entreprises">contenu</FilterSection>);
    expect(screen.getByText("Entreprises")).toBeInTheDocument();
  });

  it("est fermé par défaut", () => {
    render(<FilterSection title="Prix">contenu caché</FilterSection>);
    expect(screen.queryByText("contenu caché")).not.toBeInTheDocument();
  });

  it("est ouvert si defaultOpen=true", () => {
    render(<FilterSection title="Prix" defaultOpen={true}>contenu visible</FilterSection>);
    expect(screen.getByText("contenu visible")).toBeInTheDocument();
  });

  it("s'ouvre au clic sur le bouton", () => {
    render(<FilterSection title="Prix">contenu</FilterSection>);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("contenu")).toBeInTheDocument();
  });

  it("affiche les children quand ouvert", () => {
    render(
      <FilterSection title="Catégories" defaultOpen={true}>
        <span>Enfant 1</span>
        <span>Enfant 2</span>
      </FilterSection>
    );
    expect(screen.getByText("Enfant 1")).toBeInTheDocument();
    expect(screen.getByText("Enfant 2")).toBeInTheDocument();
  });
});
