import { Trash2 } from "lucide-react";
import SelectInput from "../ui/SelectInput";
import { useSelector } from "react-redux";

const RowProductVariantForm = ({ selectedAttributes, variant, onChange, onDelete }) => {

    const { attributes } = useSelector((state) => state.appData);

    const update = (field, value) => {
        onChange({ ...variant, [field]: value });
    }
    
    return (
        <>
            {selectedAttributes.map((att) => (
                <div key={att.id} className="flex items-center px-3 py-3 border border-brown/50 bg-cream">
                    <SelectInput
                        options={attributes.find(a => a.nom === att.nom)?.valeurs ?? []}
                        value={variant[att.nom]}
                        onChange={(val) => update(att.nom, val)}
                        placeholder={`Choisir une ${att.nom}`}
                    />
                </div>
            ))}

            <div className="flex items-center px-3 py-3 border border-brown/50 bg-cream">
                <input
                    type="text"
                    placeholder="SKU0000"
                    value={variant.sku}
                    onChange={(e) => update("sku", e.target.value)}
                    className="w-full h-16 px-3 rounded-2xl border bg-white text-sm outline-none focus:border-color-button"
                />
            </div>

            <div className="flex items-center px-3 py-3 border border-brown/50 bg-cream">
                <input
                    type="number"
                    placeholder="0"
                    value={variant.stock}
                    onChange={(e) => update("stock", e.target.value)}
                    className="w-full h-16 px-3 rounded-2xl border bg-white text-sm outline-none focus:border-color-button"
                />
            </div>

            <div className="flex items-center px-3 py-3 border border-brown/50 bg-cream gap-1">
                <input
                    type="number"
                    placeholder="0.00"
                    value={variant.prix}
                    onChange={(e) => update("prix", e.target.value)}
                    className="flex-1 h-16 px-3 rounded-2xl border bg-white text-sm outline-none focus:border-color-button"
                />
                <span className="text-sm text-gray-500">€</span>
            </div>

            <div className="flex items-center px-3 py-3 border border-brown/50 bg-cream justify-center">
                <button
                    onClick={() => onDelete(variant.id)}
                    className="h-16 w-32 bg-color-button text-white rounded-xl hover:bg-red-500 active:scale-95 transition-all flex items-center justify-center"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </>
    );
};

export default RowProductVariantForm;