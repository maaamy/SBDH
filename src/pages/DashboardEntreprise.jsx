import { useEffect } from "react";
import Banner from "../components/layout/Banner";
import EnterpriseNavigation from "../components/layout/EnterpriseNavigation";
import EnterpriseProfileMenu from "../components/layout/EnterpriseProfileMenu";
import Footer from "../components/layout/Footer";
import SectionCard from "../components/ui/SectionCard";
import { useDispatch, useSelector } from "react-redux";
import KPICards from "../components/dashboard/KPICards";
import SalesChart from "../components/dashboard/SalesChart";
import OrdersPieChart from "../components/dashboard/OrdersPieChart";
import TopProductsChart from "../components/dashboard/TopProductsChart";
import InventoryChart from "../components/dashboard/InventoryChart";
import FinanceChart from "../components/dashboard/FinanceChart";
import ForecastChart from "../components/dashboard/ForecastChart";
import ReviewsChart from "../components/dashboard/ReviewsChart";
import { selectEnterprise } from "../store/slices/enterpriseSlice";
import {
    fetchEnterpriseDashboard, fetchEnterpriseInventory,
    fetchEnterpriseReviews, fetchEnterpriseFinance,
    fetchTopProducts, fetchOrdersStatus,
    fetchDailySales, fetchEnterpriseForecasts,
    selectEnterpriseDashboard } from "../store/slices/enterpriseDashboardSlice";

const DashboardEntreprise = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector(selectEnterprise);

    const {
        dashboard,
        inventory,
        reviews,
        finance,
        topProducts,
        ordersStatus,
        dailySales,
        forecasts,
        loading,
        error,
    } = useSelector(selectEnterpriseDashboard);

    useEffect(() => {
        if (!profile?.id) return;
        dispatch(fetchEnterpriseDashboard(profile.id));
        dispatch(fetchEnterpriseInventory(profile.id));
        dispatch(fetchEnterpriseReviews(profile.id));
        dispatch(fetchEnterpriseFinance(profile.id));
        dispatch(fetchTopProducts(profile.id));
        dispatch(fetchOrdersStatus(profile.id));
        dispatch(fetchDailySales(profile.id));
        dispatch(fetchEnterpriseForecasts(profile.id));
    }, [dispatch, profile]);

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

    const info = Array.isArray(dashboard) ? dashboard[0] : dashboard || {};

    const cancellationRate = (() => {
        if (!ordersStatus.length) return "-";
        const total = ordersStatus.reduce((acc, item) => acc + (item.nb_commandes ?? 0), 0);
        const annulees = ordersStatus.find((item) => item.statut_commande === "ANNULEE")?.nb_commandes ?? 0;
        return total > 0 ? `${Math.round((annulees / total) * 100)} %` : "-";
    })();

    const bestMonth = finance.length > 0
        ? [...finance].sort((a, b) => (b.chiffre_affaires ?? 0) - (a.chiffre_affaires ?? 0))[0]?.mois ?? "-"
        : "-";

    return (
        <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">
            <Banner />
            <EnterpriseNavigation enterprise={{ nom: profile.nom }} />

            <main className="flex items-start gap-0 p-4 w-full flex-1">
                <EnterpriseProfileMenu enterprise={{ nom: profile.nom, email: profile.email }} />

                <section className="flex-1 flex flex-col gap-3 px-6 overflow-hidden min-w-0">

                    <div className="py-2">
                        <h1 className="titleText text-color-button">Tableau de bord</h1>
                    </div>

                    <div className="bg-white/25 rounded-3xl p-6 flex flex-col gap-4">

                        <SectionCard title="Indicateurs clés">
                            <KPICards dashboard={dashboard} reviews={reviews} inventory={inventory} />
                        </SectionCard>

                        <SectionCard title="Résumé de l'activité">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-xl p-4 shadow">
                                    <p className="normalText text-black">Première vente</p>
                                    <p className="secondaryTitleText text-color-button">
                                        {info.premiere_vente ? new Date(info.premiere_vente).toLocaleDateString("fr-FR") : "-"}
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow">
                                    <p className="normalText text-black">Dernière vente</p>
                                    <p className="secondaryTitleText text-color-button">
                                        {info.derniere_vente ? new Date(info.derniere_vente).toLocaleDateString("fr-FR") : "-"}
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow">
                                    <p className="normalText">Panier moyen</p>
                                    <p className="secondaryTitleText text-color-button">{info.panier_moyen ?? 0} €</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow">
                                    <p className="normalText">Quantité totale vendue</p>
                                    <p className="secondaryTitleText text-color-button">{info.quantite_vendue ?? 0}</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow">
                                    <p className="normalText">Meilleur mois</p>
                                    <p className="secondaryTitleText text-color-button">{bestMonth}</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow">
                                    <p className="normalText">Taux d'annulation</p>
                                    <p className={`secondaryTitleText ${parseInt(cancellationRate) > 20 ? "text-red-500" : "text-green-600"}`}>
                                        {cancellationRate}
                                    </p>
                                </div>
                            </div>
                        </SectionCard>

                        <div className="flex gap-4 flex-wrap">
                            <SectionCard title="Finance mensuelle" className="flex-1 min-w-80">
                                <FinanceChart finance={finance} />
                            </SectionCard>
                            <SectionCard title="Commandes par statut" className="flex-1 min-w-80">
                                <OrdersPieChart ordersStatus={ordersStatus} />
                            </SectionCard>
                        </div>

                        <div className="flex gap-4 flex-wrap">

                            <SectionCard title="Top produits" className="flex-1 min-w-80">
                                <TopProductsChart topProducts={topProducts} />
                            </SectionCard>
                            <SectionCard title="État du stock" className="flex-1 min-w-80">
                                <InventoryChart inventory={inventory} />
                            </SectionCard>

                        </div>

                        <div className="flex gap-4 flex-wrap">

                            <SectionCard title="Evolution de ventes" className="flex-1 min-w-80">
                                <SalesChart dailySales={dailySales} />
                            </SectionCard>

                            <SectionCard title="Avis par produit" className="flex-1 min-w-80">
                                <ReviewsChart reviews={reviews} />
                            </SectionCard>
                        </div>
                        
                        <div className="bg-white/25 rounded-3xl p-6 flex flex-col gap-4">
                            <SectionCard title="Prévisions IA">
                                <ForecastChart forecast={forecasts} />
                              </SectionCard>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default DashboardEntreprise;