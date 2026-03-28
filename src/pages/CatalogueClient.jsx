import { useState } from "react";
import NavigationClient from "../components/layout/NavigationClient";
import SidebarCatalogue from "../components/layout/SidebarCatalogue";
import Footer from "../components/layout/Footer";
import ProductGrid from "../components/products/ProductGrid";
import { PRODUITS } from "../data/ProduitCatalogue";

const CatalogueClient = () => {
  const [panier, setPanier] = useState([]);

  const handleAddToCart = (produit) => {
    setPanier((prev) => {
      const existing = prev.find((p) => p.id === produit.id);

      if (existing) {
        return prev.map((p) =>
          p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p
        );
      }

      return [...prev, { ...produit, quantite: 1 }];
    });
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-backgroundImg bg-cover">

      <NavigationClient cartCount={panier.reduce((acc, p) => acc + p.quantite, 0)} />

      <main className="flex flex-1 p-4">

        <SidebarCatalogue />

        <section className="productTitle text-color-button">
          <h1>Produits</h1>

          <ProductGrid 
            produits={PRODUITS} 
            onAddToCart={handleAddToCart}
          />

        </section>

      </main>

      <Footer />

    </div>
  );
};

export default CatalogueClient;

