import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import Footer from "../components/layout/Footer";
import RoleCard from "../components/ui/RoleCard";

const PageInscription = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover">

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

        <div className="bg-button-5-hover/15 backdrop-blur-sm rounded-2xl px-24 py-16 flex flex-col items-center gap-8">

          <div className="text-center">

            <h1 className="titleText text-black mb-2">Inscription</h1>
            <p className="normalText text-black font-bold">
              Bienvenue ! Inscrivez-vous pour accéder à votre compte
            </p>

          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">

            <RoleCard
              title="En tant que client"
              primaryLabel="S'inscrire"
              primaryAction={() => navigate("/inscription/client")}
              secondaryLabel="Se connecter"
              secondaryAction={() => navigate("/connexion/client")}
              linkLabel="Déjà un compte ?"
              linkAction={() => navigate("/connexion/client")}
            />

            <RoleCard
              title="En tant qu'entreprise"
              primaryLabel="S'inscrire"
              primaryAction={() => navigate("/inscription/entreprise")}
              secondaryLabel="Se connecter"
              secondaryAction={() => navigate("/connexion/entreprise")}
              linkLabel="Déjà un compte ?"
              linkAction={() => navigate("/connexion/entreprise")}
            />

          </div>

        </div>
        
      </main>

      <Footer />

    </div>
  );
};

export default PageInscription;
