import React from 'react';

const FilterPanel = ({ filters, onFiltersChange, showFilters }) => {
  if (!showFilters) return null;

  // Define only the required filter keys
  const filterKeys = ['department', 'year', 'gender'];

  // Define options for each filter
  const options = {
    department: ['IT', 'CE', 'ME', 'EE', 'EC'],
    year: ['1', '2', '3', '4'],
    gender: ['Male', 'Female', 'Other'],
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterKeys.map((key) => (
          <div key={key}>
            <label className="block text-gray-300 text-sm mb-2 capitalize">
              {key}
            </label>
            <select
              value={filters[key] || ''}
              onChange={(e) =>
                onFiltersChange({ ...filters, [key]: e.target.value })
              }
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">
                All {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
              {options[key].map((opt) => (
                <option key={opt} value={opt}>
                  {key === 'year' ? `${opt} Year` : opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
