
import ProductCard from "./ProductCard";


const OrderSummary = ({ order }) => {

    const statusColor = (status ) => {
        if(status === "Livré") return "green-600";
        if(status.includes("En cours")) return "color-button";
        if(status === "Retardé" || status === "Annulé") return "red-500";
    };

    return (
        <div className="border-2 border-black rounded-2xl p-5 flex flex-col gap-3 w-full bg-white/30">
   
            <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="flex flex-col gap-0.5">
                    <h2 className="secondaryTitleText text-button">
                        Commande du {order.date}
                    </h2>
                    <p className="normalText text-black">{order.nbArticles} {order.nbArticles === 1 ? "article" : "articles"}</p>
                    <p className="normalText text-black">
                        Adresse de livraison : {order.adresse}
                    </p>
                </div>
            </div>

            <div className="flex gap-4 flex-wrap">
            {
                order.produits.map((p, i) => (
                    <ProductCard key={i} product={p} purchase={false}/>
                ))}
            </div>

            <div className="flex flex-col gap-1 pt-1 border-t border-grey/20">
                <p className="productText font-bold text-black">
                    Total : {order.total.toFixed(2)} €
                </p>

                <p className={`normalText font-bold text-${statusColor(order.statut)}`}>
                    {order.statut} - {order.livraison}
                </p>
            </div>

        </div>
    );

}

export default OrderSummary;