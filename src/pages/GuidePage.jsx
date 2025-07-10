// import React, { useState, useEffect } from 'react';
// import { Search, Filter, Phone, MapPin, Star, User, GraduationCap, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';

// // Mock data for demonstration
// const mockGuides = [
//   {
//     _id: '1',
//     name: 'Rahul Sharma',
//     email: 'rahul@example.com',
//     phone: '+91 9876543210',
//     image: 'https://via.placeholder.com/300x200?text=Rahul+Sharma',
//     department: 'IT',
//     year: 4,
//     city: 'Pune',
//     taluka: 'Pimpri',
//     state: 'Maharashtra',
//     country: 'India',
//     gender: 'Male',
//     role: 'Guide',
//     pay: 1500
//   },
//   {
//     _id: '2',
//     name: 'Priya Patel',
//     email: 'priya@example.com',
//     phone: '+91 9876543211',
//     image: 'https://via.placeholder.com/300x200?text=Priya+Patel',
//     department: 'CE',
//     year: 3,
//     city: 'Mumbai',
//     taluka: 'Andheri',
//     state: 'Maharashtra',
//     country: 'India',
//     gender: 'Female',
//     role: 'Student',
//     pay: 1200
//   },
//   {
//     _id: '3',
//     name: 'Amit Kumar',
//     email: 'amit@example.com',
//     phone: '+91 9876543212',
//     image: 'https://via.placeholder.com/300x200?text=Amit+Kumar',
//     department: 'ME',
//     year: 4,
//     city: 'Nagpur',
//     taluka: 'Sitabuldi',
//     state: 'Maharashtra',
//     country: 'India',
//     gender: 'Male',
//     role: 'Guide',
//     pay: 1800
//   },
//   {
//     _id: '4',
//     name: 'Sneha Joshi',
//     email: 'sneha@example.com',
//     phone: '+91 9876543213',
//     image: 'https://via.placeholder.com/300x200?text=Sneha+Joshi',
//     department: 'EE',
//     year: 2,
//     city: 'Pune',
//     taluka: 'Kothrud',
//     state: 'Maharashtra',
//     country: 'India',
//     gender: 'Female',
//     role: 'Student',
//     pay: 1000
//   },
//   {
//     _id: '5',
//     name: 'Vikram Singh',
//     email: 'vikram@example.com',
//     phone: '+91 9876543214',
//     image: 'https://via.placeholder.com/300x200?text=Vikram+Singh',
//     department: 'EC',
//     year: 4,
//     city: 'Thane',
//     taluka: 'Kalwa',
//     state: 'Maharashtra',
//     country: 'India',
//     gender: 'Male',
//     role: 'Guide',
//     pay: 1600
//   },
//   {
//     _id: '6',
//     name: 'Ananya Rao',
//     email: 'ananya@example.com',
//     phone: '+91 9876543215',
//     image: 'https://via.placeholder.com/300x200?text=Ananya+Rao',
//     department: 'IT',
//     year: 3,
//     city: 'Pune',
//     taluka: 'Hadapsar',
//     state: 'Maharashtra',
//     country: 'India',
//     gender: 'Female',
//     role: 'Student',
//     pay: 1300
//   }
// ];

// // Simple Pagination Component
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   if (totalPages <= 1) return null;

//   const handlePageChange = (page) => {
//     onPageChange(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="flex justify-center items-center mt-8 gap-2">
//       <button
//         onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//         disabled={currentPage === 1}
//         className="flex items-center gap-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg transition-colors"
//       >
//         <ChevronLeft className="w-4 h-4" />
//         Previous
//       </button>
      
//       <div className="flex gap-1">
//         {[...Array(totalPages)].map((_, index) => {
//           const pageNumber = index + 1;
//           const isCurrentPage = pageNumber === currentPage;
          
//           if (
//             pageNumber === 1 ||
//             pageNumber === totalPages ||
//             (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
//           ) {
//             return (
//               <button
//                 key={pageNumber}
//                 onClick={() => handlePageChange(pageNumber)}
//                 className={`w-10 h-10 rounded-lg font-medium transition-colors ${
//                   isCurrentPage
//                     ? 'bg-yellow-400 text-gray-900'
//                     : 'bg-gray-700 hover:bg-gray-600 text-white'
//                 }`}
//               >
//                 {pageNumber}
//               </button>
//             );
//           }
          
//           if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
//             return (
//               <span key={pageNumber} className="w-10 h-10 flex items-center justify-center text-gray-400">
//                 ...
//               </span>
//             );
//           }
          
//           return null;
//         })}
//       </div>
      
//       <button
//         onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//         disabled={currentPage === totalPages}
//         className="flex items-center gap-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg transition-colors"
//       >
//         Next
//         <ChevronRight className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };
//   const defaultImage = "https://via.placeholder.com/300x200?text=Guide";
  
//   return (
//     <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
//       <div className="relative">
//         <img 
//           src={guide.image || defaultImage} 
//           alt={guide.name}
//           className="w-full h-48 object-cover"
//         />
//         <div className="absolute top-4 right-4">
//           <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//             guide.role === 'Guide' ? 'bg-yellow-400 text-gray-900' : 'bg-blue-500 text-white'
//           }`}>
//             {guide.role}
//           </span>
//         </div>
//       </div>
      
//       <div className="p-4">
//         <h3 className="text-white font-semibold text-lg mb-2">{guide.name}</h3>
        
//         <div className="flex items-center gap-2 mb-2">
//           <GraduationCap className="w-4 h-4 text-yellow-400" />
//           <span className="text-gray-300 text-sm">{guide.department}</span>
//         </div>
        
//         <div className="flex items-center gap-2 mb-2">
//           <Star className="w-4 h-4 text-yellow-400" />
//           <span className="text-gray-300 text-sm">Year {guide.year}</span>
//         </div>
        
//         <div className="flex items-center gap-2 mb-2">
//           <MapPin className="w-4 h-4 text-yellow-400" />
//           <span className="text-gray-300 text-sm">
//             {guide.city}, {guide.taluka}, {guide.state}, {guide.country}
//           </span>
//         </div>
        
//         <div className="flex items-center gap-2 mb-2">
//           <User className="w-4 h-4 text-yellow-400" />
//           <span className="text-gray-300 text-sm">{guide.gender}</span>
//         </div>
        
//         <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
//           <div className="flex items-center gap-2">
//             <DollarSign className="w-4 h-4 text-yellow-400" />
//             <span className="text-yellow-400 font-bold text-lg">₹{guide.pay}</span>
//             <span className="text-gray-400 text-sm">per session</span>
//           </div>
          
//           <button className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg transition-colors">
//             <Phone className="w-4 h-4" />
//             <span className="text-sm font-medium">Contact</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SearchBar = ({ searchTerm, onSearchChange }) => {
//   return (
//     <div className="relative">
//       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//       <input
//         type="text"
//         placeholder="Search guides by name, email, city, department..."
//         value={searchTerm}
//         onChange={(e) => onSearchChange(e.target.value)}
//         className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
//       />
//     </div>
//   );
// };

// const FilterPanel = ({ filters, onFiltersChange, showFilters }) => {
//   if (!showFilters) return null;
  
//   return (
//     <div className="bg-gray-800 p-4 rounded-lg">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div>
//           <label className="block text-gray-300 text-sm mb-2">Role</label>
//           <select 
//             value={filters.role || ''}
//             onChange={(e) => onFiltersChange({ ...filters, role: e.target.value })}
//             className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           >
//             <option value="">All Roles</option>
//             <option value="Student">Student</option>
//             <option value="Guide">Guide</option>
//           </select>
//         </div>
        
//         <div>
//           <label className="block text-gray-300 text-sm mb-2">Department</label>
//           <select 
//             value={filters.department || ''}
//             onChange={(e) => onFiltersChange({ ...filters, department: e.target.value })}
//             className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           >
//             <option value="">All Departments</option>
//             <option value="IT">IT</option>
//             <option value="CE">CE</option>
//             <option value="ME">ME</option>
//             <option value="EE">EE</option>
//             <option value="EC">EC</option>
//           </select>
//         </div>
        
//         <div>
//           <label className="block text-gray-300 text-sm mb-2">Year</label>
//           <select 
//             value={filters.year || ''}
//             onChange={(e) => onFiltersChange({ ...filters, year: e.target.value })}
//             className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           >
//             <option value="">All Years</option>
//             <option value="1">1st Year</option>
//             <option value="2">2nd Year</option>
//             <option value="3">3rd Year</option>
//             <option value="4">4th Year</option>
//           </select>
//         </div>
        
//         <div>
//           <label className="block text-gray-300 text-sm mb-2">Gender</label>
//           <select 
//             value={filters.gender || ''}
//             onChange={(e) => onFiltersChange({ ...filters, gender: e.target.value })}
//             className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           >
//             <option value="">All Genders</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GuidePage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({});
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [guidesPerPage] = useState(12);
//   const [loading, setLoading] = useState(false);
  
//   // Use mock data - replace with Redux state in your actual app
//   const allGuides = mockGuides;
  
//   // Filter guides based on search and filters
//   const filteredGuides = allGuides.filter(guide => {
//     const matchesSearch = !searchTerm || 
//       guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       guide.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       guide.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       guide.department.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesRole = !filters.role || guide.role === filters.role;
//     const matchesDepartment = !filters.department || guide.department === filters.department;
//     const matchesYear = !filters.year || guide.year.toString() === filters.year;
//     const matchesGender = !filters.gender || guide.gender === filters.gender;
    
//     return matchesSearch && matchesRole && matchesDepartment && matchesYear && matchesGender;
//   });
  
//   // Pagination
//   const totalPages = Math.ceil(filteredGuides.length / guidesPerPage);
//   const startIndex = (currentPage - 1) * guidesPerPage;
//   const currentGuides = filteredGuides.slice(startIndex, startIndex + guidesPerPage);
  
//   useEffect(() => {
//     // Simulate API call
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   }, [searchTerm, filters]);
  
//   const handleBecomeGuide = () => {
//     // Replace with actual navigation logic
//     console.log('Navigate to guide application');
//     // if (token) {
//     //   navigate('/guideapplication');
//     // } else {
//     //   navigate('/login');
//     // }
//   };
  
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
  
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="text-white text-xl">Loading guides...</div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold mb-4">
//             Find Your Perfect <span className="text-yellow-400">Guide</span>
//           </h1>
//           <p className="text-gray-300 text-lg">
//             Connect with experienced seniors and guides for your academic journey
//           </p>
//         </div>
        
//         {/* Become Guide Button */}
//         <div className="flex justify-center mb-8">
//           <button
//             onClick={handleBecomeGuide}
//             className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
//           >
//             Become a Guide
//           </button>
//         </div>
        
//         {/* Search and Filter */}
//         <div className="mb-8 space-y-4">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <SearchBar 
//                 searchTerm={searchTerm} 
//                 onSearchChange={setSearchTerm}
//               />
//             </div>
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition-colors"
//             >
//               <Filter className="w-5 h-5" />
//               Filters
//             </button>
//           </div>
          
//           <FilterPanel 
//             filters={filters}
//             onFiltersChange={setFilters}
//             showFilters={showFilters}
//           />
//         </div>
        
//         {/* Results Count */}
//         <div className="mb-6">
//           <p className="text-gray-300">
//             Showing {currentGuides.length} of {filteredGuides.length} guides
//           </p>
//         </div>
        
//         {/* Guide Cards */}
//         {currentGuides.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//             {currentGuides.map((guide) => (
//               <GuideCard key={guide._id} guide={guide} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-400 text-lg">No guides found matching your criteria</p>
//           </div>
//         )}
        
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

// export default GuidePage;








// import React, { useState, useEffect } from 'react';
// import { Search, Filter, Phone, MapPin, Star, User, GraduationCap, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';

