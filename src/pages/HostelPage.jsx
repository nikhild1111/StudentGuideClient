



// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, MapPin, Phone, Wifi, Shield, Zap, UtensilsCrossed, Shirt, Bath, Users, Filter, Search, Star } from 'lucide-react';

// const HostelListing = () => {
//   const [hostels, setHostels] = useState([]);
//   const [filteredHostels, setFilteredHostels] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [genderFilter, setGenderFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState({});
//   const hostelsPerPage = 6;

//   // Dummy data for hostels
//   const dummyHostels = [
//     {
//       id: 1,
//       name: "Green Valley Boys Hostel",
//       type: "boys",
//       rent: 8000,
//       rating: 4.5,
//       images: [
//         "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
//       ],
//       video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//       services: ["wifi", "security", "electricity", "food", "washing", "washroom"],
//       address: "Near IIT Campus, Sector 12, Delhi",
//       contact: "+91 9876543210",
//       description: "Modern hostel with all amenities for engineering students"
//     },
//     {
//       id: 2,
//       name: "Rose Garden Girls Hostel",
//       type: "girls",
//       rent: 7500,
//       rating: 4.8,
//       images: [
//         "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1586105449485-1a7c1b3b7cb4?w=400&h=300&fit=crop"
//       ],
//       video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//       services: ["wifi", "security", "electricity", "food", "washing", "washroom"],
//       address: "Women's College Road, Sector 8, Delhi",
//       contact: "+91 9876543211",
//       description: "Safe and secure hostel exclusively for girls with 24/7 security"
//     },
//     {
//       id: 3,
//       name: "Tech Hub Boys Hostel",
//       type: "boys",
//       rent: 9000,
//       rating: 4.2,
//       images: [
//         "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
//       ],
//       video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//       services: ["wifi", "security", "electricity", "washing", "washroom"],
//       address: "Near Tech Park, Sector 15, Delhi",
//       contact: "+91 9876543212",
//       description: "Perfect for tech students with high-speed internet and modern facilities"
//     },
//     {
//       id: 4,
//       name: "Pearl Girls Hostel",
//       type: "girls",
//       rent: 8500,
//       rating: 4.6,
//       images: [
//         "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1586105449485-1a7c1b3b7cb4?w=400&h=300&fit=crop"
//       ],
//       video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//       services: ["wifi", "security", "electricity", "food", "washing", "washroom"],
//       address: "University Area, Sector 5, Delhi",
//       contact: "+91 9876543213",
//       description: "Premium hostel with excellent facilities and homely environment"
//     },
//     {
//       id: 5,
//       name: "Elite Boys Hostel",
//       type: "boys",
//       rent: 10000,
//       rating: 4.4,
//       images: [
//         "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
//       ],
//       video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//       services: ["wifi", "security", "electricity", "food", "washing", "washroom"],
//       address: "Premium Location, Sector 18, Delhi",
//       contact: "+91 9876543214",
//       description: "Luxury hostel with premium amenities and services"
//     },
//     {
//       id: 6,
//       name: "Sunshine Girls Hostel",
//       type: "girls",
//       rent: 7000,
//       rating: 4.3,
//       images: [
//         "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1586105449485-1a7c1b3b7cb4?w=400&h=300&fit=crop"
//       ],
//       video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//       services: ["wifi", "security", "electricity", "food", "washing", "washroom"],
//       address: "College Street, Sector 3, Delhi",
//       contact: "+91 9876543215",
//       description: "Affordable hostel with quality services for students"
//     },
//     {
//       id: 7,
//       name: "Metro Boys Hostel",
//       type: "boys",
//       rent: 8500,
//       rating: 4.1,
//       images: [
//         "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
//       ],
//       video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//       services: ["wifi", "security", "electricity", "washing", "washroom"],
//       address: "Near Metro Station, Sector 10, Delhi",
//       contact: "+91 9876543216",
//       description: "Convenient location with easy metro connectivity"
//     },
//     {
//       id: 8,
//       name: "Royal Girls Hostel",
//       type: "girls",
//       rent: 9500,
//       rating: 4.7,
//       images: [
//         "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1586105449485-1a7c1b3b7cb4?w=400&h=300&fit=crop"
//       ],
//       video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//       services: ["wifi", "security", "electricity", "food", "washing", "washroom"],
//       address: "Posh Area, Sector 20, Delhi",
//       contact: "+91 9876543217",
//       description: "Luxury girls hostel with top-notch facilities and services"
//     },
//     {
//       id: 9,
//       name: "Campus Boys Hostel",
//       type: "boys",
//       rent: 7500,
//       rating: 4.0,
//       images: [
//         "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
//       ],
//       video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//       services: ["wifi", "security", "electricity", "food", "washing", "washroom"],
//       address: "Campus Road, Sector 7, Delhi",
//       contact: "+91 9876543218",
//       description: "Student-friendly hostel with basic amenities at affordable rates"
//     },
//     {
//       id: 10,
//       name: "Comfort Girls Hostel",
//       type: "girls",
//       rent: 8000,
//       rating: 4.4,
//       images: [
//         "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1586105449485-1a7c1b3b7cb4?w=400&h=300&fit=crop"
//       ],
//       video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//       services: ["wifi", "security", "electricity", "food", "washing", "washroom"],
//       address: "Residential Area, Sector 11, Delhi",
//       contact: "+91 9876543219",
//       description: "Comfortable and secure hostel for girls with modern facilities"
//     }
//   ];

