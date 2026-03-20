import ours from "../../assets/ours.png";
import { Info } from "lucide-react";


const ProductCard = ({ name = "Test texte d'ancrage", price = "25.99 €", image = {ours} }) => {

  return (

    <div className="bg-bg flex flex-col items-center gap-3 w-56 h-72 shrink-0 py-2 px-4 hover:shadow-md transition-shadow">

      <div className="w-32 h-32 relative">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      <p className="productTitle text-product text-center">
        {name}
      </p>

      <div className="flex items-center gap-2 w-full justify-center">
        <span className="productTitle text-color-button">{price}</span>
        <Info size={20} />
      </div>

      <button className="buttonText w-full h-10 bg-color-button text-white hover:bg-product-hover active:scale-95 transition-all">
        Ajouter au panier
      </button>
      
    </div>
  );
}

export default ProductCard;