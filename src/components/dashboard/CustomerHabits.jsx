import LoopStat from "../../assets/LoopStat.png";

const CustomerHabits = ({ dashboard }) => {
    const habits = [
        { label: "Sous-catégorie favorite", value: dashboard?.categorie_favorite ?? "-" },
        { label: "Produit favori", value: dashboard?.produit_favori ?? "-" },
        { label: "Entreprise favorite", value: dashboard?.entreprise_favorite ?? "-" },
        { label: "Quantité achetée", value: dashboard?.quantite_totale ?? "-" },
        { label: "Ancienneté", value: `${dashboard?.anciennete_jours ?? 0} jours` },
    ];

    return (
        <div className="flex items-start gap-4 mt-2">
            <div className="flex-1 flex flex-col gap-2">
                {habits.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 border-b border-beige pb-2">
                        <p className="normalText text-button-hover w-48 shrink-0">{h.label}</p>
                        <p className="normalText font-bold text-black">{h.value}</p>
                    </div>
                ))}
            </div>
            <div className="w-16 h-16 shrink-0">
                <img src={LoopStat} alt="Loop" />
            </div>
        </div>
    );
};

export default CustomerHabits;