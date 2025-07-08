
//                   {/* 🔗 tel: Link — What Is It?
// HTML allows you to create links that do more than just open web pages.

// The tel: scheme is a special link format.

// When you write <a href="tel:9876543210">Call</a>, it tells the device:
// ➤ "Try to call this phone number."

// ✅ How It Works (Behind the Scenes):
// You create a link like this:


// <a href="tel:9876543210">Call Hostel</a>

// 🔧 The browser detects href="tel:..." and passes it to the operating system.

// 📱 On a smartphone (Android, iOS):

// The phone opens the Dialer App

// The number is automatically filled in

// It shows a Call button to confirm the call

// 🖥️ On a desktop/laptop:

// If you have apps like Skype, Zoom, or FaceTime installed, they can handle the call

// Otherwise, nothing happens — desktop browsers can't make calls directly
//  */}

//****************************** */


// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, MapPin, Phone, Wifi, Shield, Zap, UtensilsCrossed, Shirt, Bath, Droplets, Search, Star, Filter, Loader2 } from 'lucide-react';
// import axios from 'axios';
//  const Backend_url = import.meta.env.VITE_BACKEND_URL;
// const HostelListing = () => {
//   const [hostels, setHostels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [genderFilter, setGenderFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState({});
//   const [error, setError] = useState('');
  
//   // Replace with your actual backend URL
//   // const Backend_url = 'http://localhost:4000'; // Update this with your actual backend URL
  
//   const hostelsPerPage = 6;

//   const serviceIcons = {
//     wifi: <Wifi className="w-4 h-4" />,
//     security: <Shield className="w-4 h-4" />,
//     electricity: <Zap className="w-4 h-4" />,
//     food: <UtensilsCrossed className="w-4 h-4" />,
//     washing: <Shirt className="w-4 h-4" />,
//     washroom: <Bath className="w-4 h-4" />,
//     personal_toilet: <Bath className="w-4 h-4" />,
//     water_filter: <Droplets className="w-4 h-4" />
//   };

//   const serviceNames = {
//     wifi: "Wi-Fi",
//     security: "Security",
//     electricity: "Electricity",
//     food: "Food",
//     washing: "Washing",
//     washroom: "Washroom",
//     personal_toilet: "Personal Toilet",
//     water_filter: "Water Filter"
//   };

//   const fetchHostels = async (page = 1, search = '', type = 'all') => {
//     try {
//       setLoading(true);
//       setError('');
      
//       const response = await axios.post(`${Backend_url}/api/hostels/fetch`, {
//         page,
//         limit: hostelsPerPage,
//         search,
//         type
//       });

//       if (response.data.success) {
//         const { data, pagination } = response.data;
//         setHostels(data);
//         setTotalPages(pagination.totalPages);
//         setTotal(pagination.total);
        
//         // Initialize image indices for new hostels
//         const initialIndices = {};
//         data.forEach((hostel) => {
//           initialIndices[hostel._id] = 0;
//         });
//         setCurrentImageIndex(initialIndices);
//       } else {
//         setError('Failed to fetch hostels');
//       }
//     } catch (err) {
//       console.error("Error fetching hostels:", err);
//       setError(err.response?.data?.message || 'Failed to fetch hostels');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial fetch
//   useEffect(() => {
//     fetchHostels(1, searchTerm, genderFilter);
//   }, []);

//   // Handle search and filter changes
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setCurrentPage(1);
//       fetchHostels(1, searchTerm, genderFilter);
//     }, 500); // Debounce search

//     return () => clearTimeout(timeoutId);
//   }, [searchTerm, genderFilter]);

//   // Handle page changes
//   useEffect(() => {
//     if (currentPage > 1) {
//       fetchHostels(currentPage, searchTerm, genderFilter);
//     }
//   }, [currentPage]);

//   const nextImage = (hostelId) => {
//     const hostel = hostels.find(h => h._id === hostelId);
//     if (!hostel || !hostel.images.length) return;
    
