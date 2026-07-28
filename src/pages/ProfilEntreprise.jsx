import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2, Mail, PenLine, MapPin, 
  Pencil, Image, Phone
} from "lucide-react";
import EnterpriseNavigation from "../components/layout/EnterpriseNavigation";
import EnterpriseProfileMenu from "../components/layout/EnterpriseProfileMenu";
import Footer from "../components/layout/Footer";
import FormInput from "../components/ui/FormInput";
import Banner from "../components/layout/Banner";
import { selectEnterprise, updateEnterpriseProfile } from "../store/slices/enterpriseSlice";


const ProfilEntreprise = () => {
    
    const dispatch = useDispatch();

    const { profile } = useSelector(selectEnterprise);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [isChanged, setIsChanged] = useState(false);

    const [form, setForm] = useState(null);

    useEffect(() => {
        if (profile) {
            setForm({
                id: profile.loginId,
                nom: profile.nom || "",
                email: profile.email || "",
                siret: profile.siret || "",
                telephone: profile.telephone || "",
                statut: profile.statut || "",
                adresse: profile.adresse || "",
                adresse2: profile.adresse2 || "",
                ville: profile.ville || "",
                codePostal: profile.codePostal || "",
                pays: profile.pays || "",
            });
        }
    }, [profile]);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        setIsChanged(true);
    }
        
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) setLogoPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            if(isChanged){
                await dispatch(updateEnterpriseProfile(form));  
            }
            setSuccess(true);
            setIsChanged(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!form) {
        return <div className="p-10 text-center">Chargement du profil...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">
            <Banner />
            
            <EnterpriseNavigation enterprise={{nom: profile.nom }} />

            <main className="flex items-start gap-0 p-4 w-full flex-1">

                <EnterpriseProfileMenu enterprise={{ nom:profile.nom, email:profile.email }} />

                <section className="flex-1 flex flex-col gap-3 px-6 overflow-hidden min-w-0">

                    <h1 className="titleText text-color-button">Mon profil</h1>

                    <div className="bg-white rounded-3xl p-8 flex flex-col gap-5 w-full">

                
                        <div className="flex flex-col gap-1">
                            <p className="secondaryTitleText text-black">{form.nom || "Nom de l'entreprise"}</p>
                            <p className="secondaryTitleText text-black">
                                Statut :{" "}
                                <span className="text-brown">
                                {form.statut || "Actif"}
                                </span>
                            </p>
                        </div>

                        <h2 className="titleText text-black">Informations de l'entreprise</h2>
                
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                            <div className="flex gap-4 flex-col lg:flex-row items-start">

                                <div className="flex-1 flex flex-col gap-4">
                                    
                                    <FormInput
                                        label="Nom de l'entreprise"
                                        type="text"
                                        placeholder="Ma Société"
                                        icon={<Building2 size={16} />}
                                        value={form.nom}
                                        onChange={handleChange("nom")}
                                    />

                                    <FormInput
                                        label="Adresse e-mail"
                                        type="email"
                                        placeholder="exemple@gmail.com"
                                        icon={<Mail size={16} />}
                                        value={form.email}
                                        readOnly={true}
                                    />

                                    <FormInput
                                        label="N° SIRET"
                                        type="text"
                                        placeholder="00000000000000"
                                        icon={<PenLine size={16} />}
                                        value={form.siret}
                                        onChange={handleChange("siret")}
                                    />

                                    <FormInput
                                        label="Téléphone"
                                        type="tel"
                                        placeholder="+ 00 0 00 00 00 00"
                                        icon={<Phone size={16} />}
                                        value={form.telephone}
                                        onChange={handleChange("telephone")}
                                    />

                                    <FormInput
                                        label="Adresse"
                                        type="text"
                                        placeholder="Adresse Rue"
                                        icon={<MapPin size={16} />}
                                        value={form.adresse}
                                        onChange={handleChange("adresse")}
                                    />

                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <FormInput type="text" placeholder="Ville" value={form.ville} onChange={handleChange("ville")} />
                                        </div>
                                        <div className="w-36">
                                            <FormInput type="text" placeholder="Code postal" value={form.codePostal} onChange={handleChange("codePostal")} />
                                        </div>
                                        <div className="flex-1">
                                            <FormInput type="text" placeholder="Pays" value={form.pays} onChange={handleChange("pays")} />
                                        </div>
                                    </div>
                                </div>

                    
                                <div className="flex flex-col items-center gap-4 w-72 shrink-0">
                                    <div className="bg-white border border-grey/20 rounded-xl p-6 flex flex-col items-center gap-4 w-full">
                                        <p className="secondaryTitleText text-black text-center">Identité Visuelle</p>
                                        <div className="w-48 h-48 flex items-center justify-center bg-bg rounded-xl overflow-hidden">
                                            {logoPreview ? (
                                                <img src={logoPreview} alt="logo" className="w-full h-full object-contain" />
                                                ) : (
                                                <Image size={64} className="text-grey" />
                                            )}
                                        </div>

                                        <label className="cursor-pointer">
                                            <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                                            <div className="buttonText h-12 px-6 bg-color-button text-white rounded-xl hover:bg-button-hover transition-all flex items-center gap-2">
                                                <Pencil size={16} />
                                                Modifier le logo
                                            </div>
                                        </label>
                                    </div>
                                </div>

                            </div>

                            {error && <p className="normalText text-red-500">{error}</p>}
                            {success && <p className="normalText text-green-600">Profil mis à jour !</p>}

                            <div className="flex justify-end gap-3 mt-2">
                                
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="buttonText h-12 px-8 bg-color-button text-white rounded-xl hover:bg-button-hover transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    <Pencil size={16} />
                                    {loading ? "Enregistrement..." : "Modifier les informations"}
                                </button>
                            </div>
                    
                        </form>
            
                    </div>
                </section>
            </main>

            <Footer />

        </div>
    );
};

export default ProfilEntreprise;