//   const serviceIcons = {
//     wifi: <Wifi className="w-5 h-5" />,
//     security: <Shield className="w-5 h-5" />,
//     electricity: <Zap className="w-5 h-5" />,
//     food: <UtensilsCrossed className="w-5 h-5" />,
//     washing: <Shirt className="w-5 h-5" />,
//     washroom: <Bath className="w-5 h-5" />
//   };

//   const serviceNames = {
//     wifi: "Wi-Fi",
//     security: "Security",
//     electricity: "Electricity",
//     food: "Food",
//     washing: "Washing",
//     washroom: "Washroom"
//   };

//   useEffect(() => {
//     setHostels(dummyHostels);
//     setFilteredHostels(dummyHostels);
    
//     // Initialize image indices
//     const initialIndices = {};
//     dummyHostels.forEach(hostel => {
//       initialIndices[hostel.id] = 0;
//     });
//     setCurrentImageIndex(initialIndices);
//   }, []);

//   useEffect(() => {
//     let filtered = hostels;
    
//     if (genderFilter !== 'all') {
//       filtered = filtered.filter(hostel => hostel.type === genderFilter);
//     }
    
//     if (searchTerm) {
//       filtered = filtered.filter(hostel =>
//         hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         hostel.address.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     setFilteredHostels(filtered);
//     setCurrentPage(1);
//   }, [genderFilter, searchTerm, hostels]);

//   const indexOfLastHostel = currentPage * hostelsPerPage;
//   const indexOfFirstHostel = indexOfLastHostel - hostelsPerPage;
//   const currentHostels = filteredHostels.slice(indexOfFirstHostel, indexOfLastHostel);
//   const totalPages = Math.ceil(filteredHostels.length / hostelsPerPage);

//   const nextImage = (hostelId) => {
//     const hostel = hostels.find(h => h.id === hostelId);
//     const totalImages = hostel.images.length;
//     setCurrentImageIndex(prev => ({
//       ...prev,
//       [hostelId]: (prev[hostelId] + 1) % totalImages
//     }));
//   };

//   const prevImage = (hostelId) => {
//     const hostel = hostels.find(h => h.id === hostelId);
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

//   return (
//     <div className="min-h-screen bg-richblack-900 text-white">
//       {/* Header */}
//       <div className="bg-richblack-800 p-4 md:p-6">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
//             Find Your Perfect <span className="text-yellow-400">Hostel</span>
//           </h1>
          
