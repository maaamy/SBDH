import { useState } from "react";
import { ChevronDown } from "lucide-react";

const SelectInput = ({ label, options = [], value, onChange, disabled=false, placeholder = "Sélectionner..." }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const handleSelect = (option) => {
        onChange(option);
        setOpen(false);
        setSearch("");
    };

    const filteredOptions = options.filter((o) =>
        o.nom.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-1 w-full">

            {label && (
                <label className="secondaryTitleText text-button">{label}</label>
            )}

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    disabled={disabled}
                    className="w-full h-16 bg-white border rounded-2xl px-5 flex items-center justify-between secondaryText text-black focus:outline-none focus:border-color-button disabled:bg-gray-200"
                >

                    <span className={value ? "text-black not-italic" : "text-grey italic"}>
                        {value?.nom || placeholder}
                    </span>

                    <ChevronDown
                        size={20}
                        className={`text-grey transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}
                    />

                </button>

                {open && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-color-button rounded-2xl shadow-lg z-50 overflow-hidden flex flex-col">
                    
                        <div className="px-3 py-2 border-b border-beige">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher..."
                                className="w-full px-3 py-2 rounded-xl border border-beige normalText text-black focus:outline-none focus:border-color-button"
                                autoFocus
                            />
                        </div>

                        <ul className="max-h-48 overflow-y-auto">
                            {filteredOptions.length === 0 ? (
                                <li className="px-5 py-3 normalText text-grey">Aucun résultat</li>
                            ) : (
                                filteredOptions.map((option) => (
                                    <li
                                        key={option.id}
                                        onClick={() => handleSelect(option)}
                                        className={`px-5 py-3 secondaryText cursor-pointer hover:bg-bg transition-colors
                                            ${value === option ? "bg-bg text-button font-bold" : "text-black"}`}
                                    >
                                        {option.nom}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}
            </div>

        </div>
    );
};

export default SelectInput;