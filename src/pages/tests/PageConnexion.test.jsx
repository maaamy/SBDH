import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import PageConnexion from "../PageConnexion";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe("PageConnexion", () => {
  it("affiche le titre 'Connexion'", () => {
    renderWithRouter(<PageConnexion />);
    expect(screen.getByText("Connexion")).toBeInTheDocument();
  });

  it("affiche les deux RoleCard client et entreprise", () => {
    renderWithRouter(<PageConnexion />);
    expect(screen.getByText("En tant que client")).toBeInTheDocument();
    expect(screen.getByText("En tant qu'entreprise")).toBeInTheDocument();
  });

  it("affiche le bouton Accueil", () => {
    renderWithRouter(<PageConnexion />);
    expect(screen.getByText("Accueil")).toBeInTheDocument();
  });

  it("navigue vers / au clic sur Accueil", () => {
    renderWithRouter(<PageConnexion />);
    fireEvent.click(screen.getByText("Accueil").closest("button"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("navigue vers /connexion/client au clic sur Se connecter client", () => {
    renderWithRouter(<PageConnexion />);
    fireEvent.click(screen.getAllByText("Se connecter →")[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/connexion/client");
  });

  it("navigue vers /connexion/entreprise au clic sur Se connecter entreprise", () => {
    renderWithRouter(<PageConnexion />);
    fireEvent.click(screen.getAllByText("Se connecter →")[1]);
    expect(mockNavigate).toHaveBeenCalledWith("/connexion/entreprise");
  });

  it("navigue vers /inscription/client au clic sur S'inscrire client", () => {
    renderWithRouter(<PageConnexion />);
    fireEvent.click(screen.getAllByText("S'inscrire")[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/inscription/client");
  });
});
