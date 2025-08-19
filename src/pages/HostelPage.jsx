
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchHostels } from '../services/operations/hostelAPI';
// import SearchFilter from '../components/HostelHandles/Search';
// import HostelCard from '../components/HostelHandles/HostelCard';
// import Pagination from '../components/HostelHandles/Paganation';
// import ErrorMessage from '../components/HostelHandles/Error';
// import NoResults from '../components/HostelHandles/Noresult';

// const HostelPage = () => {
//   const dispatch = useDispatch();
//   const { hostels, pagination, loading, error } = useSelector(state => state.hostel);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [genderFilter, setGenderFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState({});
//   const [userType, setUserType] = useState('user'); // 'user' or 'admin'

//   const hostelsPerPage = 6;

//   // Initialize image indices for hostels
//   useEffect(() => {
//     const initialIndices = {};
//     hostels.forEach((h) => { 
//       initialIndices[h._id] = 0; 
//     });
//     setCurrentImageIndex(initialIndices);
//   }, [hostels]);

//   // Initial fetch
//   useEffect(() => {
//     dispatch(fetchHostels({ 
//       page: 1, 
//       limit: hostelsPerPage, 
//       search: searchTerm, 
//       type: genderFilter 
//     }));
//   }, [dispatch]);

//   // Fetch when gender filter changes
//   useEffect(() => {
//     setCurrentPage(1);
//     dispatch(fetchHostels({ 
//       page: 1, 
//       limit: hostelsPerPage, 
//       search: searchTerm, 
//       type: genderFilter 
//     }));
//   }, [genderFilter, dispatch]);

//   // Fetch when page changes (but not on initial page 1)
//   useEffect(() => {
//     if (currentPage > 1) {
//       dispatch(fetchHostels({ 
//         page: currentPage, 
//         limit: hostelsPerPage, 
//         search: searchTerm, 
//         type: genderFilter 
//       }));
//     }
//   }, [currentPage, dispatch]);

//   // Handle search
//   const handleSearch = (term) => {
//     setCurrentPage(1);
//     dispatch(fetchHostels({
//       page: 1,
//       limit: hostelsPerPage,
//       search: term,
//       type: genderFilter,
//     }));
//     setSearchTerm('');
//   };

//   // Reset all filters
//   const handleReset = () => {
//     setSearchTerm('');
//     setGenderFilter('all');
//     setCurrentPage(1);
//     dispatch(fetchHostels({
//       page: 1,
//       limit: hostelsPerPage,
//       search: '',
//       type: 'all',
//     }));
//   };

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Image navigation
//   const nextImage = (hostelId) => {
//     const hostel = hostels.find(h => h._id === hostelId);
//     if (!hostel || !hostel.images.length) return;
//     const total = hostel.images.length;
//     setCurrentImageIndex(prev => ({ 
//       ...prev, 
//       [hostelId]: (prev[hostelId] + 1) % total 
//     }));
//   };

//   const prevImage = (hostelId) => {
//     const hostel = hostels.find(h => h._id === hostelId);
//     if (!hostel || !hostel.images.length) return;
//     const total = hostel.images.length;
//     setCurrentImageIndex(prev => ({ 
//       ...prev, 
//       [hostelId]: prev[hostelId] === 0 ? total - 1 : prev[hostelId] - 1 
//     }));
//   };

//   // Admin actions
//   const handleEdit = (hostel) => {
//     // Implement edit functionality
//     console.log('Edit hostel:', hostel);
//     // You can open a modal or navigate to edit page
//   };

//   const handleDelete = (hostelId) => {
//     // Implement delete functionality
//     console.log('Delete hostel:', hostelId);
//     // You can show confirmation dialog and then delete
//   };

//   // Extract pagination values
//   const totalPages = pagination?.totalPages || 0;
//   const total = pagination?.total || 0;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Search & Filter */}
//       <SearchFilter
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         genderFilter={genderFilter}
//         setGenderFilter={setGenderFilter}
//         showFilters={showFilters}
//         setShowFilters={setShowFilters}
//         onSearch={handleSearch}
//         onReset={handleReset}
//         loading={loading}
//         totalResults={total}
//       />

//       {/* Error Message */}
//       <ErrorMessage error={error} />

//       {/* Hostels Grid */}
//       <div className="max-w-7xl mx-auto p-4 md:p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {hostels.map(hostel => (
//             <HostelCard
//               key={hostel._id}
//               hostel={hostel}
//               currentImageIndex={currentImageIndex[hostel._id]}
//               onNextImage={nextImage}
//               onPrevImage={prevImage}
//               userType={userType}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//             />
//           ))}
//         </div>
        
//         {/* No results message */}
//         <NoResults loading={loading} hostelsLength={hostels.length} />
        
//         {/* Pagination */}
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>

