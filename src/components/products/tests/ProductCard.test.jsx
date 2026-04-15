import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductCard from "../ProductCard";

const mockProduct = {
  id: 1,
  nom: "Sac bandoulière",
  image: "sac.jpg",
  prix: 22.9,
};

describe("ProductCard", () => {
  it("affiche le nom du produit", () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
    expect(screen.getByText("Sac bandoulière")).toBeInTheDocument();
  });

  it("affiche le prix du produit", () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
    expect(screen.getByText("22.90 €")).toBeInTheDocument();
  });

  it("affiche l'image du produit", () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
    const img = screen.getByAltText("Sac bandoulière");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "sac.jpg");
  });

  it("affiche le bouton 'Ajouter au panier'", () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
    expect(screen.getByText("Ajouter au panier")).toBeInTheDocument();
  });

  it("appelle onAddToCart avec le produit au clic", () => {
    const onAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />);
    fireEvent.click(screen.getByText("Ajouter au panier"));
    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it("affiche l'icône Info", () => {
    const { container } = render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
