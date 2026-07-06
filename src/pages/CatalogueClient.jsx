import { useEffect, useState } from "react";
import CustomerNavigation from "../components/layout/CustomerNavigation";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import ProductGrid from "../components/products/ProductGrid";
import Banner from "../components/layout/Banner";
import { useSelector } from "react-redux";
import { selectCustomer } from "../store/slices/customerSlice";
import * as customerService from "../services/customerService";

const CatalogueClient = () => {

  const { profil } = useSelector(selectCustomer);
  const { categories } = useSelector((state) => state.appData);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ categoryIds: [], min: null, max: null });

  useEffect(() => {
      customerService.fetchAllProducts()
          .then(setProducts)
          .finally(() => setIsLoading(false));
  }, []);

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

  const filteredProducts = products.filter((p) => {
    const searchMatches = p.nom.toLowerCase().includes(search.toLowerCase());
    
    const categoryMatches = filters.categoryIds.length === 0 ||
      filters.categoryIds.includes(p.Categorie?.id);

    const variantes = p.Variante_produit?.filter((v) => v.prix != null) ?? [];
    const prixMin = variantes.length > 0 ? Math.min(...variantes.map((v) => v.prix)) : null;

    if (prixMin === null) return false;

    const minMatches = filters.min === null || prixMin >= filters.min;
    const maxMatches = filters.max === null || prixMin <= filters.max;

    return searchMatches && categoryMatches && minMatches && maxMatches;
  });

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-backgroundImg bg-cover">
      <Banner />

      <CustomerNavigation cartCount={cart.reduce((acc, p) => acc + p.quantity, 0)} customer={profil} />

      <main className="flex items-start gap-0 p-4 w-full flex-1">

        <Sidebar categoryList={categories} search={search} onSearchChange={(e) => setSearch(e.target.value)} onFilterChange={setFilters} />

        <section className="flex-1 flex flex-col gap-2 px-3 overflow-hidden min-w-0">
          <h1 className="titleText text-color-button">Produits</h1>

          <ProductGrid 
            products={filteredProducts} 
            onAddToCart={handleAddToCart}
          />

        </section>
      </main>

      <Footer />

    </div>
  );
};

export default CatalogueClient;

