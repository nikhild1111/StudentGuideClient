import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  RefreshCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const SearchAndFilterBar = ({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  showFilters,
  setShowFilters,
  handleResetFilters,
  filterKeys,
  options,
  debounceDelay = 500, // default 500ms
}) => {
  const [localSearch, setLocalSearch] = useState(searchTerm || "");

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(localSearch);
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [localSearch, setSearchTerm, debounceDelay]);

  const k=filterKeys.length;
  const colClass = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
}[k] || "sm:grid-cols-3"; // default fallback

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      {/* Search + Filter Buttons */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
        </div>

        {/* Filter & Reset Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              showFilters
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
            {showFilters ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={handleResetFilters}
            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg font-medium transition-all duration-200"
          >
            <RefreshCcw className="w-5 h-5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Collapsible Filter Panel */}
      {showFilters && (
         <div className={`mt-4 grid grid-cols-1 ${colClass} gap-4`}>
          {filterKeys.map((key) => (
            <select
              key={key}
              value={filters[key] || ""}
              onChange={(e) =>
                setFilters({ ...filters, [key]: e.target.value })
              }
              className="bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">
                All {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
              {options[key]?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilterBar;
