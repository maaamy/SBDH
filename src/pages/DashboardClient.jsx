import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Info } from "lucide-react";
import CustomerNavigation from "../components/layout/CustomerNavigation";
import CustomerProfileMenu from "../components/layout/CustomerProfileMenu";
import Footer from "../components/layout/Footer";
import Banner from "../components/layout/Banner";
import BagMoney from "../assets/BagMoney.png";
import LoopStat from "../assets/LoopStat.png";
import ProductRow from "../components/products/ProductRow";
import SectionCard from "../components/ui/SectionCard";
import PromotionCard from "../components/PromotionCard";
import { selectCustomer } from "../store/slices/customerSlice";

const STATS = { commandes: 8, depenses: "1 045 €" };

const HABITUDES = [
  { texte: "Vous achetez principalement des produits de ", bold: "Mode" },
  { texte: "60 % de vos achats sont payés via ", bold: "PayPal" },
  { texte: "Votre commande la plus élevée s'élève à ", bold: "453 €" },
  { texte: "Fréquence d'achat : ", bold: "2 commandes / mois" },
];

const PROMOTIONS = [
  { remise: "-15 %", description: "sur la catégorie Mode" },
  { remise: "-100 €", description: "Dès 700 € d'achat" },
  { remise: "-15 %", description: "sur la catégorie Mode" },
  { remise: "-10 %", description: "sur votre prochain achat" },
];

const PRODUITS_TENDANCES = [
  { id: 1, nom: "Test texte d'ancrage", prix: 25.99 },
  { id: 2, nom: "Test texte d'ancrage", prix: 25.99 },
];

const PRODUITS_RECOMMANDATIONS = [
  { id: 3, nom: "Test texte d'ancrage", prix: 25.99 },
  { id: 4, nom: "Test texte d'ancrage", prix: 25.99 },
];

const DashboardClient = () => {
  const navigate = useNavigate();

  const {profil} = useSelector(selectCustomer);

  const [cart, setCart] = useState([]);
  
    const handleAddToCart = (product) => {
      setCart((prev) => {
        const existing = prev.find((p) => p.id === product.id);
  
        if (existing) {
          return prev.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          );
        }
  
        return [...prev, { ...product, quantity: 1 }];
      });
    };


  return (
    <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">
        <Banner />

        <CustomerNavigation cartCount={cart.reduce((acc, p) => acc + p.quantity, 0)} customer={{ nom: profil.nom }}/>

        <main className="flex items-start gap-0 p-4 w-full flex-1">

            <CustomerProfileMenu customer = {{nom: profil.nom, prenom: profil.prenom, email: profil.email}} />

            <section className="flex-1 flex flex-col gap-5 px-6 overflow-hidden min-w-0">

                <h1 className="titleText text-color-button">Tableau de bord</h1>

                <div className="flex gap-5 items-start w-full">

                    <div className="flex-1 flex flex-col gap-5 min-w-0">

                        <div className="flex gap-5 flex-wrap">

                            <SectionCard title="Commandes et dépenses" className="flex-1 min-w-[300px]">

                                <div className="flex items-center gap-4 mt-2">
                                    <div className="w-24 h-24 bg-button/10 rounded-full flex items-center justify-center shrink-0 text-4xl">
                                        <img src={BagMoney} alt="bag money" />
                                    </div>
                                    <div className="flex-1 grid grid-cols-2 border border-beige">
                                        <div className="flex items-center justify-center p-4 border border-beige">
                                            <span className="titleText text-black">{STATS.commandes}</span>
                                        </div>
                                        <div className="flex items-center justify-center p-4 border border-beige">
                                            <span className="titleText text-black">{STATS.depenses}</span>
                                        </div>
                                        <div className="flex items-center justify-center p-4 border border-beige">
                                            <span className="secondaryTitleText text-black text-center">Commandes</span>
                                        </div>
                                        <div className="flex items-center justify-center p-4 border border-beige">
                                            <span className="secondaryTitleText text-black text-center">Dépensés</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center mt-5">
                                    <button
                                        onClick={() => navigate("/statistiques")}
                                        className="buttonText h-14 px-8 bg-color-button text-white rounded-2xl hover:bg-button-hover transition-all"
                                    >
                                        Voir les statistiques
                                    </button>
                                </div>

                            </SectionCard>

               
                            <SectionCard title="Analyse des habitudes" className="flex-1 min-w-[300px]">

                                <div className="flex items-start gap-4 mt-2">
                                    <div className="flex-1 bg-white/20 p-3 rounded flex flex-col gap-2">
                                        {HABITUDES.map((h, i) => (
                                            <p key={i} className="normalText text-black">
                                            {h.texte}<span className="font-bold">{h.bold}</span>
                                            </p>
                                        ))}
                                    </div>
                                    <div className="w-20 h-20 shrink-0 flex items-center justify-center text-3xl">
                                        <img src={LoopStat} alt="loop stat" />
                                    </div>
                                </div>

                                <div className="flex justify-center mt-5">
                                    <button
                                        onClick={() => navigate("/statistiques")}
                                        className="buttonText h-14 px-8 bg-color-button text-white rounded-2xl hover:bg-button-hover transition-all"
                                    >
                                        Voir les statistiques
                                    </button>
                                </div>

                            </SectionCard>

                        </div>

              
                        <SectionCard title="Tendances">
                                <ProductRow title="Les produits les plus populaires" products={PRODUITS_TENDANCES} onAddToCart={handleAddToCart} withBorder={false}/>
                        </SectionCard>

                        <SectionCard title="Recommandations" >
                            <ProductRow title="Les produits que vous aimez, réunis en un seul endroit" products={PRODUITS_RECOMMANDATIONS} onAddToCart={handleAddToCart} withBorder={false} />
                        </SectionCard>

                    </div>

                    <div className="bg-bg rounded-3xl flex flex-col overflow-hidden w-56 shrink-0">
                        <div className="bg-color-button px-6 py-3 w-full text-center">
                            <span className="titleText text-white">Promotions</span>
                        </div>
                        
                        <div className="flex flex-col gap-4 p-4">
                        
                            {PROMOTIONS.map((promo, i) => (
                                <PromotionCard
                                    key={i}
                                    discount={promo.remise}
                                    description={promo.description}
                                    onUse={() => console.log("Promo utilisée :", promo.remise)}
                                />
                            ))}

                        </div>
                    </div>

                </div>
            </section>
            
        </main>

        <Footer />

    </div>
  );
};

export default DashboardClient;
