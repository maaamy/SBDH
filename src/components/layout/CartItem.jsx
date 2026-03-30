import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, onUpdate, onRemove }) => {
  return (
    <div className="flex items-center gap-4 justify-between bg-[#E8DFDF] rounded-2xl p-6">

      {/* Image */}
      <img
        src={item.image}
        alt={item.nom}
        className="w-20 h-20 object-contain rounded-xl"
      />

      {/* Infos */}
      <div className="bg-white/40 w-[80%] rounded-3xl py-1 px-4 flex items-center gap-4 opacity-80">
        <div className="flex-1 flex flex-col gap-1">
          <p className="text-product productTitle">{item.nom}</p>
          <p className="normalText font-bold text-color-button">Nom de l'entreprise</p>
          <p className="text-black mt-2 font-bold text-button">
            {item.prix.toFixed(2)} €
          </p>
        </div>
      </div>

      {/* Quantité */}
      <div className="flex flex-col justify-center h-24">

  {/* Quantité */}
        <div className="flex items-center gap-2 border border-[#D19000] font-bold rounded-full px-2 py-1 mt-7">
          <button onClick={() => onUpdate(item.id, item.quantite - 1)}>
            <Minus size={14} />
          </button>

          <span className="w-6 text-center">{item.quantite}</span>

          <button onClick={() => onUpdate(item.id, item.quantite + 1)}>
            <Plus size={14} />
          </button>
        </div>

  {/* Poubelle en bas */}
        <button
          onClick={() => onRemove(item.id)}
          className="self-end text-color-button hover:text-red-500 mt-4 "
        >
          <Trash2 size={18} />
        </button>

      </div>
      
    </div>
    
  );
};

export default CartItem;