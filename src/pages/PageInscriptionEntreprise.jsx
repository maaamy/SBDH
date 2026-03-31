import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, PenLine, Building2, Home } from "lucide-react";
import Footer from "../components/layout/Footer";
import FormInput from "../components/ui/FormInput";
import { inscriptionEntreprise } from "../store/slices/authSlice";
import { validationInscriptionEntrepriseForm } from "../utils/validation";

const PageInscriptionEntreprise = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorForm, setErrorForm] = useState(null);
  const { error } = useSelector((state) => state.auth);


  const [form, setForm] = useState({
    nomEntreprise: "",
    siret: "",
    adresse1: "",
    adresse2: "",
    ville: "",
    codePostal: "",
    pays: "",
    email: "",
    mdp: "",
    confirm: "",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async(e) => {
    e.preventDefault();

    const errorMsg = validationInscriptionEntrepriseForm(form);
      if (errorMsg) {
        setErrorForm(errorMsg); 
        return;
      }
      else {
        setErrorForm(null);
      }
      const result = await dispatch(inscriptionEntreprise(form));
      if (inscriptionEntreprise.fulfilled.match(result)) {
        navigate("/"); 
      }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">

      <div className="w-full h-16 flex items-center px-6">

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-black hover:opacity-80 transition-opacity"
        >
          <Home size={60} />
          <span className="titleText text-black">Accueil</span>
        </button>

      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 bg-connexionBgImg bg-cover bg-center bg-no-repeat">

        <div className="bg-button-5-hover/15 backdrop-blur-sm rounded-2xl px-10 py-8 w-full max-w-3xl flex flex-col items-center gap-5">

          <h1 className="titleText text-black">Inscription Entreprise</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

            {/* Nom entreprise + SIRET */}
            <div className="flex gap-4 w-full">

              <div className="flex-1">

                <FormInput
                  label="Nom de l'entreprise"
                  type="text"
                  placeholder="Ma Société"
                  icon={<Building2 size={16} />}
                  value={form.nomEntreprise}
                  onChange={handleChange("nomEntreprise")}
                />

              </div>

              <div className="flex-1">

                <FormInput
                  label="N° SIRET"
                  type="text"
                  placeholder="00000000000000"
                  icon={<PenLine size={16} />}
                  value={form.siret}
                  onChange={handleChange("siret")}
                />

              </div>

            </div>

            {/* Adresse ligne 1 */}
            <FormInput
              label="Adresse"
              type="text"
              placeholder="Adresse Rue"
              value={form.adresse1}
              onChange={handleChange("adresse1")}
            />

            {/* Adresse ligne 2 */}
            <FormInput
              type="text"
              placeholder="Adresse Rue Ligne 2"
              value={form.adresse2}
              onChange={handleChange("adresse2")}
            />

            {/* Ville + Code postal + Pays */}
            <div className="flex gap-3 w-full">

              <div className="flex-1">

                <FormInput
                  type="text"
                  placeholder="Ville"
                  value={form.ville}
                  onChange={handleChange("ville")}
                />

              </div>

              <div className="w-36">

                <FormInput
                  type="text"
                  placeholder="Code postal"
                  value={form.codePostal}
                  onChange={handleChange("codePostal")}
                />

              </div>

              <div className="flex-1">

                <FormInput
                  type="text"
                  placeholder="Pays"
                  value={form.pays}
                  onChange={handleChange("pays")}
                />

              </div>

            </div>

            {/* Email + Mots de passe */}
            <div className="flex gap-4 w-full items-start">

              {/* Email */}
              <div className="flex-1">

                <FormInput
                  label="Adresse e-mail"
                  type="email"
                  placeholder="exemple@gmail.com"
                  icon={<Mail size={16} />}
                  value={form.email}
                  onChange={handleChange("email")}
                />

              </div>

              {/* Mot de passe + Confirmation */}
              <div className="flex-1 flex flex-col gap-3">

                <FormInput
                  label="Mot de passe"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  icon={<Lock size={16} />}
                  rightIcon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  onRightIconClick={() => setShowPassword((v) => !v)}
                  value={form.mdp}
                  onChange={handleChange("mdp")}
                />

                <FormInput
                  label="Confirmation Mot de passe"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  icon={<Lock size={16} />}
                  rightIcon={showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  onRightIconClick={() => setShowConfirm((v) => !v)}
                  value={form.confirm}
                  onChange={handleChange("confirm")}
                />

              </div>

            </div>

            {/* Bouton S'inscrire */}
            <div className="flex justify-center mt-2">

              <button
                type="submit"
                className="buttonText h-12 px-10 bg-color-button text-white rounded-full hover:bg-color-button-hover active:scale-95 transition-all"
              >
                S'inscrire
              </button>

            </div>

          </form>

        </div>
        
        {(error || errorForm) && (
            <p className="normalText text-red-500 text-center">{errorForm || error}</p>
          )}
                
      </main>

      <Footer />

    </div>
  );
};

export default PageInscriptionEntreprise;
