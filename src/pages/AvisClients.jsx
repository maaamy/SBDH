import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Star } from "lucide-react";
import Banner from "../components/layout/Banner";
import EnterpriseNavigation from "../components/layout/EnterpriseNavigation";
import EnterpriseProfileMenu from "../components/layout/EnterpriseProfileMenu";
import Footer from "../components/layout/Footer";
import { selectEnterprise, fetchProductsWithAvis } from "../store/slices/enterpriseSlice";
import * as enterpriseService from "../services/enterpriseService";
import Casque from "../assets/Casque.jpg";

const STATUT_COLORS = {
    true: "text-green-600",
    false: "text-red-500",
};

const AvisClients = () => {
    const dispatch = useDispatch();
    const { profile, productsWithAvis, isLoading } = useSelector(selectEnterprise);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(false);

    useEffect(() => {
        if (profile?.id) {
            dispatch(fetchProductsWithAvis(profile.id));
        }
    }, []);

    const handleViewReviews = async (product) => {
        setSelectedProduct(product);
        setLoadingReviews(true);
        try {
            const data = await enterpriseService.fetchReviews(product.id);
            setReviews(data);
        } catch (err) {
            console.error("Error fetching reviews", err);
        } finally {
            setLoadingReviews(false);
        }
    };

    if (isLoading) return <p>Chargement...</p>;

    return (
        <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">
            <Banner />
            <EnterpriseNavigation enterprise={{ nom: profile.nom }} />

            <main className="flex items-start gap-0 p-4 w-full flex-1">
                <EnterpriseProfileMenu enterprise={{ nom: profile.nom, email: profile.email }} />

                <section className="flex-1 flex flex-col gap-3 px-6 overflow-hidden min-w-0">

                    <div className="py-2">
                        <h1 className="titleText text-color-button">Avis clients</h1>
                    </div>

                    <div className="bg-white/25 rounded-3xl p-6 flex flex-col gap-3">

                        <div className="bg-color-button/50 grid grid-cols-[1fr_3.5fr_1.25fr_1.1fr_1.5fr] gap-3 items-center px-3 py-4 rounded-xl shadow">
                            {["Image", "Nom du produit", "Statut", "Avis", "Actions"].map((col) => (
                                <p key={col} className="secondaryTitleText text-white text-center">{col}</p>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3 pb-4">
                            {productsWithAvis.length === 0 ? (
                                <div className="text-center py-16">
                                    <p className="secondaryTitleText text-grey">Aucun produit trouvé</p>
                                </div>
                            ) : (
                                productsWithAvis.map((p) => (
                                    <div
                                        key={p.id}
                                        className="bg-bg grid grid-cols-[1fr_3.5fr_1.25fr_1.1fr_1.5fr] gap-3 items-center p-3 rounded-xl shadow-sm"
                                    >
                                        <div className="flex justify-center">
                                            <img
                                                src={p.Image_produit?.[0]?.url ?? Casque}
                                                alt={p.nom}
                                                className="w-20 h-20 object-cover rounded-xl"
                                            />
                                        </div>

                                        <p className="buttonText text-product">{p.nom}</p>

                                        <p className={`buttonText text-center font-bold ${STATUT_COLORS[p.est_actif] ?? "text-black"}`}>
                                            {p.est_actif ? "En ligne" : "Indisponible"}
                                        </p>

                                        <p className="buttonText text-black text-center">{p.Avis?.length ?? 0}</p>

                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => handleViewReviews(p)}
                                                className="buttonText h-10 px-4 bg-color-button text-white rounded-xl hover:bg-button-hover active:scale-95 transition-all"
                                            >
                                                Voir
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {selectedProduct && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-2xl max-h-[80vh] flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="titleText text-color-button">{selectedProduct.nom}</h2>
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="p-2 hover:bg-beige rounded-xl transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-3 overflow-y-auto">
                            {loadingReviews ? (
                                <p className="normalText text-grey text-center py-6">Chargement...</p>
                            ) : reviews.length === 0 ? (
                                <p className="normalText text-grey text-center py-6">Aucun avis pour ce produit.</p>
                            ) : (
                                reviews.map((r) => (
                                    <div key={r.id} className="bg-bg rounded-2xl p-4 flex flex-col gap-1">
                                        <div className="flex items-center justify-between">
                                            <p className="buttonText text-product">
                                                {r.Client?.prenom} {r.Client?.nom}
                                            </p>
                                            <p className="normalText text-grey">
                                                {new Date(r.created_at).toLocaleDateString("fr-FR", {
                                                    day: "numeric", month: "long", year: "numeric"
                                                })}
                                            </p>
                                        </div>
                                        {r.note && (
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        size={16}
                                                        className={star <= r.note ? "text-color-button fill-color-button" : "text-grey"}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        <p className="normalText text-black">{r.commentaire}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default AvisClients;