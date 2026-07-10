import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/layout/Banner";
import CustomerNavigation from "../components/layout/CustomerNavigation";
import CustomerProfileMenu from "../components/layout/CustomerProfileMenu";
import Footer from "../components/layout/Footer";
import { selectCustomer, setNotifCount } from "../store/slices/customerSlice";
import * as customerService from "../services/customerService";
import { Bell } from "lucide-react";

const TYPE_COLORS = {
    "COMMANDE": "text-color-button",
    "STATUT": "text-blue-500",
    "STOCK": "text-yellow-600",
};

const NotificationsClient = () => {
    const dispatch = useDispatch();
    const { profil, notifCount } = useSelector(selectCustomer);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (profil?.id) {
            customerService.fetchNotifications(profil.id)
                .then(setNotifications)
                .finally(() => setIsLoading(false));
        }
    }, [profil]);

    const handleRead = async (notificationId) => {
        await customerService.markNotificationAsRead(notificationId);
        setNotifications((prev) =>
            prev.map((n) => n.id === notificationId ? { ...n, lu: true } : n)
        );
        dispatch(setNotifCount(Math.max(0, notifCount - 1)));
    };

    if (isLoading) return <div>Chargement...</div>;

    return (
        <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">
            <Banner />
            <CustomerNavigation customer={{ nom: profil.nom }} />

            <main className="flex items-start gap-0 p-4 w-full flex-1">
                <CustomerProfileMenu customer={{ nom: profil.nom, prenom: profil.prenom, email: profil.email }} />

                <section className="flex-1 flex flex-col gap-3 px-6 overflow-hidden min-w-0">
                    <div className="py-2">
                        <h1 className="titleText text-color-button">Mes notifications</h1>
                    </div>

                    <div className="bg-white/25 rounded-3xl p-6 flex flex-col gap-3">
                        {notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-4">
                                <Bell size={80} className="text-grey" strokeWidth={1} />
                                <p className="secondaryTitleText text-grey">Aucune notification</p>
                            </div>
                        ) : (
                            notifications.map((n) => (
                                <div
                                    key={n.id}
                                    onClick={() => !n.lu && handleRead(n.id)}
                                    className={`flex flex-col gap-1 p-4 rounded-2xl transition-all
                                        ${n.lu ? "bg-bg opacity-60 cursor-default" : "bg-white shadow-sm hover:shadow-md cursor-pointer"}
                                    `}
                                >
                                    <div className="flex items-center justify-between">
                                        <p className={`secondaryTitleText ${TYPE_COLORS[n.type] ?? "text-black"}`}>
                                            {n.titre}
                                        </p>
                                        <p className="normalText text-grey">
                                            {new Date(n.created_at).toLocaleDateString("fr-FR", {
                                                day: "numeric", month: "long", year: "numeric"
                                            })}
                                        </p>
                                    </div>
                                    <p className="normalText text-black">{n.message}</p>
                                    {!n.lu && (
                                        <span className="normalText text-red-500 font-bold">• Non lu</span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default NotificationsClient;