//           {/* Search and Filter */}
//           <div className="flex flex-col sm:flex-row gap-4 items-center">
//             <div className="flex-1 relative w-full sm:w-auto">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search hostels by name or location..."
//                 className="w-full pl-10 pr-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <div className="flex gap-2 w-full sm:w-auto justify-center">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center gap-2 px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg hover:bg-richblack-600 transition-colors"
//               >
//                 <Filter className="w-5 h-5" />
//                 <span>Filters</span>
//               </button>
//             </div>
//           </div>
          
//           {/* Gender Filter */}
//           {showFilters && (
//             <div className="mt-4 p-4 bg-richblack-700 rounded-lg">
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
//                         : 'bg-richblack-600 hover:bg-richblack-500'
//                     }`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Hostels Grid */}
//       <div className="max-w-7xl mx-auto p-4 md:p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {currentHostels.map(hostel => (
//             <div key={hostel.id} className="bg-richblack-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
//               {/* Image/Video Carousel */}
//               <div className="relative h-48 md:h-56">
//                 {/* Show video as first item if available */}
//                 {currentImageIndex[hostel.id] === 0 && hostel.video ? (
//                   <video
//                     src={hostel.video}
//                     autoPlay
//                     muted
//                     loop
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <img
//                     src={hostel.images[currentImageIndex[hostel.id] || 0]}
//                     alt={hostel.name}
//                     className="w-full h-full object-cover"
//                   />
//                 )}
                
//                 {/* Navigation buttons */}
//                 <button
//                   onClick={() => prevImage(hostel.id)}
//                   className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
                
//                 <button
//                   onClick={() => nextImage(hostel.id)}
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
                
//                 {/* Image/Video indicators */}
//                 <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
//                   {/* Video indicator */}
//                   {hostel.video && (
//                     <div
//                       className={`w-2 h-2 rounded-full ${
//                         currentImageIndex[hostel.id] === 0
//                           ? 'bg-yellow-400'
//                           : 'bg-white bg-opacity-50'
//                       }`}
//                     />
//                   )}
//                   {/* Image indicators */}
//                   {hostel.images.map((_, index) => (
//                     <div
//                       key={index}
//                       className={`w-2 h-2 rounded-full ${
//                         index === currentImageIndex[hostel.id]
//                           ? 'bg-yellow-400'
//                           : 'bg-white bg-opacity-50'
//                       }`}
//                     />
//                   ))}
//                 </div>
                
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
                
//                 <p className="text-gray-300 text-sm mb-3 line-clamp-2">{hostel.description}</p>
                
//                 <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
//                   <MapPin className="w-4 h-4" />
//                   <span className="line-clamp-1">{hostel.address}</span>
//                 </div>
                
//                 {/* Services */}
//                 <div className="mb-4">
//                   <h4 className="text-sm font-medium text-gray-300 mb-2">Services</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {hostel.services.map(service => (
//                       <div
//                         key={service}
//                         className="flex items-center gap-1 bg-richblack-600 px-2 py-1 rounded-lg text-xs"
//                         title={serviceNames[service]}
//                       >
//                         {serviceIcons[service]}
//                         <span className="hidden sm:inline">{serviceNames[service]}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 {/* Price and Contact */}
//                 <div className="flex justify-between items-center pt-3 border-t border-richblack-600">
//                   <div>
//                     <div className="text-xl font-bold text-yellow-400">₹{hostel.rent}</div>
//                     <div className="text-xs text-gray-400">per month</div>
//                   </div>
                  
//                   <div className="flex gap-2">
//                     <a
//                       href={`tel:${hostel.contact}`}
//                       className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
//                     >
//                       <Phone className="w-4 h-4" />
//                       <span className="hidden sm:inline">Call</span>
//                     </a>
//                     <button className="bg-richblack-600 hover:bg-richblack-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
//                       Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* No results message */}
//         {filteredHostels.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-gray-400 text-lg mb-2">No hostels found</div>
//             <p className="text-gray-500">Try adjusting your filters or search terms</p>
//           </div>
//         )}
        
