import Casque from "../../assets/Casque.jpg";

const STATUS_COLORS = {
    "EN_ATTENTE": "text-yellow-600",
    "CONFIRMEE": "text-color-button",
    "EXPEDIEE": "text-blue-500",
    "LIVREE": "text-green-600",
    "ANNULEE": "text-red-500",
};

const STATUS_LABELS = {
    "EN_ATTENTE": "En attente de confirmation",
    "CONFIRMEE": "Commande confirmée",
    "EXPEDIEE": "En cours de livraison",
    "LIVREE": "Livré",
    "ANNULEE": "Annulée",
};

const OrderSummary = ({ order, onCancel }) => {
    const date = new Date(order.created_at).toLocaleDateString("fr-FR", {
        day: "numeric", month: "long", year: "numeric"
    });

    const nbArticles = order.Ligne_commande?.reduce((acc, l) => acc + l.quantite, 0) ?? 0;

    return (
        <div className="border-2 border-black rounded-2xl p-5 flex flex-col gap-3 w-full bg-white/30">
            <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="flex flex-col gap-0.5">
                    <h2 className="secondaryTitleText text-button">
                        Commande du {date}
                    </h2>
                    <p className="normalText text-black">{nbArticles} {nbArticles === 1 ? "article" : "articles"}</p>
                    <p className="normalText text-black">
                        Adresse de livraison : {order.adresse_livraison}
                    </p>
                </div>
            </div>

            <div className="flex gap-4 flex-wrap">
            {
                order.Ligne_commande?.map((ligne) => (
                    <div key={ligne.id} className="bg-bg flex flex-col items-center gap-2 w-40 shrink-0 py-2 px-3 rounded-xl">
                        <img
                            src={ligne.Variante_produit?.Produit?.Image_produit?.[0]?.url ?? Casque}
                            alt={ligne.Variante_produit?.Produit?.nom}
                            className="w-24 h-24 object-cover rounded-xl"
                        />
                        <p className="normalText text-product text-center">{ligne.Variante_produit?.Produit?.nom}</p>
                        <p className="normalText text-black">x{ligne.quantite}</p>
                        <p className="normalText font-bold text-black">{ligne.prix_unitaire?.toFixed(2)} €</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3 pt-1 border-t border-grey/20">
                <div className="flex flex-col gap-1">
                    <p className="normalText font-bold text-black">Total : {order.total?.toFixed(2)} €</p>
                    <p className={`normalText font-bold ${STATUS_COLORS[order.statut] ?? "text-black"}`}>
                        {STATUS_LABELS[order.statut] ?? order.statut}
                    </p>
                </div>

                {onCancel && (
                    <button
                        onClick={onCancel}
                        className="buttonText h-12 px-6 bg-beige text-black rounded-xl hover:bg-red-400 hover:text-white active:scale-95 transition-all"
                    >
                        Annuler la commande
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderSummary;