import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Mail } from "lucide-react";
import Footer from "../components/layout/Footer";
import FormInput from "../components/ui/FormInput";

const ReinitialisationEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email de réinitialisation envoyé à :", email);
    navigate("/reinitialisation/mot-de-passe");
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

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 bg-connexionBgImg  bg-cover bg-center bg-no-repeat">

        <div className="bg-button-5-hover/15 backdrop-blur-sm rounded-2xl px-12 py-10 w-full max-w-lg flex flex-col items-center gap-6">

          <div className="text-center">
            <h1 className="titleText text-black">Réinitialisation du mot de passe</h1>
            <p className="normalText text-black mt-2">
              Veuillez saisir votre adresse e-mail pour réinitialiser vote mot de passe.
            </p>
            <p className="normalText text-black mt-2">
              Un e-mail vous sera envoyer avec les instructions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">

            <FormInput
              label="Adresse e-mail"
              type="email"
              placeholder="exemple@gmail.com"
              icon={<Mail size={16} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex justify-center mt-2">
              <button
                type="submit"
                className="buttonText h-12 px-8 bg-color-button text-white rounded-full hover:bg-color-button-hover active:scale-95 transition-all"
              >
                Envoyer le lien de réinitialisation
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

export default ReinitialisationEmail;
