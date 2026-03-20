import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, PenLine, Home } from "lucide-react";
import Footer from "../components/layout/Footer";
import FormInput from "../components/ui/FormInput";

const DEFAULT_FORM_STATE = { email: "", password: "", siret: "" };

const OAUTH_PROVIDERS = [
  { id: "google", label: "Google", icon: "https://www.google.com/favicon.ico" },
  { id: "facebook", label: "Facebook", icon: "https://www.facebook.com/favicon.ico" },
];

const PageConnexionEntreprise = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(DEFAULT_FORM_STATE);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (field) => (event) =>
    setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Connexion entreprise :", form, { rememberMe });
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

        <div className="relative z-10 bg-button-5-hover/15 backdrop-blur-sm rounded-2xl px-10 py-8 w-full max-w-xl flex flex-col items-center gap-5">

          <h1 className="titleText text-black">Connexion Entreprise</h1>

          <p className="normalText text-black font-bold">
            Bienvenue ! Connectez-vous pour accéder à votre compte
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

            <FormInput
              label="Adresse e-mail"
              type="email"
              placeholder="exemple@gmail.com"
              icon={<Mail size={16} />}
              value={form.email}
              onChange={handleChange("email")}
            />

            <FormInput
              label="N° Siret"
              type="text"
              placeholder="00000000000000000000"
              icon={<PenLine size={16} />}
              value={form.siret}
              onChange={handleChange("siret")}
            />
            
            <FormInput
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              icon={<Lock size={16} />}
              rightIcon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              onRightIconClick={() => setShowPassword((v) => !v)}
              value={form.password}
              onChange={handleChange("password")}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe((previous) => !previous)}
                  className="w-4 h-4 border border-black bg-white appearance-none checked:bg-color-button cursor-pointer"
                />
                <span className="normalText font-bold text-black">Se souvenir de moi</span>
              </label>
              <button
                type="button"
                onClick={() => navigate("/reinitialisation/email")}
                className="normalText font-bold text-black hover:underline"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="buttonText w-48 h-11 bg-color-button text-white rounded-full hover:bg-button-hover active:scale-95 transition-all"
              >
                Se connecter →
              </button>
            </div>

          </form>

          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-black/40" />
            <span className="normalText text-black">Continuer avec</span>
            <div className="flex-1 h-px bg-black/40" />
          </div>

          <div className="flex gap-3 w-full">
            {OAUTH_PROVIDERS.map((provider) => (
              <button
                key={provider.id}
                type="button"
                className="flex-1 h-11 flex items-center justify-center gap-2 bg-white border border-light rounded-full hover:bg-gray-50 transition-colors normalText font-bold text-black"
              >
                <img src={provider.icon} alt={provider.label} className="w-4 h-4" />
                Continuer avec {provider.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/inscription/entreprise")}
              className="buttonText w-48 h-11 bg-color-button text-white rounded-full hover:bg-button-hover active:scale-95 transition-all"
            >
              S'inscrire
            </button>
            <p className="normalText text-black">Pas encore de compte ?</p>
          </div>

        </div>
      </main>

      <Footer />

    </div>
  );
};

export default PageConnexionEntreprise;