//       {/* User Type Toggle (for demo/testing) */}
//       {/* <div className="fixed bottom-4 right-4">
//         <button
//           onClick={() => setUserType(userType === 'user' ? 'admin' : 'user')}
//           className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-medium shadow-lg hover:bg-yellow-500 transition-colors"
//         >
//           {userType === 'user' ? 'Switch to Admin' : 'Switch to User'}
//         </button>
//       </div> */}
//     </div>
//   );
// };

// export default HostelPage;








import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostels } from "../services/operations/hostelAPI";
import SearchAndFilterBar from "../components/Admin/Parts/Searchfillter";
import HostelCard from "../components/HostelHandles/HostelCard";
import Pagination from "../components/HostelHandles/Paganation";
import ErrorMessage from "../components/HostelHandles/Error";
import NoResults from "../components/HostelHandles/Noresult";

const HostelPage = () => {
  const dispatch = useDispatch();
  const { hostels, pagination, loading, error } = useSelector(
    (state) => state.hostel
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    gender: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [userType, setUserType] = useState("user"); // 'user' or 'admin'

  const hostelsPerPage = 6;

  // Initialize image indices for hostels
  useEffect(() => {
    const initialIndices = {};
    hostels.forEach((h) => {
      initialIndices[h._id] = 0;
    });
    setCurrentImageIndex(initialIndices);
  }, [hostels]);




  // Initial fetch
  useEffect(() => {
    loadHostels(1, searchTerm, filters);
  }, [dispatch]);

  const loadHostels = (page = 1, search = "", appliedFilters = filters) => {
    dispatch(
      fetchHostels({
        page,
        limit: hostelsPerPage,
        search,
        type: appliedFilters.gender,
      })
    );
  };


  // Fetch when searchTerm or filters change
useEffect(() => {
  setCurrentPage(1);
  loadHostels(1, searchTerm, filters);
}, [searchTerm, filters]);


  // Reset filters
  const handleResetFilters = () => {
    const reset = { gender: "all",  };
    setFilters(reset);
    setSearchTerm("");
    setCurrentPage(1);
    loadHostels(1, "", reset);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadHostels(page, searchTerm, filters);
  };

  // Image navigation
  const nextImage = (hostelId) => {
    const hostel = hostels.find((h) => h._id === hostelId);
    if (!hostel || !hostel.images.length) return;
    const total = hostel.images.length;
    setCurrentImageIndex((prev) => ({
      ...prev,
      [hostelId]: (prev[hostelId] + 1) % total,
    }));
  };

  const prevImage = (hostelId) => {
    const hostel = hostels.find((h) => h._id === hostelId);
    if (!hostel || !hostel.images.length) return;
    const total = hostel.images.length;
    setCurrentImageIndex((prev) => ({
      ...prev,
      [hostelId]: prev[hostelId] === 0 ? total - 1 : prev[hostelId] - 1,
    }));
  };

  // Admin actions
  const handleEdit = (hostel) => {
    console.log("Edit hostel:", hostel);
  };

  const handleDelete = (hostelId) => {
    console.log("Delete hostel:", hostelId);
  };

  // Extract pagination values
  const totalPages = pagination?.totalPages || 0;
  const total = pagination?.total || 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* HEADER */}

  
 <div className="flex flex-col gap-4 mb-6">
  {/* Title + Subtitle (centered) */}
  <div className="text-center">
    <h1 className="text-3xl md:text-4xl font-bold mb-3">
      Find Your Best <span className="text-yellow-400">Hostel</span>
    </h1>
    <p className="text-gray-400 mt-1">
      Explore hostels, filter by type, and choose the best option for you
    </p>
  </div>

  {/* Hostel count + divider (left-aligned) */}
  <div>
    <h2 className="text-lg font-semibold">
      Hostels <span className="text-yellow-400">({total})</span>
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
  filterKeys={["gender"]}
  options={{
    gender: ["girls", "boys"]
  }}
  debounceDelay={400}
/>


        {/* Error Message */}
        <ErrorMessage error={error} />

        {/* Hostels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {hostels.map((hostel) => (
            <HostelCard
              key={hostel._id}
              hostel={hostel}
              currentImageIndex={currentImageIndex[hostel._id]}
              onNextImage={nextImage}
              onPrevImage={prevImage}
              userType={userType}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* No results message */}
        <NoResults loading={loading} hostelsLength={hostels.length} />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default HostelPage;











// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchHostels } from "../services/operations/hostelAPI";
// import SearchAndFilterBar from "../components/Admin/Parts/Searchfillter";
// import HostelCard from "../components/HostelHandles/HostelCard";
// import Pagination from "../components/HostelHandles/Paganation";
// import ErrorMessage from "../components/HostelHandles/Error";
// import NoResults from "../components/HostelHandles/Noresult";

// const HostelPage = () => {
//   const dispatch = useDispatch();
//   const { hostels, pagination, loading, error } = useSelector(
//     (state) => state.hostel
//   );

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     gender: "all",
//     service: "all",
//     minRent: "",
//     maxRent: "",
//     minRating: "",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState({});
//   const [userType, setUserType] = useState("user"); // 'user' or 'admin'

//   const hostelsPerPage = 6;

//   // Initialize image indices for hostels
//   useEffect(() => {
//     const initialIndices = {};
//     hostels.forEach((h) => {
//       initialIndices[h._id] = 0;
//     });
//     setCurrentImageIndex(initialIndices);
//   }, [hostels]);

//   // Initial fetch
//   useEffect(() => {
//     loadHostels(1, searchTerm, filters);
//   }, [dispatch]);

//   const loadHostels = (page = 1, search = "", appliedFilters = filters) => {
//     dispatch(
//       fetchHostels({
//         page,
//         limit: hostelsPerPage,
//         search,
//         type: appliedFilters.gender,
//         service: appliedFilters.service,
//         minRent: appliedFilters.minRent,
//         maxRent: appliedFilters.maxRent,
//         minRating: appliedFilters.minRating,
//       })
//     );
//   };

//   // Fetch when searchTerm or filters change
//   useEffect(() => {
//     setCurrentPage(1);
//     loadHostels(1, searchTerm, filters);
//   }, [searchTerm, filters]);

//   // Reset filters
//   const handleResetFilters = () => {
//     const reset = {
//       gender: "all",
//       service: "all",
//       minRent: "",
//       maxRent: "",
//       minRating: "",
//     };
//     setFilters(reset);
//     setSearchTerm("");
//     setCurrentPage(1);
//     loadHostels(1, "", reset);
//   };

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     loadHostels(page, searchTerm, filters);
//   };

//   // Image navigation
//   const nextImage = (hostelId) => {
//     const hostel = hostels.find((h) => h._id === hostelId);
//     if (!hostel || !hostel.images.length) return;
//     const total = hostel.images.length;
//     setCurrentImageIndex((prev) => ({
//       ...prev,
//       [hostelId]: (prev[hostelId] + 1) % total,
//     }));
//   };

//   const prevImage = (hostelId) => {
//     const hostel = hostels.find((h) => h._id === hostelId);
//     if (!hostel || !hostel.images.length) return;
//     const total = hostel.images.length;
//     setCurrentImageIndex((prev) => ({
//       ...prev,
//       [hostelId]: prev[hostelId] === 0 ? total - 1 : prev[hostelId] - 1,
//     }));
//   };

//   // Admin actions
//   const handleEdit = (hostel) => {
//     console.log("Edit hostel:", hostel);
//   };

//   const handleDelete = (hostelId) => {
//     console.log("Delete hostel:", hostelId);
//   };

//   // Extract pagination values
//   const totalPages = pagination?.totalPages || 0;
//   const total = pagination?.total || 0;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <div className="max-w-7xl mx-auto p-4 md:p-6">
//         {/* HEADER */}
//         <div className="flex flex-col gap-4 mb-6">
//           <div className="text-center">
//             <h1 className="text-3xl md:text-4xl font-bold mb-3">
//               Find Your Best <span className="text-yellow-400">Hostel</span>
//             </h1>
//             <p className="text-gray-400 mt-1">
//               Explore hostels, filter by type, and choose the best option for
//               you
//             </p>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold">
//               Hostels <span className="text-yellow-400">({total})</span>
//             </h2>
//             <div className="border-b border-gray-700 mt-2"></div>
//           </div>
//         </div>

//         {/* SEARCH & FILTER */}
//         <SearchAndFilterBar
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           filters={filters}
//           setFilters={setFilters}
//           showFilters={showFilters}
//           setShowFilters={setShowFilters}
//           handleResetFilters={handleResetFilters}
//           filterKeys={["gender", "service", "minRent", "maxRent", "minRating"]}
//           options={{
//             gender: ["all", "boys", "girls"],
//             service: [
//               "all",
//               "wifi",
//               "security",
//               "electricity",
//               "food",
//               "washing",
//               "washroom",
//               "personal_toilet",
//               "water_filter",
//             ],
//           }}
//           debounceDelay={400}
//         />

//         {/* Error Message */}
//         <ErrorMessage error={error} />

//         {/* Hostels Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//           {hostels.map((hostel) => (
//             <HostelCard
//               key={hostel._id}
//               hostel={hostel}
//               currentImageIndex={currentImageIndex[hostel._id]}
//               onNextImage={nextImage}
//               onPrevImage={prevImage}
//               userType={userType}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//             />
//           ))}
//         </div>

//         {/* No results message */}
//         <NoResults loading={loading} hostelsLength={hostels.length} />

//         {/* Pagination */}
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default HostelPage;
