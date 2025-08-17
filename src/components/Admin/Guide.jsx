// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllGuideApplicants,
//   approveGuide,
//   deleteGuide,
// } from "../../services/operations/guideAPI";
// import toast from "react-hot-toast";
// import { Check, X, Eye, Edit, Trash2, RefreshCcw, Plus, Filter, Search } from "lucide-react";
// import Pagination from "../../components/Guide/Pagination";
// import EditGuideModal from "../../components/Guide/EditGuideModal";
// import ViewGuideModal from "../../components/Guide/ViewGuideModal";
// import FilterPanel from "../../components/Guide/FilterPanel";
// import { useNavigate } from "react-router-dom";

// const AdminGuidePage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { guides, loading } = useSelector((state) => state.guide);

//   const [currentPage, setCurrentPage] = useState(1);
//   const guidesPerPage = 10;

//   // Search & Filter
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     department: "",
//     year: "",
//     gender: "",
//   });
//   const [showFilters, setShowFilters] = useState(false);

//   // Modals
//   const [selectedGuide, setSelectedGuide] = useState(null);
//   const [viewMode, setViewMode] = useState(false); // false = edit, true = view

//   // Fetch guides
//   const fetchGuides = () => {
//     const payload = { ...filters };
//     if (searchTerm) payload.search = searchTerm;
//     dispatch(fetchAllGuideApplicants(payload));
//   };

//   useEffect(() => {
//     fetchGuides();
//   }, [filters, searchTerm, dispatch]);

//   const handleApprove = (id) => {
//     dispatch(
//       approveGuide(id, () => {
//         toast.success("Guide approved");
//         fetchGuides();
//       })
//     );
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this guide?")) {
//       dispatch(
//         deleteGuide(id, () => {
//           toast.success("Guide deleted");
//           fetchGuides();
//         })
//       );
//     }
//   };

//   const handleResetFilters = () => {
//     setFilters({ department: "", year: "", gender: "" });
//     setSearchTerm("");
//     setCurrentPage(1);
//   };

//   // Pagination logic
//   const startIndex = (currentPage - 1) * guidesPerPage;
//   const currentGuides = guides.slice(startIndex, startIndex + guidesPerPage);
//   const totalPages = Math.ceil(guides.length / guidesPerPage);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header & Add Guide */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
//           <h1 className="text-2xl font-bold">Admin Guide Management</h1>
//           <button
//             onClick={() => navigate("/guideapplication")}
//             className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded text-black hover:bg-yellow-400"
//           >
//             <Plus className="w-5 h-5" /> Add Guide
//           </button>
//         </div>

//         {/* Search & Filter Row */}
//         <div className="max-w-5xl mx-auto mb-4 w-full">
//           <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
//             {/* Search Bar */}
//             <div className="relative flex-1 w-full">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search by name, email, city, department..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 outline-none"
//               />
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
//               >
//                 <Filter className="w-5 h-5" /> Filters
//               </button>
//               <button
//                 onClick={handleResetFilters}
//                 className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
//               >
//                 <RefreshCcw className="w-5 h-5" /> Refresh
//               </button>
//             </div>
//           </div>

//           {/* Collapsible Filter Panel */}
//           <FilterPanel
//             filters={filters}
//             onFiltersChange={setFilters}
//             showFilters={showFilters}
//             onReset={handleResetFilters}
//           />
//         </div>

//         {/* Table Section */}
//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-700 text-sm min-w-[800px]">
//             <thead className="bg-gray-800 text-gray-300">
//               <tr>
//                 <th className="p-3">Image</th>
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Email</th>
//                 <th className="p-3">Phone</th>
//                 <th className="p-3">Department</th>
//                 <th className="p-3">Year</th>
//                 <th className="p-3">Role</th>
//                 <th className="p-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={8} className="text-center py-6 text-gray-400">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : currentGuides.length > 0 ? (
//                 currentGuides.map((guide) => (
//                   <tr key={guide._id} className="border-b border-gray-700 hover:bg-gray-800">
//                     <td className="p-3 text-center">
//                       <img
//                         src={guide.image || "/default-avatar.png"}
//                         alt="Guide"
//                         className="w-12 h-12 rounded-full mx-auto object-cover"
//                       />
//                     </td>
//                     <td className="p-3">{guide.name}</td>
//                     <td className="p-3">{guide.email}</td>
//                     <td className="p-3">{guide.phone || "-"}</td>
//                     <td className="p-3">{guide.department || "-"}</td>
//                     <td className="p-3">{guide.year || "-"}</td>
//                     <td className="p-3">{guide.role}</td>
//                     <td className="p-3 flex justify-center gap-2 flex-wrap">
//                       <button
//                         onClick={() => handleApprove(guide._id)}
//                         className="bg-green-600 hover:bg-green-500 p-2 rounded"
//                         title="Approve as Guide"
//                       >
//                         <Check className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => {
//                           setSelectedGuide(guide);
//                           setViewMode(true);
//                         }}
//                         className="bg-blue-600 hover:bg-blue-500 p-2 rounded"
//                         title="View"
//                       >
//                         <Eye className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => {
//                           setSelectedGuide(guide);
//                           setViewMode(false);
//                         }}
//                         className="bg-yellow-500 hover:bg-yellow-400 p-2 rounded text-black"
//                         title="Edit"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(guide._id)}
//                         className="bg-red-600 hover:bg-red-500 p-2 rounded"
//                         title="Delete"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={8} className="text-center py-6 text-gray-400">
//                     No guides found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-6">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       </div>

//       {/* Modals */}
//       {selectedGuide && !viewMode && (
//         <EditGuideModal
//           guide={selectedGuide}
//           onClose={() => setSelectedGuide(null)}
//         />
//       )}
//       {selectedGuide && viewMode && (
//         <ViewGuideModal
//           guide={selectedGuide}
//           onClose={() => setSelectedGuide(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminGuidePage;






// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllGuideApplicants,
//   approveGuide,
//   deleteGuide,
// } from "../../services/operations/guideAPI";
// import toast from "react-hot-toast";
// import { 
//   Check, 
//   X, 
//   Eye, 
//   Edit, 
//   Trash2, 
//   RefreshCcw, 
//   Plus, 
//   Filter, 
//   Search,
//   Users,
//   UserCheck,
//   ChevronDown,
//   ChevronUp,
//   Menu,
//   MoreVertical
// } from "lucide-react";
// import Pagination from "../../components/Guide/Pagination";
// import EditGuideModal from "../../components/Guide/EditGuideModal";
// import ViewGuideModal from "../../components/Guide/ViewGuideModal";
// import FilterPanel from "../../components/Guide/FilterPanel";
// import { useNavigate } from "react-router-dom";

// const AdminGuidePage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { guides, students, loading, error } = useSelector((state) => state.guide);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [activeTab, setActiveTab] = useState("guides"); // "guides" or "students"
//   const guidesPerPage = 10;

//   // Search & Filter
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     department: "",
//     year: "",
//     gender: "",
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   // Modals
//   const [selectedGuide, setSelectedGuide] = useState(null);
//   const [viewMode, setViewMode] = useState(false);
//   const [actionDropdown, setActionDropdown] = useState(null);

//   // Get current data based on active tab
//   const currentData = activeTab === "guides" ? guides : students;

//   // Fetch data
//   const fetchData = () => {
//     const payload = { ...filters };
//     if (searchTerm) payload.search = searchTerm;
//     dispatch(fetchAllGuideApplicants(payload));
//   };

//   useEffect(() => {
//     fetchData();
//   }, [filters, searchTerm, dispatch]);

//   const handleApprove = (id) => {
//     dispatch(
//       approveGuide(id, () => {
//         toast.success("Guide approved successfully");
//         fetchData();
//       })
//     );
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this person?")) {
//       dispatch(
//         deleteGuide(id, () => {
//           toast.success("Person deleted successfully");
//           fetchData();
//         })
//       );
//     }
//   };

//   const handleResetFilters = () => {
//     setFilters({ department: "", year: "", gender: "" });
//     setSearchTerm("");
//     setCurrentPage(1);
//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setCurrentPage(1);
//     setActionDropdown(null);
//   };

//   // Pagination logic
//   const startIndex = (currentPage - 1) * guidesPerPage;
//   const currentItems = currentData.slice(startIndex, startIndex + guidesPerPage);
//   const totalPages = Math.ceil(currentData.length / guidesPerPage);

//   const ActionButton = ({ onClick, className, icon: Icon, title, children }) => (
//     <button
//       onClick={onClick}
//       className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
//       title={title}
//     >
//       <Icon className="w-4 h-4" />
//       <span className="hidden sm:inline">{children}</span>
//     </button>
//   );

