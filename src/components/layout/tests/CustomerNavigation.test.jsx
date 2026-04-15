import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CustomerNavigation from "../CustomerNavigation";

const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

const mockCustomer = { nom: "fff" };

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe("CustomerNavigation", () => {
  it("affiche 'Accueil'", () => {
    renderWithRouter(<CustomerNavigation customer={mockCustomer} />);
    expect(screen.getByText("Accueil")).toBeInTheDocument();
  });

  it("affiche 'Catégories'", () => {
    renderWithRouter(<CustomerNavigation customer={mockCustomer} />);
    expect(screen.getByText("Catégories")).toBeInTheDocument();
  });

  it("affiche 'Offres'", () => {
    renderWithRouter(<CustomerNavigation customer={mockCustomer} />);
    expect(screen.getByText("Offres")).toBeInTheDocument();
  });

  it("affiche le nom du client", () => {
    renderWithRouter(<CustomerNavigation customer={mockCustomer} />);
    expect(screen.getByText("fff")).toBeInTheDocument();
  });

  it("affiche le nombre d'articles dans le panier", () => {
    renderWithRouter(<CustomerNavigation customer={mockCustomer} cartCount={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("affiche 0 par défaut si cartCount non fourni", () => {
    renderWithRouter(<CustomerNavigation customer={mockCustomer} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("navigue vers /panier au clic sur le panier", () => {
    renderWithRouter(<CustomerNavigation customer={mockCustomer} cartCount={2} />);
    fireEvent.click(screen.getByText("2").closest("button"));
    expect(mockNavigate).toHaveBeenCalledWith("/panier");
  });

  it("navigue vers /profil au clic sur le profil", () => {
    renderWithRouter(<CustomerNavigation customer={mockCustomer} />);
    fireEvent.click(screen.getByText("fff").closest("button"));
    expect(mockNavigate).toHaveBeenCalledWith("/profil/");
  });
});
