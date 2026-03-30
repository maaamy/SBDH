import { useState } from "react";
import NavigationClient from "../components/layout/NavigationClient";
import Footer from "../components/layout/Footer";
import CartItem from "../components/layout/CartItem";
import CartSummary from "../components/layout/CartSummary";
import { PRODUCTS } from "../data/PanierProduit";
import Banner from "../components/layout/Banner";
import SidebarPanier from "../components/layout/SidebarPanier";

const PANIER_MOCK = [
  { id: 1, quantite: 1 },
  { id: 2, quantite: 1 },
  { id: 3, quantite: 1 },
  { id: 4, quantite: 1 },
  { id: 5, quantite: 1 },
];

const Panier = () => {

  const [items, setItems] = useState(
    PANIER_MOCK.map((item) => {
      const produit = PRODUCTS.find((p) => p.id === item.id);
      return produit ? { ...produit, quantite: item.quantite } : null;
    }).filter(Boolean)
  );

  const handleUpdate = (id, qty) => {
    if (qty <= 0) {
      handleRemove(id);
      return;
    }

    setItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantite: qty } : p
      )
    );
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const total = items.reduce(
    (acc, p) => acc + p.prix * p.quantite,
    0
  );

  const cartCount = items.reduce(
    (acc, p) => acc + p.quantite,
    0
  );

  return (
    <div className="flex flex-col min-h-screen bg-backgroundImg bg-cover">

      <Banner />

      <NavigationClient cartCount={cartCount} />
      <main className="flex gap-6 px-10 py-8 flex-1">
        <SidebarPanier />
        <div className="flex-1 flex flex-col gap-4">
            <h1 className="titleText text-color-button text-button">Panier</h1>
            <h1 className="text-button text-black font-bold">
              Il y a {items.length} article(s) dans votre panier
            </h1>
            {items.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    onUpdate={handleUpdate}
                    onRemove={handleRemove}
                />
            ))}
        </div>

        <CartSummary total={total} />

      </main>

      <Footer />

    </div>
  );
};

export default Panier;