//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center mt-8 gap-2">
//             <button
//               onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//               disabled={currentPage === 1}
//               className="flex items-center gap-1 px-4 py-2 bg-richblack-700 hover:bg-richblack-600 disabled:bg-richblack-800 disabled:text-gray-500 rounded-lg transition-colors"
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
//                       onClick={() => setCurrentPage(pageNumber)}
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
//               onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//               disabled={currentPage === totalPages}
//               className="flex items-center gap-1 px-4 py-2 bg-richblack-700 hover:bg-richblack-600 disabled:bg-richblack-800 disabled:text-gray-500 rounded-lg transition-colors"
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


/////////////////************************************** */


// import React, { useState, useEffect } from 'react';
// const Backend_url = import.meta.env.VITE_BACKEND_URL;
// import { ChevronLeft, ChevronRight, MapPin, Phone, Wifi, Shield, Zap, UtensilsCrossed, Shirt, Bath, Users, Filter, Search, Star } from 'lucide-react';
// import axios from 'axios';
// const HostelListing = () => {
//   const [hostels, setHostels] = useState([]);
//    const [loading, setLoading] = useState(true);
//   const [filteredHostels, setFilteredHostels] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [genderFilter, setGenderFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState({});
//   const hostelsPerPage = 6;

//   // // Dummy data for hostels
//   // const dummyHostels = [
//   //   {
//   //     id: 1,
//   //     name: "Green Valley Boys Hostel",
//   //     type: "boys",
//   //     rent: 8000,
//   //     rating: 4.5,
//   //     images: [
//   //       "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
//   //     ],
//   //     video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//   //     services: ["wifi", "security", "electricity", "food", "washing", "washroom"],
//   //     address: "Near IIT Campus, Sector 12, Delhi",
//   //     contact: "+91 9834061694",
//   //     description: "Modern hostel with all amenities for engineering students"
//   //   },
//   //   {
//   //     id: 2,
//   //     name: "Rose Garden Girls Hostel",
//   //     type: "girls",
//   //     rent: 7500,
//   //     rating: 4.8,
//   //     images: [
//   //       "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1586105449485-1a7c1b3b7cb4?w=400&h=300&fit=crop"
//   //     ],
//   //     video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//   //     services: ["wifi", "security", "electricity", "food", "washing", "washroom"],
//   //     address: "Women's College Road, Sector 8, Delhi",
//   //     contact: "+91 9876543211",
//   //     description: "Safe and secure hostel exclusively for girls with 24/7 security"
//   //   },
//   //   {
//   //     id: 3,
//   //     name: "Tech Hub Boys Hostel",
//   //     type: "boys",
//   //     rent: 9000,
//   //     rating: 4.2,
//   //     images: [
//   //       "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
//   //     ],
//   //     video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//   //     services: ["wifi", "security", "electricity", "washing", "washroom"],
//   //     address: "Near Tech Park, Sector 15, Delhi",
//   //     contact: "+91 9876543212",
//   //     description: "Perfect for tech students with high-speed internet and modern facilities"
//   //   },
//   //   {
//   //     id: 4,
//   //     name: "Pearl Girls Hostel",
//   //     type: "girls",
//   //     rent: 8500,
//   //     rating: 4.6,
//   //     images: [
//   //       "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1586105449485-1a7c1b3b7cb4?w=400&h=300&fit=crop"
//   //     ],
//   //     video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//   //     services: ["wifi", "security", "electricity", "food", "washing", "washroom"],
//   //     address: "University Area, Sector 5, Delhi",
//   //     contact: "+91 9876543213",
//   //     description: "Premium hostel with excellent facilities and homely environment"
//   //   },
//   //   {
//   //     id: 5,
//   //     name: "Elite Boys Hostel",
//   //     type: "boys",
//   //     rent: 10000,
//   //     rating: 4.4,
//   //     images: [
//   //       "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
//   //     ],
//   //     video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//   //     services: ["wifi", "security", "electricity", "food", "washing", "washroom"],
//   //     address: "Premium Location, Sector 18, Delhi",
//   //     contact: "+91 9876543214",
//   //     description: "Luxury hostel with premium amenities and services"
//   //   },
//   //   {
//   //     id: 6,
//   //     name: "Sunshine Girls Hostel",
//   //     type: "girls",
//   //     rent: 7000,
//   //     rating: 4.3,
//   //     images: [
//   //       "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1586105449485-1a7c1b3b7cb4?w=400&h=300&fit=crop"
//   //     ],
//   //     video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//   //     services: ["wifi", "security", "electricity", "food", "washing", "washroom"],
//   //     address: "College Street, Sector 3, Delhi",
//   //     contact: "+91 9876543215",
//   //     description: "Affordable hostel with quality services for students"
//   //   },
//   //   {
//   //     id: 7,
//   //     name: "Metro Boys Hostel",
//   //     type: "boys",
//   //     rent: 8500,
//   //     rating: 4.1,
//   //     images: [
//   //       "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
//   //     ],
//   //     video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//   //     services: ["wifi", "security", "electricity", "washing", "washroom"],
//   //     address: "Near Metro Station, Sector 10, Delhi",
//   //     contact: "+91 9876543216",
//   //     description: "Convenient location with easy metro connectivity"
//   //   },
//   //   {
//   //     id: 8,
//   //     name: "Royal Girls Hostel",
//   //     type: "girls",
//   //     rent: 9500,
//   //     rating: 4.7,
//   //     images: [
//   //       "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1586105449485-1a7c1b3b7cb4?w=400&h=300&fit=crop"
//   //     ],
//   //     video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//   //     services: ["wifi", "security", "electricity", "food", "washing", "washroom"],
//   //     address: "Posh Area, Sector 20, Delhi",
//   //     contact: "+91 9876543217",
//   //     description: "Luxury girls hostel with top-notch facilities and services"
//   //   },
//   //   {
//   //     id: 9,
//   //     name: "Campus Boys Hostel",
//   //     type: "boys",
//   //     rent: 7500,
//   //     rating: 4.0,
//   //     images: [
//   //       "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
//   //     ],
//   //     video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//   //     services: ["wifi", "security", "electricity", "food", "washing", "washroom"],
//   //     address: "Campus Road, Sector 7, Delhi",
//   //     contact: "+91 9876543218",
//   //     description: "Student-friendly hostel with basic amenities at affordable rates"
//   //   },
//   //   {
//   //     id: 10,
//   //     name: "Comfort Girls Hostel",
//   //     type: "girls",
//   //     rent: 8000,
//   //     rating: 4.4,
//   //     images: [
//   //       "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=400&h=300&fit=crop",
//   //       "https://images.unsplash.com/photo-1586105449485-1a7c1b3b7cb4?w=400&h=300&fit=crop"
//   //     ],
//   //     video: "https://player.vimeo.com/external/342571552.sd.mp4?s=c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0c7b0",
//   //     services: ["wifi", "security", "electricity", "food", "washing", "washroom"],
//   //     address: "Residential Area, Sector 11, Delhi",
//   //     contact: "+91 9876543219",
//   //     description: "Comfortable and secure hostel for girls with modern facilities"
//   //   }
//   // ];

//   const serviceIcons = {
//     wifi: <Wifi className="w-5 h-5" />,
//     security: <Shield className="w-5 h-5" />,
//     electricity: <Zap className="w-5 h-5" />,
//     food: <UtensilsCrossed className="w-5 h-5" />,
//     washing: <Shirt className="w-5 h-5" />,
//     washroom: <Bath className="w-5 h-5" />
//   };

//   const serviceNames = {
//     wifi: "Wi-Fi",
//     security: "Security",
//     electricity: "Electricity",
//     food: "Food",
//     washing: "Washing",
//     washroom: "Washroom"
//   };

//  useEffect(() => {
//     const fetchHostels = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.post(`${Backend_url}/api/hostels/fetch`, {
//           page: 1, limit: 6, search: searchTerm, type: genderFilter
//         });

//         console.log(res);
//         const hostelList = res.data.data;
//         setHostels(hostelList);
//         setFilteredHostels(hostelList);

//         const initialIndices = {};
//         hostelList.forEach((hostel, index) => {
//           initialIndices[hostel._id || hostel.id || index] = 0;
//         });
//         setCurrentImageIndex(initialIndices);
//       } catch (error) {
//         console.error("Error fetching hostels:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHostels();
//   }, []);

//   useEffect(() => {
//     let filtered = hostels;
    
