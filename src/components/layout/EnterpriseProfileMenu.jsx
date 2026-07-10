import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { User, LayoutDashboard, UserStar, Bell, LogOut, ShoppingBag } from "lucide-react";
import { logout } from "../../store/slices/authSlice";
import { selectEnterprise } from "../../store/slices/enterpriseSlice";

const MENU_ITEMS = [
  { label: "Mon profil", path: "/profil-entreprise", icon: <User size={22} /> },
  { label: "Tableau de bord", path: "/tableau-de-bord-entreprise", icon: <LayoutDashboard size={22} /> },
  { label: "Mes commandes", path: "/commandes-entreprise", icon: <ShoppingBag size={22} /> },
  { label: "Avis clients", path: "/avis-clients", icon:<UserStar size={22} /> },
  { label: "Mes notifications", path: "/notifications-entreprise", icon: <Bell size={22} />, showCount: true },
];

const EnterpriseProfileMenu = ( { enterprise } ) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { notifCount } = useSelector(selectEnterprise);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/connexion");
  };

  return (
    <aside className="bg-sidebar w-80 shrink-0 self-stretch rounded-3xl overflow-hidden py-10 px-4 flex flex-col gap-6 opacity-90">

      <div className="bg-white rounded-3xl flex flex-col items-center gap-4 p-4">

        <div className="flex flex-col items-center gap-1 py-4">

          <div className="w-24 h-24 rounded-full bg-light flex items-center justify-center">
            <User size={48} className="text-grey" />
          </div>

          <p className="titleText text-black text-center mt-2">
            {enterprise.nom} 
          </p>

          <p className="normalText text-grey text-center">
            {enterprise.email}
          </p>

        </div>

        
        <div className="flex flex-col gap-3 w-full">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 w-full h-16 px-5 rounded-full transition-all
                ${location.pathname === item.path
                  ? "bg-color-button text-white"
                  : "bg-brown text-black hover:bg-button hover:text-white"
                }`}
            >
              <span className="shrink-0">{item.icon}</span>
              <span className="secondaryTitleText flex-1 text-left">{item.label}</span>
              {item.showCount && notifCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                  {notifCount > 99 ? "99+" : notifCount}
                </span>
              )}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full h-16 px-5 rounded-full bg-brown text-black hover:bg-red-400 hover:text-white transition-all"
          >
            <LogOut size={22} className="shrink-0" />
            <span className="secondaryTitleText">Déconnexion</span>
          </button>
        </div>

      </div>
    </aside>
  );
};

export default EnterpriseProfileMenu;
