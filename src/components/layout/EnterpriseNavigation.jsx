import { useNavigate } from "react-router-dom";
import { Home, User } from "lucide-react";
import Navigation from "./Navigation";

const EnterpriseNavigation = ({ enterprise }) => {
  const navigate = useNavigate();

  const ENTERPRISE_NAV_ITEMS = [
    { label: "Accueil", path: "/", icon: <Home size={20} /> },
    { label: "Boutique", path: "/boutique" },
    { label: "Catalogue", path: "/catalogue-entreprise" },
  ];

  return (
    <Navigation navList={ENTERPRISE_NAV_ITEMS} >
        <button
            onClick={() => navigate("/profil")}
            className="flex-1 flex items-center justify-center gap-2 text-white titleText"
        >
          <User size={28} />
          <span>{enterprise.nom}</span>
        </button>

    </Navigation>
  );
};

export default EnterpriseNavigation;