//   const MobileActionMenu = ({ person, onClose }) => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:hidden">
//       <div className="bg-gray-800 w-full rounded-t-xl p-4 space-y-3">
//         <div className="flex items-center gap-3 pb-3 border-b border-gray-600">
//           <img
//             src={person.image || "/default-avatar.png"}
//             alt={person.name}
//             className="w-10 h-10 rounded-full object-cover"
//           />
//           <div>
//             <p className="font-medium">{person.name}</p>
//             <p className="text-sm text-gray-400">{person.email}</p>
//           </div>
//         </div>
        
//         <div className="space-y-2">
//           {activeTab === "students" && (
//             <button
//               onClick={() => {
//                 handleApprove(person._id);
//                 onClose();
//               }}
//               className="w-full flex items-center gap-3 p-3 bg-green-600 hover:bg-green-700 rounded-lg"
//             >
//               <Check className="w-5 h-5" />
//               <span>Approve as Guide</span>
//             </button>
//           )}
          
//           <button
//             onClick={() => {
//               setSelectedGuide(person);
//               setViewMode(true);
//               onClose();
//             }}
//             className="w-full flex items-center gap-3 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
//           >
//             <Eye className="w-5 h-5" />
//             <span>View Details</span>
//           </button>
          
//           <button
//             onClick={() => {
//               setSelectedGuide(person);
//               setViewMode(false);
//               onClose();
//             }}
//             className="w-full flex items-center gap-3 p-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg"
//           >
//             <Edit className="w-5 h-5" />
//             <span>Edit</span>
//           </button>
          
//           <button
//             onClick={() => {
//               handleDelete(person._id);
//               onClose();
//             }}
//             className="w-full flex items-center gap-3 p-3 bg-red-600 hover:bg-red-700 rounded-lg"
//           >
//             <Trash2 className="w-5 h-5" />
//             <span>Delete</span>
//           </button>
//         </div>
        
//         <button
//           onClick={onClose}
//           className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg mt-4"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-white">
//               Admin Guide Management
//             </h1>
//             <p className="text-gray-400 mt-1">
//               Manage guides and student applications
//             </p>
//           </div>
          
//           <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//             <button
//               onClick={() => navigate("/guideapplication")}
//               className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-lg text-black font-medium transition-all duration-200 hover:scale-105 active:scale-95"
//             >
//               <Plus className="w-5 h-5" />
//               <span>Add Guide</span>
//             </button>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-700 mb-6 overflow-x-auto">
//           <button
//             onClick={() => handleTabChange("guides")}
//             className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
//               activeTab === "guides"
//                 ? "text-yellow-400 border-b-2 border-yellow-400"
//                 : "text-gray-400 hover:text-white"
//             }`}
//           >
//             <UserCheck className="w-5 h-5" />
//             <span>Guides ({guides.length})</span>
//           </button>
//           <button
//             onClick={() => handleTabChange("students")}
//             className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
//               activeTab === "students"
//                 ? "text-yellow-400 border-b-2 border-yellow-400"
//                 : "text-gray-400 hover:text-white"
//             }`}
//           >
//             <Users className="w-5 h-5" />
//             <span>Students ({students.length})</span>
//           </button>
//         </div>

//         {/* Search & Filter Controls */}
//         <div className="bg-gray-800 rounded-lg p-4 mb-6">
//           <div className="flex flex-col lg:flex-row gap-4">
//             {/* Search Bar */}
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search by name, email, city, department..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
//               />
//             </div>

//             {/* Filter Controls */}
//             <div className="flex flex-col sm:flex-row gap-2">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
//                   showFilters
//                     ? "bg-yellow-500 text-black"
//                     : "bg-gray-700 hover:bg-gray-600 text-white"
//                 }`}
//               >
//                 <Filter className="w-5 h-5" />
//                 <span>Filters</span>
//                 {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//               </button>
              
//               <button
//                 onClick={handleResetFilters}
//                 className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg font-medium transition-all duration-200"
//               >
//                 <RefreshCcw className="w-5 h-5" />
//                 <span>Reset</span>
//               </button>
//             </div>
//           </div>

