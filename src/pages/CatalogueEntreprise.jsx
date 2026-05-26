import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Pencil, Trash2, ChevronDown } from "lucide-react";
import EnterpriseNavigation from "../components/layout/EnterpriseNavigation";
import EnterpriseProfileMenu from "../components/layout/EnterpriseProfileMenu";
import Footer from "../components/layout/Footer";
import TableLineProduct from "../components/products/TableLineProduct";
import Banner from "../components/layout/Banner";
import SearchBar from "../components/ui/SearchBar";
import { useSelector } from "react-redux";
import { selectEnterprise } from "../store/slices/enterpriseSlice";
import Casque from "../assets/Casque.jpg";


const PRODUITS_MOCK = [
  { id: 1, nom: "Lunette de soleil pour homme et femme", couleur: "Noire", prix: 4.99, statut: "En stock", stock: 53, image: Casque },
  { id: 2, nom: "Basket homme new balance", couleur: "Gris noire", prix: 190, statut: "En stock", stock: 22, image: Casque },
  { id: 3, nom: "Jean large pour femme", couleur: "Bleu", prix: 14.90, statut: "Stock Faible", stock: 5, image: Casque },
  { id: 4, nom: "Sac bandoulière", couleur: "Noir", prix: 11.50, statut: "En stock", stock: 30, image: Casque },
  { id: 5, nom: "Haut moulant avec épaules dénudées", couleur: "Beige", prix: 5.99, statut: "Rupture", stock: 0, image: Casque },
  { id: 6, nom: "Sandales femmes", couleur: "Beige", prix: 9.99, statut: "En stock", stock: 18, image: Casque },
];

const FILTRES_STOCK = ["Tous", "En stock", "Stock Faible", "Rupture"];




const CatalogueEntreprise = () => {
  const navigate = useNavigate();
  const { profile } = useSelector(selectEnterprise);

  const [products, setProducts] = useState(PRODUITS_MOCK);
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("Tous");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const filteredProducts = products.filter((p) => {
    const searchMatches = p.nom.toLowerCase().includes(search.toLowerCase());
    const filterMatches = stockFilter === "Tous" || p.statut === stockFilter;
    return searchMatches && filterMatches;
  });

  const handleDelete = (id) => {
    if (confirm("Supprimer ce produit ?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">
      <Banner />

      <EnterpriseNavigation enterprise={{ nom: profile.nom}}/>

      <main className="flex items-start gap-0 p-4 w-full flex-1">
        
        <EnterpriseProfileMenu enterprise={{ nom: profile.nom, email:profile.email}}/>

        <section className="flex-1 flex flex-col gap-4 px-6 overflow-hidden min-w-0">

          <div className="py-2">
            <h1 className="titleText text-color-button">Catalogue Produits</h1>
            <p className="normalText text-black mt-1">
              Vérifiez et organisez l'ensemble de vos produits facilement.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">

            <div className="relative w-72 shrink-0">
              <SearchBar />
            </div>

            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown((v) => !v)}
                className="bg-white/75 border border-grey/30 rounded-xl h-14 px-4 flex items-center gap-3 secondaryTitleText text-black hover:bg-bg transition-colors min-w-40 justify-between"
              >
                <span>{stockFilter}</span>
                <ChevronDown size={20} className={`transition-transform ${showFilterDropdown ? "rotate-180" : ""}`} />
              </button>

              {showFilterDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-grey/20 z-10 w-full">
                  {FILTRES_STOCK.map((f) => (
                    <button
                      key={f}
                      onClick={() => { setStockFilter(f); setShowFilterDropdown(false); }}
                      className={`w-full text-left px-4 py-3 normalText hover:bg-bg transition-colors first:rounded-t-xl last:rounded-b-xl
                        ${stockFilter === f ? "bg-bg font-bold text-button" : "text-black"}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/ajout-produit")}
              className="buttonText h-14 px-6 bg-color-button text-white rounded-xl hover:bg-button-hover active:scale-95 transition-all flex items-center gap-2 ml-auto"
            >
              <Plus size={20} />
              Ajouter un produit
            </button>

          </div>

          <div className="bg-cream grid grid-cols-[1fr_3.5fr_1.25fr_1.1fr_1fr_3fr] gap-3 items-center px-3 py-4 rounded-xl shadow">
            {["Image", "Nom du produit", "Prix", "Statut", "Stock", "Actions"].map((col) => (
              <p key={col} className="secondaryTitleText text-white text-center">{col}</p>
            ))}
          </div>

          
          <div className="flex flex-col gap-3 pb-6">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="secondaryTitleText text-grey">Aucun produit trouvé</p>
              </div>
            ) : (
              filteredProducts.map((p) => (
                <TableLineProduct
                  key={p.id}
                  product={p}
                  onChange={(id) => navigate(`/mes-produits/modifier/${id}`)}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>

        </section>
      </main>

      <Footer />

    </div>
  );
};

export default CatalogueEntreprise;
