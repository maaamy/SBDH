import { useState } from "react";
import SearchBar from "../ui/SearchBar";
import FilterSection from "../filters/FilterSection";
import Checkbox from "../ui/Checkbox";

const Sidebar = ({ companyList, categoryList}) => {

  const [entreprises, setEntreprises] = useState(
  Object.fromEntries(companyList.map((e) => [e, false]))
);

  const [categories, setCategories] = useState(
  Object.fromEntries(categoryList.map((e) => [e, false]))
);

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const toggleEntreprise = (k) => setEntreprises((p) => ({ ...p, [k]: !p[k] }));
  const toggleCategorie = (k) => setCategories((p) => ({ ...p, [k]: !p[k] }));

  return (

    <aside
        className="bg-sidebar w-72 shrink-0 self-stretch rounded-3xl overflow-hidden py-10 px-4 flex flex-col gap-5 opacity-80"
    >
      <SearchBar />

      <div className="bg-white/50 rounded p-3 flex flex-col gap-4">

        <div className="flex items-center justify-between">
          <span className="titleText text-black ">Filtre</span>
        </div>

        <FilterSection title="Entreprises">
          {Object.keys(entreprises).map((k) => (
            <Checkbox key={k} label={k} checked={entreprises[k]} onChange={() => toggleEntreprise(k)} />
          ))}
        </FilterSection>

        <FilterSection title="Prix">

          <div className="flex gap-2 mt-1">

            <div className="flex flex-col gap-1">
              <span className="normalText text-black">Min</span>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-20 h-7 bg-white px-2 normalText border-none focus:outline-none focus:ring-1 focus:ring-button"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="normalText text-black">Max</span>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-20 h-7 bg-white px-2 normalText border-none focus:outline-none focus:ring-1 focus:ring-button"
              />
            </div>

          </div>
        </FilterSection>

        <FilterSection title="Catégories">
          {Object.keys(categories).map((k) => (
            <Checkbox key={k} label={k} checked={categories[k]} onChange={() => toggleCategorie(k)} />
          ))}
        </FilterSection>

        <div className="flex gap-2 mt-1">

          <button
            onClick={() => {
              setEntreprises(Object.fromEntries(Object.keys(entreprises).map((k) => [k, false])));
              setCategories(Object.fromEntries(Object.keys(categories).map((k) => [k, false])));
              setMin(""); setMax("");
            }}
            className="flex-1 h-10 buttonText bg-button-5 text-white hover:bg-button-5-hover transition-colors"
          >
            Annuler
          </button>

          <button className="flex-1 h-10 buttonText bg-button text-white hover:bg-button-hover transition-colors">
            Valider
          </button>

        </div>

      </div>
    </aside>
  );
}

export default Sidebar;
