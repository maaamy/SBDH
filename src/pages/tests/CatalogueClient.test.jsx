import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CatalogueClient from "../CatalogueClient";

vi.mock("../../data/products", () => ({
  CATEGORIES: [{ nom: "Vêtements", sous_categories: ["T-shirts"] }],
  ENTREPRISES: ["Nike", "Adidas"],
  PRODUITS: [
    { id: 1, nom: "Sac bandoulière", image: "/sac.jpg", prix: 22.9 },
    { id: 2, nom: "Ordinateur", image: "/ordi.jpg", prix: 1140.7 },
  ],
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => vi.fn() };
});

const mockDispatch = vi.hoisted(() => vi.fn());

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

const createMockStore = () =>
  configureStore({
    reducer: {
      auth: (state = {
        user: { user_id: "abc", email: "test@test.com", type: "client", nom: "Dupont" },
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }) => state,  
    },
  });

const renderWithStore = () =>
  render(
    <Provider store={createMockStore()}>
      <MemoryRouter>
        <CatalogueClient />
      </MemoryRouter>
    </Provider>
  );

describe("CatalogueClient", () => {
  it("affiche le titre 'Produits'", () => {
    renderWithStore();
    expect(screen.getByText("Produits")).toBeInTheDocument();
  });

  it("affiche les produits mockés", () => {
    renderWithStore();
    expect(screen.getByText("Sac bandoulière")).toBeInTheDocument();
    expect(screen.getByText("Ordinateur")).toBeInTheDocument();
  });

  it("affiche le nom du client dans la navigation", () => {
    renderWithStore();
    expect(screen.getByText("Dupont")).toBeInTheDocument();
  });

  it("affiche le bouton 'Se déconnecter'", () => {
    renderWithStore();
    expect(screen.getByText("Se déconnecter")).toBeInTheDocument();
  });

  it("dispatch logout au clic sur Se déconnecter", () => {
    renderWithStore();
    fireEvent.click(screen.getByText("Se déconnecter"));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("affiche les boutons 'Ajouter au panier'", () => {
    renderWithStore();
    expect(screen.getAllByText("Ajouter au panier")).toHaveLength(2);
  });

  it("met à jour le compteur panier après ajout", () => {
    renderWithStore();
    expect(screen.getByText("0")).toBeInTheDocument(); // panier vide au départ
    fireEvent.click(screen.getAllByText("Ajouter au panier")[0]);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("incrémente la quantité si on ajoute le même produit deux fois", () => {
    renderWithStore();
    const buttons = screen.getAllByText("Ajouter au panier");
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[0]);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("ajoute deux produits différents", () => {
    renderWithStore();
    const buttons = screen.getAllByText("Ajouter au panier");
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("affiche la sidebar avec les filtres", () => {
    renderWithStore();
    expect(screen.getByText("Filtre")).toBeInTheDocument();
  });
 
});
