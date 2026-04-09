import { useState } from "react";

const CartPayment = () => {
  const [method, setMethod] = useState("Paypal");
  return (
    <div className="bg-white rounded-2xl overflow-hidden w-80">

      <div className="bg-color-button text-white text-center py-3 rounded-t-2xl font-bold cursor-pointer">
        Mode de paiement
      </div>

      <div className="p-4 flex font-bold flex-col gap-3 text-sm">

        {["Paypal","ApplePay", "Mastercard", "VISA", "GooglePay"].map((m) => (
          <div key={m} className="flex flex-col gap-2">

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={method === m}
                onChange={() => setMethod(m)}
                className="accent-color-button"
              />
              {m}
            </label>

            {method === m && (
              <div className="flex flex-col gap-3 ml-5">

                {/* Numéro de carte */}
                <div className="flex flex-col">
                  <label className="text-xs text-black mb-1">
                    Numéro de carte
                  </label>
                  <input
                    placeholder="1234 5678 9012 3456"
                    className="border border-black font-light text-xs px-1 py-1 rounded outline-none "
                  />
                </div>

                {/* Nom */}
                <div className="flex flex-col">
                  <label className="text-xs text-black mb-1">
                    Nom du propriétaire
                  </label>
                  <input
                    placeholder="Jean Dupont"
                    className="border border-black font-light text-xs px-1 py-1 rounded outline-none "
                  />
                </div>

                {/* Date + CVV */}
                <div className="flex gap-2">

                  <div className="flex flex-col w-1/2">
                    <label className="text-xs text-black mb-1">
                      Date d'expiration
                    </label>
                    <input
                      placeholder="MM/AA"
                      className="border border-black font-light text-xs px-1 py-1 rounded outline-none "
                    />
                  </div>

                  <div className="flex flex-col w-1/2">
                    <label className="text-xs text-black mb-1">
                      CVV / CVC
                    </label>
                    <input
                      placeholder="XXXX"
                      className="border border-black font-light text-xs px-1 py-1 rounded outline-none "
                    />
                  </div>

                </div>

              </div>
            )}

          </div>
        ))}

      </div>
       <p className="text-xs text-black mt-4 font-semibold px-4 mb-4">
       En passant cette commande, vous acceptez les Conditions générales, la Répartition des obligations et la Politique de confidentialité.
      </p> 
      
      <button className="w-full bg-color-button font-bold text-white py-3 rounded-b-2xl hover:bg-button-hover transition">
        Payer
      </button>

    </div>
  );
};

export default CartPayment;