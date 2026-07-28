import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerNavigation from "../components/layout/CustomerNavigation";
import CustomerProfileMenu from "../components/layout/CustomerProfileMenu";
import Footer from "../components/layout/Footer";
import Banner from "../components/layout/Banner";
import SectionCard from "../components/ui/SectionCard";
import PromotionCard from "../components/PromotionCard";
import CustomerKPICards from "../components/dashboard/CustomerKPICards";
import CustomerHabits from "../components/dashboard/CustomerHabits";
import OrderSummaryCards from "../components/dashboard/OrderSummaryCards";
import MonthlySpendingChart from "../components/dashboard/MonthlySpendingChart";
import OrdersPieChart from "../components/dashboard/OrdersPieChart";
import TopEnterprisesChart from "../components/dashboard/TopEnterprisesChart";
import ProductRow from "../components/products/ProductRow";
import { selectCustomer } from "../store/slices/customerSlice";
import {
    selectCustomerDashboard, fetchDashboard, fetchRecommendations,
    fetchTrending, fetchHistory } from "../store/slices/customerDashboardSlice";

const DashboardClient = () => {
  const dispatch = useDispatch();

  const {profil} = useSelector(selectCustomer);

  const {
    dashboard,
    recommendations,
    trending,
    history,
    loading,
    error,
  } = useSelector(selectCustomerDashboard);

  useEffect(() => {
    if (!profil?.clientId) return;
    dispatch(fetchDashboard(profil.clientId));
    dispatch(fetchRecommendations(profil.clientId));
    dispatch(fetchTrending());
    dispatch(fetchHistory(profil.clientId));
  }, [dispatch, profil?.clientId]);

  const ordersStatusFromHistory = useMemo(() => {
    if (!history?.length) return [];
    const map = {};
    history.forEach((h) => {
      const statut = h.statut_commande;
      if (!map[statut]) map[statut] = { statut_commande: statut, nb_commandes: new Set() };
      map[statut].nb_commandes.add(h.commande_id);
    });
    return Object.values(map).map((item) => ({
      statut_commande: item.statut_commande,
      nb_commandes: item.nb_commandes.size,
    }));
  }, [history]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="titleText text-color-button">Chargement du tableau de bord...</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-300 rounded-xl p-6">
          <h2 className="secondaryTitleText text-red-700">Une erreur est survenue</h2>
          <p className="normalText text-red-500 mt-2">{JSON.stringify(error)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">
        <Banner />

        <CustomerNavigation customer={{ nom: profil?.nom }}/>

        <main className="flex items-start gap-0 p-4 w-full flex-1">

            <CustomerProfileMenu customer={{nom: profil?.nom, prenom: profil?.prenom, email: profil?.email}} />

            <section className="flex-1 flex flex-col gap-5 px-6 overflow-hidden min-w-0">

                <h1 className="titleText text-color-button">Tableau de bord</h1>

                <div className="flex gap-5 items-start w-full">

                    <div className="flex-1 flex flex-col gap-5 min-w-0">

                        <div className="flex gap-5 flex-wrap">

                            <SectionCard title="Commandes et dépenses" className="flex-1 min-w-[300px]">
                              <CustomerKPICards dashboard={dashboard} />
                              <div className="grid grid-cols-2 gap-3 mt-4">
                                <div className="bg-beige rounded-xl p-3">
                                  <p className="normalText text-button-hover">Panier moyen</p>
                                  <p className="secondaryTitleText text-color-button">{dashboard?.panier_moyen ?? 0} €</p>
                                </div>
                                <div className="bg-beige rounded-xl p-3">
                                  <p className="normalText text-button-hover">Première commande</p>
                                  <p className="secondaryTitleText text-black">
                                    {dashboard?.premiere_commande
                                    ? new Date(dashboard.premiere_commande).toLocaleDateString("fr-FR")
                                    : "-"}
                                  </p>
                                </div>
                                <div className="bg-beige rounded-xl p-3">
                                  <p className="normalText text-button-hover">Dernière commande</p>
                                  <p className="secondaryTitleText text-black">
                                    {dashboard?.derniere_commande
                                    ? new Date(dashboard.derniere_commande).toLocaleDateString("fr-FR")
                                    : "-"}
                                  </p>
                                </div>
                                <div className="bg-beige rounded-xl p-3">
                                  <p className="normalText text-button-hover">Nb entreprises</p>
                                  <p className="secondaryTitleText text-color-button">{dashboard?.nb_entreprises ?? 0}</p>
                                </div>
                              </div>
                            </SectionCard>

               
                            <SectionCard title="Analyse des habitudes" className="flex-1 min-w-[300px]">
                              <CustomerHabits dashboard={dashboard} />
                            </SectionCard>
                        </div>

                        <SectionCard title="Résumé commandes">
                          <OrderSummaryCards history={history} />
                        </SectionCard>

                        <div className="flex gap-5 flex-wrap">
                          <SectionCard title="Dépenses par mois" className="flex-1 min-w-[300px]">
                            <MonthlySpendingChart history={history} />
                          </SectionCard>
                          <SectionCard title="Statut des commandes" className="flex-1 min-w-[300px]">
                            <OrdersPieChart ordersStatus={ordersStatusFromHistory} />
                          </SectionCard>
                        </div>

                        <SectionCard title="Où vous dépensez le plus">
                          <TopEnterprisesChart history={history} />
                        </SectionCard>

                        <SectionCard title="Recommandations">
                          {!recommendations?.length ? (
                            <p className="normalText text-grey p-4">Aucune recommandation disponible.</p>
                          ) : (
                            <ProductRow
                              title=""
                              products={recommendations}
                              withBorder={false}
                              showVoirPlus={false}
                            />
                          )}
                        </SectionCard>

                        <SectionCard title="Tendances">
                          {!trending?.length ? (
                            <p className="normalText text-grey p-4">Aucune tendance disponible.</p>
                          ) : (
                            <ProductRow
                              title=""
                              products={trending}
                              withBorder={false}
                              showVoirPlus={false}

                            />
                          )}
                        </SectionCard>

                    </div>

                    <div className="bg-bg rounded-3xl flex flex-col overflow-hidden w-56 shrink-0">
                        <div className="bg-color-button px-6 py-3 text-center">
                            <span className="titleText text-white">Promotions</span>
                        </div>
                        <div className="p-4 flex flex-col gap-4">
                            <PromotionCard discount="10%" description="Réduction sur votre prochaine commande" />
                            <PromotionCard discount="15%" description="Offre fidélité" />
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
