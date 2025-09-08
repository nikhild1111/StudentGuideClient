

import React, { useState } from "react";
import { toast } from "react-hot-toast"; 
import { GraduationCap, Phone, BookOpen, ChevronLeft, ChevronRight, Eye, Edit, Trash2, MapPin, User } from "lucide-react";
import { useSelector } from "react-redux";
const BookCard = ({  book, user, onEdit, onDelete, onView}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const defaultImage = "https://via.placeholder.com/300x400?text=Person";
  
  // Handle image data - ensure we have an array
  const images = book.images && Array.isArray(book.images) && book.images.length > 0 
    ? book.images 
    : [{ url: defaultImage }];


  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePay = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // navigate("/login");
      toast.error("Please login first");
 
      return;
    }
    toast.sucess("Payment Successful!");
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-400 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-300 overflow-hidden w-full mx-auto relative">
      
      {/* Admin Controls - Only show if user is admin */}
       {user?.role === "admin" && (
        <div className="absolute top-2 right-2 flex gap-1 z-10">
          {/* <button
            onClick={() => onView && onView(book)}
            className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            <Eye className="w-4 h-4" />
          </button> */}
          <button
            onClick={() => onEdit && onEdit(book)}
            className="p-1.5 bg-yellow-500 hover:bg-yellow-600 rounded text-black"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete && onDelete(book._id)}
            className="p-1.5 bg-red-600 hover:bg-red-700 rounded text-white"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {/* Image Carousel */}
      <div className="relative w-full h-48 bg-black overflow-hidden">
        <img
          src={images[currentImageIndex]?.url || defaultImage}
          alt={`${book.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover object-center transition-opacity duration-300"
        />
        
        {/* Navigation Arrows - Only show if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'bg-yellow-400 scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

  <div className="p-5 space-y-3">
  
  {/* Name */}
  <h3 className="text-white font-bold text-lg text-center leading-tight">
    {book.name}
  </h3>

  {/* Email below name */}
  {book.email && (
    <p className="text-center text-sm text-gray-400 break-all">
      {book.email}
    </p>
  )}

  {/* Department with icon */}
  <div className="flex justify-center items-center gap-2 text-sm">
    <GraduationCap className="w-4 h-4 text-yellow-400" />
    <span className="text-yellow-400 font-medium">{book.department}</span>
  </div>

  {/* Year & Semester */}
  <div className="flex justify-center items-center gap-6 text-sm text-gray-300">
    <div className="flex items-center gap-2">
      <span className="text-gray-400">Year</span>
      <span className="text-white font-bold">{book.year}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-gray-400">Semester</span>
      <span className="text-white font-bold">{book.semister}</span>
    </div>
  </div>

  {/* Books List - Show all names fully */}
  {book.booksname && book.booksname.length > 0 && (
    <div className="space-y-2 h-[100px]">
      <div className="text-center text-xs text-gray-400 uppercase tracking-wider">
        Books Included
      </div>
      <div className="flex flex-wrap justify-center gap-1.5">
        {book.booksname.map((bookName, index) => (
          <span
            key={index}
            className="text-xs bg-gray-800/60 px-2.5 py-1 rounded-md text-gray-300 border border-gray-700/50"
          >
            {bookName}
          </span>
        ))}
      </div>
    </div>
  )}

  {/* Payment and Contact */}
  <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-3">
    {/* Pay Button */}
    <button
      onClick={handlePay}
      className="text-sm font-semibold bg-yellow-400 text-black px-4 py-1 rounded-md hover:bg-yellow-300 transition"
    >
      Pay ₹{book.price}
    </button>

    {/* Contact */}
    <div className="flex items-center gap-2">
      <div className="bg-gray-700 p-1.5 rounded-full">
        <Phone className="w-3 h-3 text-yellow-400" />
      </div>
      <div>
        <div className="text-xs text-gray-400">Contact</div>
        <div className="text-xs text-white">{book.contact}</div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};



export default BookCard;


