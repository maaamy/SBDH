import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import Casque from "../../assets/Casque.jpg";

const STATUS_COLORS = {
  "En stock": "text-green-600",
  "Stock Faible": "text-yellow-600",
  "Rupture": "text-red-500",
  "Non actif": "text-red-700"
};

const TableLineProduct = ({ variantProduct, onChange, onDelete }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        prix: variantProduct.prix,
        stock: variantProduct.stock,
        est_active: variantProduct.est_active,
    });

    const computeStatus = (stock, isActive) => {
        if (!isActive) return "Non actif";
        if (stock === 0) return "Rupture";
        else if (stock <= 3) return "Stock Faible";
        return "En stock";
    };

    const statusValue = computeStatus(form.stock, form.est_active);

    const handleSave = () => {
        onChange({ ...variantProduct, ...form });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setForm({ prix: variantProduct.prix, stock: variantProduct.stock, est_active: variantProduct.est_active });
        setIsEditing(false);
    };

    return (
        <div className="bg-bg grid grid-cols-[2rem_1fr_3.5fr_1.25fr_1.1fr_1fr_1fr_3fr] gap-3 items-center p-3 border-t border-beige">

            <div />

            <div className="flex justify-center">
                <img
                    src={variantProduct.image?.[0]?.url ?? Casque}
                    alt={variantProduct.nom}
                    className="w-14 h-14 object-cover rounded-xl"
                />
            </div>

            <div className="flex flex-col gap-1">
                <p className="normalText text-grey leading-tight">{variantProduct.sku}</p>
                {variantProduct.Variante_valeur_attribut.map((att) => (
                    <div key={att.Valeur_attribut.id}>
                        <span className="normalText text-color-button font-bold">{att.Valeur_attribut.Attribut.nom}: </span>
                        <span className="normalText">{att.Valeur_attribut.nom}</span>
                    </div>
                ))}
            </div>

            {isEditing ? (
                <input
                    type="number"
                    step="0.01"
                    value={form.prix}
                    onChange={(e) => setForm((prev) => ({ ...prev, prix: parseFloat(e.target.value) }))}
                    className="border rounded-xl px-3 py-1 buttonText text-black text-center focus:outline-none focus:border-color-button w-full"
                />
            ) : (
                <p className="buttonText text-black text-center">{variantProduct.prix.toFixed(2)}€</p>
            )}

            <p className={`buttonText text-center font-bold ${STATUS_COLORS[statusValue] || "text-black"}`}>
                {statusValue}
            </p>

            {isEditing ? (
                <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm((prev) => ({ ...prev, stock: parseInt(e.target.value) }))}
                    className="border rounded-xl px-3 py-1 buttonText text-black text-center focus:outline-none focus:border-color-button w-full"
                />
            ) : (
                <p className="buttonText text-black text-center">{variantProduct.stock}</p>
            )}

            <div className="flex justify-center">
                <button
                    onClick={() => isEditing && setForm((prev) => ({ ...prev, est_active: !prev.est_active }))}
                    className={`w-14 h-7 rounded-full transition-colors ${form.est_active ? "bg-green-500" : "bg-gray-300"} ${isEditing ? "cursor-pointer" : "cursor-default"}`}
                >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-1 ${form.est_active ? "translate-x-7" : "translate-x-0"}`} />
                </button>
            </div>

            <div className="flex gap-2 justify-center">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            className="buttonText h-12 px-3 bg-green-500 text-white rounded-xl hover:bg-green-600 active:scale-95 transition-all flex items-center gap-1"
                        >
                            <Check size={16} />
                            Sauvegarder
                        </button>
                        <button
                            onClick={handleCancel}
                            className="buttonText h-12 px-3 bg-beige text-black rounded-xl hover:bg-bg-hover active:scale-95 transition-all flex items-center gap-1"
                        >
                            <X size={16} />
                            Annuler
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="buttonText h-12 px-3 bg-color-button text-white rounded-xl hover:bg-button-hover active:scale-95 transition-all flex items-center gap-1"
                        >
                            <Pencil size={16} />
                            Modifier
                        </button>
                        <button
                            onClick={() => onDelete(variantProduct.id)}
                            className="buttonText h-12 px-3 bg-color-button text-white rounded-xl hover:bg-red-500 active:scale-95 transition-all flex items-center gap-1"
                        >
                            <Trash2 size={16} />
                            Supprimer
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TableLineProduct;