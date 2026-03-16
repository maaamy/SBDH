import { useState } from "react";
import { ChevronRight } from "lucide-react";

const  FilterSection = ({ title, children, defaultOpen = false }) => {

  const [open, setOpen] = useState(defaultOpen);
  
  return (

    <div className="border-b border-white pb-3">

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="secondaryTitleText text-black">
          {title}
        </span>
      
        <ChevronRight
          className={`text-button transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          size={20}
        />

      </button>

      {open && <div className="mt-2 flex flex-col gap-1">{children}</div>}
      
    </div>
  );
}

export default FilterSection;
