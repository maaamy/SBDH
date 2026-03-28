import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CatProducts = ({ produit, onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-bg flex flex-col items-center gap-3 w-56 h-72 shrink-0 py-2 px-4 hover:shadow-md transition-shadow">
      
      <div className="w-32 h-32 relative">
        <img src={produit.image} alt={produit.nom} className="w-full h-full object-cover" />
      </div>

      <p className="productTitle text-product text-center">
        {produit.nom}
      </p>


      <div className="relative w-full flex justify-center">
        <span className="productTitle text-color-button">{produit.prix} €</span>
        <Info size={20} className="text-[#5C4033] absolute right-4 cursor-pointer"/>

      </div>

      <button className="buttonText w-full h-10 bg-color-button text-white hover:bg-product-hover active:scale-95 transition-all">
        Ajouter au panier
      </button>

    </div>
  );
};

export default CatProducts;