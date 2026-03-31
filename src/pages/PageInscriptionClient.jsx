import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Home } from "lucide-react";
import Footer from "../components/layout/Footer";
import FormInput from "../components/ui/FormInput";
import { inscriptionClient } from "../store/slices/authSlice";
import { validateInscriptionClientForm } from "../utils/validation";

const PageInscriptionClient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorForm, setErrorForm] = useState(null);
  const { error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    jour: "",
    mois: "",
    annee: "",
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
    
    const errorMsg = validateInscriptionClientForm(form);
   
    if (errorMsg) {
      setErrorForm(errorMsg);
      return;
    }
    else {
      setErrorForm(null);
    }
    const result = await dispatch(inscriptionClient(form));
    if (inscriptionClient.fulfilled.match(result)) {
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

          <h1 className="titleText text-black">Inscription Client</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

            {/* Nom + Prénom */}
            <div className="flex gap-4 w-full">

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

            {/* Date de naissance */}
            <div className="flex flex-col gap-1">

              <label className="secondaryTitleText text-black">Date de naissance</label>

              <div className="flex gap-3">

                <input
                  type="number"
                  min={1}
                  max={31}
                  maxLength={2}
                  placeholder="JJ"
                  value={form.jour}
                  onChange={handleChange("jour")}
                  className="w-20 h-11 bg-white rounded-full border-2 border-black px-4 normalText text-black placeholder:text-grey focus:outline-none focus:ring-2 focus:ring-color-button text-center"
                />

                <input
                  type="number"
                  min={1}
                  max={12}
                  maxLength={2}
                  placeholder="MM"
                  value={form.mois}
                  onChange={handleChange("mois")}
                  className="w-24 h-11 bg-white rounded-full border-2 border-black px-4 normalText text-black placeholder:text-grey focus:outline-none focus:ring-2 focus:ring-color-button text-center"
                />

                <input
                  type="number"
                  maxLength={4}
                  min={1950}
                  placeholder="AAAA"
                  value={form.annee}
                  onChange={handleChange("annee")}
                  className="w-28 h-11 bg-white rounded-full border-2 border-black px-4 normalText text-black placeholder:text-grey focus:outline-none focus:ring-2 focus:ring-color-button text-center"
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

            {/* Bouton s'inscrire */}
            <div className="flex justify-center mt-2">

              <button
                type="submit"
                className="buttonText h-12 px-10 bg-color-button text-white rounded-full hover:bg-color-button-hover active:scale-95 transition-all"
              >
                S'inscrire
              </button>

            </div>

          </form>

          {(error || errorForm) && (
            <p className="normalText text-red-500 text-center">{errorForm || error}</p>
          )}

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default PageInscriptionClient;