//     if (genderFilter !== 'all') {
//       filtered = filtered.filter(hostel => hostel.type === genderFilter);
//     }
    
//     if (searchTerm) {
//       filtered = filtered.filter(hostel =>
//         hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         hostel.address.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     setFilteredHostels(filtered);
//     setCurrentPage(1);
//   }, [genderFilter, searchTerm, hostels]);

//   const indexOfLastHostel = currentPage * hostelsPerPage;
//   const indexOfFirstHostel = indexOfLastHostel - hostelsPerPage;
//   const currentHostels = filteredHostels.slice(indexOfFirstHostel, indexOfLastHostel);
//   const totalPages = Math.ceil(filteredHostels.length / hostelsPerPage);

//   const nextImage = (hostelId) => {
//     const hostel = hostels.find(h => h.id === hostelId);
//     const totalImages = hostel.images.length;
//     setCurrentImageIndex(prev => ({
//       ...prev,
//       [hostelId]: (prev[hostelId] + 1) % totalImages
//     }));
//   };

//   const prevImage = (hostelId) => {
//     const hostel = hostels.find(h => h.id === hostelId);
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

//   return (
//     <div className="min-h-screen bg-richblack-900 text-white">
//       {/* Header */}
//       <div className="bg-richblack-900 p-4 md:p-6">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
//             Find Your Perfect <span className="text-yellow-400">Hostel</span>
//           </h1>
          
//           {/* Search and Filter */}
//           <div className="flex  md:flex-row gap-4 items-center">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-richblack-800 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search hostels by name or location..."
//                 className="w-full pl-10 pr-4 py-3 bg-richblack-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center gap-2 px-4 py-3 bg-richblack-800 border border-gray-600 rounded-lg hover:bg-richblack-500 transition-colors"
//               >
//                 <Filter className="w-5 h-5" />
//                 <span className="hidden sm:inline">Filters</span>
//               </button>
//             </div>
//           </div>
          
//           {/* Gender Filter */}
//           {showFilters && (
//             <div className="mt-4 p-4 bg-richblack-800 rounded-lg border border-richblack-400">
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
//         </div>
//       </div>

//       {/* Hostels Grid */}
//       <div className="max-w-7xl mx-auto p-4 md:p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {currentHostels.map(hostel => (
//             <div key={hostel._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
//               {/* Image Carousel */}
//               <div className="relative h-48 md:h-56">
//                 <img
//                   src={hostel.images[currentImageIndex[hostel.id] || 0]}
//                   alt={hostel.name}
//                   className="w-full h-full object-cover"
//                 />
                
//                 {/* Navigation buttons */}
//                 <button
//                   onClick={() => prevImage(hostel.id)}
//                   className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
                
//                 <button
//                   onClick={() => nextImage(hostel.id)}
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
                
