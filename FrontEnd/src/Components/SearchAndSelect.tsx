import { useState } from "react";

type SearchSelectProps<T> = {
  placeholder: string;
  results: T[];
  loading: boolean;

  getKey: (item: T) => number | string;
  getLabel: (item: T) => string;

  onSearch: (value: string) => void;
  onSelect: (item: T) => void;
};

export default function SearchSelect<T>({
  placeholder,
  results,
  loading,
  getKey,
  getLabel,
  onSearch,
  onSelect,
}: SearchSelectProps<T>) {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  function handleSearch(value: string) {
    setSearch(value);
    setSelectedItem(null);
    onSearch(value);
  }

  function handleSelect(item: T) {
    setSelectedItem(item);
    setSearch(getLabel(item));
    onSelect(item);
  }



return (
  <div className="relative w-full max-w-md">
    <input
      type="text"
      value={search}
      placeholder={placeholder}
      onChange={(e) => handleSearch(e.target.value)}
      className="
        w-full
        rounded-lg
        border border-[#E2E0D8]
        bg-white
        px-4
        py-3
        font-['DM_Sans']
        text-sm
        text-[#003141]
        outline-none
        transition
        focus:border-[#4061f1]
        focus:ring-4
        focus:ring-[#cff4ff]/60
      "
    />

    {loading && (
      <p className="mt-2 text-sm text-[#6B6B63]">
        Searching...
      </p>
    )}

    {results.length > 0 && (
      <ul
        className="
          absolute
          left-0
          right-0
          top-full
          z-50
          mt-2
          max-h-60
          overflow-y-auto
          rounded-lg
          border
          border-[#E2E0D8]
          bg-white
          shadow-lg
        "
      >
        {results.map((item) => (
          <li
            key={getKey(item)}
            className="border-b border-[#E2E0D8] last:border-b-0"
          >
            <button
              type="button"
              onClick={() => handleSelect(item)}
              className="
                w-full
                px-4
                py-3
                text-left
                font-['DM_Sans']
                text-sm
                text-[#242424]
                transition
                hover:bg-[#cff4ff]
              "
            >
              {getLabel(item)}
            </button>
          </li>
        ))}
      </ul>
    )}

    {selectedItem && (
      <p className="mt-2 text-sm text-[#6B6B63]">
        Selected:{" "}
        <strong className="font-medium text-[#242424]">
          {getLabel(selectedItem)}
        </strong>
      </p>
    )}
  </div>
);




}


