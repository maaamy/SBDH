import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CartSidebar from "../CartSidebar";

describe("CartSidebar", () => {
  it("affiche 'Mon panier'", () => {
    render(<CartSidebar />);
    expect(screen.getByText("Mon panier")).toBeInTheDocument();
  });

  it("affiche 'Nous acceptons:'", () => {
    render(<CartSidebar />);
    expect(screen.getByText("Nous acceptons:")).toBeInTheDocument();
  });

  it("affiche le logo PayPal", () => {
    render(<CartSidebar />);
    expect(screen.getByAltText("paypal")).toBeInTheDocument();
  });

  it("affiche le logo ApplePay", () => {
    render(<CartSidebar />);
    expect(screen.getByAltText("applepay")).toBeInTheDocument();
  });

  it("affiche le logo Visa", () => {
    render(<CartSidebar />);
    expect(screen.getByAltText("visa")).toBeInTheDocument();
  });

  it("affiche le logo Mastercard", () => {
    render(<CartSidebar />);
    expect(screen.getByAltText("mastercard")).toBeInTheDocument();
  });

  it("affiche le logo Google Pay", () => {
    render(<CartSidebar />);
    expect(screen.getByAltText("gpay")).toBeInTheDocument();
  });

  it("affiche la barre de recherche", () => {
    render(<CartSidebar />);
    expect(screen.getByPlaceholderText("Rechercher")).toBeInTheDocument();
  });
});
