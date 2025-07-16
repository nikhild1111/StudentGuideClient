
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search, Filter, RefreshCcw } from "lucide-react";
import { fetchAllGuideApplicants } from "../services/operations/guideAPI";
import Pagination from '../components/Guide/Pagination';
import SearchBar from '../components/Guide/SearchBar';
import FilterPanel from '../components/Guide/FilterPanel';
import GuideCard from '../components/Guide/GuideCard';
import CTAButton from "../components/core/HomePage/Button";

import HeroSection from "../components/Commonhooks/HeroSection";


const GuidePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({ // Default to showing guides
    department: '',
    year: '',
    gender: ''
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [guidesPerPage] = useState(6); // Increased from 12 to 16

  const { guides, loading } = useSelector((state) => state.guide);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log("Guides from Redux:", guides);
  }, [guides]);

  useEffect(() => {
    const payload = { ...filters };
    if (searchTerm) payload.search = searchTerm;
    dispatch(fetchAllGuideApplicants(payload));
  }, [filters, searchTerm, dispatch]);



  const handleSearch = () => {
    const payload = { ...filters };
    if (searchTerm) payload.search = searchTerm;
    dispatch(fetchAllGuideApplicants(payload));
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleResetFilters = () => {
    setFilters({
      department: '',
      year: '',
      gender: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * guidesPerPage;
  const currentGuides = guides.slice(startIndex, startIndex + guidesPerPage);
  const totalPages = Math.ceil(guides.length / guidesPerPage);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <HeroSection
          title="Find Your Perfect"
          highlight="Guide"
          subtitle="Connect with experienced seniors and guides for your academic journey"
          buttonText="Become a Guide"
          linkIfToken="/guideapplication"
          linkIfNotToken="/login"
        />





        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto mb-4 px-4 flex-col gap-6">
         
            
              {/* <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}  /> */}
           
           <div className="max-w-4xl mx-auto mb-4 px-4">
  <div className="relative flex items-center w-full">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    
    <input
      type="text"
      placeholder="Search by name, email, city, department..."
      value={searchTerm}
      onChange={(e) => setQuery(e.target.value )}
      className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 outline-none"
    />

    <button
      onClick={handleSearch}
      className="ml-4 bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-md font-semibold"
    >
      Search
    </button>
  </div>
</div>

           




            <div className="flex flex-row justify-center items-center gap-4 mb-8 max-w-4xl mx-auto">

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
              <button
                onClick={handleResetFilters}
                className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition-color"
              >
                <RefreshCcw className="w-5 h-5" />
                Refresh
              </button>




            </div>

            <FilterPanel filters={filters} onFiltersChange={setFilters} showFilters={showFilters} onReset={handleResetFilters} />
          

        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
              <p className="text-gray-400 text-lg">Loading guides...</p>
            </div>
          </div>
        ) : currentGuides.length > 0 ? (
          <>
            {/* Responsive Grid - Optimized for compact cards */}

            <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-900">
              {currentGuides.map((guide) => (
                <GuideCard key={guide._id} guide={guide} />
              ))}
            </div>


            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No guides found matching your criteria</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidePage;