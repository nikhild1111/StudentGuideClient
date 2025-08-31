



// keep it man ****************************//////

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Filter, RefreshCcw, Search } from "lucide-react";
// import { searchMentors } from "../services/operations/mentorAPI";
// import MentorCard from "../components/Mentor/MentorCard";
// import Pagination from "../components/Mentor/Paganation";
// import { useNavigate } from "react-router-dom";
// import Loader from "../components/LoadingSpinner";
// import HeroSection from "../components/Common/HeroSection";
// import Footer from "../components/Common/Footer";
// const MentorPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const mentors = useSelector((state) => state.mentor.mentors);
//   const pagination = useSelector((state) => state.mentor.pagination);

//   const [query, setQuery] = useState({
//     keyword: "",
//     department: "",
//     company: "",
//     domain: "",
//     year: "",
//     page: 1,
//   });

//   const [showFilters, setShowFilters] = useState(false);

//   useEffect(() => {
//     dispatch(searchMentors(query));
//   }, [dispatch]);

//   const handleSearch = () => {
//     dispatch(searchMentors({ ...query, page: 1 }));
//   };

//   const clearFilters = () => {
//     setQuery({
//       keyword: "",
//       department: "",
//       company: "",
//       domain: "",
//       year: "",
//       page: 1,
//     });
//     dispatch(searchMentors({ page: 1 }));
//   };

//   const handlePageChange = (page) => {
//     dispatch(searchMentors({ ...query, page }));
//     setQuery((prev) => ({ ...prev, page }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
//       {/* Header */}
//       <HeroSection
//         title="Your Perfect"
//         highlight="Mentor"
//         subtitle="Connect with experienced mentors to guide your academic journey"
//         buttonText="Become a Mentor"
//         linkIfToken="/ApplyMentorForm"
//         linkIfNotToken="/login"
//       />

//       {/* Search Bar */}
//       <div className="max-w-4xl mx-auto mb-4 px-4">
//         <div className="relative flex items-center w-full">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search by name, email, domain..."
//             value={query.keyword}
//             onChange={(e) =>
//               setQuery({ ...query, keyword: e.target.value, page: 1 })
//             }
//             className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 outline-none"
//           />
//           <button
//             onClick={handleSearch}
//             className="ml-4 bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-md font-semibold"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {/* Filter Row */}
//       <div className="flex flex-row justify-center items-center gap-4 mb-8 max-w-4xl mx-auto">
//         <button
//           onClick={() => setShowFilters(!showFilters)}
//           className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white"
//         >
//           <Filter className="w-5 h-5" />
//           Filters
//         </button>

//         <button
//           onClick={clearFilters}
//           className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white"
//         >
//           <RefreshCcw className="w-4 h-4" />
//           Refresh
//         </button>
//       </div>

//       {/* Filters Section */}
//       {showFilters && (
//         <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 max-w-5xl mx-auto mb-6">
//           <select
//             value={query.department}
//             onChange={(e) =>
//               setQuery({ ...query, department: e.target.value, page: 1 })
//             }
//             className="bg-gray-700 text-white rounded-md px-3 py-2"
//           >
//             <option value="">Select Department</option>
//             <option value="Computer Engineering">Computer Engineering</option>
//             <option value="Information Technology">Information Technology</option>
//             <option value="Electronics & Telecommunication">
//               Electronics & Telecommunication
//             </option>
//             <option value="Instrumentation & Control Engineering">
//               Instrumentation & Control Engineering
//             </option>
//             <option value="Robotics & Automation">Robotics & Automation</option>
//             <option value="Artificial Intelligence & Data Science">
//               AI & Data Science
//             </option>
//             <option value="Civil Engineering">Civil Engineering</option>
//             <option value="Mechanical Engineering">Mechanical Engineering</option>
//           </select>

//           {/* <select
//             value={query.company}
//             onChange={(e) =>
//               setQuery({ ...query, company: e.target.value, page: 1 })
//             }
//             className="bg-gray-700 text-white rounded-md px-3 py-2"
//           >
//             <option value="">Select Company</option>
//             <option value="TCS">TCS</option>
//             <option value="Infosys">Infosys</option>
//             <option value="Wipro">Wipro</option>
//           </select> */}
//   <input
//     type="text"
//     value={query.company || ""}
//     onChange={(e) =>
//       setQuery({ ...query, company: e.target.value, page: 1 })
//     }
//     placeholder="Enter Company Name"
//     className="bg-gray-700 text-white rounded-md px-3 py-2"
//   />







//     <select
//   value={query.domain}
//   onChange={(e) =>
//     setQuery({ ...query, domain: e.target.value, page: 1 })
//   }
//   className="bg-gray-700 text-white rounded-md px-3 py-2"
// >
//   <option value="">Select Domain</option>
//   <option value="Web Development">Web Development</option>
//   <option value="MERN">MERN</option>
//   <option value="AI/ML">AI/ML</option>
//   <option value="Cloud Computing">Cloud Computing</option>
//   <option value="Data Science">Data Science</option>
//   <option value="Cybersecurity">Cybersecurity</option>
//   <option value="Mobile App Development">Mobile App Development</option>
//   <option value="Blockchain">Blockchain</option>
//   <option value="DevOps">DevOps</option>
//   <option value="UI/UX Design">UI/UX Design</option>
//   <option value="AR/VR">AR/VR</option>
//   <option value="Game Development">Game Development</option>
//   <option value="Embedded Systems">Embedded Systems</option>
//   <option value="IOT">IoT (Internet of Things)</option>
//   <option value="Networking">Networking</option>
//   <option value="Software Testing">Software Testing</option>
//   <option value="Full Stack Development">Full Stack Development</option>
//   <option value="Product Management">Product Management</option>
//   <option value="Project Management">Project Management</option>
// </select>


//           <input
//             type="number"
//             placeholder="Passout Year"
//             value={query.year}
//             onChange={(e) =>
//               setQuery({ ...query, year: e.target.value, page: 1 })
//             }
//             className="bg-gray-700 text-white rounded-md px-3 py-2"
//           />
//         </div>
//       )}

//       {/* Mentor Cards */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {mentors && mentors.length > 0 ? (
//           mentors.map((mentor) => (
//             <MentorCard key={mentor._id} mentor={mentor} />
//           ))
//         ) : (
//           <p className="text-center col-span-full text-gray-400">
//             No mentors found. Please Retresh and Search again.
//           </p>
//         )}
//       </div>

//       {/* Pagination */}
//       {pagination && pagination.totalPages > 1 && (
//         <Pagination
//           currentPage={pagination.page}
//           totalPages={pagination.totalPages}
//           onPageChange={handlePageChange}
//         />
//       )}
// <div className="mt-7"><Footer/></div>
       
//     </div>
//   );
// };

// export default MentorPage;









import React, { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchMentors } from "../services/operations/mentorAPI";
import MentorCard from "../components/Mentor/MentorCard";
import Pagination from "../components/Mentor/Paganation";
import Footer from "../components/Common/Footer";
import SearchAndFilterBar from "../components/Admin/Parts/Searchfillter"; // ✅ reuse like books/guides

const MentorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mentors, pagination, loading } = useSelector((state) => state.mentor);
  const token = localStorage.getItem("token");

  // Filters & Search state
  const [filters, setFilters] = useState({
    department: "",
    company: "",
    domain: "",
    year: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Load mentors
  const loadMentors = (page = 1) => {
    const payload = {
      page,
      limit: 6,
      department: filters.department || undefined,
      company: filters.company || undefined,
      domain: filters.domain || undefined,
      year: filters.year || undefined,
  keyword: searchTerm || undefined, // ✅ correct key
    };
    dispatch(searchMentors(payload));
  };

  // Initial load
  useEffect(() => {
    loadMentors(1);
  }, []);

  // Debounced search/filter
  useEffect(() => {
    const delay = setTimeout(() => {
      loadMentors(1);
    }, 400);
    return () => clearTimeout(delay);
  }, [filters, searchTerm]);

  // Reset filters
  const handleResetFilters = () => {
    setFilters({ department: "", company: "", domain: "", year: "" });
    setSearchTerm("");
    loadMentors(1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* HEADER (same style as BooksPage / GuidePage) */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-col justify-center items-start sm:items-center gap-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Find Your Perfect <span className="text-yellow-400">Mentor</span>
              </h1>
              <p className="text-gray-400 mt-1">
                Connect with experienced mentors to guide your academic & career journey
              </p>
            </div>

            <button
              onClick={() => {
                if (token) {
                  navigate("/ApplyMentorForm");
                } else {
                  navigate("/login");
                }
              }}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-lg text-black font-medium transition hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Become a Mentor
            </button>
          </div>

          {/* Mentors count + divider */}
          <div>
            <h2 className="text-lg font-semibold">
  Mentors <span className="text-yellow-400">({pagination?.total || 0})</span>
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
  filterKeys={["department", "company", "domain", "year"]}
  options={{
    department: [
      "Computer Engineering",
      "Information Technology",
      "Electronics & Telecommunication",
      "Instrumentation & Control Engineering",
      "Robotics & Automation",
      "AI & Data Science",
      "Civil Engineering",
      "Mechanical Engineering",
    ],
    company: [
      "Google",
      "Microsoft",
      "Amazon",
      "Apple",
      "Meta (Facebook)",
      "Netflix",
      "Tesla",
      "Adobe",
      "Intel",
      "IBM",
    ],
    domain: [
      "Web Development",
      "MERN",
      "AI/ML",
      "Cloud Computing",
      "Data Science",
      "Cybersecurity",
      "Mobile App Development",
      "Blockchain",
      "DevOps",
      "UI/UX Design",
      "AR/VR",
      "Game Development",
      "Embedded Systems",
      "IoT",
      "Networking",
      "Software Testing",
      "Full Stack Development",
      "Product Management",
      "Project Management",
    ],
    year: ["2021", "2022", "2023", "2024"],
  }}
  debounceDelay={400}
/>


        {/* MENTOR LIST */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading mentors...</div>
        ) : mentors && mentors.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
              {mentors.map((mentor) => (
                <MentorCard key={mentor._id} mentor={mentor} />
              ))}
            </div>

            {/* Pagination */}
            {pagination?.totalPages > 1 && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={(page) => {
                  loadMentors(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">No mentors found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MentorPage;