//     const totalImages = hostel.images.length;
//     setCurrentImageIndex(prev => ({
//       ...prev,
//       [hostelId]: (prev[hostelId] + 1) % totalImages
//     }));
//   };

//   const prevImage = (hostelId) => {
//     const hostel = hostels.find(h => h._id === hostelId);
//     if (!hostel || !hostel.images.length) return;
    
//     const totalImages = hostel.images.length;
//     setCurrentImageIndex(prev => ({
//       ...prev,
//       [hostelId]: prev[hostelId] === 0 ? totalImages - 1 : prev[hostelId] - 1
//     }));
//   };

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
    
//     return stars;
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   if (loading && hostels.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-yellow-400" />
//           <p className="text-gray-400">Loading hostels...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Header */}
//       <div className="bg-gray-900 p-4 md:p-6 border-b border-gray-800">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
//             Find Your Perfect <span className="text-yellow-400">Hostel</span>
//           </h1>
          
//           {/* Search and Filter */}
//           <div className="flex flex-row gap-4 items-center">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search hostels by name or location..."
//                 className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 <Filter className="w-5 h-5" />
//                 <span className="hidden sm:inline">Filters</span>
//               </button>
//             </div>
//           </div>
          
//           {/* Gender Filter */}
//           {showFilters && (
//             <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
//               <h3 className="text-lg font-medium mb-3">Filter by Gender</h3>
//               <div className="flex flex-wrap gap-2">
//                 {[
//                   { value: 'all', label: 'All' },
//                   { value: 'boys', label: 'Boys Only' },
//                   { value: 'girls', label: 'Girls Only' }
//                 ].map(filter => (
//                   <button
//                     key={filter.value}
//                     onClick={() => setGenderFilter(filter.value)}
//                     className={`px-4 py-2 rounded-lg transition-colors ${
//                       genderFilter === filter.value
//                         ? 'bg-yellow-400 text-gray-900'
//                         : 'bg-gray-600 hover:bg-gray-500'
//                     }`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
          
//           {/* Results count */}
//           <div className="mt-4 text-sm text-gray-400">
//             {loading ? (
//               <div className="flex items-center gap-2">
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 <span>Searching...</span>
//               </div>
//             ) : (
//               <span>Showing {hostels.length} of {total} hostels</span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="max-w-7xl mx-auto p-4">
//           <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
//             {error}
//           </div>
//         </div>
//       )}

//       {/* Hostels Grid */}
//       <div className="max-w-7xl mx-auto p-4 md:p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {hostels.map(hostel => (
//             <div key={hostel._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
//               {/* Image Carousel */}
//               <div className="relative h-48 md:h-56">
//                 {hostel.images && hostel.images.length > 0 ? (
//                   <>
//                     <img
//                       src={hostel.images[currentImageIndex[hostel._id] || 0]}
//                       alt={hostel.name}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop';
//                       }}
//                     />
                    
//                     {/* Navigation buttons */}
//                     {hostel.images.length > 1 && (
//                       <>
//                         <button
//                           onClick={() => prevImage(hostel._id)}
//                           className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
//                         >
//                           <ChevronLeft className="w-4 h-4" />
//                         </button>
                        
//                         <button
//                           onClick={() => nextImage(hostel._id)}
//                           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
//                         >
//                           <ChevronRight className="w-4 h-4" />
//                         </button>
                        
//                         {/* Image indicators */}
//                         <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
//                           {hostel.images.map((_, index) => (
//                             <div
//                               key={index}
//                               className={`w-2 h-2 rounded-full ${
//                                 index === (currentImageIndex[hostel._id] || 0)
//                                   ? 'bg-yellow-400'
//                                   : 'bg-white bg-opacity-50'
//                               }`}
//                             />
//                           ))}
//                         </div>
//                       </>
//                     )}
//                   </>
//                 ) : (
//                   <div className="w-full h-full bg-gray-700 flex items-center justify-center">
//                     <span className="text-gray-400">No image available</span>
//                   </div>
//                 )}
                
//                 {/* Type badge */}
//                 <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
//                   hostel.type === 'boys' ? 'bg-blue-600' : 'bg-pink-600'
//                 }`}>
//                   {hostel.type === 'boys' ? 'Boys Only' : 'Girls Only'}
//                 </div>
//               </div>
              
//               {/* Content */}
//               <div className="p-4">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="text-lg font-bold text-white">{hostel.name}</h3>
//                   <div className="flex items-center gap-1">
//                     {renderStars(hostel.rating)}
//                     <span className="text-sm text-gray-400 ml-1">({hostel.rating})</span>
//                   </div>
//                 </div>
                
//                 {hostel.description && (
//                   <p className="text-gray-300 text-sm mb-3 line-clamp-2">{hostel.description}</p>
//                 )}
                
//                 <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
//                   <MapPin className="w-4 h-4 flex-shrink-0" />
//                   <span className="line-clamp-1">
//                     {hostel.address?.full || hostel.address}
//                   </span>
//                 </div>
                
//                 {/* Services */}
//                 {hostel.services && hostel.services.length > 0 && (
//                   <div className="mb-4">
//                     <h4 className="text-sm font-medium text-gray-300 mb-2">Services</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {hostel.services.map(service => (
//                         <div
//                           key={service}
//                           className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded-lg text-xs"
//                           title={serviceNames[service]}
//                         >
//                           {serviceIcons[service]}
//                           <span className="hidden sm:inline">{serviceNames[service]}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Price and Contact */}
//                 <div className="flex justify-between items-center pt-3 border-t border-gray-700">
//                   <div>
//                     <div className="text-xl font-bold text-yellow-400">₹{hostel.rent}</div>
//                     <div className="text-xs text-gray-400">per month</div>
//                   </div>
                  
//                   <div className="flex items-center gap-2 text-sm">
//                     <Phone className="w-4 h-4 text-gray-400" />
//                     <span className="text-gray-300">{hostel.contact}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* No results message */}
//         {!loading && hostels.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-gray-400 text-lg mb-2">No hostels found</div>
//             <p className="text-gray-500">Try adjusting your filters or search terms</p>
//           </div>
//         )}
        
//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center mt-8 gap-2">
//             <button
//               onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//               disabled={currentPage === 1}
//               className="flex items-center gap-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg transition-colors"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               Previous
//             </button>
            
//             <div className="flex gap-1">
//               {[...Array(totalPages)].map((_, index) => {
//                 const pageNumber = index + 1;
//                 const isCurrentPage = pageNumber === currentPage;
                
//                 // Show first page, last page, current page, and pages around current
//                 if (
//                   pageNumber === 1 ||
//                   pageNumber === totalPages ||
//                   (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
//                 ) {
//                   return (
//                     <button
//                       key={pageNumber}
//                       onClick={() => handlePageChange(pageNumber)}
//                       className={`w-10 h-10 rounded-lg font-medium transition-colors ${
//                         isCurrentPage
//                           ? 'bg-yellow-400 text-gray-900'
//                           : 'bg-gray-700 hover:bg-gray-600 text-white'
//                       }`}
//                     >
//                       {pageNumber}
//                     </button>
//                   );
//                 }
                
//                 // Show ellipsis
//                 if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
//                   return (
//                     <span key={pageNumber} className="w-10 h-10 flex items-center justify-center text-gray-400">
//                       ...
//                     </span>
//                   );
//                 }
                
//                 return null;
//               })}
//             </div>
            
//             <button
//               onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//               disabled={currentPage === totalPages}
//               className="flex items-center gap-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg transition-colors"
//             >
//               Next
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HostelListing;






///*************mmmmmmmmmmmmmmmmmmaaaaaaaaaaaaiiiiiiinnnnnnnnnnnnnnnn */


// import React, { useState, useEffect } from 'react';
// import {
//   ChevronLeft, ChevronRight, MapPin, Phone, Wifi, Shield, Zap,
//   UtensilsCrossed, Shirt, Bath, Droplets, Search, Star, Filter, Loader2
// } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchHostels } from '../services/operations/hostelAPI';

// const HostelListing = () => {
//   const dispatch = useDispatch();
//   const { hostels, pagination, loading, error } = useSelector(state => state.hostel);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [genderFilter, setGenderFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState({});
//   const hostelsPerPage = 6;

//   const serviceIcons = {
//     wifi: <Wifi className="w-4 h-4" />, security: <Shield className="w-4 h-4" />, electricity: <Zap className="w-4 h-4" />,
//     food: <UtensilsCrossed className="w-4 h-4" />, washing: <Shirt className="w-4 h-4" />, washroom: <Bath className="w-4 h-4" />,
//     personal_toilet: <Bath className="w-4 h-4" />, water_filter: <Droplets className="w-4 h-4" />
//   };

//   const serviceNames = {
//     wifi: "Wi-Fi", security: "Security", electricity: "Electricity", food: "Food",
//     washing: "Washing", washroom: "Washroom", personal_toilet: "Personal Toilet", water_filter: "Water Filter"
//   };

//   useEffect(() => {
//     dispatch(fetchHostels({ page: 1, limit: hostelsPerPage, search: searchTerm, type: genderFilter }));
//   }, []);

// // useEffect(() => {
// //   const delay = setTimeout(() => {
// //     if (searchTerm.trim() !== '') {
// //       setCurrentPage(1);
// //       dispatch(fetchHostels({
// //         page: 1,
// //         limit: hostelsPerPage,
// //         search: searchTerm,
// //         type: genderFilter
// //       }));
// //       // Clear search box AFTER fetch
// //       setSearchTerm('');
// //     }
// //   }, 1000);

// //   return () => clearTimeout(delay);
// // }, [searchTerm, genderFilter]);





// // searchTerm !== '' ensures we only dispatch when there's actual input.

// // After data is fetched, setSearchTerm('') clears the input box.

// // Since the box is now empty, and input hasn't been typed again, it doesn't trigger another fetch.





// useEffect(() => {
//    setCurrentPage(1);
//  dispatch(fetchHostels({ page: 1, limit: hostelsPerPage, search: searchTerm, type: genderFilter }));
 
// }, [genderFilter]);



//   useEffect(() => {
//     if (currentPage > 1) {
//       dispatch(fetchHostels({ page: currentPage, limit: hostelsPerPage, search: searchTerm, type: genderFilter }));
//     }
//   }, [currentPage]);

//   useEffect(() => {
//     const initialIndices = {};
//     hostels.forEach((h) => { initialIndices[h._id] = 0; });
//     setCurrentImageIndex(initialIndices);
//   }, [hostels]);

//   const nextImage = (id) => {
//     const hostel = hostels.find(h => h._id === id);
//     if (!hostel || !hostel.images.length) return;
//     const total = hostel.images.length;
//     setCurrentImageIndex(prev => ({ ...prev, [id]: (prev[id] + 1) % total }));
//   };

//   const prevImage = (id) => {
//     const hostel = hostels.find(h => h._id === id);
//     if (!hostel || !hostel.images.length) return;
//     const total = hostel.images.length;
//     setCurrentImageIndex(prev => ({ ...prev, [id]: prev[id] === 0 ? total - 1 : prev[id] - 1 }));
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };
// let totalPages=0;
// let total =0;
// if(pagination){
//  totalPages= pagination.totalPages;
// total= pagination.total;
// }
  
