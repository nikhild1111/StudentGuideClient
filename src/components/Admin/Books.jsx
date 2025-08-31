// 🔹 Why Debouncing is Needed?
// Right now in your BooksPage, every time searchTerm or filters change, your useEffect calls:
// useEffect(() => {
//   loadBooks(1);
// }, [filters, searchTerm]);
// ⚠️ Problem: If a user types quickly in the search box (setSearchTerm), loadBooks will be called for every keystroke.
// This means unnecessary API calls, which = slower app + wasted backend requests.

// 👉 Debouncing solves this by delaying the function execution until the user stops typing for a small time window (e.g., 400ms).


// 🔹 How to Add Debouncing?
// useEffect(() => {
//   const delay = setTimeout(() => {
//     loadBooks(1); // only call after 400ms pause
//   }, 400);

//   return () => clearTimeout(delay); // cancel previous timeout if typing continues
// }, [filters, searchTerm]);


// }, [filters, searchTerm]);
// Here’s what happens:

// You type something → searchTerm changes.

// React runs this useEffect again.

// Inside effect → a new timer (setTimeout) is started that will call loadBooks(1) after 400ms.

// But before React applies the new effect, it runs the cleanup function from the previous effect:

// return () => clearTimeout(delay);
// This cancels the previous pending timer.

// So only the last timer (after you stop typing) will finish, and call loadBooks.
// 👉 So the cycle is:

// First render → start timer.

// Next render (because user typed again) → clear old timer → start a new one.

// This repeats until user stops typing → last timer is not cleared → after 400ms it runs loadBooks(1).

// That’s how debouncing works with useEffect.







import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  BookOpen,
  RefreshCcw,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Books/Pagination";
import SearchAndFilterBar from "../Admin/Parts/Searchfillter";
import BookCard from "../Books/BookCard";
import Addbooks from "../Books/Addbooks";
import ConfirmModel from "../Common/ConfirmModel";
import {
  fetchAllBooks,
  deleteBook,
} from "../../services/operations/booksApi";

const BooksPage = () => {
  const dispatch = useDispatch();
  const { books, pagination, loading } = useSelector((state) => state.book);
const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({
    department: "",
    year: "",
    semister: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Add / Edit Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // Delete Confirmation
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);

  // Load books
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

useEffect(() => {
  const delay = setTimeout(() => {
    loadBooks(1);
  }, 400);

  return () => clearTimeout(delay);
}, [filters, searchTerm]);



  // Reset Filters
  const handleResetFilters = () => {
    setFilters({ department: "", year: "", semister: "" });
    setSearchTerm("");
    loadBooks(1);
  };

  // Edit Book
  const handleEditBook = (book) => {
    setEditData(book);
    setShowAddModal(true);
  };

  // Delete Book
  const handleDeleteBook = (bookId) => {
    setDeleteBookId(bookId);
    setShowConfirmDelete(true);
  };



  const confirmDelete = async () => {
    await dispatch(deleteBook(deleteBookId));
    setShowConfirmDelete(false);
    setDeleteBookId(null);
    loadBooks(pagination.currentPage);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* HEADER */}
   {/* HEADER */}
<div className="flex flex-col gap-4 mb-6">
  {/* Title + Button */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold">Books Management</h1>
      <p className="text-gray-400 mt-1">Manage and browse student books</p>
    </div>

    <button
      onClick={() => {
        setEditData(null);
        setShowAddModal(true);
      }}
      className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-lg text-black font-medium transition hover:scale-105 active:scale-95"
    >
      <Plus className="w-5 h-5" />
      Add Books
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


        {/* SEARCH & FILTERS */}
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
          <div className="text-center py-12 text-gray-400">
            Loading books...
          </div>
        ) : books.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
              {books.map((book) => (
        <BookCard
  key={book._id}
  book={book}
  user={user} // pass current logged-in user
  onEdit={() => handleEditBook(book)}
  onDelete={() => handleDeleteBook(book._id)}
  onView={() => console.log("View details:", book)} // or your modal logic
/>

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
            <p className="text-gray-500 text-sm">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {showAddModal && (
        <Addbooks
          isEdit={!!editData}
          initialData={editData}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => loadBooks(pagination.currentPage)}
        />
      )}

      {/* DELETE CONFIRMATION */}
      {showConfirmDelete && (
        <ConfirmModel
          isOpen={showConfirmDelete}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowConfirmDelete(false);
            setDeleteBookId(null);
          }}
          title="Delete Books"
          message="Are you sure you want to delete this book? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default BooksPage;