//                 {/* Image indicators */}
//                 <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
//                   {hostel.images.map((_, index) => (
//                     <div
//                       key={index}
//                       className={`w-2 h-2 rounded-full ${
//                         index === currentImageIndex[hostel.id]
//                           ? 'bg-yellow-400'
//                           : 'bg-white bg-opacity-50'
//                       }`}
//                     />
//                   ))}
//                 </div>
                
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
                
//                 <p className="text-gray-300 text-sm mb-3 line-clamp-2">{hostel.description}</p>
                
//                 <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
//                   <MapPin className="w-4 h-4" />
//                   <span className="line-clamp-1">{hostel.address}</span>
//                 </div>
                
//                 {/* Services */}
//                 <div className="mb-4">
//                   <h4 className="text-sm font-medium text-gray-300 mb-2">Services</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {hostel.services.map(service => (
//                       <div
//                         key={service}
//                         className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded-lg text-xs"
//                         title={serviceNames[service]}
//                       >
//                         {serviceIcons[service]}
//                         <span className="inline">{serviceNames[service]}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 {/* Price and Contact */}
//                 <div className="flex justify-between items-center pt-3 border-t border-gray-700">
//                   <div>
//                     <div className="text-xl font-bold text-yellow-400">₹{hostel.rent}</div>
//                     <div className="text-xs text-gray-400">per month</div>
//                   </div>
                  


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



//                   <div className="flex gap-2">
//                     {/* <a
//                       href={`tel:${hostel.contact}`}
//                       className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
//                     > */}
//                       <Phone className="w-5 h-6" />
//                       <span className="inline">{hostel.contact} </span>
//                     {/* </a> */}
//                     {/* <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
//                       View Details
//                     </button> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* No results message */}
//         {filteredHostels.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-gray-400 text-lg mb-2">No hostels found</div>
//             <p className="text-gray-500">Try adjusting your filters or search terms</p>
//           </div>
//         )}
        
//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center mt-8 gap-2">
//             <button
//               onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
//                       onClick={() => setCurrentPage(pageNumber)}
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
//               onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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









import React, { useState, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, MapPin, Phone, Wifi, Shield, Zap,
  UtensilsCrossed, Shirt, Bath, Droplets, Search, Star, Filter, Loader2
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHostels } from '../services/operations/hostelAPI';

