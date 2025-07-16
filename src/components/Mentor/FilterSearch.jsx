import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Search, Filter, XCircle } from "lucide-react";
import { searchMentors } from "../../services/operations/mentorAPI";

const FilterSearch = () => {
  const dispatch = useDispatch();

  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    department: "",
    company: "",
    domain: "",
    year: "",
  });

  // 🔍 Trigger search
  const handleSearch = () => {
    const query = { name: search, ...filters };
    dispatch(searchMentors(query));
  };

  // 🧹 Clear all filters
  const handleClear = () => {
    setSearch("");
    setFilters({
      department: "",
      company: "",
      domain: "",
      year: "",
    });
    dispatch(searchMentors({})); // Fetch all mentors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full flex flex-col gap-2 md:flex-row items-center justify-between p-4 bg-[#0F111A] rounded-xl shadow-lg">
      {/* Search Bar */}
      <div className="flex-1 w-full flex items-center gap-2 bg-gray-700 rounded-lg px-4 py-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search guides by name, email, city, department..."
          className="bg-transparent text-white w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-1 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
      >
        <Filter className="w-4 h-4" />
        Filters
      </button>

      {/* Filters */}
      {showFilters && (
        <div className="w-full mt-3 grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-800 p-4 rounded-lg">
          {/* Department */}
          <select
            name="department"
            value={filters.department}
            onChange={handleChange}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            <option value="">Department</option>
            <option value="IT">IT</option>
            <option value="Computer">Computer</option>
            <option value="Mechanical">Mechanical</option>
          </select>

          {/* Company */}
          <select
            name="company"
            value={filters.company}
            onChange={handleChange}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            <option value="">Company</option>
            <option value="TCS">TCS</option>
            <option value="Google">Google</option>
            <option value="Infosys">Infosys</option>
          </select>

          {/* Domain */}
          <select
            name="domain"
            value={filters.domain}
            onChange={handleChange}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            <option value="">Domain</option>
            <option value="Web Dev">Web Dev</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Cloud">Cloud</option>
          </select>

          {/* Year */}
          <select
            name="year"
            value={filters.year}
            onChange={handleChange}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            <option value="">Passout Year</option>
            {[2025, 2024, 2023, 2022].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Buttons */}
          <div className="col-span-full flex gap-3 justify-end">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <button
              onClick={handleSearch}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded-lg"
            >
              Search
            </button>
            <button
              onClick={handleClear}
              className="bg-red-500 hover:bg-red-400 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-1"
            >
              <XCircle className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSearch;
