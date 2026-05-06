import { useState } from "react";
import { Info } from "lucide-react";
import CustomerNavigation from "../components/layout/CustomerNavigation";
import CustomerProfileMenu from "../components/layout/CustomerProfileMenu";
import Footer from "../components/layout/Footer";
import Banner from "../components/layout/Banner";
import ProductCard from "../components/products/ProductCard";
import OrderSummary from "../components/products/OrderSummary";

import { PackageOpen } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCustomer } from "../store/slices/customerSlice";

const COMMANDES_MOCK = [
  {
    id: "001",
    date: "25 février 2026",
    nbArticles: 5,
    adresse: "xxxxxxxxxxxxxxxxxxxx",
    total: 150.85,
    statut: "En cours de traitement",
    livraison: "livraison prévue le 02 mars 2026",
    couleurStatut: "text-button",
    produits: [
      { id: 1, nom: "Test texte d'ancrage", prix: 25.99 },
      { id: 2, nom: "Test texte d'ancrage", prix: 25.99 },
      { id: 3, nom: "Test texte d'ancrage", prix: 25.99 },
      { id: 4, nom: "Test texte d'ancrage", prix: 25.99 },
      { id: 5, nom: "Test texte d'ancrage", prix: 25.99 },
    ],
  },
  {
    id: "002",
    date: "11 janvier 2026",
    nbArticles: 3,
    adresse: "xxxxxxxxxxxxxxxxxxxx",
    total: 58.63,
    statut: "Livré",
    livraison: "Livré le 20 janvier 2026",
    couleurStatut: "text-button",
    produits: [
      { id: 1, nom: "Test texte d'ancrage", prix: 25.99 },
      { id: 2, nom: "Test texte d'ancrage", prix: 25.99 },
    ],
  },
  {
    id: "003",
    date: "15 décembre 2025",
    nbArticles: 1,
    adresse: "xxxxxxxxxxxxxxxxxxxx",
    total: 20,
    statut: "Livré",
    livraison: "Livré le 20 décembre 2025",
    couleurStatut: "text-button",
    produits: [
      { id: 1, nom: "Test texte d'ancrage", prix: 25.99 },
    ],
  },
];

const nothing = [];

const HistoriqueCommandes = () => {
  const {profil} = useSelector(selectCustomer);
  const [commandes] = useState(COMMANDES_MOCK);

  return (
    <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">

        <Banner />

        <CustomerNavigation customer={{ nom: profil.nom}}/>

        <main className="flex items-start gap-0 p-4 w-full flex-1">

            <CustomerProfileMenu customer={{ nom: profil.nom, prenom: profil.prenom, email: profil.email}}/>

            <section className="flex-1 flex flex-col gap-5 px-6 overflow-hidden min-w-0">

                <h1 className="titleText text-color-button">Mes commandes</h1>

                {commandes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <PackageOpen className="text-button-hover" size={80}/>
                        <p className="secondaryTitleText text-grey">Aucune commande pour le moment</p>
                    </div>

                ) : (
                    <div className="flex flex-col gap-5 w-full">
                        {commandes.map((commande) => (
                            <OrderSummary
                                key={commande.id}
                                order={commande}
                            />
                        ))}
                    </div>
                )}

        </section>
      </main>

      <Footer />

    </div>
  );
};

export default HistoriqueCommandes;
