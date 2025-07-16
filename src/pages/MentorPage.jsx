// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Search, Filter, Download, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
// import { fetchMentors, searchMentors } from '../services/operations/mentorAPI';

// const MentorPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { mentors, loading, pagination, error } = useSelector(state => state.mentor);
  
//   const [searchQuery, setSearchQuery] = useState('');
//   const [department, setDepartment] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showFilters, setShowFilters] = useState(false);
  
//   // Sample departments for filter
//   const departments = [
//     'Computer Science',
//     'Electrical Engineering',
//     'Mechanical Engineering',
//     'Information Technology',
//     'Civil Engineering',
//     'Electronics & Communication',
//     'Chemical Engineering',
//     'Biotechnology'
//   ];

//   useEffect(() => {
//     handleFetchMentors();
//   }, [currentPage]);

//   const handleFetchMentors = () => {
//     dispatch(fetchMentors({
//       page: currentPage,
//       limit: 6,
//       search: searchQuery,
//       department: department
//     }));
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setCurrentPage(1);
//     dispatch(searchMentors({
//       page: 1,
//       limit: 6,
//       search: searchQuery,
//       department: department
//     }));
//   };

//   const handleFilterChange = (selectedDepartment) => {
//     setDepartment(selectedDepartment);
//     setCurrentPage(1);
//     dispatch(searchMentors({
//       page: 1,
//       limit: 6,
//       search: searchQuery,
//       department: selectedDepartment
//     }));
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setDepartment('');
//     setCurrentPage(1);
//     dispatch(fetchMentors({
//       page: 1,
//       limit: 6,
//       search: '',
//       department: ''
//     }));
//   };

//   const handleDownloadResume = (resumeUrl, mentorName) => {
//     if (resumeUrl) {
//       const link = document.createElement('a');
//       link.href = resumeUrl;
//       link.download = `${mentorName}_Resume.pdf`;
//       link.click();
//     }
//   };

//   const handleContact = (mentorId) => {
//     // Navigate to contact/chat page
//     navigate(`/mentor/contact/${mentorId}`);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     dispatch(fetchMentors({
//       page: page,
//       limit: 6,
//       search: searchQuery,
//       department: department
//     }));
//   };

//   const renderPagination = () => {
//     if (!pagination) return null;
    
//     const { currentPage: current, totalPages, hasNext, hasPrev } = pagination;
//     const pages = [];
    
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(i);
//     }
    
//     return (
//       <div className="flex justify-center items-center mt-8 space-x-2">
//         <button
//           onClick={() => handlePageChange(current - 1)}
//           disabled={!hasPrev}
//           className={`px-3 py-2 rounded ${
//             !hasPrev 
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//               : 'bg-blue-500 text-white hover:bg-blue-600'
//           }`}
//         >
//           <ChevronLeft size={16} />
//         </button>
        
//         {pages.map(page => (
//           <button
//             key={page}
//             onClick={() => handlePageChange(page)}
//             className={`px-3 py-2 rounded ${
//               page === current
//                 ? 'bg-yellow-500 text-white'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             {page}
//           </button>
//         ))}
        
//         <button
//           onClick={() => handlePageChange(current + 1)}
//           disabled={!hasNext}
//           className={`px-3 py-2 rounded ${
//             !hasNext 
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//               : 'bg-blue-500 text-white hover:bg-blue-600'
//           }`}
//         >
//           <ChevronRight size={16} />
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Header Section */}
//       <div className="text-center py-16">
//         <h1 className="text-4xl font-bold mb-4">
//           Find Your Perfect <span className="text-yellow-500">Mentor</span>
//         </h1>
//         <p className="text-gray-400 mb-8">
//           Connect with experienced mentors and guides for your academic journey
//         </p>
        
//         {/* Become a Mentor Button */}
//         <button
//           onClick={() => navigate('/ApplyMentorForm')}
//           className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
//         >
//           Become a Mentor
//         </button>
//       </div>

//       {/* Search and Filter Section */}
//       <div className="max-w-6xl mx-auto px-4 mb-8">
//         {/* Search Bar */}
//         <form onSubmit={handleSearch} className="relative mb-6">
//           <div className="flex items-center">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search mentors by name, email, city, department..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
//               />
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowFilters(!showFilters)}
//               className="ml-4 bg-gray-800 border border-gray-700 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
//             >
//               <Filter size={20} />
//             </button>
//           </div>
//         </form>

