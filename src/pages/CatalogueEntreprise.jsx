import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ChevronDown } from "lucide-react";
import EnterpriseNavigation from "../components/layout/EnterpriseNavigation";
import EnterpriseProfileMenu from "../components/layout/EnterpriseProfileMenu";
import Footer from "../components/layout/Footer";
import TableLineProduct from "../components/products/TableLineProduct";
import ProductLine from "../components/products/ProductLine";
import Banner from "../components/layout/Banner";
import SearchBar from "../components/ui/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { selectEnterprise, fetchProductsEnterprise, deleteVariantProduct, updateVariantProduct, toggleProductActive, addVariantToProduct } from "../store/slices/enterpriseSlice";
import AddVariantModal from "../components/products/AddVariantModal";

const computeStatus = (stock, isActive) => {
    if (!isActive) return "Non actif";
    if (stock === 0) return "Rupture";
    if (stock <= 3) return "Stock Faible";
    return "En stock";
};
const FILTRES_STOCK = ["Tous", "En stock", "Stock Faible", "Rupture", "Non actif"];

const CatalogueEntreprise = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { profile, products, loading } = useSelector(selectEnterprise);

    const [search, setSearch] = useState("");
    const [stockFilter, setStockFilter] = useState("Tous");
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [expandedProducts, setExpandedProducts] = useState({});
    const [modalProduct, setModalProduct] = useState(null);

    useEffect(() => {
        if (profile?.id) {
            dispatch(fetchProductsEnterprise(profile.id));
        }
    }, []);

    const toggleProduct = (productId) => {
        setExpandedProducts((prev) => ({ ...prev, [productId]: !prev[productId] }));
    };

    const filteredProducts = products
        .map((p) => {
            const filteredVariants = p.Variante_produit.filter((v) => {
                const searchMatches = p.nom.toLowerCase().includes(search.toLowerCase());
                const status = computeStatus(v.stock, v.est_active);
                const filterMatches = stockFilter === "Tous" || status === stockFilter;
                return searchMatches && filterMatches;
            });

            return {
                ...p,
                categorie: p.Categorie,
                image: p.Image_produit,
                filteredVariants,
            };
        })
        .filter((p) => p.filteredVariants.length > 0);

    const handleDelete = (variantId) => {
        if (confirm("Supprimer cette variante ?")) {
            dispatch(deleteVariantProduct({ enterpriseId: profile.id, variantId }));
        }
    };

    const handleToggleActive = (productId, isActive) => {
        dispatch(toggleProductActive({ productId, isActive }));
    };

    const handleAddVariant = (productId) => {
        const product = products.find((p) => p.id === productId);
        setModalProduct(product);
    };

    const handleConfirmAddVariant = (variant) => {
        dispatch(addVariantToProduct({
            productId: modalProduct.id,
            variant,
            enterpriseId: profile.id,
        }));
        setModalProduct(null);
    };

    if (loading || !profile) return <p>Chargement...</p>;

    return (
        <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">
            <Banner />

            <EnterpriseNavigation enterprise={{ nom: profile.nom}}/>

            <main className="flex items-start gap-0 p-4 w-full flex-1">

                <EnterpriseProfileMenu enterprise={{ nom: profile.nom, email:profile.email }}/>

                <section className="flex-1 flex flex-col gap-4 px-6 overflow-hidden min-w-0">

                    <div className="py-2">
                        <h1 className="titleText text-color-button">Catalogue Produits</h1>
                        <p className="normalText text-black mt-1">
                            Vérifiez et organisez l'ensemble de vos produits facilement.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">

                        <div className="relative w-72 shrink-0">
                            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
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

                    <div className="bg-color-button/50 grid grid-cols-[2rem_1fr_3.5fr_1.25fr_1.1fr_1fr_1fr_3fr] gap-3 items-center px-3 py-4 rounded-xl shadow">
                        {["", "Image", "Nom / Attributs", "Prix", "Statut", "Stock", "Actif", "Actions"].map((col) => (
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
                                <div key={p.id} className="flex flex-col rounded-2xl overflow-hidden shadow-sm">
                                    <ProductLine
                                        p={p}
                                        isExpanded={expandedProducts[p.id]}
                                        onToggle={() => toggleProduct(p.id)}
                                        onToggleActive={handleToggleActive}
                                        onAddVariant={() => handleAddVariant(p.id)}
                                    />
                                    {expandedProducts[p.id] && (
                                        <div className="flex flex-col">
                                            {p.filteredVariants.map((variant) => (
                                                <TableLineProduct
                                                    key={variant.id}
                                                    variantProduct={{
                                                        ...variant,
                                                        nom: p.nom,
                                                        categorie: p.categorie,
                                                        image: p.image,
                                                    }}
                                                    onChange={(updatedVariant) => dispatch(updateVariantProduct(updatedVariant))}
                                                    onDelete={handleDelete}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                </section>
            </main>

            {modalProduct && (
                <AddVariantModal
                    product={modalProduct}
                    onClose={() => setModalProduct(null)}
                    onAdd={handleConfirmAddVariant}
                />
            )}

            <Footer />
        </div>
    );
};

export default CatalogueEntreprise;
