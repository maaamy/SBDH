const KPICards = ({ dashboard, reviews, inventory }) => {

    const info = Array.isArray(dashboard) ? dashboard[0] : dashboard || {};

    const cards = [
        { title: "Chiffre d'affaires", value: `${info.chiffre_affaires ?? 0} €` },
        { title: "Commandes", value: info.nb_commandes ?? 0 },
        { title: "Clients uniques", value: info.nb_clients ?? 0 },
        { title: "Produits vendus", value: info.nb_produits_vendus ?? 0 },
        { title: "Avis reçus", value: reviews.length },
        { title: "Produits en vente", value: inventory.filter(s => s.est_actif).length },
        { title: "Produits désactivés", value: inventory.filter(s => !s.est_actif).length },
        { title: "Produits en rupture", value: inventory.filter(s => s.rupture).length },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, index) => (
                <div key={index} className="bg-white rounded-xl shadow p-5">
                    <p className="normalText text">{card.title}</p>
                    <h2 className="titleText text-color-button mt-2">{card.value}</h2>
                </div>
            ))}
        </div>
    );
};

export default KPICards;