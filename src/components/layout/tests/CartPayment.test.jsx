import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CartPayment from "../CartPayment";

describe("CartPayment", () => {
  it("affiche le titre 'Mode de paiement'", () => {
    render(<CartPayment />);
    expect(screen.getByText("Mode de paiement")).toBeInTheDocument();
  });

  it("affiche les 5 méthodes de paiement", () => {
    render(<CartPayment />);
    ["Paypal", "ApplePay", "Mastercard", "VISA", "GooglePay"].forEach((m) => {
      expect(screen.getByText(m)).toBeInTheDocument();
    });
  });

  it("Paypal est sélectionné par défaut", () => {
    render(<CartPayment />);
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toBeChecked(); 
  });

  it("affiche le formulaire de carte pour la méthode sélectionnée", () => {
    render(<CartPayment />);
    expect(screen.getByPlaceholderText("1234 5678 9012 3456")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Jean Dupont")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("MM/AA")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("XXXX")).toBeInTheDocument();
  });

  it("change la méthode au clic sur un autre radio", () => {
    render(<CartPayment />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[1]);
    expect(radios[1]).toBeChecked();
    expect(radios[0]).not.toBeChecked();
  });

  it("affiche le bouton 'Payer'", () => {
    render(<CartPayment />);
    expect(screen.getByText("Payer")).toBeInTheDocument();
  });

  it("affiche le texte des conditions générales", () => {
    render(<CartPayment />);
    expect(screen.getByText(/Conditions générales/i)).toBeInTheDocument();
  });
});
