import { useState } from "react";
import { Plus, ChevronDown, ChevronRight, Pencil, Check, X } from "lucide-react";
import Casque from "../../assets/Casque.jpg";

const ProductLine = ({ p, isExpanded, onToggle, onToggleActive, onAddVariant }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isActive, setIsActive] = useState(p.est_actif);

    const totalStock = p.filteredVariants.reduce((acc, v) => acc + v.stock, 0);
    const prixMin = Math.min(...p.filteredVariants.map((v) => v.prix));
    const prixMax = Math.max(...p.filteredVariants.map((v) => v.prix));

    const handleSave = () => {
        onToggleActive(p.id, isActive);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsActive(p.est_actif);
        setIsEditing(false);
    };

    return (
        <div className="bg-color-button/20 grid grid-cols-[2rem_1fr_3.5fr_1.25fr_1.1fr_1fr_1fr_3fr] gap-3 items-center p-3 hover:bg-color-button/30 transition-colors">

            <button onClick={onToggle}>
                {isExpanded
                    ? <ChevronDown size={20} className="text-color-button" />
                    : <ChevronRight size={20} className="text-color-button" />
                }
            </button>

            <div className="flex justify-center cursor-pointer" onClick={onToggle}>
                <img
                    src={p.image?.[0]?.url ?? Casque}
                    alt={p.nom}
                    className="w-16 h-16 object-cover rounded-xl"
                />
            </div>

            <div className="flex flex-col gap-1 cursor-pointer" onClick={onToggle}>
                <p className="secondaryTitleText text-product">{p.nom}</p>
                <p className="normalText text-grey">{p.categorie?.nom}</p>
                {p.Marque?.nom && (
                    <p className="normalText text-grey">{p.Marque.nom}</p>
                )}
                <p className="normalText text-grey">{p.filteredVariants.length} variante(s)</p>
            </div>

            <p className="buttonText text-black text-center">
                {prixMin === prixMax
                    ? `${prixMin.toFixed(2)}€`
                    : `${prixMin.toFixed(2)}€ - ${prixMax.toFixed(2)}€`
                }
            </p>

            <p className={`buttonText text-center font-bold ${isActive ? "text-green-600" : "text-red-500"}`}>
                {isActive ? "En ligne" : "Inactif"}
            </p>

            <p className="buttonText text-black text-center">{totalStock}</p>

            <div className="flex justify-center">
                <button
                    onClick={() => isEditing && setIsActive((prev) => !prev)}
                    className={`w-14 h-7 rounded-full transition-colors ${isActive ? "bg-green-500" : "bg-gray-300"} ${isEditing ? "cursor-pointer" : "cursor-default"}`}
                >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-1 ${isActive ? "translate-x-7" : "translate-x-0"}`} />
                </button>
            </div>

            <div className="flex gap-2 justify-center">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            className="buttonText h-10 px-3 bg-green-500 text-white rounded-xl hover:bg-green-600 active:scale-95 transition-all flex items-center gap-1"
                        >
                            <Check size={16} />
                            Sauvegarder
                        </button>
                        <button
                            onClick={handleCancel}
                            className="buttonText h-10 px-3 bg-beige text-black rounded-xl hover:bg-bg-hover active:scale-95 transition-all flex items-center gap-1"
                        >
                            <X size={16} />
                            Annuler
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="buttonText h-10 px-3 bg-color-button text-white rounded-xl hover:bg-button-hover active:scale-95 transition-all flex items-center gap-1"
                        >
                            <Pencil size={16} />
                            Modifier
                        </button>
                        <button
                            onClick={onAddVariant}
                            className="buttonText h-10 px-3 bg-color-button text-white rounded-xl hover:bg-button-hover active:scale-95 transition-all flex items-center gap-1"
                        >
                            <Plus size={16} />
                            Variante
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductLine;