import Banner from "../components/layout/Banner";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { Home, ShoppingBag, BarChart2, Bell, Star } from "lucide-react";

const NAV_LIST = [
    { label: "Accueil", path: "/", icon: <Home size={28} /> },
    { label: "A propos", path: "/apropos" },
    { label: "S'inscrire", path: "/inscription" },
    { label: "Se connecter", path: "/connexion" },
];

const FEATURES = [
    {
        icon: <ShoppingBag size={40} className="text-color-button" />,
        titre: "Catalogue intelligent",
        description: "Parcourez des milliers de produits avec des filtres avancés par catégorie, prix et disponibilité."
    },
    {
        icon: <BarChart2 size={40} className="text-color-button" />,
        titre: "Tableau de bord client",
        description: "Suivez vos commandes, vos dépenses, vos tendances d'achat et recevez des recommandations personnalisées."
    },
    {
        icon: <BarChart2 size={40} className="text-color-button" />,
        titre: "Tableau de bord entreprise",
        description: "Pilotez votre activité avec des KPI en temps réel, des prévisions de ventes et une analyse de vos clients."
    },
    {
        icon: <Bell size={40} className="text-color-button" />,
        titre: "Notifications en temps réel",
        description: "Soyez alerté à chaque étape de vos commandes : confirmation, expédition, livraison."
    },
    {
        icon: <Star size={40} className="text-color-button" />,
        titre: "Avis clients",
        description: "Partagez votre expérience et consultez les avis d'autres acheteurs pour faire les meilleurs choix."
    },
];

const APropos = () => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">
            <Banner />
            <Navigation navList={NAV_LIST} />

            <main className="flex-1 p-8 flex flex-col gap-10 max-w-5xl mx-auto w-full">

                <div className="flex flex-col gap-4 text-center">
                    <h1 className="titleText text-color-button">À propos de nous</h1>
                    <p className="secondaryTitleText text-black">
                        Une plateforme e-commerce intelligente pensée pour les clients et les entreprises.
                    </p>
                </div>

                <div className="bg-white/80 rounded-3xl p-8 flex flex-col gap-4">
                    <h2 className="secondaryTitleText text-color-button">Notre mission</h2>
                    <p className="normalText text-black">
                        Nous croyons que le commerce en ligne peut être plus intelligent. Notre plateforme connecte les clients et les entreprises 
                        à travers une expérience d'achat fluide, enrichie par des données et des analyses avancées. 
                        Grâce à l'intégration de modules Big Data et de Machine Learning, nous permettons aux entreprises de mieux 
                        comprendre leurs clients et aux clients de découvrir les produits qui leur correspondent vraiment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {FEATURES.map((f, i) => (
                        <div key={i} className="bg-white/80 rounded-3xl p-6 flex flex-col gap-3">
                            {f.icon}
                            <p className="secondaryTitleText text-black">{f.titre}</p>
                            <p className="normalText text-black">{f.description}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white/80 rounded-3xl p-8 flex flex-col gap-4">
                    <h2 className="secondaryTitleText text-color-button">Notre technologie</h2>
                    <p className="normalText text-black">
                        Notre plateforme repose sur un pipeline de données entre Supabase et Databricks, 
                        permettant une ingestion, un nettoyage et une analyse des données en temps réel. 
                        Les tableaux de bord sont alimentés par Power BI et les modules de Machine Learning 
                        permettront bientôt des prévisions financières et des recommandations ultra-personnalisées.
                    </p>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default APropos;