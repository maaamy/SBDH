import Banner from "../components/layout/Banner";
import EnterpriseNavigation from "../components/layout/EnterpriseNavigation";
import EnterpriseProfileMenu from "../components/layout/EnterpriseProfileMenu";
import Footer from "../components/layout/Footer";
import SectionCard from "../components/ui/SectionCard";
import { useSelector } from "react-redux";
import { selectEnterprise } from "../store/slices/enterpriseSlice";
import { BarChart2 } from "lucide-react";
import DashboardSection from "../components/ui/DashboardSection";

const DashboardEntreprise = () => {
    const { profile } = useSelector(selectEnterprise);

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

                        <div className="flex gap-4 flex-wrap items-start">

                            <SectionCard title="Pilotage Business" className="flex-1 min-w-72">
                                <div className="flex flex-col gap-5">
                                    <DashboardSection
                                        label="Chiffre d'affaire"
                                        stat={"Chiffre d'affaire Moyen : 2875€\nChiffre d'affaire Max : 3654€\nChiffre d'affaire Min : 865€"}
                                    />
                                    <DashboardSection
                                        label="Volume de ventes"
                                        description={"Un ralentissement de la demande est observé.\n\nLe volume de ventes affiche une variation de +X % en comparaison Mois N vs Mois N-1."}
                                    />
                                    <DashboardSection
                                        label="Ventes par période, produit et catégorie"
                                        description={"Les ventes augmentent progressivement au fil des mois.\n\nCertains produits se vendent mieux que d'autres.\n\nCertaines catégories génèrent plus de ventes que les autres."}
                                    />
                                </div>
                            </SectionCard>

                            <SectionCard title="KPI et Tableaux de bord" className="flex-1 min-w-72">
                                <div className="flex-1 flex items-center justify-center py-10">
                                    <div className="flex flex-col items-center gap-2 text-grey">
                                        <p className="normalText text-center">Intégration Power BI</p>
                                    </div>
                                </div>
                            </SectionCard>

                        </div>

                        <div className="flex gap-4 flex-wrap items-start">

                            <SectionCard title="Prévision & aide à la décision" className="flex-1 min-w-72">
                                <div className="flex gap-5 items-start flex-wrap">
                                    <div className="bg-beige border border-black/10 rounded-xl w-52 h-52 flex items-center justify-center shrink-0">
                                        <div className="flex flex-col items-center gap-1 text-grey">
                                            <p className="normalText text-center">Graphique Power BI</p>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-3 min-w-40">
                                        <p className="normalText text-color-button font-bold">Prévision</p>
                                        <ul className="list-disc list-inside flex flex-col gap-1">
                                            <li className="normalText text-product">Les ventes devraient augmenter le mois prochain.</li>
                                            <li className="normalText text-product">Une légère croissance est attendue.</li>
                                        </ul>
                                        <p className="normalText text-color-button font-bold">Aide à la décision</p>
                                        <ul className="list-disc list-inside flex flex-col gap-1">
                                            <li className="normalText text-product">Augmentez le stock des produits les plus vendus.</li>
                                            <li className="normalText text-product">Lancez une promotion pour booster les ventes.</li>
                                        </ul>
                                    </div>
                                </div>
                            </SectionCard>

                            <SectionCard title="Analyse Client" className="flex-1 min-w-72">
                                <div className="flex flex-col gap-3">
                                    {[
                                        "Les clients achètent principalement en soirée.",
                                        "La majorité des achats est réalisée via mobile.",
                                        "Les promotions influencent fortement les décisions d'achat.",
                                        "Certains produits sont consultés plus souvent que d'autres.",
                                        "Les clients fidèles commandent régulièrement.",
                                        "Une partie des clients abandonne son panier avant paiement.",
                                    ].map((insight, i) => (
                                        <p key={i} className="normalText text-product">{insight}</p>
                                    ))}
                                </div>
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