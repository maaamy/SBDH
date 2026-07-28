import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Casque from "../../assets/Casque.jpg";

const ProductCard = ({product, purchase=true}) => {
  const navigate = useNavigate();
  const image = product.Image_produit?.[0]?.url ?? Casque;
  const prixMin = product.Variante_produit?.length
    ? Math.min(...product.Variante_produit.map((v) => v.prix))
    : 0;

  return (
    <div className="bg-bg flex flex-col items-center gap-3 w-56 shrink-0 py-2 px-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/produit/${product.id}`)}
    >
      <div className="w-32 h-32 relative">
        <img src={image} alt={product.nom} className="w-full h-full object-cover" />
      </div>

      <p className="productTitle text-product text-center">
        {product.nom}
      </p>

      <div className="flex flex-row items-center gap-2 w-full justify-center">
        <span className="productTitle text-color-button">À partir de {prixMin.toFixed(2)} €</span>
        <Info size={20} />
      </div>

      { purchase && (
        <button
          className="buttonText w-full h-10 bg-color-button text-white hover:bg-button-hover active:scale-95 transition-all"
          onClick={(e) => { e.stopPropagation(); navigate(`/produit/${product.id}`); }}
        >
          Ajouter au panier
        </button>
      )}
    </div>
  );
};

export default ProductCard;