import { useState } from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import MultipleAddSelection from "../MultipleAddSelection";

const AddVariantModal = ({ product, onClose, onAdd }) => {
    const { attributes } = useSelector((state) => state.appData);
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [variant, setVariant] = useState({ sku: "", prix: "", stock: "" });

    const update = (field, value) => setVariant((prev) => ({ ...prev, [field]: value }));

    const handleAdd = () => {
        const attributs = selectedAttributes.map((att) => ({
            id: variant[att.nom]?.id,
            nom: variant[att.nom]?.nom,
        })).filter((a) => a.id);

        onAdd({
            sku: variant.sku,
            prix: parseFloat(variant.prix),
            stock: parseInt(variant.stock),
            attributs,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl p-6 w-full max-w-lg flex flex-col gap-4">

                <div className="flex items-center justify-between">
                    <h2 className="titleText text-color-button">Ajouter une variante</h2>
                    <button onClick={onClose} className="p-2 hover:bg-beige rounded-xl transition-all">
                        <X size={24} />
                    </button>
                </div>

                <p className="normalText text-grey">
                    Produit : <span className="font-bold text-black">{product.nom}</span>
                </p>

                <div className="bg-white rounded-2xl border border-beige">
                    <MultipleAddSelection
                        title="Attributs"
                        optionValues={attributes}
                        buttonText="Ajouter un attribut"
                        onSelectionChange={setSelectedAttributes}
                    />
                </div>

                {selectedAttributes.map((att) => (
                    <div key={att.id} className="flex flex-col gap-1">
                        <label className="normalText font-bold text-color-button">{att.nom}</label>
                        <select
                            onChange={(e) => {
                                const valeur = attributes
                                    .find((a) => a.nom === att.nom)
                                    ?.valeurs?.find((v) => v.id === parseInt(e.target.value));
                                update(att.nom, valeur);
                            }}
                            className="border rounded-xl px-3 h-12 normalText text-black focus:outline-none focus:border-color-button"
                        >
                            <option value="">Choisir une valeur</option>
                            {attributes.find((a) => a.nom === att.nom)?.valeurs?.map((v) => (
                                <option key={v.id} value={v.id}>{v.nom}</option>
                            ))}
                        </select>
                    </div>
                ))}

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="normalText font-bold text-black">SKU</label>
                        <input
                            type="text"
                            placeholder="SKU0000"
                            value={variant.sku}
                            onChange={(e) => update("sku", e.target.value)}
                            className="border rounded-xl px-3 h-12 normalText text-black focus:outline-none focus:border-color-button"
                        />
                    </div>

                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="normalText font-bold text-black">Stock</label>
                            <input
                                type="number"
                                placeholder="0"
                                value={variant.stock}
                                onChange={(e) => update("stock", e.target.value)}
                                className="border rounded-xl px-3 h-12 normalText text-black focus:outline-none focus:border-color-button"
                            />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <label className="normalText font-bold text-black">Prix (€)</label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={variant.prix}
                                onChange={(e) => update("prix", e.target.value)}
                                className="border rounded-xl px-3 h-12 normalText text-black focus:outline-none focus:border-color-button"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-2">
                    <button
                        onClick={onClose}
                        className="flex-1 buttonText h-12 bg-beige text-black rounded-xl hover:bg-bg-hover active:scale-95 transition-all"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleAdd}
                        disabled={!variant.sku || !variant.prix || !variant.stock}
                        className="flex-1 buttonText h-12 bg-color-button text-white rounded-xl hover:bg-button-hover active:scale-95 transition-all disabled:opacity-50"
                    >
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddVariantModal;