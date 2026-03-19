import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, PenLine } from "lucide-react";
import BackCon from "../assets/BackCon.png";
import Footer from "../components/layout/Footer";
import FormInput from "../components/ui/FormInput";

const DEFAULT_FORM_STATE = { email: "", password: "", siret: "" };

const OAUTH_PROVIDERS = [
  {
    id: "google",
    label: "Google",
    icon: "https://www.google.com/favicon.ico",
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: "https://www.facebook.com/favicon.ico",
  },
];

const ConnexionEntreprise = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(DEFAULT_FORM_STATE);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (field) => (event) =>
    setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: relier à l'API d'authentification
    console.log("Connexion entreprise :", form, { rememberMe });
  };

  const formFields = [
    {
      label: "Adresse e-mail",
      type: "email",
      placeholder: "exemple@gmail.com",
      icon: <Mail size={16} />,
      value: form.email,
      onChange: handleChange("email"),
    },
    {
      label: "N° Siret",
      type: "text",
      placeholder: "00000000000000000000",
      icon: <PenLine size={16} />,
      value: form.siret,
      onChange: handleChange("siret"),
    },
    {
      label: "Mot de passe",
      type: showPassword ? "text" : "password",
      placeholder: "Entrez votre mot de passe",
      icon: <Lock size={16} />,
      rightIcon: showPassword ? <EyeOff size={16} /> : <Eye size={16} />,
      onRightIconClick: () => setShowPassword((previous) => !previous),
      value: form.password,
      onChange: handleChange("password"),
    },
  ];

  return (
    
    <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">
    
      <button
        className="fixed top-4 left-4 text-white font-bold buttonText px-4 py-2 flex items-center gap-2 transition-all"
      >
  
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24" text-secondaryTitle>
          <path d="M3 12l9-9 9 9h-3v9h-12v-9h-3z" />
        </svg>
        Accueil
      </button>
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        {/* IMAGE */}
        <div
        className="absolute inset-0 bg-center bg-no-repeat bg-[length:70%]"
        style={{ backgroundImage: `url(${BackCon})` }}
        ></div>

        {/* CONTENU */}
        <div className="relative z-10">
        {/* ton contenu ici */}
        </div>

        <section className="bg/40 backdrop-blur-sm bg-button-5-hover/15 shadow p-14 w-full max-w-xl flex flex-col gap-6">
          <header className="text-center">
            <h1 className="titleText text-black">Connexion Entreprise</h1>
            <p className="normalText text-black font-bold mt-1">
              Bienvenue ! Connectez-vous pour accéder à votre compte
            </p>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {formFields.map((field) => (
              <FormInput key={field.label} {...field} />
            ))}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe((previous) => !previous)}
                  className="w-4 h-4 border border-black bg-white appearance-none checked:bg-button cursor-pointer"
                />
                <span className="normalText font-bold text-black">Se souvenir de moi</span>
              </label>
              <button
                type="button"
                onClick={() => navigate("/reinitialisation")}
                className="normalText font-bold hover:underline text-white"
              >
                Mot de passe oublié ?
              </button>
            </div>
            <div className="text-center flex flex-col items-center gap-2">
            <button
              type="submit"
              className="buttonText w-48 h-11 bg-button text-white rounded-full hover:bg-button-hover active:scale-95 transition-all"
            >
              Se connecter →
            </button>
            </div>
          </form>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-black/40" />
            <span className="normalText text-black">Continuer avec</span>
            <div className="flex-1 h-px bg-black/40" />
          </div>

          <div className="flex gap-3">
            {OAUTH_PROVIDERS.map((provider) => (
              <button
                key={provider.id}
                type="button"
                className="flex-1 h-11 flex items-center font-bold justify-center gap-2 bg-white border border-light rounded-full hover:bg-gray-50 transition-colors normalText text-black"
              >
                <img
                  src={provider.icon}
                  alt={provider.label}
                  className="w-4 h-4"
                />
                Continuer avec {provider.label}
              </button>
            ))}
          </div>

          <div className="text-center flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/inscription/client")}
              className="buttonText w-48 h-11 bg-button text-white rounded-full hover:bg-button-hover active:scale-95 transition-all"
            >
              S'inscrire
            </button>
            <p className="normalText text-black">
              Pas encore de compte ?
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ConnexionEntreprise;