//           {/* Collapsible Filter Panel */}
//           <FilterPanel
//             filters={filters}
//             onFiltersChange={setFilters}
//             showFilters={showFilters}
//             onReset={handleResetFilters}
//           />
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
//             {error}
//           </div>
//         )}

//         {/* Desktop Table */}
//         <div className="hidden lg:block bg-gray-800 rounded-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-700">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Person
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Academic
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Role
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-700">
//                 {loading ? (
//                   <tr>
//                     <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
//                       <div className="flex items-center justify-center gap-2">
//                         <RefreshCcw className="w-5 h-5 animate-spin" />
//                         <span>Loading...</span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : currentItems.length > 0 ? (
//                   currentItems.map((person) => (
//                     <tr key={person._id} className="hover:bg-gray-700 transition-colors">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-4">
//                           <img
//                             src={person.image || "/default-avatar.png"}
//                             alt={person.name}
//                             className="w-12 h-12 rounded-full object-cover"
//                           />
//                           <div>
//                             <p className="font-medium text-white">{person.name}</p>
//                             <p className="text-sm text-gray-400">{person.email}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <p className="text-white">{person.phone || "-"}</p>
//                         <p className="text-sm text-gray-400">{person.city || "-"}</p>
//                       </td>
//                       <td className="px-6 py-4">
//                         <p className="text-white">{person.department || "-"}</p>
//                         <p className="text-sm text-gray-400">Year {person.year || "-"}</p>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                           person.role === "guide" 
//                             ? "bg-green-100 text-green-800" 
//                             : "bg-blue-100 text-blue-800"
//                         }`}>
//                           {person.role}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center justify-center gap-2">
//                           {activeTab === "students" && (
//                             <ActionButton
//                               onClick={() => handleApprove(person._id)}
//                               className="bg-green-600 hover:bg-green-700 text-white"
//                               icon={Check}
//                               title="Approve as Guide"
//                             >
//                               Approve
//                             </ActionButton>
//                           )}
                          
//                           <ActionButton
//                             onClick={() => {
//                               setSelectedGuide(person);
//                               setViewMode(true);
//                             }}
//                             className="bg-blue-600 hover:bg-blue-700 text-white"
//                             icon={Eye}
//                             title="View Details"
//                           >
//                             View
//                           </ActionButton>
                          
//                           <ActionButton
//                             onClick={() => {
//                               setSelectedGuide(person);
//                               setViewMode(false);
//                             }}
//                             className="bg-yellow-500 hover:bg-yellow-600 text-black"
//                             icon={Edit}
//                             title="Edit"
//                           >
//                             Edit
//                           </ActionButton>
                          
//                           <ActionButton
//                             onClick={() => handleDelete(person._id)}
//                             className="bg-red-600 hover:bg-red-700 text-white"
//                             icon={Trash2}
//                             title="Delete"
//                           >
//                             Delete
//                           </ActionButton>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
//                       <div className="flex flex-col items-center gap-2">
//                         <Users className="w-12 h-12 text-gray-600" />
//                         <p>No {activeTab} found</p>
//                         <p className="text-sm">Try adjusting your filters or search terms</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Mobile Cards */}
//         <div className="lg:hidden space-y-4">
//           {loading ? (
//             <div className="bg-gray-800 rounded-lg p-6 text-center">
//               <div className="flex items-center justify-center gap-2 text-gray-400">
//                 <RefreshCcw className="w-5 h-5 animate-spin" />
//                 <span>Loading...</span>
//               </div>
//             </div>
//           ) : currentItems.length > 0 ? (
//             currentItems.map((person) => (
//               <div key={person._id} className="bg-gray-800 rounded-lg p-4">
//                 <div className="flex items-start justify-between mb-3">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={person.image || "/default-avatar.png"}
//                       alt={person.name}
//                       className="w-12 h-12 rounded-full object-cover"
//                     />
//                     <div>
//                       <h3 className="font-medium text-white">{person.name}</h3>
//                       <p className="text-sm text-gray-400">{person.email}</p>
//                     </div>
//                   </div>
                  
