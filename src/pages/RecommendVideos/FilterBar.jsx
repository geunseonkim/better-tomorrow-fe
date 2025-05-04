import React from "react";

const FilterBar = ({ filters, selected, onChange }) => (
  <div className="flex flex-wrap gap-2 mb-6 pb-2 sm:flex-nowrap sm:overflow-x-auto sm:scrollbar-hide">
    {filters.map((name) => (
      <button
        key={name}
        className={`px-4 py-2 rounded-full text-sm font-medium border ${
          selected === name
            ? "bg-blue-500 text-white border-blue-500"
            : "border-gray-200 text-gray-700"
        }`}
        onClick={() => onChange(name)}
      >
        {name}
      </button>
    ))}
  </div>
);

export default FilterBar;
