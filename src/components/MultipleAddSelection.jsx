import { useState, useEffect } from "react";
import SelectInput from "./ui/SelectInput";
import { Trash2 } from "lucide-react";

const MultipleAddSelection = ({ title, optionValues, buttonText, onSelectionChange }) => {

    const [usedValues, setUsedValues] = useState([]);
    const [availableValues, setAvailableValues] = useState([...optionValues]);

    useEffect(() => {
        onSelectionChange?.(usedValues);
    }, [usedValues]);

    const addNewSelection = () => {
        if (availableValues.length === 0) return;
        const newValue = availableValues[availableValues.length - 1];
        setAvailableValues(prev => prev.slice(0, -1));
        setUsedValues(prev => [...prev, newValue])
    };

    const updateUsedValues = (valueToChange, newValue) => {
        setUsedValues(prev => prev.map(u => u.id === valueToChange.id ? newValue : u));
        setAvailableValues(prev => [
            ...prev.filter(item => item.id !== newValue.id),
            valueToChange,
        ]);
    };

    const onDelete = (valueToDelete) => {
        setUsedValues(prev => prev.filter(u => u.id !== valueToDelete.id));
        setAvailableValues(prev => [...prev, valueToDelete]);
    }

    return (
        <div className="flex flex-col gap-2 items-start px-3 py-5 w-full">
            {title && <h2 className="titleText text-black">{title}</h2>}

            {usedValues.map((val) => (
            <div
                    key={val.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl border border-beige bg-beige/25 w-full"
                >
                    <SelectInput
                        options={availableValues}
                        value={val}
                        onChange={(e) => updateUsedValues(val, e)}
                    />

                    <button
                        onClick={() => onDelete(val)}
                        className="h-10 px-4 bg-color-button text-white rounded-xl hover:bg-red-500 active:scale-95 transition-all flex items-center"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ))}

            <div className="w-full flex justify-end">
                <button
                    type="button"
                    className="buttonText h-12 px-10 bg-brown text-white rounded-xl hover:bg-color-button-hover active:scale-95 transition-all disabled:bg-slate-300"
                    onClick={addNewSelection}
                    disabled={availableValues.length === 0}
                >
                    {buttonText}
                </button>
            </div>

        </div>
    );
};

export default MultipleAddSelection;