import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ()  => {

  const [query, setQuery] = useState("");

  return (

    <div className="relative max-w-96 shrink-0">

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher"
        className="w-full h-14 bg-light pl-3 pr-10 secondaryText placeholder:text-grey focus:outline-none"
      />

     <Search
        className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
        size={20}
      />
      
    </div>
  );
}

export default SearchBar;