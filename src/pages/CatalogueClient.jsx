import { useState } from "react";
import NavigationClient from "../components/layout/CustomerNavigation";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import ProductGrid from "../components/products/ProductGrid";
import { PRODUITS } from "../data/products";
import Banner from "../components/layout/Banner";
import { ENTREPRISES, CATEGORIES } from "../data/products";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";


const CatalogueClient = () => {
  const dispatch = useDispatch();

  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleLogout = () => {
    dispatch(logout());
  };


  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-backgroundImg bg-cover">
      <Banner />

      <NavigationClient cartCount={cart.reduce((acc, p) => acc + p.quantity, 0)} />

      <main className="flex items-start gap-0 p-4 w-full flex-1">

        <Sidebar companyList={ENTREPRISES} categoryList={CATEGORIES}/>

        <section className="flex-1 flex flex-col gap-2 px-3 overflow-hidden min-w-0">
          <h1 className="titleText text-color-button">Produits</h1>

          <ProductGrid 
            products={PRODUITS} 
            onAddToCart={handleAddToCart}
          />

        </section>

        
      <button onClick={handleLogout}>Se déconnecter</button>
      </main>

      <Footer />

    </div>
  );
};

export default CatalogueClient;