// const resetFiltersThenSearch = () => {
//  setSearchTerm('');
//     setGenderFilter('all');
//     setCurrentPage(1);
//     dispatch(fetchHostels({
//       page: 1,
//       limit: hostelsPerPage,
//       search: '',
//       type: 'all',
//     }));
// };


//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 0; i < Math.floor(rating); i++) {
//       stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
//     }
//     if (rating % 1 !== 0) {
//       stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
//     }
//     return stars;
//   };



//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Header */}
//       <div className="bg-gray-900 p-4 md:p-6 border-b border-gray-800">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
//             Find Your Perfect <span className="text-yellow-400">Hostel</span>
//           </h1>
          
//           {/* Search and Filter */}
//           <div className="flex flex-row gap-4 items-center">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search hostels by name or location..."
//                 className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//  onKeyDown={(e) => {
//     if (e.key === 'Enter' && searchTerm.trim() !== '') {
//       setCurrentPage(1);
//       dispatch(fetchHostels({
//         page: 1,
//         limit: hostelsPerPage,
//         search: searchTerm,
//         type: genderFilter,
//       }));
//       setSearchTerm('');
//     }
//   }}


//               />
//             </div>
            
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 <Filter className="w-5 h-5" />
//                 <span className="hidden sm:inline">Filters</span>
//               </button>
//             </div>
//           </div>
          
