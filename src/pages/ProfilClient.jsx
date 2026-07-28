import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";
import Banner from "../components/layout/Banner";
import CustomerNavigation from "../components/layout/CustomerNavigation";
import CustomerProfileMenu from "../components/layout/CustomerProfileMenu";
import Footer from "../components/layout/Footer";
import FormInput from "../components/ui/FormInput";
import { selectCustomer, updateCustomerProfile } from "../store/slices/customerSlice";

const ProfilClient = () => {
    const dispatch = useDispatch();

    const {profil} = useSelector(selectCustomer);

    const [adresseFacturation, setAdresseFacturation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [isChanged, setIsChanged] = useState(false);

    const [form, setForm] = useState(null);
  
    useEffect(() => {
        if (profil) {
            const dtn = profil.dateNaissance?.split("-") || ["", "", ""];
            setForm({
                id: profil.id,
                nom: profil.nom || "",
                prenom: profil.prenom || "",
                email: profil.email || "",
                telephone: profil.telephone || "",
                jour: dtn[2] || "",
                mois: dtn[1] || "",
                annee: dtn[0] || "",
                adresse: profil.adresse || "",
                adresse2: profil.adresse2 || "",
                ville: profil.ville || "",
                codePostal: profil.codePostal || "",
                pays: profil.pays || "",
            });
        }
    }, [profil]);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        setIsChanged(true);
    }
       
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            if(isChanged){
                await dispatch(updateCustomerProfile(form));  
            }
        
        setSuccess(true);
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

        <CustomerNavigation customer={{ nom: profil.nom }}/>

        <main className="flex items-start gap-0 p-4 w-full flex-1">

            <CustomerProfileMenu customer={{ nom: profil.nom, prenom: profil?.prenom, email: profil.email}}/>

            <section className="flex-1 flex flex-col gap-4 px-6 overflow-hidden min-w-0">

                <h1 className="titleText text-color-button">Mon profil</h1>

                <div className="bg-white rounded-3xl p-8 flex flex-col gap-6 w-full">

                    <h2 className="titleText text-black">Informations Personnelles</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <FormInput
                                    label="Nom"
                                    type="text"
                                    placeholder="Dupont"
                                    value={form.nom}
                                    onChange={handleChange("nom")}
                                />
                            </div>
                            <div className="flex-1">
                            <FormInput
                                label="Prénom"
                                type="text"
                                placeholder="Jean"
                                value={form.prenom}
                                onChange={handleChange("prenom")}
                            />
                            </div>
                        </div>

                
                        <div className="flex gap-4 items-start">
                            <div className="flex-1 cursor-not-allowed pointer-events-none">
                                <FormInput
                                    label="Adresse e-mail"
                                    type="email"
                                    placeholder="exemple@gmail.com"
                                    icon={<Mail size={16} />}
                                    value={form.email}
                                    disabled
                                    readOnly

                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <label className="secondaryTitleText text-black">Date de naissance</label>
                                <div className="flex gap-3">
                                    <input
                                    type="number" min={1} max={31} placeholder="JJ"
                                    value={form.jour} onChange={handleChange("jour")}
                                    className="w-20 h-14 bg-white rounded-full border-2 border-black px-4 normalText text-black placeholder:text-grey focus:outline-none focus:ring-2 focus:ring-color-button text-center"
                                    />
                                    <input
                                    type="number" min={1} max={12} placeholder="MM"
                                    value={form.mois} onChange={handleChange("mois")}
                                    className="w-20 h-14 bg-white rounded-full border-2 border-black px-4 normalText text-black placeholder:text-grey focus:outline-none focus:ring-2 focus:ring-color-button text-center"
                                    />
                                    <input
                                    type="number" min={1900} placeholder="AAAA"
                                    value={form.annee} onChange={handleChange("annee")}
                                    className="w-28 h-14 bg-white rounded-full border-2 border-black px-4 normalText text-black placeholder:text-grey focus:outline-none focus:ring-2 focus:ring-color-button text-center"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <FormInput
                                    label="Téléphone"
                                    type="tel"
                                    placeholder="+ 00 0 00 00 00 00"
                                    icon={<Phone size={16} />}
                                    value={form.telephone}
                                    onChange={handleChange("telephone")}
                                />
                            </div>
                        </div>

                
                        <h2 className="titleText text-black pt-2">Adresse de livraison</h2>

                        <FormInput
                            label="Adresse"
                            type="text"
                            placeholder="Adresse Rue"
                            value={form.adresse}
                            onChange={handleChange("adresse")}
                        />

                        <FormInput
                            type="text"
                            placeholder="Adresse Rue Ligne 2"
                            value={form.adresse2}
                            onChange={handleChange("adresse2")}
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

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                            type="checkbox"
                            checked={adresseFacturation}
                            onChange={() => setAdresseFacturation((v) => !v)}
                            className="w-4 h-4 border border-black bg-white appearance-none checked:bg-button cursor-pointer"
                            />
                            
                            <span className="normalText text-black">
                            Définir comme adresse de facturation par défaut
                            </span>
                        </label>

                        {error && <p className="normalText text-red-500">{error}</p>}
                        {success && <p className="normalText text-green-600">Profil mis à jour avec succès !</p>}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="buttonText h-12 px-10 bg-color-button text-white rounded-full hover:bg-button-hover active:scale-95 transition-all disabled:opacity-50"
                            >
                                {loading ? "Enregistrement..." : "Modifier"}
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

export default ProfilClient;