//                   <button
//                     onClick={() => setActionDropdown(actionDropdown === person._id ? null : person._id)}
//                     className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
//                   >
//                     <MoreVertical className="w-5 h-5 text-gray-400" />
//                   </button>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4 text-sm mb-4">
//                   <div>
//                     <p className="text-gray-400">Phone</p>
//                     <p className="text-white">{person.phone || "-"}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400">Department</p>
//                     <p className="text-white">{person.department || "-"}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400">Year</p>
//                     <p className="text-white">{person.year || "-"}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400">Role</p>
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                       person.role === "guide" 
//                         ? "bg-green-100 text-green-800" 
//                         : "bg-blue-100 text-blue-800"
//                     }`}>
//                       {person.role}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="flex gap-2 overflow-x-auto pb-2">
//                   {activeTab === "students" && (
//                     <button
//                       onClick={() => handleApprove(person._id)}
//                       className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
//                     >
//                       <Check className="w-4 h-4" />
//                       <span>Approve</span>
//                     </button>
//                   )}
                  
//                   <button
//                     onClick={() => {
//                       setSelectedGuide(person);
//                       setViewMode(true);
//                     }}
//                     className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
//                   >
//                     <Eye className="w-4 h-4" />
//                     <span>View</span>
//                   </button>
                  
//                   <button
//                     onClick={() => {
//                       setSelectedGuide(person);
//                       setViewMode(false);
//                     }}
//                     className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
//                   >
//                     <Edit className="w-4 h-4" />
//                     <span>Edit</span>
//                   </button>
                  
//                   <button
//                     onClick={() => handleDelete(person._id)}
//                     className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     <span>Delete</span>
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="bg-gray-800 rounded-lg p-8 text-center">
//               <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
//               <p className="text-gray-400 text-lg mb-2">No {activeTab} found</p>
//               <p className="text-gray-500">Try adjusting your filters or search terms</p>
//             </div>
//           )}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-8">
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={setCurrentPage}
//             />
//           </div>
//         )}
//       </div>

//       {/* Mobile Action Menu */}
//       {actionDropdown && (
//         <MobileActionMenu
//           person={currentItems.find(p => p._id === actionDropdown)}
//           onClose={() => setActionDropdown(null)}
//         />
//       )}

//       {/* Modals */}
//       {selectedGuide && !viewMode && (
//         <EditGuideModal
//           guide={selectedGuide}
//           onClose={() => setSelectedGuide(null)}
//         />
//       )}
//       {selectedGuide && viewMode && (
//         <ViewGuideModal
//           guide={selectedGuide}
//           onClose={() => setSelectedGuide(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminGuidePage;



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllGuideApplicants,
//   approveGuide,
//   deleteGuide,
// } from "../../services/operations/guideAPI";
// import toast from "react-hot-toast";
// import {
//   Check,
//   X,
//   Eye,
//   Edit,
//   Trash2,
//   RefreshCcw,
//   Plus,
//   Filter,
//   Search,
//   Users,
//   UserCheck,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import Pagination from "../../components/Guide/Pagination";
// import EditGuideModal from "../../components/Guide/EditGuideModal";
// import ViewGuideModal from "../../components/Guide/ViewGuideModal";
// import FilterPanel from "../../components/Guide/FilterPanel";
// import ConfirmModel from "../../components/Common/ConfirmModel";
// import { useNavigate } from "react-router-dom";

// const AdminGuidePage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { guides, students, loading, error } = useSelector(
//     (state) => state.guide
//   );

//   const [currentPage, setCurrentPage] = useState(1);
//   const [activeTab, setActiveTab] = useState("guides"); // "guides" or "students"
//   const guidesPerPage = 10;

//   // Search & Filter
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     department: "",
//     year: "",
//     gender: "",
//   });
//   const [showFilters, setShowFilters] = useState(false);

//   // Modals
//   const [selectedGuide, setSelectedGuide] = useState(null);
//   const [viewMode, setViewMode] = useState(false);
//   const [showConfirmDelete, setShowConfirmDelete] = useState(false);
//   const [deletePersonId, setDeletePersonId] = useState(null);

//   // Current Data
//   const currentData = activeTab === "guides" ? guides : students;

//   // Fetch data
//   const fetchData = () => {
//     const payload = { ...filters };
//     if (searchTerm) payload.search = searchTerm;
//     dispatch(fetchAllGuideApplicants(payload));
//   };

//   useEffect(() => {
//     fetchData();
//   }, [filters, searchTerm, dispatch]);

//   const handleApprove = (id) => {
//     dispatch(
//       approveGuide(id, () => {
//         toast.success("Guide approved successfully");
//         fetchData();
//       })
//     );
//   };