// // Mock data for demonstration
// const mockGuides = [
//   {
//     _id: '1',
//     name: 'Rahul Sharma',
//     email: 'rahul@example.com',
//     phone: '+91 9876543210',
//     image: 'https://via.placeholder.com/300x200?text=Rahul+Sharma',
//     department: 'IT',
//     year: 4,
//     city: 'Pune',
//     taluka: 'Pimpri',
//     state: 'Maharashtra',
//     country: 'India',
//     gender: 'Male',
//     role: 'Guide',
//     pay: 1500
//   },
//   {
//     _id: '2',
//     name: 'Priya Patel',
//     email: 'priya@example.com',
//     phone: '+91 9876543211',
//     image: 'https://via.placeholder.com/300x200?text=Priya+Patel',
//     department: 'CE',
//     year: 3,
//     city: 'Mumbai',
//     taluka: 'Andheri',
//     state: 'Maharashtra',
//     country: 'India',
//     gender: 'Female',
//     role: 'Student',
//     pay: 1200
//   },
//   {
//     _id: '3',
//     name: 'Amit Kumar',
//     email: 'amit@example.com',
//     phone: '+91 9876543212',
//     image: 'https://via.placeholder.com/300x200?text=Amit+Kumar',
//     department: 'ME',
//     year: 4,
//     city: 'Nagpur',
//     taluka: 'Sitabuldi',
//     state: 'Maharashtra',
//     country: 'India',
//     gender: 'Male',
//     role: 'Guide',
//     pay: 1800
//   },
//   {
//     _id: '4',
//     name: 'Sneha Joshi',
//     email: 'sneha@example.com',
//     phone: '+91 9876543213',
//     image: 'https://via.placeholder.com/300x200?text=Sneha+Joshi',
//     department: 'EE',
//     year: 2,
//     city: 'Pune',
//     taluka: 'Kothrud',
//     state: 'Maharashtra',
//     country: 'India',
//     gender: 'Female',
//     role: 'Student',
//     pay: 1000
//   },
//   {
//     _id: '5',
//     name: 'Vikram Singh',
//     email: 'vikram@example.com',
//     phone: '+91 9876543214',
//     image: 'https://via.placeholder.com/300x200?text=Vikram+Singh',
//     department: 'EC',
//     year: 4,
//     city: 'Thane',
//     taluka: 'Kalwa',
//     state: 'Maharashtra',
//     country: 'India',
//     gender: 'Male',
//     role: 'Guide',
//     pay: 1600
//   },
//   {
//     _id: '6',
//     name: 'Ananya Rao',
//     email: 'ananya@example.com',
//     phone: '+91 9876543215',
//     image: 'https://via.placeholder.com/300x200?text=Ananya+Rao',
//     department: 'IT',
//     year: 3,
//     city: 'Pune',
//     taluka: 'Hadapsar',
//     state: 'Maharashtra',
//     country: 'India',
//     gender: 'Female',
//     role: 'Student',
//     pay: 1300
//   }
// ];

// // Simple Pagination Component
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   if (totalPages <= 1) return null;

//   const handlePageChange = (page) => {
//     onPageChange(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="flex justify-center items-center mt-8 gap-2">
//       <button
//         onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//         disabled={currentPage === 1}
//         className="flex items-center gap-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg transition-colors"
//       >
//         <ChevronLeft className="w-4 h-4" />
//         Previous
//       </button>
      
//       <div className="flex gap-1">
//         {[...Array(totalPages)].map((_, index) => {
//           const pageNumber = index + 1;
//           const isCurrentPage = pageNumber === currentPage;
          
//           if (
//             pageNumber === 1 ||
//             pageNumber === totalPages ||
//             (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
//           ) {
//             return (
//               <button
//                 key={pageNumber}
//                 onClick={() => handlePageChange(pageNumber)}
//                 className={`w-10 h-10 rounded-lg font-medium transition-colors ${
//                   isCurrentPage
//                     ? 'bg-yellow-400 text-gray-900'
//                     : 'bg-gray-700 hover:bg-gray-600 text-white'
//                 }`}
//               >
//                 {pageNumber}
//               </button>
//             );
//           }
          
//           if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
//             return (
//               <span key={pageNumber} className="w-10 h-10 flex items-center justify-center text-gray-400">
//                 ...
//               </span>
//             );
//           }
          
//           return null;
//         })}
//       </div>
      
//       <button
//         onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//         disabled={currentPage === totalPages}
//         className="flex items-center gap-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg transition-colors"
//       >
//         Next
//         <ChevronRight className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };

// const GuideCard = ({ guide }) => {
//   const defaultImage = "https://via.placeholder.com/300x200?text=Guide";
  
//   return (
//     <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
//       <div className="relative">
//         <img 
//           src={guide.image || defaultImage} 
//           alt={guide.name}
//           className="w-full h-48 object-cover"
//         />
//         <div className="absolute top-4 right-4">
//           <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//             guide.role === 'Guide' ? 'bg-yellow-400 text-gray-900' : 'bg-blue-500 text-white'
//           }`}>
//             {guide.role}
//           </span>
//         </div>
//       </div>
      
//       <div className="p-4">
//         <h3 className="text-white font-semibold text-lg mb-2">{guide.name}</h3>
        
//         <div className="flex items-center gap-2 mb-2">
//           <GraduationCap className="w-4 h-4 text-yellow-400" />
//           <span className="text-gray-300 text-sm">{guide.department}</span>
//         </div>
        
//         <div className="flex items-center gap-2 mb-2">
//           <Star className="w-4 h-4 text-yellow-400" />
//           <span className="text-gray-300 text-sm">Year {guide.year}</span>
//         </div>
        
//         <div className="flex items-center gap-2 mb-2">
//           <MapPin className="w-4 h-4 text-yellow-400" />
//           <span className="text-gray-300 text-sm">
//             {guide.city}, {guide.taluka}, {guide.state}, {guide.country}
//           </span>
//         </div>
        
