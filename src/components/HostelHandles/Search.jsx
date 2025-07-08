import React from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';

const SearchFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  genderFilter, 
  setGenderFilter, 
  showFilters, 
  setShowFilters,
  onSearch,
  onReset,
  loading,
  totalResults 
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="bg-gray-900 p-4 md:p-6 border-b border-gray-800">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Find Your Perfect <span className="text-yellow-400">Hostel</span>
        </h1>
        
        {/* Search and Filter */}
        <div className="flex flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search hostels by name or location..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>
        
        {/* Gender Filter */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-lg font-medium mb-3">Filter by Gender</h3>
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'All' },
                { value: 'boys', label: 'Boys Only' },
                { value: 'girls', label: 'Girls Only' }
              ].map(filter => (
                <button
                  key={filter.value}
                  onClick={() => setGenderFilter(filter.value)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    genderFilter === filter.value
                      ? 'bg-yellow-400 text-gray-900'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
              
              <button
                onClick={onReset}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                Reset 
              </button>
            </div>
          </div>
        )}
        
        {/* Results count */}
        <div className="mt-4 text-sm text-gray-400">
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Searching...</span>
            </div>
          ) : (
            <span>Showing {totalResults} hostels</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;