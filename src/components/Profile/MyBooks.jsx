import React, { useState } from "react";
import { Plus, BookOpen, Edit, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import BookCard from "../Books/BookCard";
import Addbooks from "../Books/Addbooks";
import ConfirmModel from "../Common/ConfirmModel";
import {
  fetchAllBooks,
  deleteBook,
} from "../../services/operations/booksApi";

const BooksPage = () => {
  const { user } = useSelector((state) => state.auth);
  const books = user?.booksProfile || [];

  // Add / Edit Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // Delete Confirmation
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);

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
    // TODO: connect to your deleteBook API if needed
      await dispatch(deleteBook(deleteBookId));
    console.log("Delete book:", deleteBookId);
    setShowConfirmDelete(false);
    setDeleteBookId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">My Books</h1>
            <p className="text-gray-400 mt-1">
              All books you have uploaded to your profile
            </p>
          </div>

          <button
            onClick={() => {
              setEditData(null);
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-lg text-black font-medium transition hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Add Book
          </button>
        </div>

        {/* BOOKS LIST */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                user={user}
                onEdit={() => handleEditBook(book)}
                onDelete={() => handleDeleteBook(book._id)}
                onView={() => console.log("View details:", book)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">No books uploaded yet</p>
            <p className="text-gray-500 text-sm">
              Click on <span className="text-yellow-400">Add Book</span> to
              upload your first one
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
          onSuccess={() => console.log("Reload user books")} // later you can refresh user in redux
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
          title="Delete Book"
          message="Are you sure you want to delete this book? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default BooksPage;
