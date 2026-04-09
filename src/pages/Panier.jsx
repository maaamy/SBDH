import { useState } from "react";
import Footer from "../components/layout/Footer";
import CartItem from "../components/layout/CartItem";
import CartSummary from "../components/layout/CartSummary";
import { PRODUCTS } from "../data/PanierProduit";
import Banner from "../components/layout/Banner";
import CartSidebar from "../components/layout/CartSidebar";
import CustomerNavigation from "../components/layout/CustomerNavigation";
import { selectUser } from "../store/slices/authSlice";
import { useSelector } from "react-redux";

const PANIER_MOCK = [
  { id: 1, quantite: 1 },
  { id: 2, quantite: 1 },
  { id: 3, quantite: 1 },
  { id: 4, quantite: 1 },
  { id: 5, quantite: 1 },
];

const Panier = () => {
  const customer = useSelector(selectUser);
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
    <div className="flex flex-col items-center w-full min-h-screen bg-backgroundImg bg-cover">

      <Banner />

      <CustomerNavigation cartCount={cartCount} customer={customer} />

      <main className="flex items-start gap-0 p-4 w-full flex-1">

        <CartSidebar /> 

        <section className="flex-1 flex flex-col gap-2 px-3 overflow-hidden min-w-0">
           <h1 className="titleText text-color-button">Panier</h1>
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
        </section>

        <CartSummary total={total} />

      </main>

      <Footer />

    </div>
  );
};

export default Panier;