import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CartSummary from "..//CartSummary";

const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe("CartSummary", () => {
  it("affiche le sous-total correctement", () => {
    renderWithRouter(<CartSummary total={100} showButton={true} />);
    expect(screen.getByText("100.00 €")).toBeInTheDocument();
  });

  it("affiche les frais de livraison (10.99 €)", () => {
    renderWithRouter(<CartSummary total={100} showButton={true} />);
    expect(screen.getByText("10.99 €")).toBeInTheDocument();
  });

  it("affiche le total correct (sous-total + livraison)", () => {
    renderWithRouter(<CartSummary total={100} showButton={true} />);
    expect(screen.getByText("110.99 €")).toBeInTheDocument();
  });

  it("affiche le bouton 'Passer au Paiement' quand showButton=true", () => {
    renderWithRouter(<CartSummary total={100} showButton={true} />);
    expect(screen.getByText("Passer au Paiement")).toBeInTheDocument();
  });

  it("n'affiche pas le bouton quand showButton=false", () => {
    renderWithRouter(<CartSummary total={100} showButton={false} />);
    expect(screen.queryByText("Passer au Paiement")).not.toBeInTheDocument();
  });

  it("affiche le champ code promo", () => {
    renderWithRouter(<CartSummary total={100} showButton={true} />);
    expect(screen.getByPlaceholderText("Code promo")).toBeInTheDocument();
  });

  it("affiche 'Adresse de livraison'", () => {
    renderWithRouter(<CartSummary total={100} showButton={true} />);
    expect(screen.getByText("Adresse de livraison")).toBeInTheDocument();
  });

  it("navigue vers /confirmation-commande au clic sur le bouton", () => {
  renderWithRouter(<CartSummary total={100} showButton={true} />);
  fireEvent.click(screen.getByText("Passer au Paiement"));
  expect(mockNavigate).toHaveBeenCalledWith("/confirmation-commande");
});
});