//           {/* Gender Filter */}
//           {showFilters && (
//             <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
//               <h3 className="text-lg font-medium mb-3">Filter by Gender</h3>
//               <div className="flex gap-2">
//                 {[
//                   { value: 'all', label: 'All' },
//                   { value: 'boys', label: 'Boys Only' },
//                   { value: 'girls', label: 'Girls Only' }
//                 ].map(filter => (
//                   <button
//                     key={filter.value}
//                     onClick={() => setGenderFilter(filter.value)}
//                     className={`px-3 py-2 rounded-lg transition-colors ${
//                       genderFilter === filter.value
//                         ? 'bg-yellow-400 text-gray-900'
//                         : 'bg-gray-600 hover:bg-gray-500'
//                     }`}
//                   >
//                     {filter.label}
//                   </button>


//                 ))}

//                 <button
//   onClick={resetFiltersThenSearch}
//   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
// >
//   Reset 
// </button>

//               </div>
//             </div>
//           )}
          
//           {/* Results count */}
//           <div className="mt-4 text-sm text-gray-400">
//             {loading ? (
//               <div className="flex items-center gap-2">
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 <span>Searching...</span>
//               </div>
//             ) : (
//               <span>Showing {hostels.length} of {total} hostels</span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="max-w-7xl mx-auto p-4">
//           <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
//             {error}
//           </div>
//         </div>
//       )}

