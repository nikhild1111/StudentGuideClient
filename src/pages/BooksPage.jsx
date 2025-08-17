// import React, { useEffect, useState } from "react";
// import { Search, Filter, RefreshCcw } from "lucide-react";
// import Pagination from "../components/Books/Pagination";
// import FilterPanel from "../components/Books/FilterPanel";
// import BookCard from "../components/Books/BookCard";
// import HeroSection from "../components/Common/HeroSection";

// const BooksPage = () => {
//   const [filters, setFilters] = useState({
//     department: "",
//     year: "",
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [booksPerPage] = useState(6);

//   // Dummy Data (Replace with API data later)
//   const handleSearch = () => {
//     setCurrentPage(1);
//     // Filtering logic will go here once API is connected
//   };

//   const handleResetFilters = () => {
//     setFilters({ department: "", year: "" });
//     setSearchTerm("");
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const startIndex = (currentPage - 1) * booksPerPage;
//   const currentBooks = books.slice(startIndex, startIndex + booksPerPage);
//   const totalPages = Math.ceil(books.length / booksPerPage);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <div className="container mx-auto px-4 py-6">
//         <HeroSection
//           title="Find Your Perfect"
//           highlight="Books"
//           subtitle="Get the right books for your academic journey"
//           buttonText="Sell Your Book"
//           linkIfToken="/sellbook"
//           linkIfNotToken="/login"
//         />

//         {/* Search & Filter Section */}
//         <div className="max-w-7xl mx-auto mb-4 px-4 flex-col gap-6">
//           {/* Search Bar */}
//           <div className="max-w-4xl mx-auto mb-4 px-4">
//             <div className="relative flex items-center w-full">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search by name, department, or book..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 outline-none"
//               />
//               <button
//                 onClick={handleSearch}
//                 className="ml-4 bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-md font-semibold"
//               >
//                 Search
//               </button>
//             </div>
//           </div>

//           {/* Filter Buttons */}
//           <div className="flex flex-row justify-center items-center gap-4 mb-8 max-w-4xl mx-auto">
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition-colors"
//             >
//               <Filter className="w-5 h-5" /> Filters
//             </button>
//             <button
//               onClick={handleResetFilters}
//               className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition-colors"
//             >
//               <RefreshCcw className="w-5 h-5" /> Refresh
//             </button>
//           </div>

//           {/* Filter Panel */}
//           <FilterPanel
//             filters={filters}
//             onFiltersChange={setFilters}
//             showFilters={showFilters}
//             onReset={handleResetFilters}
//           />
//         </div>

//         {/* Books List */}
//         {currentBooks.length > 0 ? (
//           <>
//             <div className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-900">
//               {currentBooks.map((book) => (
//                 <BookCard key={book._id} book={book} />
//               ))}
//             </div>
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           </>
//         ) : (
//           <div className="text-center py-12 text-gray-400">
//             No books found matching your criteria.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BooksPage;





import React, { useEffect, useState } from "react";
import { Search, Filter, RefreshCcw, BookOpen, } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Books/Pagination";
import FilterPanel from "../components/Books/FilterPanel";
import BookCard from "../components/Books/BookCard";
import HeroSection from "../components/Common/HeroSection";
import { fetchAllBooks } from "../services/operations/booksApi";
import Addbooks from "../components/Books/Addbooks";
import { useNavigate } from "react-router-dom";

const BooksPage = () => {
  const dispatch = useDispatch();
  const { books, pagination, loading } = useSelector((state) => state.book);
 const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const navigate=useNavigate();
    const token = useSelector((state) => state.auth.token);
  
  const [filters, setFilters] = useState({
    department: "",
    year: "",
    semister:"",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch books from backend
  const loadBooks = (page = 1) => {
    dispatch(
      fetchAllBooks({
        page,
        limit: 6,
        department: filters.department || undefined,
        year: filters.year || undefined,
        search: searchTerm || undefined,
      })
    );
  };

  // Initial load
  useEffect(() => {
    loadBooks(1);
  }, []);

  // Handle search click
  const handleSearch = () => {
    loadBooks(1);
  };

  // Handle filter change from FilterPanel
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle reset
  const handleResetFilters = () => {
    setFilters({ department: "", year: "" , semister:"",});
    setSearchTerm("");
    loadBooks(1);
  };

  // Handle page change from Pagination component
  const handlePageChange = (page) => {
    loadBooks(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        {/* <HeroSection
          title="Find Your Perfect"
          highlight="Books"
          subtitle="Get the right books for your academic journey"
          buttonText="Sell Your Book"
          linkIfToken="/addbook"
          linkIfNotToken="/login"
        /> */}


           {/* 🔹 Manual Hero Section for Books */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Find Your Perfect <span className="text-yellow-400">Books</span>
          </h1>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                if (token) {
                  setEditData(null);
                  setShowModal(true);
                } else {
                  navigate("/login");
                }
              }}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-lg"
            >
              Sell Your Book
            </button>
          </div>
        </div>

     {showModal && (
        <Addbooks
          isEdit={!!editData}
          initialData={editData}
          onClose={() => setShowModal(false)}
        />
      )}

        {/* Search & Filter Section */}
        <div className="max-w-7xl mx-auto mb-4 px-4 flex-col gap-6">
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-4 px-4">
            <div className="relative flex items-center w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, department, or book..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

          {/* Filter Buttons */}
          <div className="flex flex-row justify-center items-center gap-4 mb-8 max-w-4xl mx-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5" /> Filters
            </button>
            <button
              onClick={handleResetFilters}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition-colors"
            >
              <RefreshCcw className="w-5 h-5" /> Refresh
            </button>
          </div>

          {/* Filter Panel */}
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFilterChange}
            showFilters={showFilters}
            onReset={handleResetFilters}
          />
        </div>

        {/* Books List */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading books...</div>
        ) : books.length > 0 ? (
          <>
            <div className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-900">
              {books.map((book) => (
                <BookCard
  key={book._id}
  book={book}// pass current logged-in user
  onEdit={() => handleEditBook(book)}
  onDelete={() => handleDeleteBook(book._id)}
  onView={() => console.log("View details:", book)} // or your modal logic
/>
              ))}
            </div>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">No books found</p>
              <p className="text-gray-500 text-sm">
                Try adjusting your filters or search terms
              </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default BooksPage;