//   const handleDelete = (id) => {
//     setDeletePersonId(id);
//     setShowConfirmDelete(true);
//   };

//   const confirmDelete = () => {
//     if (deletePersonId) {
//       dispatch(
//         deleteGuide(deletePersonId, () => {
//           toast.success("Person deleted successfully");
//           fetchData();
//           setShowConfirmDelete(false);
//           setDeletePersonId(null);
//         })
//       );
//     }
//   };

//   const cancelDelete = () => {
//     setShowConfirmDelete(false);
//     setDeletePersonId(null);
//   };

//   const handleResetFilters = () => {
//     setFilters({ department: "", year: "", gender: "" });
//     setSearchTerm("");
//     setCurrentPage(1);
//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setCurrentPage(1);
//   };

//   // Pagination
//   const startIndex = (currentPage - 1) * guidesPerPage;
//   const currentItems = currentData.slice(startIndex, startIndex + guidesPerPage);
//   const totalPages = Math.ceil(currentData.length / guidesPerPage);

//   const ActionButton = ({ onClick, className, icon: Icon, title }) => (
//     <button
//       onClick={onClick}
//       className={`p-2 rounded transition-colors ${className}`}
//       title={title}
//     >
//       <Icon className="w-4 h-4" />
//     </button>
//   );

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-white">
//               Admin Guide Management
//             </h1>
//             <p className="text-gray-400 mt-1">
//               Manage guides and student applications
//             </p>
//           </div>

//           <button
//             onClick={() => navigate("/guideapplication")}
//             className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-lg text-black font-medium transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto"
//           >
//             <Plus className="w-5 h-5" />
//             <span>Add Guide</span>
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-700 mb-6 overflow-x-auto scrollbar-thin">
//           <button
//             onClick={() => handleTabChange("guides")}
//             className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
//               activeTab === "guides"
//                 ? "text-yellow-400 border-b-2 border-yellow-400"
//                 : "text-gray-400 hover:text-white"
//             }`}
//           >
//             <UserCheck className="w-5 h-5" />
//             <span>Guides ({guides.length})</span>
//           </button>
//           <button
//             onClick={() => handleTabChange("students")}
//             className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
//               activeTab === "students"
//                 ? "text-yellow-400 border-b-2 border-yellow-400"
//                 : "text-gray-400 hover:text-white"
//             }`}
//           >
//             <Users className="w-5 h-5" />
//             <span>Students ({students.length})</span>
//           </button>
//         </div>

//         {/* Search & Filters */}
//         <div className="bg-gray-800 rounded-lg p-4 mb-6">
//           <div className="flex flex-col lg:flex-row gap-4">
//             {/* Search Bar */}
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search by name, email, city, department..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
//               />
//             </div>

//             {/* Filter Buttons */}
//             <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
//                   showFilters
//                     ? "bg-yellow-500 text-black"
//                     : "bg-gray-700 hover:bg-gray-600 text-white"
//                 }`}
//               >
//                 <Filter className="w-5 h-5" />
//                 <span>Filters</span>
//                 {showFilters ? (
//                   <ChevronUp className="w-4 h-4" />
//                 ) : (
//                   <ChevronDown className="w-4 h-4" />
//                 )}
//               </button>

//               <button
//                 onClick={handleResetFilters}
//                 className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg font-medium transition-all duration-200"
//               >
//                 <RefreshCcw className="w-5 h-5" />
//                 <span>Reset</span>
//               </button>
//             </div>
//           </div>

//           {/* Collapsible Filter Panel */}
//           <FilterPanel
//             filters={filters}
//             onFiltersChange={setFilters}
//             showFilters={showFilters}
//             onReset={handleResetFilters}
//           />
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
//             {error}
//           </div>
//         )}

