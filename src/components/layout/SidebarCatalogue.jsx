import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";

const FILTRES = {
  entreprises: ["NovaCart", "Lunary", "Shoporia", "Velko"],
  categories: {
    "Mode Femme": ["Vêtements", "Chaussures", "Accessoires"],
    "Mode Homme": ["Vêtements", "Chaussures", "Accessoires"],
    "Beauté": ["Maquillage", "Soins du visage", "Parfum"],
    "Lifestyle": ["Décoration", "Bien-être", "Cadeaux"],
  },
};

function CheckboxItem({ label, checked, onChange }) {
  return (
    <label  className={`flex items-center gap-2 cursor-pointer select-none px-2 py-1 rounded ${checked ? "bg-button text-white" : "text-black"} `} >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 cursor-pointer accent-[brown]"
      />
      <span className="normalText text-black">{label}</span>
    </label>
  );
}

function CategoryGroup({ title, sousCategories, state, onToggle }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-gray-200 transition"
      >
        <span className="normalText text-black font-bold">{title}</span>

        <ChevronRight
          size={18}
          className={`text-black transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>

      {open && (
        <div className="pl-8 flex flex-col gap-1 py-1">
          {sousCategories.map((sc) => (
            <CheckboxItem
              key={sc}
              label={sc}
              checked={state[sc] || false}
              onChange={() => onToggle(sc)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const SidebarCatalogue = ({ onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [entreprises, setEntreprises] = useState({});
  const [categories, setCategories] = useState({});
  const [prix, setPrix] = useState({ min: "", max: "" });

  // 🔥 états pour menus déroulants
  const [openEntreprise, setOpenEntreprise] = useState(false);
  const [openPrix, setOpenPrix] = useState(false);
  const [openCategorie, setOpenCategorie] = useState(false);

  const toggleEntreprise = (k) =>
    setEntreprises((p) => ({ ...p, [k]: !p[k] }));

  const toggleCategorie = (k) =>
    setCategories((p) => ({ ...p, [k]: !p[k] }));

  const handleReset = () => {
    setEntreprises({});
    setCategories({});
    setPrix({ min: "", max: "" });
    setSearch("");
  };

  const handleValider = () => {
    onFilterChange?.({ entreprises, categories, prix, search });
  };

  return (
    <aside className="bg-sidebar w-72 shrink-0 self-stretch rounded-3xl overflow-hidden py-10 px-4 flex flex-col gap-5 opacity-80">

      {/* Recherche */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher"
          className="w-full h-12 bg-light pl-3 pr-10 secondaryText placeholder:text-grey focus:outline-none"
        />
        <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-grey" size={18} />
      </div>

      <div className="bg-white/50 rounded p-3 flex flex-col gap-3">

        <span className="titleText text-black">Filtre</span>

        {/* 🔥 ENTREPRISES */}
        <div className="border-b border-white pb-2">
          <button
            onClick={() => setOpenEntreprise(!openEntreprise)}
            className="secondaryTitleText text-black mb-1 flex justify-between w-full"
          >
            Entreprises
            <ChevronRight className={`${openEntreprise ? "rotate-90" : ""}`} />
          </button>

          {openEntreprise && (
            <div className="flex flex-col gap-1">
              {FILTRES.entreprises.map((e) => (
                <CheckboxItem
                  key={e}
                  label={e}
                  checked={entreprises[e] || false}
                  onChange={() => toggleEntreprise(e)}
                />
              ))}
            </div>
          )}
        </div>

        {/* 🔥 PRIX */}
        <div className="border-b border-white pb-2">
          <button
            onClick={() => setOpenPrix(!openPrix)}
            className="secondaryTitleText text-black mb-1 flex justify-between w-full"
          >
            Prix
            <ChevronRight className={`${openPrix ? "rotate-90" : ""}`} />
          </button>

          {openPrix && (
            <div className="flex gap-2">
              <div className="flex flex-col gap-1">
                <span className="normalText text-black">Min</span>
                <input
                  type="number"
                  value={prix.min}
                  onChange={(e) => setPrix((p) => ({ ...p, min: e.target.value }))}
                  className="w-20 h-7 bg-white px-2 normalText"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="normalText text-black">Max</span>
                <input
                  type="number"
                  value={prix.max}
                  onChange={(e) => setPrix((p) => ({ ...p, max: e.target.value }))}
                  className="w-20 h-7 bg-white px-2 normalText"
                />
              </div>
            </div>
          )}
        </div>

        {/* 🔥 CATEGORIES */}
        <div className="border-b border-white pb-2">
          <button
            onClick={() => setOpenCategorie(!openCategorie)}
            className="secondaryTitleText text-black mb-1 flex justify-between w-full"
          >
            Catégories
            <ChevronRight className={`${openCategorie ? "rotate-90" : ""}`} />
          </button>

          {openCategorie && (
            <div className="flex flex-col gap-1">
              {Object.entries(FILTRES.categories).map(([titre, sousCategories]) => (
                <CategoryGroup
                  key={titre}
                  title={titre}
                  sousCategories={sousCategories}
                  state={categories}
                  onToggle={toggleCategorie}
                />
              ))}
            </div>
          )}
        </div>

        {/* Boutons */}
        <div className="flex gap-2 mt-1">
          <button
            onClick={handleReset}
            className="flex-1 h-10 buttonText bg-button-5 text-white"
          >
            Annuler
          </button>
          <button
            onClick={handleValider}
            className="flex-1 h-10 buttonText bg-color-button text-white"
          >
            Valider
          </button>
        </div>

      </div>
    </aside>
  );
};

export default SidebarCatalogue;