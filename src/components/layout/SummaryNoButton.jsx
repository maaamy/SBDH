import { Info } from "lucide-react";
const SummaryNoButton = ({ total }) => {
  const livraison = 10.99;
  const totalFinal = total + livraison;

  return (
    <div className="bg-white rounded-2xl w-80 flex flex-col gap-2 p-6 h-fit">

      <h2 className=" text-color-button text-center font-bold ">
        RECAPITULATIF DE LA COMMANDE
      </h2>

      <div className="flex mt-2 justify-between font-bold">
        <span>SOUS-TOTAL</span>
        <span className="text-color-button">{total.toFixed(2)} €</span>
      </div>

      <div className="flex mt-2 justify-between font-bold">
        <span>LIVRAISON</span>
        <span className="text-color-button">{livraison.toFixed(2)} €</span>
      </div>

      <div className="flex mt-2 justify-between font-bold">
        <span>TOTAL</span>
        <span className="text-color-button">{totalFinal.toFixed(2)} €</span>
      </div>
      {/* Code promo */}
      <div className="flex items-center border border-black h-14 px-2 mt-4">
  
        <input
          type="text"
          placeholder="Code promo"
          className="flex-1 h-full px-4 italic text-sm outline-none bg-transparent"
        />

        <button className="h-[80%] px-6 bg-button text-white font-bold rounded-2xl -ml-10 bg-color-button hover:bg-button-hover transition-colors">
          Appliquer
        </button>

      </div>

      <div className="flex items-center mt-7 gap-2 w-full ">
        <p className="secondaryTitle text-black font-bold"> Adresse de livraison</p>
        <Info  size={20} />
      </div>

    </div>
  );
};

export default SummaryNoButton;