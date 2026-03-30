import { useNavigate } from "react-router-dom";
import { ShoppingCart, User, Home } from "lucide-react";

const NavigationClient = ({ cartCount = 0 }) => {
  const navigate = useNavigate();

  const NAV_ITEMS = [
    { label: "", path: "/", icon: <Home size={28} /> },
    { label: "Catégories", path: "/catalogue" },
    { label: "Offres", path: "/offres" },
  ];

  return (
    <nav className="w-full h-16 rounded-full flex bg-menu-gradient items-center px-12 gap-6">

      {/* Logo */}
      <div className="flex-1 text-center text-white titleText">
        Logo
      </div>

      {/* Menu */}
      {NAV_ITEMS.map((item) => (
        <button
          key={item.label}
          onClick={() => navigate(item.path)}
          className="flex-1 text-center text-white titleText flex items-center justify-center gap-1"
        >
          {item.icon}
          {item.label}
        </button>
      ))}

      {/* Panier */}
      <button
        onClick={() => navigate("/panier")}
        className="flex-1 text-center flex justify-center relative"
      >
        <div className="relative"> 
          <ShoppingCart size={28} className="text-white" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-color-button font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </button>

      {/* Profil */}
      <button
        onClick={() => navigate("/profil")}
        className="flex-1 flex items-center justify-center gap-2 text-white titleText"
      >
          <User size={28} />
          <span>Nom_Client</span>
      </button>

    </nav>
  );
};

export default NavigationClient;