//         {/* Responsive Table */}
//         <div className="bg-gray-800 rounded-lg overflow-hidden">
//           <div className="overflow-x-auto scrollbar-thin max-w-full">
//             <table className="w-full min-w-[800px]">
//               <thead className="bg-gray-700">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Person
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Academic
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Role
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-700">
//                 {loading ? (
//                   <tr>
//                     <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
//                       <div className="flex items-center justify-center gap-2">
//                         <RefreshCcw className="w-5 h-5 animate-spin" />
//                         <span>Loading...</span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : currentItems.length > 0 ? (
//                   currentItems.map((person) => (
//                     <tr
//                       key={person._id}
//                       className="hover:bg-gray-700 transition-colors"
//                     >
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-4">
//                           <img
//                             src={person.image || "/default-avatar.png"}
//                             alt={person.name}
//                             className="w-12 h-12 rounded-full object-cover"
//                           />
//                           <div>
//                             <p className="font-medium text-white">
//                               {person.name}
//                             </p>
//                             <p className="text-sm text-gray-400">
//                               {person.email}
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-white">
//                           <p className="font-medium">{person.phone || "-"}</p>
//                           <p className="text-gray-400">{person.city || "-"}</p>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <p className="text-white">{person.department || "-"}</p>
//                         <p className="text-sm text-gray-400">
//                           Year {person.year || "-"}
//                         </p>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span
//                           className={`px-3 py-1 text-sm font-medium rounded ${
//                             person.role === "guide"
//                               ? "bg-green-600 text-white"
//                               : "bg-blue-600 text-white"
//                           }`}
//                         >
//                           {person.role}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center justify-center gap-2">
//                           {activeTab === "students" && (
//                             <ActionButton
//                               onClick={() => handleApprove(person._id)}
//                               className="bg-green-600 hover:bg-green-700 text-white"
//                               icon={Check}
//                               title="Approve as Guide"
//                             />
//                           )}

//                           <ActionButton
//                             onClick={() => {
//                               setSelectedGuide(person);
//                               setViewMode(true);
//                             }}
//                             className="bg-blue-600 hover:bg-blue-700 text-white"
//                             icon={Eye}
//                             title="View Details"
//                           />

//                           <ActionButton
//                             onClick={() => {
//                               setSelectedGuide(person);
//                               setViewMode(false);
//                             }}
//                             className="bg-yellow-500 hover:bg-yellow-600 text-black"
//                             icon={Edit}
//                             title="Edit"
//                           />

