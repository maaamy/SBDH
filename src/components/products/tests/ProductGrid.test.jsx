import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductGrid from "../ProductGrid";

const mockProducts = [
  { id: 1, nom: "Sac bandoulière", image: "sac.jpg", prix: 22.90 },
  { id: 2, nom: "Ordinateur", image: "ordi.jpg", prix: 1140.70 },
];

describe("ProductGrid", () => {
  it("affiche tous les produits", () => {
    render(<ProductGrid products={mockProducts} onAddToCart={vi.fn()} />);
    expect(screen.getByText("Sac bandoulière")).toBeInTheDocument();
    expect(screen.getByText("Ordinateur")).toBeInTheDocument();
  });

  it("affiche le bon nombre de boutons 'Ajouter au panier'", () => {
    render(<ProductGrid products={mockProducts} onAddToCart={vi.fn()} />);
    expect(screen.getAllByText("Ajouter au panier")).toHaveLength(2);
  });

  it("affiche une grille vide sans erreur", () => {
    render(<ProductGrid products={[]} onAddToCart={vi.fn()} />);
    expect(screen.queryByText("Ajouter au panier")).not.toBeInTheDocument();
  });

  it("appelle onAddToCart avec le bon produit", () => {
    const onAddToCart = vi.fn();
    render(<ProductGrid products={mockProducts} onAddToCart={onAddToCart} />);
    fireEvent.click(screen.getAllByText("Ajouter au panier")[0]);
    expect(onAddToCart).toHaveBeenCalledWith(mockProducts[0]);
  });

  it("appelle onAddToCart autant de fois qu'on clique", () => {
    const onAddToCart = vi.fn();
    render(<ProductGrid products={mockProducts} onAddToCart={onAddToCart} />);
    const buttons = screen.getAllByText("Ajouter au panier");
    buttons.forEach((btn) => fireEvent.click(btn));
    expect(onAddToCart).toHaveBeenCalledTimes(2);
  });
});
