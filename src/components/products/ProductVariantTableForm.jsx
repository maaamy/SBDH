import { Trash2 } from "lucide-react";
import SelectInput from "../ui/SelectInput";
import RowProductVariantForm from "./RowProductVariantForm";
import { useSelector } from "react-redux";

const ProductVariantTableForm = ({ selectedAttributes, variants, onChange }) => {
    
    const { attributes, loading } = useSelector((state) => state.appData);
    
    const generateId = () => {
        return Math.random().toString(36).slice(2, 9);
    }
    const headers = [...selectedAttributes, {nom:"Ref SKU"}, {nom:"Stock"}, {nom:"Prix"}, {nom:"Action"}];

    const formBuilder = () => {
        let base = { id:generateId(), prix: "", stock: "", sku: "" };
        attributes.forEach(att => { base[att.nom] = ""; });        
        return base;
    };

    const addVariant = () => {
        onChange([...variants, formBuilder()]);
    };

    const updateVariant = (updated) => {
        onChange(variants.map((v) => (v.id === updated.id ? updated : v)));
    };

    const deleteVariant= (id) => {
        onChange(variants.filter((v) => v.id !== id));
    }

    if(loading) return  <div>Chargement...</div>;

    return (
        <div className="flex flex-col w-full gap-2">
            <h2 className="titleText text-black">Les variantes du produit</h2>

            <div className="flex flex-col">
                <div className="overflow-x-auto w-full">
                    <div
                        className="grid"
                        style={{ minWidth: "max-content", gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
                    >
                        {headers.map((col, i) => (
                            <p key={i} className="bg-brown/50 secondaryTitleText text-white text-center py-4 px-3">
                                {col.nom}
                            </p>
                        ))}

                        {variants.length === 0 ? (
                            <h1 className="normalText p-5 col-span-full bg-cream border border-brown/50">
                                Aucune variante. Cliquez sur le bouton ci-dessous pour en ajouter une.
                            </h1>
                        ) : (
                            variants.map((variant) => (
                                <RowProductVariantForm
                                    key={variant.id}
                                    selectedAttributes={selectedAttributes}
                                    variant={variant}
                                    onChange={updateVariant}
                                    onDelete={deleteVariant}
                                />
                            ))
                        )}
                    </div>
                </div>

                <div className="w-full flex pt-3 justify-end">
                    <button
                        type="button"
                        className="buttonText h-12 px-10 bg-brown text-white rounded-xl hover:bg-color-button-hover active:scale-95 transition-all disabled:bg-slate-300"
                        onClick={addVariant}
                    >
                        Ajouter une variante
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductVariantTableForm;