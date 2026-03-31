import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connexionClient } from "../store/slices/authSlice";
import { Mail, Lock, Eye, EyeOff, Home } from "lucide-react";
import Footer from "../components/layout/Footer";
import FormInput from "../components/ui/FormInput";
import { validationConnexionCLientForm } from "../utils/validation";
import { connexionClientGoogle } from "../store/slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";

const DEFAULT_FORM_STATE = { email: "", mdp: "" };

const PageConnexionClient = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState(DEFAULT_FORM_STATE);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorForm, setErrorForm] = useState(null);
  const { error } = useSelector((state) => state.auth);


  const handleSubmit = async(event) => {
    event.preventDefault();
    const errorMsg = validationConnexionCLientForm(form);
      if (errorMsg) {
        setErrorForm(errorMsg); 
        return;
      }
      else {
        setErrorForm(null);
      }
      const result = await dispatch(connexionClient(form));
      if (connexionClient.fulfilled.match(result)) {
        navigate("/"); 
      }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const result = await dispatch(connexionClientGoogle({
      token: credentialResponse.credential,
    }));

    if (connexionClientGoogle.fulfilled.match(result)) {
      navigate("/");
    }
  }

  const handleChange = (field) => (event) =>
    setForm((previous) => ({ ...previous, [field]: event.target.value }));
  

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
          <h1 className="titleText text-black">Connexion Client</h1>

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
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              icon={<Lock size={16} />}
              rightIcon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              onRightIconClick={() => setShowPassword((v) => !v)}
              value={form.mdp}
              onChange={handleChange("mdp")}
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

            {(error || errorForm) && <p className="normalText text-red-500 text-center">{errorForm || error}</p>}

          </form>

          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-black/40" />
            <span className="normalText text-black">Continuer avec</span>
            <div className="flex-1 h-px bg-black/40" />
          </div>

          <div className="flex gap-3 w-full items-center justify-center">
            <GoogleLogin
              onSuccess= {handleGoogleLoginSuccess}
              onError = {() => setErrorForm("Erreur lors de la connexion Google.")}
              shape="pill"           
              size="large"
              width={500}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/inscription/client")}
              className="buttonText w-48 h-11 bg-color-button text-white rounded-full hover:bg-button-hover active:scale-95 transition-all"
            >
              S'inscrire
            </button>
            <p className="normalText text-black">Pas encore de compte ?</p>*
            
          </div>

        </div>
      </main>

      <Footer />

    </div>
  );
};

export default PageConnexionClient;