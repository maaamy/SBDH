const STATUS_COLORS = {
    "LIVREE": "#16a34a",
    "CONFIRMEE": "#b86748",
    "EXPEDIEE": "#2563eb",
    "EN_ATTENTE": "#ca8a04",
    "ANNULEE": "#dc2626",
};

const OrderSummaryCards = ({ history }) => {
    if (!history?.length) return <p className="normalText text-grey">Aucune commande.</p>;

    const uniqueOrders = (() => {
        const seen = new Set();
        return history.filter((h) => {
            if (seen.has(h.commande_id)) return false;
            seen.add(h.commande_id);
            return true;
        });
    })();

    const lastOrder = uniqueOrders[0];

    const mostExpensive = [...uniqueOrders].sort((a, b) => b.montant_commande - a.montant_commande)[0];

    const currentOrder = uniqueOrders.find((h) =>
        h.statut_commande !== "LIVREE" && h.statut_commande !== "ANNULEE"
    );

    const cards = [
        {
            label: "Dernière commande",
            order: lastOrder,
        },
        {
            label: "Commande la plus chère",
            order: mostExpensive,
        },
        {
            label: "Commande en cours",
            order: currentOrder ?? null,
            empty: "Aucune commande en cours",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow flex flex-col gap-2">
                    <p className="normalText text-button-hover">{card.label}</p>
                    {card.order ? (
                        <>
                            <p className="secondaryTitleText text-black">
                                {new Date(card.order.date_commande).toLocaleDateString("fr-FR")}
                            </p>
                            <p className="titleText text-color-button">
                                {card.order.montant_commande?.toFixed(2)} €
                            </p>
                            <p className="normalText text-grey">{card.order.entreprise}</p>
                            <span
                                className="normalText font-bold px-3 py-1 rounded-full w-fit"
                                style={{
                                    color: STATUS_COLORS[card.order.statut_commande] ?? "#000",
                                    backgroundColor: `${STATUS_COLORS[card.order.statut_commande]}20`
                                }}
                            >
                                {card.order.statut_commande}
                            </span>
                        </>
                    ) : (
                        <p className="normalText text-grey">{card.empty ?? "-"}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default OrderSummaryCards;