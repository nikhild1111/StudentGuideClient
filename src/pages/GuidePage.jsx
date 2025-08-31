

// // keep this as it is 
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Search, Filter, RefreshCcw } from "lucide-react";
// import { fetchAllGuideApplicants } from "../services/operations/guideAPI";
// import Pagination from '../components/Guide/Pagination';
// import SearchBar from '../components/Guide/SearchBar';
// import FilterPanel from '../components/Guide/FilterPanel';
// import GuideCard from '../components/Guide/GuideCard';
// import CTAButton from "../components/core/HomePage/Button";
// import Footer from "../components/Common/Footer";
// import HeroSection from "../components/Common/HeroSection";


// const GuidePage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [filters, setFilters] = useState({ // Default to showing guides
//     department: '',
//     year: '',
//     gender: ''
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [guidesPerPage] = useState(6); // Increased from 12 to 16

//   const { guides, loading } = useSelector((state) => state.guide);
//   const token = useSelector((state) => state.auth.token);

//   useEffect(() => {
//     console.log("Guides from Redux:", guides);
//   }, [guides]);

//   useEffect(() => {
//     const payload = { ...filters };
//     if (searchTerm) payload.search = searchTerm;
//     dispatch(fetchAllGuideApplicants(payload));
//   }, [filters, searchTerm, dispatch]);



//   const handleSearch = () => {
//     const payload = { ...filters };
//     if (searchTerm) payload.search = searchTerm;
//     dispatch(fetchAllGuideApplicants(payload));
//   };
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleResetFilters = () => {
//     setFilters({
//       department: '',
//       year: '',
//       gender: ''
//     });
//     setSearchTerm('');
//     setCurrentPage(1);
//   };

//   const startIndex = (currentPage - 1) * guidesPerPage;
//   const currentGuides = guides.slice(startIndex, startIndex + guidesPerPage);
//   const totalPages = Math.ceil(guides.length / guidesPerPage);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <div className="container mx-auto px-4 py-6">
//         <HeroSection
//           title="Find Your Perfect"
//           highlight="Guide"
//           subtitle="Connect with experienced seniors and guides for your academic journey"
//           buttonText="Become a Guide"
//           linkIfToken="/guideapplication"
//           linkIfNotToken="/login"
//         />


//         {/* Search and Filter Section */}
//         <div className="max-w-7xl mx-auto mb-4 px-4 flex-col gap-6">
         
            
//               {/* <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}  /> */}
           
//            <div className="max-w-4xl mx-auto mb-4 px-4">
//   <div className="relative flex items-center w-full">
//     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    
//     <input
//       type="text"
//       placeholder="Search by name, email, city, department..."
//       value={searchTerm}
//       onChange={(e) => setQuery(e.target.value )}
//       className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 outline-none"
//     />

//     <button
//       onClick={handleSearch}
//       className="ml-4 bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-md font-semibold"
//     >
//       Search
//     </button>
//   </div>
// </div>

           




//             <div className="flex flex-row justify-center items-center gap-4 mb-8 max-w-4xl mx-auto">

//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition-colors"
//               >
//                 <Filter className="w-5 h-5" />
//                 Filters
//               </button>
//               <button
//                 onClick={handleResetFilters}
//                 className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition-color"
//               >
//                 <RefreshCcw className="w-5 h-5" />
//                 Refresh
//               </button>




//             </div>

//             <FilterPanel filters={filters} onFiltersChange={setFilters} showFilters={showFilters} onReset={handleResetFilters} />
          

//         </div>

//         {/* Content Section */}
//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
//               <p className="text-gray-400 text-lg">Loading guides...</p>
//             </div>
//           </div>
//         ) : currentGuides.length > 0 ? (
//           <>
//             {/* Responsive Grid
//             - Optimized for compact cards */}
//            { console.log(currentGuides)}

//             <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-900">
//               {currentGuides.map((guide) => (
//                 <GuideCard key={guide._id} guide={guide} />
//               ))}
//             </div>


//             {/* Pagination */}
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           </>
//         ) : (
//           <div className="text-center py-12">
//             <div className="text-gray-400">
//               <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
//               <p className="text-lg mb-2">No guides found matching your criteria</p>
//               <p className="text-sm">Try adjusting your search or filters</p>
//             </div>
//           </div>
//         )}
//       </div>

//        <Footer/>
//     </div>
//   );
// };

// export default GuidePage;





import React, { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllGuideApplicants } from "../services/operations/guideAPI";
import Pagination from "../components/Guide/Pagination";
import GuideCard from "../components/Guide/GuideCard";
import Footer from "../components/Common/Footer";
import SearchAndFilterBar from "../components/Admin/Parts/Searchfillter"; // ✅ reuse

const GuidePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Filters & Search state
  const [filters, setFilters] = useState({
    department: "",
    year: "",
    gender: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [guidesPerPage] = useState(6);

  const { guides, loading } = useSelector((state) => state.guide);

  // Fetch guides
  const loadGuides = () => {
    const payload = {
      department: filters.department || undefined,
      year: filters.year || undefined,
      gender: filters.gender || undefined,
      search: searchTerm || undefined,
    };
    dispatch(fetchAllGuideApplicants(payload));
  };

  // Initial load
  useEffect(() => {
    loadGuides();
  }, []);

  // Debounced filter/search
  useEffect(() => {
    const delay = setTimeout(() => {
      loadGuides();
      setCurrentPage(1); // reset page on filter/search change
    }, 400);
    return () => clearTimeout(delay);
  }, [filters, searchTerm]);

  // Reset filters
  const handleResetFilters = () => {
    setFilters({ department: "", year: "", gender: "" });
    setSearchTerm("");
    setCurrentPage(1);
    loadGuides();
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * guidesPerPage;
  const currentGuides = guides.slice(startIndex, startIndex + guidesPerPage);
  const totalPages = Math.ceil(guides.length / guidesPerPage);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* HEADER (same as BooksPage) */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-col justify-center items-start sm:items-center gap-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Find Your Best <span className="text-yellow-400">Guide</span>
              </h1>
              <p className="text-gray-400 mt-1">
                Explore Guides, filter by department or year, and connect with the right mentor
              </p>
            </div>

            <button
              onClick={() => {
                if (token) {
                  navigate("/guideapplication");
                } else {
                  navigate("/login");
                }
              }}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-lg text-black font-medium transition hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Become a Guide
            </button>
          </div>

          {/* Guides count + divider */}
          <div>
            <h2 className="text-lg font-semibold">
              Guides <span className="text-yellow-400">({guides?.length || 0})</span>
            </h2>
            <div className="border-b border-gray-700 mt-2"></div>
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <SearchAndFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          handleResetFilters={handleResetFilters}
          filterKeys={["department", "year", "gender"]}
          options={{
            department: ["CSE", "IT", "ECE", "EEE", "MECH"],
            year: ["1", "2", "3", "4"],
            gender: ["Male", "Female"],
          }}
          debounceDelay={400}
        />

        {/* GUIDES LIST */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading guides...</div>
        ) : currentGuides.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
              {currentGuides.map((guide) => (
                <GuideCard key={guide._id} guide={guide} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">No guides found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default GuidePage;
