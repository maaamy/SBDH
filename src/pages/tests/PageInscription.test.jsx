import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import PageInscription from "../PageInscription";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe("PageInscription", () => {
  it("affiche le titre 'Inscription'", () => {
    renderWithRouter(<PageInscription />);
    expect(screen.getByText("Inscription")).toBeInTheDocument();
  });

  it("affiche les deux RoleCard", () => {
    renderWithRouter(<PageInscription />);
    expect(screen.getByText("En tant que client")).toBeInTheDocument();
    expect(screen.getByText("En tant qu'entreprise")).toBeInTheDocument();
  });

  it("navigue vers / au clic sur Accueil", () => {
    renderWithRouter(<PageInscription />);
    fireEvent.click(screen.getByText("Accueil").closest("button"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("navigue vers /inscription/client au clic sur S'inscrire (client)", () => {
    renderWithRouter(<PageInscription />);
    fireEvent.click(screen.getAllByText("S'inscrire →")[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/inscription/client");
  });

  it("navigue vers /inscription/entreprise au clic sur S'inscrire (entreprise)", () => {
    renderWithRouter(<PageInscription />);
    fireEvent.click(screen.getAllByText("S'inscrire →")[1]);
    expect(mockNavigate).toHaveBeenCalledWith("/inscription/entreprise");
  });

  it("navigue vers /connexion/client au clic sur Se connecter (client)", () => {
    renderWithRouter(<PageInscription />);
    fireEvent.click(screen.getAllByText("Se connecter")[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/connexion/client");
  });
});
