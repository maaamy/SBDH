import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Panier from "../Panier";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => vi.fn() };
});

vi.mock("../../data/PanierProduit", () => ({
  PRODUCTS: [
    { id: 1, nom: "Sac bandoulière", image: "/sac.jpg", prix: 22.9 },
    { id: 2, nom: "Ordinateur", image: "/ordi.jpg", prix: 1140.7 },
  ],
}));

const mockUser = { user_id: "abc", email: "test@test.com", type: "client", nom: "Dupont" };

const createMockStore = () =>
  configureStore({
    reducer: {
      auth: () => ({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }),
    },
  });

const renderWithStore = (props = {}) =>
  render(
    <Provider store={createMockStore()}>
      <MemoryRouter>
        <Panier {...props} />
      </MemoryRouter>
    </Provider>
  );

describe("Panier", () => {
  it("affiche le titre 'Panier'", () => {
    renderWithStore();
    expect(screen.getByText("Panier")).toBeInTheDocument();
  });

  it("affiche le nombre d'articles", () => {
    renderWithStore();
    expect(screen.getByText(/2 article\(s\)/i)).toBeInTheDocument();
  });

  it("affiche tous les produits mockés", () => {
    renderWithStore();
    expect(screen.getByText("Sac bandoulière")).toBeInTheDocument();
    expect(screen.getByText("Ordinateur")).toBeInTheDocument();
  });

  it("affiche le bouton 'Passer au Paiement' quand showButton=true (défaut)", () => {
    renderWithStore();
    expect(screen.getByText("Passer au Paiement")).toBeInTheDocument();
  });

  it("n'affiche pas le bouton 'Passer au Paiement' quand showButton=false", () => {
    renderWithStore({ showButton: false });
    expect(screen.queryByText("Passer au Paiement")).not.toBeInTheDocument();
  });

  it("affiche les children passés en prop", () => {
    renderWithStore({ children: <div>Contenu enfant</div> });
    expect(screen.getByText("Contenu enfant")).toBeInTheDocument();
  });

  it("supprime un article au clic sur la poubelle", () => {
    renderWithStore();
    expect(screen.getByText(/2 article\(s\)/i)).toBeInTheDocument();
    const trashButtons = screen.getAllByRole("button").filter(
      (btn) => btn.querySelector("svg")
    );
    fireEvent.click(trashButtons[2]);
    expect(screen.getByText(/1 article\(s\)/i)).toBeInTheDocument();
  });

  it("affiche le nom du client dans la navigation", () => {
    renderWithStore();
    expect(screen.getByText("Dupont")).toBeInTheDocument();
  });

  it("affiche le récapitulatif de commande", () => {
    renderWithStore();
    expect(screen.getByText("RECAPITULATIF DE LA COMMANDE")).toBeInTheDocument();
  });
});
