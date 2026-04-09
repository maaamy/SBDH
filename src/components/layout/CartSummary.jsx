import { Info } from "lucide-react";
const CartSummary = ({ total }) => {
  const delivery = 10.99;
  const finalTotal = total + delivery;

  return (
    <div className="bg-white rounded-2xl w-80 flex flex-col gap-2 p-6 h-fit min-w-0">

      <h2 className=" text-color-button text-center font-bold ">
        RECAPITULATIF DE LA COMMANDE
      </h2>

      <div className="flex mt-2 justify-between font-bold">
        <span>SOUS-TOTAL</span>
        <span className="text-color-button">{total.toFixed(2)} €</span>
      </div>

      <div className="flex mt-2 justify-between font-bold">
        <span>LIVRAISON</span>
        <span className="text-color-button">{delivery.toFixed(2)} €</span>
      </div>

      <div className="flex mt-2 justify-between font-bold">
        <span>TOTAL</span>
        <span className="text-color-button">{finalTotal.toFixed(2)} €</span>
      </div>

      {/* Code promo */}
      <div className="flex items-center border border-black h-14 px-2 mt-4">
  
        <input
          type="text"
          placeholder="Code promo"
          className="flex-1 h-full px-4 italic text-sm outline-none bg-transparent"
        />

        <button className="h-[80%] px-3 bg-button text-white font-bold rounded-2xl -ml-10 bg-button-hover transition-colors">
          Appliquer
        </button>

      </div>

      <div className="flex items-center mt-7 gap-2 w-full ">
        <p className="secondaryTitle text-black font-bold"> Adresse de livraison</p>
        <Info  size={20} />
      </div>

      <button className="bg-button text-white mt-4 py-3 rounded-lg font-bold bg-color-button  hover:bg-button-hover transition">
        Passer au Paiement
      </button>

    </div>
  );
};

export default CartSummary;