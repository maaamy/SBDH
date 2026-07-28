import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/layout/Banner";
import EnterpriseNavigation from "../components/layout/EnterpriseNavigation";
import EnterpriseProfileMenu from "../components/layout/EnterpriseProfileMenu";
import Footer from "../components/layout/Footer";
import { selectEnterprise, fetchProductsWithAvis } from "../store/slices/enterpriseSlice";
import Casque from "../assets/Casque.jpg";

const STATUT_COLORS = {
    true: "text-green-600",
    false: "text-red-500",
};

const AvisClients = () => {
    const dispatch = useDispatch();
    const { profile, productsWithAvis, isLoading } = useSelector(selectEnterprise);

    useEffect(() => {
        if (profile?.id) {
            dispatch(fetchProductsWithAvis(profile.id));
        }
    }, []);

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

                        <div className="bg-color-button/50 grid grid-cols-[1fr_3.5fr_1.25fr_1.1fr] gap-3 items-center px-3 py-4 rounded-xl shadow">
                            {["Image", "Nom du produit", "Statut", "Avis"].map((col) => (
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
                                        className="bg-bg grid grid-cols-[1fr_3.5fr_1.25fr_1.1fr] gap-3 items-center p-3 rounded-xl shadow-sm"
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
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AvisClients;