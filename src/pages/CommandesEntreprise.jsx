import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Banner from "../components/layout/Banner";
import EnterpriseNavigation from "../components/layout/EnterpriseNavigation";
import EnterpriseProfileMenu from "../components/layout/EnterpriseProfileMenu";
import Footer from "../components/layout/Footer";
import { selectEnterprise } from "../store/slices/enterpriseSlice";
import * as enterpriseService from "../services/enterpriseService";
import Casque from "../assets/Casque.jpg";

const STATUS_COLORS = {
    "EN_ATTENTE": "text-yellow-600",
    "CONFIRMEE": "text-color-button",
    "EXPEDIEE": "text-blue-500",
    "LIVREE": "text-green-600",
    "ANNULEE": "text-red-500",
};

const STATUS_LABELS = {
    "EN_ATTENTE": "En attente",
    "CONFIRMEE": "Confirmée",
    "EXPEDIEE": "Expédiée",
    "LIVREE": "Livrée",
    "ANNULEE": "Annulée",
};

const CommandesEntreprise = () => {
    const { profile } = useSelector(selectEnterprise);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (profile?.id) {
            enterpriseService.fetchOrders(profile.id)
                .then(setOrders)
                .finally(() => setIsLoading(false));
        }
    }, [profile]);

    const handleConfirm = async (orderId) => {
        try {
            const updated = await enterpriseService.confirmOrder(orderId);
            setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, statut: updated.statut } : o));
        } catch (err) {
            console.error("Error confirming order", err);
        }
    };

    const handleUpdateStatus = async (orderId, statut) => {
        try {
            const updated = await enterpriseService.updateOrderStatus(orderId, statut);
            setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, statut: updated.statut } : o));
        } catch (err) {
            console.error("Error updating order status", err);
        }
    };

    const handleCancel = async (orderId) => {
        if (!confirm("Annuler cette commande ?")) return;
        try {
            const updated = await enterpriseService.cancelOrder(orderId);
            setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, statut: updated.statut } : o));
        } catch (err) {
            console.error("Error cancelling order", err);
        }
    };

    if (isLoading) return <div>Chargement...</div>;

    return (
        <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">
            <Banner />
            <EnterpriseNavigation enterprise={{ nom: profile.nom }} />

            <main className="flex items-start gap-0 p-4 w-full flex-1">
                <EnterpriseProfileMenu enterprise={{ nom: profile.nom, email: profile.email }} />

                <section className="flex-1 flex flex-col gap-3 px-6 overflow-hidden min-w-0">

                    <div className="py-2">
                        <h1 className="titleText text-color-button">Mes commandes</h1>
                    </div>

                    <div className="bg-white/25 rounded-3xl p-6 flex flex-col gap-4">

                        {orders.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="secondaryTitleText text-grey">Aucune commande pour le moment</p>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order.id} className="bg-bg rounded-2xl p-5 flex flex-col gap-4">

                                    <div className="flex items-start justify-between flex-wrap gap-3">
                                        <div className="flex flex-col gap-1">
                                            <p className="secondaryTitleText text-black">
                                                Commande du {new Date(order.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                                            </p>
                                            <p className="normalText text-grey">
                                                {order.Client?.prenom} {order.Client?.nom} — {order.Client?.email}
                                            </p>
                                            <p className="normalText text-black">
                                                Livraison : {order.adresse_livraison}
                                            </p>
                                            <p className={`normalText font-bold ${STATUS_COLORS[order.statut] ?? "text-black"}`}>
                                                {STATUS_LABELS[order.statut] ?? order.statut}
                                            </p>
                                        </div>

                                        <p className="secondaryTitleText text-black">{order.total?.toFixed(2)} €</p>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {order.Ligne_commande?.map((ligne) => (
                                            <div key={ligne.id} className="bg-white rounded-xl p-3 flex gap-3 items-center">
                                                <img
                                                    src={ligne.Variante_produit?.Produit?.Image_produit?.[0]?.url ?? Casque}
                                                    alt={ligne.Variante_produit?.Produit?.nom}
                                                    className="w-16 h-16 object-cover rounded-xl"
                                                />
                                                <div className="flex flex-col gap-1">
                                                    <p className="buttonText text-product">{ligne.Variante_produit?.Produit?.nom}</p>
                                                    {ligne.Variante_produit?.Variante_valeur_attribut?.map((att) => (
                                                        <p key={att.Valeur_attribut.id} className="normalText text-color-button">
                                                            {att.Valeur_attribut.Attribut.nom} : {att.Valeur_attribut.nom}
                                                        </p>
                                                    ))}
                                                    <p className="normalText text-black">x{ligne.quantite} — {ligne.prix_unitaire?.toFixed(2)} €</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-3 flex-wrap">
                                        {order.statut === "EN_ATTENTE" && (
                                            <>
                                                <button
                                                    onClick={() => handleConfirm(order.id)}
                                                    className="buttonText h-12 px-6 bg-color-button text-white rounded-xl hover:bg-button-hover active:scale-95 transition-all"
                                                >
                                                    Confirmer
                                                </button>
                                                <button
                                                    onClick={() => handleCancel(order.id)}
                                                    className="buttonText h-12 px-6 bg-beige text-black rounded-xl hover:bg-red-400 hover:text-white active:scale-95 transition-all"
                                                >
                                                    Annuler
                                                </button>
                                            </>
                                        )}
                                        {order.statut === "CONFIRMEE" && (
                                            <button
                                                onClick={() => handleUpdateStatus(order.id, "EXPEDIEE")}
                                                className="buttonText h-12 px-6 bg-color-button text-white rounded-xl hover:bg-button-hover active:scale-95 transition-all"
                                            >
                                                Marquer comme expédiée
                                            </button>
                                        )}
                                        {order.statut === "EXPEDIEE" && (
                                            <button
                                                onClick={() => handleUpdateStatus(order.id, "LIVREE")}
                                                className="buttonText h-12 px-6 bg-green-500 text-white rounded-xl hover:bg-green-600 active:scale-95 transition-all"
                                            >
                                                Marquer comme livrée
                                            </button>
                                        )}
                                    </div>

                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default CommandesEntreprise;