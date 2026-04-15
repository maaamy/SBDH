import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductRow from "../ProductRow";

const mockProducts = [
  { id: 1, nom: "Sac bandoulière", image: "/sac.jpg", prix: 22.90 },
  { id: 2, nom: "Ordinateur", image: "/ordi.jpg", prix: 1140.70 },
];

describe("ProductRow", () => {
  it("affiche le titre de la ligne", () => {
    render(<ProductRow title="Nouveautés" products={mockProducts} />);
    expect(screen.getByText("Nouveautés")).toBeInTheDocument();
  });

  it("affiche tous les produits", () => {
    render(<ProductRow title="Nouveautés" products={mockProducts} />);
    expect(screen.getByText("Sac bandoulière")).toBeInTheDocument();
    expect(screen.getByText("Ordinateur")).toBeInTheDocument();
  });

  it("affiche le composant 'Voir plus'", () => {
    render(<ProductRow title="Nouveautés" products={mockProducts} />);
    expect(screen.getByText("Voir plus")).toBeInTheDocument();
  });

  it("affiche une ligne vide avec juste 'Voir plus'", () => {
    render(<ProductRow title="Nouveautés" products={[]} />);
    expect(screen.getByText("Voir plus")).toBeInTheDocument();
    expect(screen.queryByText("Ajouter au panier")).not.toBeInTheDocument();
  });

  it("affiche le bon nombre de produits", () => {
    render(<ProductRow title="Nouveautés" products={mockProducts} />);
    expect(screen.getAllByAltText(/Sac bandoulière|Ordinateur/)).toHaveLength(2);
  });

  it("appelle onAddToCart avec le bon produit", () => {
    const onAddToCart = vi.fn();
    render(<ProductRow title="Nouveautés" products={mockProducts} onAddToCart={onAddToCart} />);
    fireEvent.click(screen.getAllByText("Ajouter au panier")[0]);
    expect(onAddToCart).toHaveBeenCalledWith(mockProducts[0]);
});
});