//                           <ActionButton
//                             onClick={() => handleDelete(person._id)}
//                             className="bg-red-600 hover:bg-red-700 text-white"
//                             icon={Trash2}
//                             title="Delete"
//                           />
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={5}
//                       className="px-6 py-12 text-center text-gray-400"
//                     >
//                       <div className="flex flex-col items-center gap-2">
//                         <Users className="w-12 h-12 text-gray-600" />
//                         <p>No {activeTab} found</p>
//                         <p className="text-sm">
//                           Try adjusting your filters or search terms
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-8">
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={setCurrentPage}
//             />
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       {selectedGuide && !viewMode && (
//         <EditGuideModal
//           guide={selectedGuide}
//           onClose={() => setSelectedGuide(null)}
//         />
//       )}
//       {selectedGuide && viewMode && (
//         <ViewGuideModal
//           guide={selectedGuide}
//           onClose={() => setSelectedGuide(null)}
//         />
//       )}

//       {/* Confirm Delete Modal */}
//       {showConfirmDelete && (
//         <ConfirmModel
//           isOpen={showConfirmDelete}
//           onConfirm={confirmDelete}
//           onCancel={cancelDelete}
//           title="Delete Person"
//           message="Are you sure you want to delete this person? This action cannot be undone."
//           confirmText="Delete"
//           cancelText="Cancel"
//         />
//       )}
//     </div>
//   );
// };

// export default AdminGuidePage;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllGuideApplicants,
  approveGuide,
  deleteGuide,
} from "../../services/operations/guideAPI";
import toast from "react-hot-toast";
import {
  Check,
  X,
  Eye,
  Edit,
  Trash2,
  RefreshCcw,
  Plus,
  Users,
  UserCheck,
} from "lucide-react";
import Pagination from "../../components/Guide/Pagination";
import EditGuideModal from "../../components/Guide/EditGuideModal";
import ViewGuideModal from "../../components/Guide/ViewGuideModal";
import ConfirmModel from "../../components/Common/ConfirmModel";
import { useNavigate } from "react-router-dom";
import SearchAndFilterBar from "../Admin/Parts/Searchfillter";

const AdminGuidePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { guides, students, loading, error } = useSelector(
    (state) => state.guide
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("guides"); // "guides" or "students"
  const guidesPerPage = 10;

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // for debounce
  const [filters, setFilters] = useState({
    department: "",
    year: "",
    gender: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Modals
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deletePersonId, setDeletePersonId] = useState(null);

  // Current Data
  const currentData = activeTab === "guides" ? guides : students;

  // Fetch data
  const fetchData = () => {
    const payload = { ...filters };
    if (debouncedSearchTerm) payload.search = debouncedSearchTerm;
    dispatch(fetchAllGuideApplicants(payload));
  };

  // Debounce searchTerm changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Trigger fetch when filters or debounced search changes
  useEffect(() => {
    fetchData();
  }, [filters, debouncedSearchTerm, dispatch]);

  const handleApprove = (id) => {
    dispatch(
      approveGuide(id, () => {
        toast.success("Guide approved successfully");
        fetchData();
      })
    );
  };

  const handleDelete = (id) => {
    setDeletePersonId(id);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    if (deletePersonId) {
      dispatch(
        deleteGuide(deletePersonId, () => {
          toast.success("Person deleted successfully");
          fetchData();
          setShowConfirmDelete(false);
          setDeletePersonId(null);
        })
      );
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setDeletePersonId(null);
  };

  const handleResetFilters = () => {
    setFilters({ department: "", year: "", gender: "" });
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Pagination
  const startIndex = (currentPage - 1) * guidesPerPage;
  const currentItems = currentData.slice(startIndex, startIndex + guidesPerPage);
  const totalPages = Math.ceil(currentData.length / guidesPerPage);

  const ActionButton = ({ onClick, className, icon: Icon, title }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded transition-colors ${className}`}
      title={title}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Admin Guide Management
            </h1>
            <p className="text-gray-400 mt-1">
              Manage guides and student applications
            </p>
          </div>

          <button
            onClick={() => navigate("/guideapplication")}
            className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-lg text-black font-medium transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Add Guide</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-6 overflow-x-auto scrollbar-thin">
          <button
            onClick={() => handleTabChange("guides")}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
              activeTab === "guides"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <UserCheck className="w-5 h-5" />
            <span>Guides ({guides.length})</span>
          </button>
          <button
            onClick={() => handleTabChange("students")}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
              activeTab === "students"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Students ({students.length})</span>
          </button>
        </div>

        {/* Search & Filters (moved to reusable component) */}
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
  // debounceDelay={400} // optional
/>


        {/* Error */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Responsive Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin max-w-full">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Person
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Academic
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCcw className="w-5 h-5 animate-spin" />
                        <span>Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentItems.length > 0 ? (
                  currentItems.map((person) => (
                    <tr
                      key={person._id}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={person.image || "/default-avatar.png"}
                            alt={person.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-white">
                              {person.name}
                            </p>
                            <p className="text-sm text-gray-400">
                              {person.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white">
                          <p className="font-medium">{person.phone || "-"}</p>
                          <p className="text-gray-400">{person.city || "-"}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white">{person.department || "-"}</p>
                        <p className="text-sm text-gray-400">
                          Year {person.year || "-"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded ${
                            person.role === "guide"
                              ? "bg-green-600 text-white"
                              : "bg-blue-600 text-white"
                          }`}
                        >
                          {person.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {activeTab === "students" && (
                            <ActionButton
                              onClick={() => handleApprove(person._id)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                              icon={Check}
                              title="Approve as Guide"
                            />
                          )}

                          <ActionButton
                            onClick={() => {
                              setSelectedGuide(person);
                              setViewMode(true);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            icon={Eye}
                            title="View Details"
                          />

                          <ActionButton
                            onClick={() => {
                              setSelectedGuide(person);
                              setViewMode(false);
                            }}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black"
                            icon={Edit}
                            title="Edit"
                          />

                          <ActionButton
                            onClick={() => handleDelete(person._id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                            icon={Trash2}
                            title="Delete"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-400"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Users className="w-12 h-12 text-gray-600" />
                        <p>No {activeTab} found</p>
                        <p className="text-sm">
                          Try adjusting your filters or search terms
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedGuide && !viewMode && (
        <EditGuideModal
          guide={selectedGuide}
          onClose={() => setSelectedGuide(null)}
        />
      )}
      {selectedGuide && viewMode && (
        <ViewGuideModal
          guide={selectedGuide}
          onClose={() => setSelectedGuide(null)}
        />
      )}

      {/* Confirm Delete Modal */}
      {showConfirmDelete && (
        <ConfirmModel
          isOpen={showConfirmDelete}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          title="Delete Person"
          message="Are you sure you want to delete this person? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default AdminGuidePage;
