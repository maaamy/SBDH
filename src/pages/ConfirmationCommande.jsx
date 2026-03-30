import { useState } from "react";
import NavigationClient from "../components/layout/NavigationClient";
import Footer from "../components/layout/Footer";
import CartItem from "../components/layout/CartItem";
import SummaryNoButton from "../components/layout/SummaryNoButton";
import CartPayment from "../components/layout/CartPayment";
import Banner from "../components/layout/Banner";
import { PRODUCTS } from "../data/PanierProduit";

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

      <main className="flex gap-10 px-10 py-8 flex-1">

        {/* CENTRE */}
        <div className="flex-1 flex flex-col gap-4 ">

          <h1 className="titleText text-color-button">
            Panier
          </h1>

          <h2 className="text-black font-bold">
            Résumé de votre commande
          </h2>

          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdate={handleUpdate}
              onRemove={handleRemove}
            />
          ))}

        </div>

        {/* DROITE */}
        <div className="flex flex-col gap-6 w-80 ml-auto">

          <SummaryNoButton total={total} />

          <CartPayment />

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default Panier;