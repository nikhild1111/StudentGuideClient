

// keep this man as it is *//*/*/*/*/***/*/*/**/*/***/*/*/*/*/ */ */ */

// import React, { useEffect, useState } from "react";
// import { Search, Filter, RefreshCcw, BookOpen, } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import Pagination from "../components/Books/Pagination";
// import FilterPanel from "../components/Books/FilterPanel";
// import BookCard from "../components/Books/BookCard";
// import HeroSection from "../components/Common/HeroSection";
// import { fetchAllBooks } from "../services/operations/booksApi";
// import Addbooks from "../components/Books/Addbooks";
// import { useNavigate } from "react-router-dom";
// import Footer from "../components/Common/Footer";
// const BooksPage = () => {
//   const dispatch = useDispatch();
//   const { books, pagination, loading } = useSelector((state) => state.book);
//  const [showModal, setShowModal] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const navigate=useNavigate();
//     const token = useSelector((state) => state.auth.token);
  
//   const [filters, setFilters] = useState({
//     department: "",
//     year: "",
//     semister:"",
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilters, setShowFilters] = useState(false);

//   // Fetch books from backend
//   const loadBooks = (page = 1) => {
//     dispatch(
//       fetchAllBooks({
//         page,
//         limit: 6,
//         department: filters.department || undefined,
//         year: filters.year || undefined,
//         search: searchTerm || undefined,
//       })
//     );
//   };

//   // Initial load
//   useEffect(() => {
//     loadBooks(1);
//   }, []);

//   // Handle search click
//   const handleSearch = () => {
//     loadBooks(1);
//   };

//   // Handle filter change from FilterPanel
//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };

//   // Handle reset
//   const handleResetFilters = () => {
//     setFilters({ department: "", year: "" , semister:"",});
//     setSearchTerm("");
//     loadBooks(1);
//   };

//   // Handle page change from Pagination component
//   const handlePageChange = (page) => {
//     loadBooks(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <div className="container mx-auto px-4 py-6">
//         {/* <HeroSection
//           title="Find Your Perfect"
//           highlight="Books"
//           subtitle="Get the right books for your academic journey"
//           buttonText="Sell Your Book"
//           linkIfToken="/addbook"
//           linkIfNotToken="/login"
//         /> */}


//            {/* 🔹 Manual Hero Section for Books */}
//         <div className="text-center mb-6">
//           <h1 className="text-3xl md:text-4xl font-bold mb-3">
//             Find Your Perfect <span className="text-yellow-400">Books</span>
//           </h1>
//           <div className="flex justify-center mt-6">
//             <button
//               onClick={() => {
//                 if (token) {
//                   setEditData(null);
//                   setShowModal(true);
//                 } else {
//                   navigate("/login");
//                 }
//               }}
//               className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-lg"
//             >
//               Sell Your Book
//             </button>
//           </div>
//         </div>

//      {showModal && (
//         <Addbooks
//           isEdit={!!editData}
//           initialData={editData}
//           onClose={() => setShowModal(false)}
//         />
//       )}

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
//             onFiltersChange={handleFilterChange}
//             showFilters={showFilters}
//             onReset={handleResetFilters}
//           />
//         </div>

//         {/* Books List */}
//         {loading ? (
//           <div className="text-center py-12 text-gray-400">Loading books...</div>
//         ) : books.length > 0 ? (
//           <>
//             <div className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-900">
//               {books.map((book) => (
//                 <BookCard
//   key={book._id}
//   book={book}// pass current logged-in user
//   onEdit={() => handleEditBook(book)}
//   onDelete={() => handleDeleteBook(book._id)}
//   onView={() => console.log("View details:", book)} // or your modal logic
// />
//               ))}
//             </div>
//             <Pagination
//               currentPage={pagination.currentPage}
//               totalPages={pagination.totalPages}
//               onPageChange={handlePageChange}
//             />
//           </>
//         ) : (
//           <div className="text-center py-12">
//               <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
//               <p className="text-gray-400 text-lg mb-2">No books found</p>
//               <p className="text-gray-500 text-sm">
//                 Try adjusting your filters or search terms
//               </p>
//             </div>
//         )}
//       </div>
//        <Footer/>
//     </div>
//   );
// };

// export default BooksPage;





import React, { useEffect, useState } from "react";
import { Plus, BookOpen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Books/Pagination";
import SearchAndFilterBar from  "../components/Admin/Parts/Searchfillter"; // ✅ reuse
import BookCard from "../components/Books/BookCard";
import Addbooks from "../components/Books/Addbooks";
import { fetchAllBooks } from "../services/operations/booksApi";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Common/Footer";

const BooksPage = () => {
  const dispatch = useDispatch();
  const { books, pagination, loading } = useSelector((state) => state.book);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  // Filters & Search state
  const [filters, setFilters] = useState({
    department: "",
    year: "",
    semister: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Add/Edit modal
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // Fetch books
  const loadBooks = (page = 1) => {
    dispatch(
      fetchAllBooks({
        page,
        limit: 6,
        department: filters.department || undefined,
        year: filters.year || undefined,
        semister: filters.semister || undefined,
        search: searchTerm || undefined,
      })
    );
  };

  // Initial load
  useEffect(() => {
    loadBooks(1);
  }, []);

  // Debounced filter/search
  useEffect(() => {
    const delay = setTimeout(() => {
      loadBooks(1);
    }, 400);

    return () => clearTimeout(delay);
  }, [filters, searchTerm]);

  // Reset filters
  const handleResetFilters = () => {
    setFilters({ department: "", year: "", semister: "" });
    setSearchTerm("");
    loadBooks(1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* HEADER */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-col justify-center items-start sm:items-center gap-6">
              <div className="text-center">
    <h1 className="text-3xl md:text-4xl font-bold mb-3">
      Find Your Best <span className="text-yellow-400">Books</span>
    </h1>
    <p className="text-gray-400 mt-1">
      Explore Books, filter by type, and choose the best option for you
    </p>
  </div>

            <button
              onClick={() => {
                if (token) {
                  setEditData(null);
                  setShowModal(true);
                } else {
                  navigate("/login");
                }
              }}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-lg text-black font-medium transition hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Sell Your Book
            </button>
          </div>

          {/* Books count + divider */}
          <div>
            <h2 className="text-lg font-semibold">
              Books <span className="text-yellow-400">({pagination?.totalBooks || 0})</span>
            </h2>
            <div className="border-b border-gray-700 mt-2"></div>
          </div>
        </div>

        {/* 🔹 SEARCH & FILTERS (same as AdminBooksPage) */}
        <SearchAndFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          handleResetFilters={handleResetFilters}
          filterKeys={["department", "year", "semister"]}
          options={{
            department: ["CSE", "IT", "ECE", "EEE", "MECH"],
            year: ["1", "2", "3", "4"],
            semister: ["1", "2"],
          }}
          onChange={loadBooks}
          debounceDelay={400}
        />

        {/* BOOKS LIST */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading books...</div>
        ) : books.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(page) => {
                loadBooks(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">No books found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <Addbooks
          isEdit={!!editData}
          initialData={editData}
          onClose={() => setShowModal(false)}
          onSuccess={() => loadBooks(pagination.currentPage)}
        />
      )}

      <Footer />
    </div>
  );
};

export default BooksPage;
