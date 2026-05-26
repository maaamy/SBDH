
import { Pencil, Trash2 } from "lucide-react";

const STATUS_COLORS = {
  "En stock": "text-green-600",
  "Stock Faible": "text-yellow-600",
  "Rupture": "text-red-500",
};

const TableLineProduct = ({ product, onChange, onDelete }) => {
    return(
        <div className="bg-bg grid grid-cols-[1fr_3.5fr_1.25fr_1.1fr_1fr_3fr] gap-3 items-center p-3 rounded-xl shadow-sm">

            <div className="flex justify-center">
                <img
                    src={product.image}
                    alt={product.nom}
                    className="w-24 h-24 object-cover rounded-xl"
                />
            </div>

            <div className="flex flex-col gap-1">
                <p className="buttonText text-product leading-tight">{product.nom}</p>
                <p className="normalText text-button font-bold">Couleur: {product.couleur}</p>
            </div>

            <p className="buttonText text-black text-center">{product.prix.toFixed(2)}€</p>

            <p className={`buttonText text-center font-bold ${STATUS_COLORS[product.statut] || "text-black"}`}>
                {product.statut}
            </p>

            <p className="buttonText text-black text-center">{product.stock}</p>

            <div className="flex gap-2 justify-center">
                <button
                    onClick={() => onChange(product.id)}
                    className="buttonText h-14 px-4 bg-color-button text-white rounded-xl hover:bg-button-hover active:scale-95 transition-all flex items-center gap-2"
                >
                    <Pencil size={16} />
                    Modifier
                </button>

                <button
                    onClick={() => onDelete(product.id)}
                    className="buttonText h-14 px-4 bg-color-button text-white rounded-xl hover:bg-red-500 active:scale-95 transition-all flex items-center gap-2"
                >
                    <Trash2 size={16} />
                    Supprimer
                </button>
            </div>

        </div>
    );
}

export default TableLineProduct;