//       {/* Hostels Grid */}
//       <div className="max-w-7xl mx-auto p-4 md:p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {hostels.map(hostel => (
//             <div key={hostel._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
//               {/* Image Carousel */}
//               <div className="relative h-48 md:h-56">
//                 {hostel.images && hostel.images.length > 0 ? (
//                   <>
//                     <img
//                       src={hostel.images[currentImageIndex[hostel._id] || 0]}
//                       alt={hostel.name}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop';
//                       }}
//                     />
                    
//                     {/* Navigation buttons */}
//                     {hostel.images.length > 1 && (
//                       <>
//                         <button
//                           onClick={() => prevImage(hostel._id)}
//                           className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
//                         >
//                           <ChevronLeft className="w-4 h-4" />
//                         </button>
                        
//                         <button
//                           onClick={() => nextImage(hostel._id)}
//                           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
//                         >
//                           <ChevronRight className="w-4 h-4" />
//                         </button>
                        
//                         {/* Image indicators */}
//                         <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
//                           {hostel.images.map((_, index) => (
//                             <div
//                               key={index}
//                               className={`w-2 h-2 rounded-full ${
//                                 index === (currentImageIndex[hostel._id] || 0)
//                                   ? 'bg-yellow-400'
//                                   : 'bg-white bg-opacity-50'
//                               }`}
//                             />
//                           ))}
//                         </div>
//                       </>
//                     )}
//                   </>
//                 ) : (
//                   <div className="w-full h-full bg-gray-700 flex items-center justify-center">
//                     <span className="text-gray-400">No image available</span>
//                   </div>
//                 )}
                
