import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ConfirmationCommande from "../ConfirmationCommande";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => vi.fn() };
});

vi.mock("../data/PanierProduit", () => ({
  PRODUCTS: [
    { id: 1, nom: "Sac bandoulière", image: "sac.jpg", prix: 22.9 },
  ],
}));

const createMockStore = () =>
  configureStore({
    reducer: {
      auth: () => ({
        user: { user_id: "abc", email: "test@test.com", type: "client", nom: "Dupont" },
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }),
    },
  });

const renderWithStore = () =>
  render(
    <Provider store={createMockStore()}>
      <MemoryRouter>
        <ConfirmationCommande />
      </MemoryRouter>
    </Provider>
  );

describe("ConfirmationCommande", () => {
  it("affiche le titre 'Panier'", () => {
    renderWithStore();
    expect(screen.getByText("Panier")).toBeInTheDocument();
  });

  it("n'affiche PAS le bouton 'Passer au Paiement'", () => {
    renderWithStore();
    expect(screen.queryByText("Passer au Paiement")).not.toBeInTheDocument();
  });

  it("affiche le composant CartPayment (mode de paiement)", () => {
    renderWithStore();
    expect(screen.getByText("Mode de paiement")).toBeInTheDocument();
  });

  it("affiche les méthodes de paiement", () => {
    renderWithStore();
    expect(screen.getByText("Paypal")).toBeInTheDocument();
    expect(screen.getByText("VISA")).toBeInTheDocument();
  });

  it("affiche le bouton 'Payer'", () => {
    renderWithStore();
    expect(screen.getByText("Payer")).toBeInTheDocument();
  });

  it("affiche le récapitulatif de commande", () => {
    renderWithStore();
    expect(screen.getByText("RECAPITULATIF DE LA COMMANDE")).toBeInTheDocument();
  });

  it("affiche les produits du panier", () => {
    renderWithStore();
    expect(screen.getByText("Sac bandoulière")).toBeInTheDocument();
  });

  it("affiche le nom du client", () => {
    renderWithStore();
    expect(screen.getByText("Dupont")).toBeInTheDocument();
  });
});
