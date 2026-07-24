import Banner from "../components/layout/Banner";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { Home, Mail, Phone, MapPin } from "lucide-react";

const NAV_LIST = [
    { label: "Accueil", path: "/", icon: <Home size={28} /> },
    { label: "A propos", path: "/apropos" },
    { label: "S'inscrire", path: "/inscription" },
    { label: "Se connecter", path: "/connexion" },
];

const Contact = () => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">
            <Banner />
            <Navigation navList={NAV_LIST} />

            <main className="flex-1 p-8 flex flex-col gap-8 max-w-4xl mx-auto w-full">

                <h1 className="titleText text-color-button text-center">Contactez-nous</h1>

                <div className="bg-white/80 rounded-3xl p-8 flex flex-col gap-6">

                    <h2 className="secondaryTitleText text-color-button">Nos coordonnées</h2>

                    <div className="flex items-center gap-3">
                        <Mail size={20} className="text-color-button shrink-0" />
                        <p className="normalText text-black">contact@ecommerce.com</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Phone size={20} className="text-color-button shrink-0" />
                        <p className="normalText text-black">+33 1 23 45 67 89</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <MapPin size={20} className="text-color-button shrink-0" />
                        <p className="normalText text-black">123 Rue du Commerce, 75001 Paris</p>
                    </div>

                    <div className="flex flex-col gap-1 mt-2">
                        <p className="normalText font-bold text-black">Horaires d'ouverture</p>
                        <p className="normalText text-black">Lundi - Vendredi : 9h - 18h</p>
                        <p className="normalText text-black">Samedi : 10h - 15h</p>
                    </div>

                </div>

            </main>

            <Footer />
        </div>
    );
};

export default Contact;