//                 {/* Type badge */}
//                 <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
//                   hostel.type === 'boys' ? 'bg-blue-600' : 'bg-pink-600'
//                 }`}>
//                   {hostel.type === 'boys' ? 'Boys Only' : 'Girls Only'}
//                 </div>
//               </div>
              
//               {/* Content */}
//               <div className="p-4">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="text-lg font-bold text-white">{hostel.name}</h3>
//                   <div className="flex items-center gap-1">
//                     {renderStars(hostel.rating)}
//                     <span className="text-sm text-gray-400 ml-1">({hostel.rating})</span>
//                   </div>
//                 </div>
                
//                 {hostel.description && (
//                   <p className="text-gray-300 text-sm mb-3 line-clamp-2">{hostel.description}</p>
//                 )}
                
//                 <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
//                   <MapPin className="w-4 h-4 flex-shrink-0" />
//                   <span className="line-clamp-1">
//                     {hostel.address?.full || hostel.address}
//                   </span>
//                 </div>
                
//                 {/* Services */}
//                 {hostel.services && hostel.services.length > 0 && (
//                   <div className="mb-4">
//                     <h4 className="text-sm font-medium text-gray-300 mb-2">Services</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {hostel.services.map(service => (
//                         <div
//                           key={service}
//                           className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded-lg text-xs"
//                           title={serviceNames[service]}
//                         >
//                           {serviceIcons[service]}
//                           <span className="hidden sm:inline">{serviceNames[service]}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Price and Contact */}
//                 <div className="flex justify-between items-center pt-3 border-t border-gray-700">
//                   <div>
//                     <div className="text-xl font-bold text-yellow-400">₹{hostel.rent}</div>
//                     <div className="text-xs text-gray-400">per month</div>
//                   </div>
                  
//                   <div className="flex items-center gap-2 text-sm">
//                     <Phone className="w-4 h-4 text-gray-400" />
//                     <span className="text-gray-300">{hostel.contact}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* No results message */}
//         {!loading && hostels.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-gray-400 text-lg mb-2">No hostels found</div>
//             <p className="text-gray-500">Try adjusting your filters or search terms</p>
//           </div>
//         )}
        
//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center mt-8 gap-2">
//             <button
//               onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//               disabled={currentPage === 1}
//               className="flex items-center gap-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg transition-colors"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               Previous
//             </button>
            
//             <div className="flex gap-1">
//               {[...Array(totalPages)].map((_, index) => {
//                 const pageNumber = index + 1;
//                 const isCurrentPage = pageNumber === currentPage;
                
//                 // Show first page, last page, current page, and pages around current
//                 if (
//                   pageNumber === 1 ||
//                   pageNumber === totalPages ||
//                   (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
//                 ) {
//                   return (
//                     <button
//                       key={pageNumber}
//                       onClick={() => handlePageChange(pageNumber)}
//                       className={`w-10 h-10 rounded-lg font-medium transition-colors ${
//                         isCurrentPage
//                           ? 'bg-yellow-400 text-gray-900'
//                           : 'bg-gray-700 hover:bg-gray-600 text-white'
//                       }`}
//                     >
//                       {pageNumber}
//                     </button>
//                   );
//                 }
                
//                 // Show ellipsis
//                 if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
//                   return (
//                     <span key={pageNumber} className="w-10 h-10 flex items-center justify-center text-gray-400">
//                       ...
//                     </span>
//                   );
//                 }
                
//                 return null;
//               })}
//             </div>
            
