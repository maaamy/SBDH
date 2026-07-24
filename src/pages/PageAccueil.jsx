import { useState, useEffect } from "react";
import Banner from "../components/layout/Banner";
import Navigation from "../components/layout/Navigation";
import Sidebar from "../components/layout/Sidebar";
import ProductRow from "../components/products/ProductRow";
import Footer from "../components/layout/Footer";
import { Home } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../store/slices/authSlice";
import * as customerService from "../services/customerService";

const NAV_LIST = [
  { label: "Accueil", path: "/", icon: <Home size={28} /> },
  { label: "A propos", path: "/apropos" },
  { label: "S'inscrire", path: "/inscription" },
  { label: "Se connecter", path: "/connexion" },
];


const PageAccueil = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { categories, loading } = useSelector((state) => state.appData);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ categoryIds: [], min: null, max: null });

  useEffect(() => {
    customerService.fetchAllProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (user?.type === "client") navigate("/catalogue");
    if (user?.type === "entreprise") navigate("/catalogue-entreprise");
  }, [user]);

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

  const productsByCategory = categories.map((cat) => ({
    title: cat.nom,
    products: filteredProducts.filter((p) =>
      cat.sousCategories?.some((sc) => sc.id === p.Categorie?.id)
    ),
  })).filter((section) => section.products.length > 0);

  if(loading || isLoading) return ( <div>Chargement...</div>);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-backgroundImg bg-cover">
      <Banner />

      <Navigation navList={NAV_LIST} />
     

      <main className="flex items-start gap-0 p-4 w-full flex-1">

        <Sidebar
          categoryList={categories}
          search={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          onFilterChange={setFilters}
        />

        <section className="flex-1 flex flex-col gap-2 px-3 overflow-hidden min-w-0">
          {productsByCategory.length === 0 ? (
            <p className="secondaryTitleText text-grey text-center py-16">Aucun produit trouvé</p>
          ) : (
            productsByCategory.map((section) => (
              <ProductRow
                key={section.title}
                title={section.title}
                products={section.products}
              />
            ))
          )}
        </section>
      </main>

      <Footer />

    </div>
  );
};

export default PageAccueil;