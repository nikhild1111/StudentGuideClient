


// import React, { useState, useEffect } from 'react';
// import { Search, Filter, MapPin, Phone, Star, ChevronLeft, ChevronRight, Utensils, Menu } from 'lucide-react';
// import axios from 'axios';
// const FoodPage = () => {
//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedType, setSelectedType] = useState('all');
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pagination, setPagination] = useState({
//     total: 0,
//     page: 1,
//     totalPages: 1
//   });

//   const Backend_url = import.meta.env.VITE_BACKEND_URL;

// const fetchHotels = async (page = 1, search = '', type = 'all') => {
//   try {
//     setLoading(true);

//     const response = await axios.post(`${Backend_url}/api/hotel/list`, {
//       page,
//       limit: 6,
//       search,
//       type: type === 'all' ? '' : type
//     });

//     const data = response.data;

//     if (data.success) {
//       setHotels(data.data);           // Assuming hotel list is in data.data
//       setPagination(data.pagination); // Assuming pagination details in data.pagination
//     }
//   } catch (error) {
//     console.error('Error fetching hotels:', error.response?.data || error.message);
//   } finally {
//     setLoading(false);
//   }
// };
//   // Load hotels when component mounts
//   useEffect(() => {
//     fetchHotels();
//   }, []);

//   // Handle search
//   const handleSearch = () => {
//     setCurrentPage(1);
//     fetchHotels(1, searchTerm, selectedType);
//   };

//   // Handle filter change
//   const handleFilterChange = (type) => {
//     setSelectedType(type);
//     setCurrentPage(1);
//     fetchHotels(1, searchTerm, type);
//     setShowFilters(false);
//   };

//   // Handle pagination
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     fetchHotels(page, searchTerm, selectedType);
//   };

//   // Get star rating display
//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
//     }

//     if (hasHalfStar) {
//       stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
//     }

//     const emptyStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-500" />);
//     }

//     return stars;
//   };

//   // Get food type badge
//   const getTypeBadge = (type) => {
//     switch (type) {
//       case 'veg':
//         return <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">Veg Only</span>;
//       case 'non-veg':
//         return <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">Non-Veg</span>;
//       case 'both':
//         return <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">Both</span>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Header */}
//       <div className="bg-gray-800 border-b border-gray-700">
//         <div className="max-w-7xl mx-auto px-4 py-2">
//           <h1 className="text-2xl font-bold text-center mb-2">
//             Find Your Perfect <span className="text-yellow-400">Restaurant</span>
//           </h1>
//         </div>
//       </div>

//       {/* Search Section */}
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="flex flex-row gap-4 mb-6">
//           {/* Search Bar */}
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search restaurants by name or location..."
//               className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-white placeholder-gray-400"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//             />
//           </div>

//           {/* Filters Button */}
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
//           >
//            <Filter className="w-5 h-5" />
//            <span className="hidden sm:inline">Filters</span>
//           </button>
//         </div>

//         {/* Filter Options */}
//         {showFilters && (
//           <div className="bg-gray-800 rounded-lg p-4 mb-6">
//             <div className="flex flex-wrap gap-3">
//               {[
//                 { value: 'all', label: 'All Types' },
//                 { value: 'veg', label: 'Veg' },
//                 { value: 'non-veg', label: 'Non-Veg' },
//                 { value: 'both', label: 'Both' }
//               ].map((filter) => (
//                 <button
//                   key={filter.value}
//                   onClick={() => handleFilterChange(filter.value)}
//                   className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                     selectedType === filter.value
//                       ? 'bg-yellow-400 text-gray-900'
//                       : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                   }`}
//                 >
//                   {filter.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Results Count */}
//         <div className="text-gray-400 text-sm mb-6">
//           Showing {hotels.length} of {pagination.total} restaurants
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
//             <p className="mt-4 text-gray-400">Loading restaurants...</p>
//           </div>
//         )}

//         {/* Hotels Grid */}
//         {!loading && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {hotels.map((hotel) => (
//               <div key={hotel._id} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
//                 {/* Hotel Image */}
//                 <div className="relative h-48 bg-gray-700">
//                   {hotel.images && hotel.images[0] ? (
//                     <img
//                       src={`${Backend_url}/${hotel.images[0]}`}
//                       alt={hotel.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <Utensils className="w-16 h-16 text-gray-500" />
//                     </div>
//                   )}
                  
//                   {/* Type Badge */}
//                   <div className="absolute top-3 right-3">
//                     {getTypeBadge(hotel.type)}
//                   </div>

//                   {/* Navigation Arrows */}
//                   <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70">
//                     <ChevronLeft className="w-5 h-5" />
//                   </button>
//                   <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70">
//                     <ChevronRight className="w-5 h-5" />
//                   </button>
//                 </div>

//                 {/* Hotel Info */}
//                 <div className="p-4">
//                   {/* Hotel Name and Rating */}
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-xl font-bold text-white">{hotel.name}</h3>
//                     <div className="flex items-center gap-1">
//                       <div className="flex">
//                         {renderStars(hotel.rating)}
//                       </div>
//                       <span className="text-sm text-gray-400">({hotel.rating})</span>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <p className="text-gray-300 text-sm mb-3 line-clamp-2">{hotel.description}</p>

//                   {/* Address */}
//                   <div className="flex items-start gap-2 text-sm text-gray-400 mb-4">
//                     <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                     <span className="line-clamp-2">{hotel.address.full}</span>
//                   </div>

//                   {/* Menu Items */}
//                   {hotel.menu && hotel.menu.length > 0 && (
//                     <div className="mb-4">
//                       <h4 className="text-sm font-medium text-gray-300 mb-2">Popular Items:</h4>
//                       <div className="space-y-2">
//                         {hotel.menu.slice(0, 2).map((item, index) => (
//                           <div key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded">
//                             <div>
//                               <span className="text-white text-sm font-medium">{item.item}</span>
//                               <p className="text-xs text-gray-400">{item.details}</p>
//                             </div>
//                             <span className="text-yellow-400 font-bold">₹{item.price}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Contact */}
//                   <div className="flex items-center justify-between pt-3 border-t border-gray-700">
//                     <div className="flex items-center gap-2 text-sm text-gray-400">
//                       <Phone className="w-4 h-4" />
//                       <span>{hotel.contact}</span>
//                     </div>
//                     <button className="px-4 py-2 bg-yellow-400 text-gray-900 text-sm font-medium rounded-lg hover:bg-yellow-500 transition-colors">
//                       View Menu
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* No Results */}
//         {!loading && hotels.length === 0 && (
//           <div className="text-center py-12">
//             <Utensils className="w-16 h-16 text-gray-500 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-white mb-2">No restaurants found</h3>
//             <p className="text-gray-400">Try adjusting your search or filters</p>
//           </div>
//         )}

//         {/* Pagination */}
//         {!loading && pagination.totalPages > 1 && (
//           <div className="flex justify-center items-center gap-2 mt-8">
//             {/* Previous Button */}
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 currentPage === 1
//                   ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
//                   : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//               }`}
//             >
//               <ChevronLeft className="w-4 h-4" />
//               <span className="hidden sm:inline">Previous</span>
//             </button>

//             {/* Page Numbers */}
//             <div className="flex gap-1">
//               {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                 const startPage = Math.max(1, currentPage - 2);
//                 const page = startPage + i;
                
//                 if (page > pagination.totalPages) return null;
                
//                 return (
//                   <button
//                     key={page}
//                     onClick={() => handlePageChange(page)}
//                     className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
//                       currentPage === page
//                         ? 'bg-yellow-400 text-gray-900'
//                         : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 );
//               })}
              
//               {/* Show dots if there are more pages */}
//               {pagination.totalPages > 5 && currentPage < pagination.totalPages - 2 && (
//                 <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
//               )}
//             </div>

//             {/* Next Button */}
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === pagination.totalPages}
//               className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 currentPage === pagination.totalPages
//                   ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
//                   : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//               }`}
//             >
//               <span className="hidden sm:inline">Next</span>
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoodPage;








