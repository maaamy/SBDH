import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, onUpdate, onRemove }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-3 bg-[#E8DFDF] rounded-2xl p-4">

      <img
        src={item.image}
        alt={item.nom}
        className="w-24 h-24 object-contain rounded-xl flex-shrink-0"
      />

      <div className="bg-white/40 w-full lg:flex-1 min-w-0 rounded-3xl py-2 px-3">
        <p className="text-product productTitle text-center lg:text-left truncate">{item.nom}</p>
        <p className="normalText font-bold text-color-button text-center lg:text-left truncate">Nom de l'entreprise</p>
        <p className="text-black mt-1 font-bold text-button text-center lg:text-left">
          {item.prix.toFixed(2)} €
        </p>
      </div>

      <div className="flex flex-row lg:flex-col items-center gap-4 lg:gap-3 flex-shrink-0">
        <div className="flex items-center gap-2 border border-[#D19000] font-bold rounded-full px-2 py-1">
          <button onClick={() => onUpdate(item.id, item.quantite - 1)}>
            <Minus size={14} />
          </button>
          <span className="w-6 text-center">{item.quantite}</span>
          <button onClick={() => onUpdate(item.id, item.quantite + 1)}>
            <Plus size={14} />
          </button>
        </div>
        <button 
          onClick={() => onRemove(item.id)} 
          className="text-color-button hover:text-red-500">
          <Trash2 size={18} />
        </button>
      </div>

</div>
  );
};

export default CartItem;