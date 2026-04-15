import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import PageAccueil from "../PageAccueil";

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return { ...actual, useDispatch: () => mockDispatch };
});

vi.mock("../../data/products", () => ({
  CATEGORIES: [{ nom: "Vêtements", sous_categories: ["T-shirts"] }],
  ENTREPRISES: ["Nike", "Adidas"],
  PRODUCTS: [
    { id: 1, nom: "Sac", image: "sac.jpg", prix: 22.90 },
  ],
  SECTIONS: ["Nouveautés", "Tendances"],
}));

const createMockStore = (authState = { user: null, isAuthenticated: false, isLoading: false, error: null }) =>
  configureStore({ reducer: { auth: () => authState } });

const renderWithStore = (authState) =>
  render(
    <Provider store={createMockStore(authState)}>
      <MemoryRouter>
        <PageAccueil />
      </MemoryRouter>
    </Provider>
  );

describe("PageAccueil", () => {
  it("affiche les sections de produits", () => {
    renderWithStore();
    expect(screen.getByText("Nouveautés")).toBeInTheDocument();
    expect(screen.getByText("Tendances")).toBeInTheDocument();
  });

  it("affiche le lien 'A propos'", () => {
    renderWithStore();
    const aPropos = screen.getAllByText("A propos");
    expect(aPropos).toHaveLength(2); 
  });

  it("affiche le lien 'S'inscrire'", () => {
    renderWithStore();
    expect(screen.getByText("S'inscrire")).toBeInTheDocument();
  });

  it("affiche le lien 'Se connecter'", () => {
    renderWithStore();
    expect(screen.getByText("Se connecter")).toBeInTheDocument();
  });

  it("affiche le bouton 'Se déconnecter'", () => {
    renderWithStore();
    expect(screen.getByText("Se déconnecter")).toBeInTheDocument();
  });

  it("dispatch logout et navigue vers /connexion au clic sur Se déconnecter", () => {
    renderWithStore();
    fireEvent.click(screen.getByText("Se déconnecter"));
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/connexion");
  });

  it("affiche 'Voir plus' pour chaque section", () => {
    renderWithStore();
    const voirPlus = screen.getAllByText("Voir plus");
    expect(voirPlus).toHaveLength(2);
  });

  it("affiche la sidebar avec les filtres", () => {
    renderWithStore();
    expect(screen.getByText("Filtre")).toBeInTheDocument();
  });
});