//             <button
//               onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//               disabled={currentPage === totalPages}
//               className="flex items-center gap-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg transition-colors"
//             >
//               Next
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HostelListing;















import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHostels } from '../services/operations/hostelAPI';
import SearchFilter from '../components/HostelHandles/Search';
import HostelCard from '../components/HostelHandles/HostelCard';
import Pagination from '../components/HostelHandles/Paganation';
import ErrorMessage from '../components/HostelHandles/Error';
import NoResults from '../components/HostelHandles/Noresult';

const HostelPage = () => {
  const dispatch = useDispatch();
  const { hostels, pagination, loading, error } = useSelector(state => state.hostel);

  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [userType, setUserType] = useState('user'); // 'user' or 'admin'

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
    dispatch(fetchHostels({ 
      page: 1, 
      limit: hostelsPerPage, 
      search: searchTerm, 
      type: genderFilter 
    }));
  }, [dispatch]);

  // Fetch when gender filter changes
  useEffect(() => {
    setCurrentPage(1);
    dispatch(fetchHostels({ 
      page: 1, 
      limit: hostelsPerPage, 
      search: searchTerm, 
      type: genderFilter 
    }));
  }, [genderFilter, dispatch]);

  // Fetch when page changes (but not on initial page 1)
  useEffect(() => {
    if (currentPage > 1) {
      dispatch(fetchHostels({ 
        page: currentPage, 
        limit: hostelsPerPage, 
        search: searchTerm, 
        type: genderFilter 
      }));
    }
  }, [currentPage, dispatch]);

  // Handle search
  const handleSearch = (term) => {
    setCurrentPage(1);
    dispatch(fetchHostels({
      page: 1,
      limit: hostelsPerPage,
      search: term,
      type: genderFilter,
    }));
    setSearchTerm('');
  };

  // Reset all filters
  const handleReset = () => {
    setSearchTerm('');
    setGenderFilter('all');
    setCurrentPage(1);
    dispatch(fetchHostels({
      page: 1,
      limit: hostelsPerPage,
      search: '',
      type: 'all',
    }));
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Image navigation
  const nextImage = (hostelId) => {
    const hostel = hostels.find(h => h._id === hostelId);
    if (!hostel || !hostel.images.length) return;
    const total = hostel.images.length;
    setCurrentImageIndex(prev => ({ 
      ...prev, 
      [hostelId]: (prev[hostelId] + 1) % total 
    }));
  };

  const prevImage = (hostelId) => {
    const hostel = hostels.find(h => h._id === hostelId);
    if (!hostel || !hostel.images.length) return;
    const total = hostel.images.length;
    setCurrentImageIndex(prev => ({ 
      ...prev, 
      [hostelId]: prev[hostelId] === 0 ? total - 1 : prev[hostelId] - 1 
    }));
  };

  // Admin actions
  const handleEdit = (hostel) => {
    // Implement edit functionality
    console.log('Edit hostel:', hostel);
    // You can open a modal or navigate to edit page
  };

  const handleDelete = (hostelId) => {
    // Implement delete functionality
    console.log('Delete hostel:', hostelId);
    // You can show confirmation dialog and then delete
  };

  // Extract pagination values
  const totalPages = pagination?.totalPages || 0;
  const total = pagination?.total || 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Search & Filter */}
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        onSearch={handleSearch}
        onReset={handleReset}
        loading={loading}
        totalResults={total}
      />

      {/* Error Message */}
      <ErrorMessage error={error} />

      {/* Hostels Grid */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostels.map(hostel => (
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

      {/* User Type Toggle (for demo/testing) */}
      {/* <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setUserType(userType === 'user' ? 'admin' : 'user')}
          className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-medium shadow-lg hover:bg-yellow-500 transition-colors"
        >
          {userType === 'user' ? 'Switch to Admin' : 'Switch to User'}
        </button>
      </div> */}
    </div>
  );
};

export default HostelPage;