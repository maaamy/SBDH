import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import EnterpriseNavigation from "../components/layout/EnterpriseNavigation";
import EnterpriseProfileMenu from "../components/layout/EnterpriseProfileMenu";
import Footer from "../components/layout/Footer";
import Banner from "../components/layout/Banner";
import FormInput from "../components/ui/FormInput";
import SelectInput from "../components/ui/SelectInput";
import TextAreaInput from "../components/ui/TextAreaInput";
import MultipleAddSelection from "../components/MultipleAddSelection";
import ProductVariantTableForm from "../components/products/ProductVariantTableForm";
import { addProduct, selectEnterprise } from "../store/slices/enterpriseSlice";
import { validationProductAddForm } from "../utils/validation";

const AjoutProduit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { profile } = useSelector(selectEnterprise);
    const { categories, attributes } = useSelector((state) => state.appData);

    const fileInputRef = useRef(null);

    const [variants, setVariants] = useState([]);
    const [form, setForm] = useState({
        entrepriseId: profile.id,
        nom: "",
        description: "",
        categorie: "",
        sousCategorie:""
    });
    const [photoPreview, setPhotoPreview] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuccessMessage,setShowSuccessMessage] = useState(false);
    const [error, setError] = useState(null);
    const [errorForm, setErrorForm]= useState([]);
    
    const subCatOptions = form.categorie?.id? form.categorie.sousCategories ?? []: [];

    const handleChange = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMsg = validationProductAddForm(form, variants, selectedAttributes);
        if (errorMsg) {
            setErrorForm(errorMsg); 
            return;
        }
        else {
            setErrorForm(null);
        }
        setLoading(true);
        setError(null);
        const res = await dispatch(addProduct({ form, variants, picture:photoFile } ));
        if (addProduct.fulfilled.match(res)) {
            setShowSuccessMessage(true);
        }
        else {
            setError(res.message);
        }
    };

    return (
        <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">
            <Banner />

            <EnterpriseNavigation enterprise={{ nom: profile.nom }}/>

            <main className="flex items-start gap-0 p-4 w-full flex-1">

                <EnterpriseProfileMenu enterprise={{ nom: profile.nom, email: profile.mail }}/>

                <section className="flex-1 flex flex-col gap-3 px-6 overflow-hidden min-w-0">

                    <div className="py-2 flex flex-col gap-1">
                        <h1 className="titleText text-color-button">Ajouter un produit</h1>
                        <p className="secondaryTitleText text-black">
                            Complétez les informations ci-dessous pour ajouter un nouveau produit à votre catalogue
                        </p>
                    </div>

                    <div className="bg-white/25 rounded-3xl p-8 flex flex-col gap-5 w-full">

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            <div className="bg-white w-full p-4 rounded-2xl">
                            
                                <h2 className="titleText text-black">Informations du produit</h2>
                            
                                <div className="flex gap-6 items-start flex-wrap">

                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="bg-beige border border-black/20 flex flex-col items-center justify-center gap-2 px-1 py-1 rounded-2xl cursor-pointer hover:bg-bg-hover transition-colors shrink-0 min-w-48"
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handlePhotoChange}
                                        />
                                        {photoPreview ? (
                                            <img
                                                src={photoPreview}
                                                alt="aperçu"
                                                className="w-52 h-52 object-cover rounded-xl"
                                                />
                                        ) : (
                                            <Camera size={96} className="text-black w-52 h-52" strokeWidth={1.5} />
                                        )}
                                        <p className="normalText text-black text-center">
                                            + Ajouter une photo
                                        </p>
                                    </div>

                                    <div className="flex-1 flex flex-col  min-w-60">
                                        <div className="bg-white border border-white flex flex-col gap-2 items-start px-3 pb-3 rounded-2xl w-full">
                                            <label className="secondaryTitleText text-button">Nom du produit</label>
                                            <input
                                                type="text"
                                                value={form.nom}
                                                onChange={handleChange("nom")}
                                                className="border rounded-2xl w-full px-5 secondaryText text-black placeholder:text-grey focus:outline-none focus:border-color-button bg-white h-16 py-0"
                                            />
                                        </div>
                                    
                                        <TextAreaInput
                                            label="Description du produit"
                                            value={form.description}
                                            onChange={handleChange("description")}
                                            rows={5}
                                        />
                                    </div>

                                </div>

                                <div className="flex  gap-6 items-start flex-wrap w-full">

                                    <div className="flex-1">
                                        <SelectInput 
                                            label="Catégorie"
                                            options={categories}
                                            value={form.categorie}
                                            onChange={(val) => setForm((prev) => ({ ...prev, categorie: val }))}
                                            placeholder="Entrez la catégorie du produit"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <SelectInput 
                                            label="Sous-catégorie"
                                            options={subCatOptions}
                                            value={form.sousCategorie}
                                            onChange={(val) => setForm((prev) => ({ ...prev, sousCategorie: val }))}
                                            placeholder="Entrez la sous-catégorie du produit"
                                            disabled= { form.categorie=== ""} 
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className="bg-white w-full rounded-2xl">
                                <MultipleAddSelection
                                    title={"Attributs du produit"}
                                    optionValues={attributes}
                                    buttonText={"Ajouter un attribut"}
                                    onSelectionChange={setSelectedAttributes}
                                />
                            </div>

                            <div className="bg-white w-full p-4 rounded-2xl">
                                <ProductVariantTableForm selectedAttributes={selectedAttributes} variants={variants}  onChange={setVariants}/>
                            </div>

                            {(error || errorForm) && (
                                <p className="normalText text-red-500">{errorForm || error}</p>
                            )}

                            <div className="flex items-center justify-between gap-4 flex-wrap mt-2">
                                <button
                                    type="button"
                                    onClick={() => navigate("/mes-produits")}
                                    className={`buttonText h-16 w-72 bg-beige text-black rounded-2xl hover:bg-bg-hover active:scale-95 transition-all 
                                                ${showSuccessMessage ? "invisible" : ""}`}
                                >
                                Annuler
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="buttonText h-16 w-80 bg-color-button text-white rounded-xl hover:bg-button-hover active:scale-95 transition-all disabled:opacity-50"
                                >
                                {loading || showSuccessMessage ? "Ajout en cours..." : "Ajouter le produit"}
                                </button>
                            </div>
                            {showSuccessMessage && <p className="normalText text-color-button">Produit et variantes bien ajoutés.</p>}

                        </form>

                    </div>
                </section>
            </main>

            <Footer />

        </div>
    );
};

export default AjoutProduit;