//         {/* Filter Options */}
//         {showFilters && (
//           <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
//             <div className="flex flex-wrap gap-4 items-center">
//               <label className="text-gray-300 font-medium">Department:</label>
//               <select
//                 value={department}
//                 onChange={(e) => handleFilterChange(e.target.value)}
//                 className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
//               >
//                 <option value="">All Departments</option>
//                 {departments.map(dept => (
//                   <option key={dept} value={dept}>{dept}</option>
//                 ))}
//               </select>
//               <button
//                 onClick={clearFilters}
//                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-200"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Mentors Grid */}
//       <div className="max-w-6xl mx-auto px-4">
//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
//           </div>
//         ) : error ? (
//           <div className="text-center py-20">
//             <p className="text-red-500 text-lg">{error}</p>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {mentors.map((mentor) => (
//                 <div
//                   key={mentor._id}
//                   className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-yellow-500 transition-colors duration-200"
//                 >
//                   {/* Mentor Image */}
//                   <div className="relative h-48 bg-gray-700">
//                     <img
//                       src={mentor.image || '/default-avatar.png'}
//                       alt={mentor.name}
//                       className="w-full h-full object-cover"
//                     />
//                     {/* Resume Button - Top Left */}
//                     <button
//                       onClick={() => handleDownloadResume(mentor.resume, mentor.name)}
//                       className="absolute top-3 left-3 bg-yellow-500 hover:bg-yellow-600 text-black p-2 rounded-full transition-colors duration-200"
//                       title="Download Resume"
//                     >
//                       <Download size={16} />
//                     </button>
//                     {/* Contact Button - Top Right */}
//                     <button
//                       onClick={() => handleContact(mentor._id)}
//                       className="absolute top-3 right-3 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200"
//                       title="Contact Mentor"
//                     >
//                       <MessageCircle size={16} />
//                     </button>
//                   </div>

//                   {/* Mentor Info */}
//                   <div className="p-4">
//                     <h3 className="text-xl font-semibold mb-2">{mentor.name}</h3>
//                     <p className="text-gray-400 mb-2">{mentor.department}</p>
//                     <p className="text-gray-300 mb-2">{mentor.domain}</p>
//                     <p className="text-gray-400 mb-2">{mentor.email}</p>
//                     <p className="text-gray-300">{mentor.company}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {renderPagination()}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MentorPage;









import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter, RefreshCcw ,Search} from "lucide-react";
import { searchMentors } from "../services/operations/mentorAPI";
import MentorCard from "../components/Mentor/MentorCard";
import Pagination from "../components/Mentor/Paganation";
import { useNavigate } from "react-router-dom";
import  Loader  from "../components/LoadingSpinner";
import HeroSection from "../components/Commonhooks/HeroSection";
const MentorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mentors = useSelector((state) => state.mentor.mentors);
  const pagination = useSelector((state) => state.mentor.pagination);

  const [query, setQuery] = useState({
    name: "",
    department: "",
    company: "",
    domain: "",
    year: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(searchMentors(query));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(searchMentors(query));
  };

  const clearFilters = () => {
    setQuery({
      name: "",
      department: "",
      company: "",
      domain: "",
      year: "",
    });
    dispatch(searchMentors({}));
  };

  const handlePageChange = (page) => {
    dispatch(searchMentors({ ...query, page }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      {/* Header */}
  
<HeroSection
  title="Your Perfect"
  highlight="Mentor"
  subtitle="Connect with experienced mentors to guide your academic journey"
  buttonText="Become a Mentor"
  linkIfToken="/ApplyMentorForm"
  linkIfNotToken="/login"
/>


      {/* Search Bar */}
<div className="max-w-4xl mx-auto mb-4 px-4">
  <div className="relative flex items-center w-full">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    
    <input
      type="text"
      placeholder="Search by name, email, city, department..."
      value={query.name}
      onChange={(e) => setQuery({ ...query, name: e.target.value })}
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



      {/* Filter Row */}
      <div className="flex flex-row justify-center items-center gap-4 mb-8 max-w-4xl mx-auto">
        {/* Toggle Filter */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>

        {/* Search Button */}

   
      

        {/* Refresh / Clear */}
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white"
        >
          <RefreshCcw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 max-w-5xl mx-auto mb-6">
          <select
            value={query.department}
            onChange={(e) => setQuery({ ...query, department: e.target.value })}
            className="bg-gray-700 text-white rounded-md px-3 py-2"
          >
            <option value="">Select Department</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            {/* Add more as needed */}
          </select>

          <select
            value={query.company}
            onChange={(e) => setQuery({ ...query, company: e.target.value })}
            className="bg-gray-700 text-white rounded-md px-3 py-2"
          >
            <option value="">Select Company</option>
            <option value="TCS">TCS</option>
            <option value="Infosys">Infosys</option>
            <option value="Wipro">Wipro</option>
            {/* Add more as needed */}
          </select>

          <select
            value={query.domain}
            onChange={(e) => setQuery({ ...query, domain: e.target.value })}
            className="bg-gray-700 text-white rounded-md px-3 py-2"
          >
            <option value="">Select Domain</option>
            <option value="Web Development">Web Development</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Cloud">Cloud</option>
          </select>

          <input
            type="number"
            placeholder="Passout Year"
            value={query.year}
            onChange={(e) => setQuery({ ...query, year: e.target.value })}
            className="bg-gray-700 text-white rounded-md px-3 py-2"
          />
        </div>
      )}

      {/* Mentor Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors && mentors.length > 0 ? (
          mentors.map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">No mentors found.</p>
        )}
      </div>

      {/* Pagination */}
      {pagination && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default MentorPage;
