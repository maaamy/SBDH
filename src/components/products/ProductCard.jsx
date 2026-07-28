import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Casque from "../../assets/Casque.jpg";

const ProductCard = ({product}) => {
  const navigate = useNavigate();
  const image = product.Image_produit?.[0]?.url ?? product.image ?? Casque;
  const prixMin = product.Variante_produit?.filter((v) => v.prix != null).length
    ? Math.min(...product.Variante_produit.filter((v) => v.prix != null).map((v) => v.prix))
    : parseFloat(product.prix_min ?? product.prix_moyen ?? product.prix ?? 0);

  const productId = product.id ?? product.produit_id;

  return (
    <div className="bg-bg flex flex-col items-center gap-3 w-56 shrink-0 py-3 px-4 hover:shadow-md transition-shadow cursor-pointer rounded-2xl"
      onClick={() => navigate(`/produit/${productId}`)}
    >
      <div className="w-32 h-32 shrink-0">
        <img src={image} alt={product.nom || product.produit} className="w-full h-full object-cover rounded-xl" />
      </div>

      <div className="flex flex-col items-center gap-1 w-full">
        <p className="productTitle text-product text-center leading-tight"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.9rem",
            maxHeight: "2.9rem",
          }}
        >
          {product.nom || product.produit}
        </p>
        {product.marque && (
          <p
            className="normalText text-grey text-center w-full"
            style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
          >
            {product.marque}
          </p>
        )}
      </div>

      <div className="flex flex-row items-center gap-2 w-full justify-center">
        <span className="productTitle text-color-button">Dès {prixMin.toFixed(2)} €</span>
        <Info size={20} />
      </div>
    </div>
  );
};

export default ProductCard;