const HostelListing = () => {
  const dispatch = useDispatch();
  const { hostels, pagination, loading, error } = useSelector(state => state.hostel);

  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const hostelsPerPage = 6;

  const serviceIcons = {
    wifi: <Wifi className="w-4 h-4" />, security: <Shield className="w-4 h-4" />, electricity: <Zap className="w-4 h-4" />,
    food: <UtensilsCrossed className="w-4 h-4" />, washing: <Shirt className="w-4 h-4" />, washroom: <Bath className="w-4 h-4" />,
    personal_toilet: <Bath className="w-4 h-4" />, water_filter: <Droplets className="w-4 h-4" />
  };

  const serviceNames = {
    wifi: "Wi-Fi", security: "Security", electricity: "Electricity", food: "Food",
    washing: "Washing", washroom: "Washroom", personal_toilet: "Personal Toilet", water_filter: "Water Filter"
  };

  useEffect(() => {
    dispatch(fetchHostels({ page: 1, limit: hostelsPerPage, search: searchTerm, type: genderFilter }));
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setCurrentPage(1);
      dispatch(fetchHostels({ page: 1, limit: hostelsPerPage, search: searchTerm, type: genderFilter }));
    }, 1000);
    return () => clearTimeout(delay);
  }, [searchTerm, genderFilter]);

  useEffect(() => {
    if (currentPage > 1) {
      dispatch(fetchHostels({ page: currentPage, limit: hostelsPerPage, search: searchTerm, type: genderFilter }));
    }
  }, [currentPage]);

  useEffect(() => {
    const initialIndices = {};
    hostels.forEach((h) => { initialIndices[h._id] = 0; });
    setCurrentImageIndex(initialIndices);
  }, [hostels]);

  const nextImage = (id) => {
    const hostel = hostels.find(h => h._id === id);
    if (!hostel || !hostel.images.length) return;
    const total = hostel.images.length;
    setCurrentImageIndex(prev => ({ ...prev, [id]: (prev[id] + 1) % total }));
  };

  const prevImage = (id) => {
    const hostel = hostels.find(h => h._id === id);
    if (!hostel || !hostel.images.length) return;
    const total = hostel.images.length;
    setCurrentImageIndex(prev => ({ ...prev, [id]: prev[id] === 0 ? total - 1 : prev[id] - 1 }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
let totalPages=0;
let total =0;
if(pagination){
 totalPages= pagination.totalPages;
total= pagination.total;
}
  
const resetFiltersThenSearch = () => {
  setGenderFilter('all'); // Step 1: reset filter
  setTimeout(() => {
    setSearchTerm('');     // Step 2: reset search after 1 sec
  }, 1000);
};



  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (rating % 1 !== 0) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }
    return stars;
  };



  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
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
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'boys', label: 'Boys Only' },
                  { value: 'girls', label: 'Girls Only' }
                ].map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => setGenderFilter(filter.value)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      genderFilter === filter.value
                        ? 'bg-yellow-400 text-gray-900'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
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
              <span>Showing {hostels.length} of {total} hostels</span>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto p-4">
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {/* Hostels Grid */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostels.map(hostel => (
            <div key={hostel._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              {/* Image Carousel */}
              <div className="relative h-48 md:h-56">
                {hostel.images && hostel.images.length > 0 ? (
                  <>
                    <img
                      src={hostel.images[currentImageIndex[hostel._id] || 0]}
                      alt={hostel.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop';
                      }}
                    />
                    
                    {/* Navigation buttons */}
                    {hostel.images.length > 1 && (
                      <>
                        <button
                          onClick={() => prevImage(hostel._id)}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => nextImage(hostel._id)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        
                        {/* Image indicators */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {hostel.images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index === (currentImageIndex[hostel._id] || 0)
                                  ? 'bg-yellow-400'
                                  : 'bg-white bg-opacity-50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                
                {/* Type badge */}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                  hostel.type === 'boys' ? 'bg-blue-600' : 'bg-pink-600'
                }`}>
                  {hostel.type === 'boys' ? 'Boys Only' : 'Girls Only'}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white">{hostel.name}</h3>
                  <div className="flex items-center gap-1">
                    {renderStars(hostel.rating)}
                    <span className="text-sm text-gray-400 ml-1">({hostel.rating})</span>
                  </div>
                </div>
                
                {hostel.description && (
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">{hostel.description}</p>
                )}
                
                <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="line-clamp-1">
                    {hostel.address?.full || hostel.address}
                  </span>
                </div>
                
                {/* Services */}
                {hostel.services && hostel.services.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {hostel.services.map(service => (
                        <div
                          key={service}
                          className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded-lg text-xs"
                          title={serviceNames[service]}
                        >
                          {serviceIcons[service]}
                          <span className="hidden sm:inline">{serviceNames[service]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Price and Contact */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                  <div>
                    <div className="text-xl font-bold text-yellow-400">₹{hostel.rent}</div>
                    <div className="text-xs text-gray-400">per month</div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{hostel.contact}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* No results message */}
        {!loading && hostels.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No hostels found</div>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                const isCurrentPage = pageNumber === currentPage;
                
                // Show first page, last page, current page, and pages around current
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        isCurrentPage
                          ? 'bg-yellow-400 text-gray-900'
                          : 'bg-gray-700 hover:bg-gray-600 text-white'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
                
                // Show ellipsis
                if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                  return (
                    <span key={pageNumber} className="w-10 h-10 flex items-center justify-center text-gray-400">
                      ...
                    </span>
                  );
                }
                
                return null;
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelListing;










