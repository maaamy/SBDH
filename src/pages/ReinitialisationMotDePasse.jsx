import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Lock, Eye, EyeOff } from "lucide-react";
import Footer from "../components/layout/Footer";
import FormInput from "../components/ui/FormInput";

const ReinitialisationMotDePasse = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ password: "", confirm: "" });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    console.log("Nouveau mot de passe défini :", form.password);
    navigate("/connexion");
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

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 bg-hero bg-cover bg-center bg-no-repeat">

        <div className="bg-button-5-hover/15 backdrop-blur-sm rounded-2xl px-12 py-10 w-full max-w-lg flex flex-col items-center gap-6">

          <div className="text-center">
            <h1 className="titleText text-black">Réinitialisation du mot de passe</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">

            <FormInput
              label="Nouveau mot de passe"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              icon={<Lock size={16} />}
              rightIcon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              onRightIconClick={() => setShowPassword((v) => !v)}
              value={form.password}
              onChange={handleChange("password")}
            />

            <FormInput
              label="Confirmation mot de passe"
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              icon={<Lock size={16} />}
              rightIcon={showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              onRightIconClick={() => setShowConfirm((v) => !v)}
              value={form.confirm}
              onChange={handleChange("confirm")}
            />

            <div className="flex justify-center mt-2">
              <button
                type="submit"
                className="buttonText h-12 px-10 bg-color-button text-white rounded-full hover:bg-color-button-hover active:scale-95 transition-all"
              >
                Valider
              </button>
            </div>

          </form>

          <button
            onClick={() => navigate("/connexion")}
            className="normalText text-color-button hover:underline"
          >
            Retour à la connexion
          </button>

        </div>
      </main>

      <Footer />

    </div>
  );
};

export default ReinitialisationMotDePasse;
