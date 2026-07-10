import { useState, useEffect } from "react";
import CustomerNavigation from "../components/layout/CustomerNavigation";
import CustomerProfileMenu from "../components/layout/CustomerProfileMenu";
import Footer from "../components/layout/Footer";
import Banner from "../components/layout/Banner";
import OrderSummary from "../components/products/OrderSummary";

import { PackageOpen } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCustomer } from "../store/slices/customerSlice";
import * as customerService from "../services/customerService";

const HistoriqueCommandes = () => {
  const {profil} = useSelector(selectCustomer);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (profil?.clientId) {
      customerService.fetchOrders(profil.clientId)
          .then(setOrders)
          .finally(() => setIsLoading(false));
    }
  }, [profil]);

  const handleCancel = async (orderId) => {
    if (!confirm("Annuler cette commande ?")) return;
    try {
      const updated = await customerService.cancelOrder(orderId);
      setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, statut: updated.statut } : o));
    } catch (err) {
      console.error("Error cancelling order", err);
    }
  };

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">

        <Banner />

        <CustomerNavigation customer={{ nom: profil.nom}}/>

        <main className="flex items-start gap-0 p-4 w-full flex-1">

            <CustomerProfileMenu customer={{ nom: profil.nom, prenom: profil.prenom, email: profil.email}}/>

            <section className="flex-1 flex flex-col gap-5 px-6 overflow-hidden min-w-0">

                <h1 className="titleText text-color-button">Mes commandes</h1>

                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <PackageOpen className="text-button-hover" size={80}/>
                        <p className="secondaryTitleText text-grey">Aucune commande pour le moment</p>
                    </div>

                ) : (
                    <div className="flex flex-col gap-5 w-full">
                        {orders.map((order) => (
                            <OrderSummary
                                key={order.id}
                                order={order}
                                onCancel={order.statut === "EN_ATTENTE" ? () => handleCancel(order.id) : null}
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
