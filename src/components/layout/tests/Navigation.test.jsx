import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navigation from "../Navigation";
import { Home } from "lucide-react";

const mockNavList = [
  { label: "Accueil", path: "/" },
  { label: "Catégories", path: "/categories" },
  { label: "Offres", path: "/offres" },
];

const mockNavListWithIcon = [
  { label: "Accueil", path: "/", icon: <Home /> },
  { label: "Catégories", path: "/categories" },
];

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe("Navigation", () => {
  it("affiche tous les liens de la navList", () => {
    renderWithRouter(<Navigation navList={mockNavList} />);
    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Catégories")).toBeInTheDocument();
    expect(screen.getByText("Offres")).toBeInTheDocument();
  });

  it("affiche le bon nombre de liens", () => {
    renderWithRouter(<Navigation navList={mockNavList} />);
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("les liens ont les bons href", () => {
    renderWithRouter(<Navigation navList={mockNavList} />);
    expect(screen.getByText("Accueil").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Catégories").closest("a")).toHaveAttribute("href", "/categories");
    expect(screen.getByText("Offres").closest("a")).toHaveAttribute("href", "/offres");
  });

  it("affiche l'icône quand elle est fournie", () => {
    renderWithRouter(<Navigation navList={mockNavListWithIcon} />);
    const link = screen.getByText("Accueil").closest("a");
    expect(link.querySelector("svg")).toBeInTheDocument();
  });

  it("affiche les children", () => {
    renderWithRouter(
      <Navigation navList={mockNavList}>
        <button>Mon bouton</button>
      </Navigation>
    );
    expect(screen.getByText("Mon bouton")).toBeInTheDocument();
  });

  it("affiche une liste vide sans erreur", () => {
    renderWithRouter(<Navigation navList={[]} />);
    expect(screen.getAllByRole("navigation")).toHaveLength(1);
  });
});
