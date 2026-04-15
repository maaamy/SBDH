import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CartItem from "../CartItem";

const mockItem = {
  id: 1,
  nom: "Sac bandoulière",
  image: "sac.jpg",
  prix: 22.9,
  quantite: 2,
};

describe("CartItem", () => {
  it("affiche le nom du produit", () => {
    render(<CartItem item={mockItem} onUpdate={vi.fn()} onRemove={vi.fn()} />);
    expect(screen.getByText("Sac bandoulière")).toBeInTheDocument();
  });

  it("affiche le prix formaté", () => {
    render(<CartItem item={mockItem} onUpdate={vi.fn()} onRemove={vi.fn()} />);
    expect(screen.getByText("22.90 €")).toBeInTheDocument();
  });

  it("affiche la quantité", () => {
    render(<CartItem item={mockItem} onUpdate={vi.fn()} onRemove={vi.fn()} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("appelle onUpdate avec quantite +1 quand on clique sur +", () => {
    const onUpdate = vi.fn();
    render(<CartItem item={mockItem} onUpdate={onUpdate} onRemove={vi.fn()} />);
    fireEvent.click(screen.getAllByRole("button")[1]);
    expect(onUpdate).toHaveBeenCalledWith(1, 3);
  });

  it("appelle onUpdate avec quantite -1 quand on clique sur -", () => {
    const onUpdate = vi.fn();
    render(<CartItem item={mockItem} onUpdate={onUpdate} onRemove={vi.fn()} />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(onUpdate).toHaveBeenCalledWith(1, 1);
  });

  it("appelle onRemove quand on clique sur la poubelle", () => {
    const onRemove = vi.fn();
    render(<CartItem item={mockItem} onUpdate={vi.fn()} onRemove={onRemove} />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[2]);
    expect(onRemove).toHaveBeenCalledWith(1);
  });

  it("affiche l'image du produit", () => {
    render(<CartItem item={mockItem} onUpdate={vi.fn()} onRemove={vi.fn()} />);
    const img = screen.getByAltText("Sac bandoulière");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "sac.jpg");
  });
});
