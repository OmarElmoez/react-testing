import { useState } from "react";

interface Props {
  onChange: (text: string) => void;
}

const SearchBox = ({ onChange }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <input
        type="search"
        placeholder="Search..."
        className="input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && searchTerm.trim() !== '') onChange(searchTerm);
        }}
      />
    </div>
  );
};

export default SearchBox;