// src/pages/HotelPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFoods,
  deleteFood,
} from "../services/operations/foodAPI";
import SearchAndFilterBar from "../components/Admin/Parts/Searchfillter";
import HotelCard from "../components/Food/FoodCard";
import Pagination from "../components/HostelHandles/Paganation";
import ErrorMessage from "../components/HostelHandles/Error";
import NoResults from "../components/HostelHandles/Noresult";
import Footer from "../components/Common/Footer";
const HotelPage = () => {
  const dispatch = useDispatch();
  const { foods: hotels, pagination, loading, error } = useSelector(
    (state) => state.food // ✅ from foodSlice
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "all", // veg | non-veg | both
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [userType, setUserType] = useState("user"); // 'user' or 'admin'

  const hotelsPerPage = 6;

  // Initialize image indices for hotels
  useEffect(() => {
    const initialIndices = {};
    hotels.forEach((h) => {
      initialIndices[h._id] = 0;
    });
    setCurrentImageIndex(initialIndices);
  }, [hotels]);

  // Load hotels
  const loadHotels = (page = 1, search = "", appliedFilters = filters) => {
    dispatch(
      fetchFoods({
        page,
        limit: hotelsPerPage,
        search,
        type: appliedFilters.type,
      })
    );
  };

  // Initial fetch
  useEffect(() => {
    loadHotels(1, searchTerm, filters);
  }, [dispatch]);

  // Refetch when searchTerm or filters change
  useEffect(() => {
    setCurrentPage(1);
    loadHotels(1, searchTerm, filters);
  }, [searchTerm, filters]);

  // Reset filters
  const handleResetFilters = () => {
    const reset = { type: "all" };
    setFilters(reset);
    setSearchTerm("");
    setCurrentPage(1);
    loadHotels(1, "", reset);
  };

  // Page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadHotels(page, searchTerm, filters);
  };

  // Image navigation
  const nextImage = (hotelId) => {
    const hotel = hotels.find((h) => h._id === hotelId);
    if (!hotel || !hotel.images.length) return;
    const total = hotel.images.length;
    setCurrentImageIndex((prev) => ({
      ...prev,
      [hotelId]: (prev[hotelId] + 1) % total,
    }));
  };

  const prevImage = (hotelId) => {
    const hotel = hotels.find((h) => h._id === hotelId);
    if (!hotel || !hotel.images.length) return;
    const total = hotel.images.length;
    setCurrentImageIndex((prev) => ({
      ...prev,
      [hotelId]: prev[hotelId] === 0 ? total - 1 : prev[hotelId] - 1,
    }));
  };

  // Admin actions
  const handleEdit = (hotel) => {
    console.log("Edit hotel:", hotel);
  };

  const handleDelete = (hotelId) => {
    dispatch(deleteFood(hotelId, () => loadHotels(currentPage, searchTerm, filters)));
  };

  // Pagination values
  const totalPages = pagination?.totalPages || 0;
  const total = pagination?.total || 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* HEADER */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Title + Subtitle */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Find Your Best <span className="text-yellow-400">Food Place</span>
            </h1>
            <p className="text-gray-400 mt-1">
              Explore food spots, filter by type, and choose your favorite
            </p>
          </div>

          {/* Count + divider */}
          <div>
            <h2 className="text-lg font-semibold">
              Hotels <span className="text-yellow-400">({total})</span>
            </h2>
            <div className="border-b border-gray-700 mt-2"></div>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <SearchAndFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          handleResetFilters={handleResetFilters}
          filterKeys={["type"]}
          options={{
            type: ["veg", "non-veg", "both"],
          }}
          debounceDelay={400}
        />

        {/* Error */}
        <ErrorMessage error={error} />

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel._id}
              hotel={hotel}
              currentImageIndex={currentImageIndex[hotel._id]}
              onNextImage={nextImage}
              onPrevImage={prevImage}
              userType={userType}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* No results */}
        <NoResults loading={loading} hostelsLength={hotels.length} />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
       <Footer/>
    </div>
  );
};

export default HotelPage;
