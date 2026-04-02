import { useNavigate } from "react-router-dom";
import { ShoppingCart, User, Home } from "lucide-react";
import Navigation from "./Navigation";

const CUSTOMER_NAV_LIST = [
  { label: "Accueil", path: "/", icon: <Home size={28} /> },
  { label: "Catégories", path: "#" },
  { label: "Offres", path: "#" },
];

const CustomerNavigation = ({ cartCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <Navigation navList={CUSTOMER_NAV_LIST} >
    
      <button
        onClick={() => navigate("/panier")}
        className="flex-1 text-center flex justify-center relative"
      >
        <ShoppingCart size={28} className="text-white" />
         <span className="top-0 right-6 bg-white text-button rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
      </button>

      
      <button
        onClick={() => navigate("/profil")}
        className="flex-1 flex items-center justify-center gap-2 text-white titleText"
      >
          <User size={28} />
          <span>Nom_Client</span>
      </button>

    </Navigation>
  );
};

export default CustomerNavigation;