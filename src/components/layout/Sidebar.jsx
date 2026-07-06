import { useState } from "react";
import SearchBar from "../ui/SearchBar";
import FilterSection from "../filters/FilterSection";
import Checkbox from "../ui/Checkbox";

const Sidebar = ({ categoryList, search, onSearchChange, onFilterChange }) => {

  const [categories, setCategories] = useState(
    Object.fromEntries(
      categoryList.map((cat) => [
        cat.nom,
        {
          id: cat.id,
          checked: false,
          sousCategories: Object.fromEntries(
            cat.sousCategories.map((scat) => [
              scat.nom,
              { id: scat.id, checked: false }
            ])
          )
        }
      ])
    )
  );

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const toggleCategory = (cat) =>
    setCategories((p) => {
      const newChecked = !p[cat].checked;
      return {
        ...p,
        [cat]: {
          ...p[cat],
          checked: newChecked,
          sousCategories: Object.fromEntries(
            Object.entries(p[cat].sousCategories).map(([scatNom, scatVal]) => [
              scatNom,
              { ...scatVal, checked: newChecked }
            ])
          )
        }
      };
  });

  const toggleSubCategory = (cat, sous) => {
    setCategories((p) => {
      const newSub = {
        ...p[cat].sousCategories,
        [sous]: { ...p[cat].sousCategories[sous], checked: !p[cat].sousCategories[sous].checked }
      };
      const allChecked = Object.values(newSub).every((s) => s.checked);
      return {
        ...p,
        [cat]: {
          ...p[cat],
          checked: allChecked,
          sousCategories: newSub
        }
      };
    })};

  const handleValider = () => {
    const selectedCategoryIds = [];
        

    Object.values(categories).forEach((cat) => {
      const subChecked = Object.values(cat.sousCategories).filter((s) => s.checked).map((s) => s.id);
      if (subChecked.length > 0) {
        selectedCategoryIds.push(...subChecked);
      } else if (cat.checked) {
        selectedCategoryIds.push(cat.id);
      }
    });

    onFilterChange?.({
      categoryIds: selectedCategoryIds,
      min: min !== "" ? parseFloat(min) : null,
      max: max !== "" ? parseFloat(max) : null,
    });
  };

  const handleAnnuler = () => {
    setCategories(
      Object.fromEntries(
        Object.entries(categories).map(([k, val]) => [k, {
          ...val,
          checked: false,
          sousCategories: Object.fromEntries(
            Object.entries(val.sousCategories).map(([s, sval]) => [s, { ...sval, checked: false }])
          )
        }])
      )
    );
    setMin("");
    setMax("");
    onFilterChange?.({ categoryIds: [], min: null, max: null });
  };

  return (

    <aside
        className="bg-sidebar w-72 shrink-0 self-stretch rounded-3xl overflow-hidden py-10 px-4 flex flex-col gap-5 opacity-80"
    >
      <SearchBar value={search} onChange={onSearchChange}/>

      <div className="bg-white/50 rounded p-3 flex flex-col gap-4">

        <div className="flex items-center justify-between">
          <span className="titleText text-black ">Filtre</span>
        </div>

        <FilterSection title="Prix">

          <div className="flex gap-2 mt-1">

            <div className="flex flex-col gap-1">
              <span className="normalText text-black">Min</span>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-20 h-7 bg-white px-2 normalText border-none focus:outline-none focus:ring-1 focus:ring-color-button"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="normalText text-black">Max</span>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-20 h-7 bg-white px-2 normalText border-none focus:outline-none focus:ring-1 focus:ring-color-button"
              />
            </div>

          </div>
        </FilterSection>

        <FilterSection title="Catégories">

          {Object.entries(categories).map(([cat,val]) => (

            <div key={cat} className="titleText font-extrabold">

              <Checkbox key={cat} label={cat} checked={val.checked} onChange={() => toggleCategory(cat) } />
              
              <div key={`${cat}-sub-cat`} className="!font-normal px-7">
                {Object.entries(val.sousCategories).map(([subCat, subVal]) => (
                  <Checkbox key={subCat} label={subCat} checked={subVal.checked} onChange={() => toggleSubCategory(cat,subCat)} />
                ))}
              </div>

            </div>
          ))}

        </FilterSection>

        <div className="flex gap-2 mt-1">

          <button
            onClick={handleAnnuler}
            className="flex-1 h-10 buttonText bg-button-5 text-white hover:bg-button-5-hover transition-colors"
          >
            Annuler
          </button>

          <button
            onClick={handleValider}
            className="flex-1 h-10 buttonText bg-color-button text-white hover:bg-button-hover transition-colors"
          >
            Valider
          </button>

        </div>

      </div>
    </aside>
  );
}

export default Sidebar;