//         <div className="flex items-center gap-2 mb-2">
//           <User className="w-4 h-4 text-yellow-400" />
//           <span className="text-gray-300 text-sm">{guide.gender}</span>
//         </div>
        
//         <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
//           <div className="flex items-center gap-2">
//             <DollarSign className="w-4 h-4 text-yellow-400" />
//             <span className="text-yellow-400 font-bold text-lg">₹{guide.pay}</span>
//             <span className="text-gray-400 text-sm">per session</span>
//           </div>
          
//           <button className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg transition-colors">
//             <Phone className="w-4 h-4" />
//             <span className="text-sm font-medium">Contact</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SearchBar = ({ searchTerm, onSearchChange }) => {
//   return (
//     <div className="relative">
//       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//       <input
//         type="text"
//         placeholder="Search guides by name, email, city, department..."
//         value={searchTerm}
//         onChange={(e) => onSearchChange(e.target.value)}
//         className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
//       />
//     </div>
//   );
// };

// const FilterPanel = ({ filters, onFiltersChange, showFilters }) => {
//   if (!showFilters) return null;
  
//   return (
//     <div className="bg-gray-800 p-4 rounded-lg">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div>
//           <label className="block text-gray-300 text-sm mb-2">Role</label>
//           <select 
//             value={filters.role || ''}
//             onChange={(e) => onFiltersChange({ ...filters, role: e.target.value })}
//             className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           >
//             <option value="">All Roles</option>
//             <option value="Student">Student</option>
//             <option value="Guide">Guide</option>
//           </select>
//         </div>
        
//         <div>
//           <label className="block text-gray-300 text-sm mb-2">Department</label>
//           <select 
//             value={filters.department || ''}
//             onChange={(e) => onFiltersChange({ ...filters, department: e.target.value })}
//             className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           >
//             <option value="">All Departments</option>
//             <option value="IT">IT</option>
//             <option value="CE">CE</option>
//             <option value="ME">ME</option>
//             <option value="EE">EE</option>
//             <option value="EC">EC</option>
//           </select>
//         </div>
        
//         <div>
//           <label className="block text-gray-300 text-sm mb-2">Year</label>
//           <select 
//             value={filters.year || ''}
//             onChange={(e) => onFiltersChange({ ...filters, year: e.target.value })}
//             className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           >
//             <option value="">All Years</option>
//             <option value="1">1st Year</option>
//             <option value="2">2nd Year</option>
//             <option value="3">3rd Year</option>
//             <option value="4">4th Year</option>
//           </select>
//         </div>
        
//         <div>
//           <label className="block text-gray-300 text-sm mb-2">Gender</label>
//           <select 
//             value={filters.gender || ''}
//             onChange={(e) => onFiltersChange({ ...filters, gender: e.target.value })}
//             className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           >
//             <option value="">All Genders</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GuidePage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({});
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [guidesPerPage] = useState(12);
//   const [loading, setLoading] = useState(false);
  
//   // Use mock data - replace with Redux state in your actual app
//   const allGuides = mockGuides;
  
//   // Filter guides based on search and filters
//   const filteredGuides = allGuides.filter(guide => {
//     const matchesSearch = !searchTerm || 
//       guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       guide.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       guide.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       guide.department.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesRole = !filters.role || guide.role === filters.role;
//     const matchesDepartment = !filters.department || guide.department === filters.department;
//     const matchesYear = !filters.year || guide.year.toString() === filters.year;
//     const matchesGender = !filters.gender || guide.gender === filters.gender;
    
//     return matchesSearch && matchesRole && matchesDepartment && matchesYear && matchesGender;
//   });
  
//   // Pagination
//   const totalPages = Math.ceil(filteredGuides.length / guidesPerPage);
//   const startIndex = (currentPage - 1) * guidesPerPage;
//   const currentGuides = filteredGuides.slice(startIndex, startIndex + guidesPerPage);
  
//   useEffect(() => {
//     // Simulate API call
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   }, [searchTerm, filters]);
  
//   const handleBecomeGuide = () => {
//     // Replace with actual navigation logic
//     console.log('Navigate to guide application');
//     // if (token) {
//     //   navigate('/guideapplication');
//     // } else {
//     //   navigate('/login');
//     // }
//   };
  
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
  
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="text-white text-xl">Loading guides...</div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold mb-4">
//             Find Your Perfect <span className="text-yellow-400">Guide</span>
//           </h1>
//           <p className="text-gray-300 text-lg">
//             Connect with experienced seniors and guides for your academic journey
//           </p>
//         </div>
        
//         <div className="flex justify-center mb-8">
//           <button
//             onClick={handleBecomeGuide}
//             className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
//           >
//             Become a Guide
//           </button>
//         </div>
        
//         <div className="mb-8 space-y-4">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <SearchBar 
//                 searchTerm={searchTerm} 
//                 onSearchChange={setSearchTerm}
//               />
//             </div>
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition-colors"
//             >
//               <Filter className="w-5 h-5" />
//               Filters
//             </button>
//           </div>
          
//           <FilterPanel 
//             filters={filters}
//             onFiltersChange={setFilters}
//             showFilters={showFilters}
//           />
//         </div>
        
//         <div className="mb-6">
//           <p className="text-gray-300">
//             Showing {currentGuides.length} of {filteredGuides.length} guides
//           </p>
//         </div>
        
//         {currentGuides.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//             {currentGuides.map((guide) => (
//               <GuideCard key={guide._id} guide={guide} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-400 text-lg">No guides found matching your criteria</p>
//           </div>
//         )}
        
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default GuidePage;










// // GuidePage.jsx
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Search, Filter } from "lucide-react";
// import { fetchAllGuideApplicants } from "../services/operations/guideAPI";
// import Pagination from '../components/Guide/Pagination';
// import SearchBar from '../components/Guide/SearchBar';
// import FilterPanel from '../components/Guide/FilterPanel';
// import GuideCard from '../components/Guide//GuideCard';

// const GuidePage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [filters, setFilters] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [guidesPerPage] = useState(12);

//   const { guides, loading } = useSelector((state) => state.guide);
//   useEffect(() => {
//   console.log("Guides from Redux:", guides);
// }, [guides]);


//   useEffect(() => {
//     const payload = { ...filters };
//     if (searchTerm) payload.search = searchTerm;
//     dispatch(fetchAllGuideApplicants(payload));
//   }, [filters, searchTerm, dispatch]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const startIndex = (currentPage - 1) * guidesPerPage;
//   const currentGuides = guides.slice(startIndex, startIndex + guidesPerPage);
//   const totalPages = Math.ceil(guides.length / guidesPerPage);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold mb-4">
//             Find Your Perfect <span className="text-yellow-400">Guide</span>
//           </h1>
//           <p className="text-gray-300 text-lg">
//             Connect with experienced seniors and guides for your academic journey
//           </p>
//         </div>

//         <div className="flex justify-center mb-8">
//           <button
//             onClick={() => navigate("/guideapplication")}
//             className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
//           >
//             Become a Guide
//           </button>
//         </div>

//         <div className="mb-8 space-y-4">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
//             </div>
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition-colors"
//             >
//               <Filter className="w-5 h-5" />
//               Filters
//             </button>
//           </div>
//           <FilterPanel filters={filters} onFiltersChange={setFilters} showFilters={showFilters} />
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <p className="text-gray-400 text-lg">Loading guides...</p>
//           </div>
//         ) : currentGuides.length > 0 ? (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//               {currentGuides.map((guide) => (
//                 <GuideCard key={guide._id} guide={guide} />
//               ))}
//             </div>
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           </>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-400 text-lg">No guides found matching your criteria</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GuidePage;









import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { fetchAllGuideApplicants } from "../services/operations/guideAPI";
import Pagination from '../components/Guide/Pagination';
import SearchBar from '../components/Guide/SearchBar';
import FilterPanel from '../components/Guide/FilterPanel';
import GuideCard from '../components/Guide/GuideCard';

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
  const [guidesPerPage] = useState(16); // Increased from 12 to 16

  const { guides, loading } = useSelector((state) => state.guide);
  
  useEffect(() => {
    console.log("Guides from Redux:", guides);
  }, [guides]);

  useEffect(() => {
    const payload = { ...filters };
    if (searchTerm) payload.search = searchTerm;
    dispatch(fetchAllGuideApplicants(payload));
  }, [filters, searchTerm, dispatch]);

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
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Find Your Perfect <span className="text-yellow-400">Guide</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg">
            Connect with experienced seniors and guides for your academic journey
          </p>
        </div>

        {/* Become a Guide Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => navigate("/guideapplication")}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Become a Guide
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-row md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
          <FilterPanel filters={filters} onFiltersChange={setFilters} showFilters={showFilters}  onReset={handleResetFilters}/>
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