

import React from 'react';
import { MapPin, Star, User, GraduationCap, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
const GuideCard = ({ guide }) => {
    const navigate = useNavigate();


    console.log(guide)
  const defaultImage = "https://via.placeholder.com/150x150?text=Guide";
  // const imageUrl = guide.image?.startsWith("/uploads/")
  //   ? `${import.meta.env.VITE_BACKEND_URL}${guide.image}`
  //   : guide.image || defaultImage;

  const handlePay = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If not logged in, redirect to login
      navigate("/login");
      return;
    }

    // Proceed with payment logic
   toast.success("Payment Successful");
    // Add your payment logic here
  };


  return (
    <div className="bg-[#1A1B1F] border border-gray-400 rounded-xl shadow-md hover:shadow-yellow-400/20 transition-all duration-300 mb-6">
      
      {/* Image and Role Tag */}
      <div className="relative w-full h-[220px] overflow-hidden rounded-t-xl bg-black">
        <img
          src={guide.image}
          alt={guide.name}
          className="w-full h-full object-contain object-top"
        />
        <span className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-semibold">
          {guide.role || "Guide"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2 bg-gray-900">
        {/* Name */}
        <h3 className="text-center text-white font-bold text-lg">{guide.name}</h3>

        {/* Department */}
        <div className="flex items-center justify-center text-sm text-gray-300 gap-1">
          <GraduationCap className="w-4 h-4 text-yellow-400" />
          <span>{guide.department}</span>
        </div>

        {/* Year */}
        <div className="flex items-center justify-center text-sm text-gray-300 gap-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>Year {guide.year}</span>
        </div>

        {/* City & State */}
        <div className="flex items-center justify-center text-sm text-gray-300 gap-1">
          <MapPin className="w-4 h-4 text-yellow-400" />
          {guide.taluka}, {guide.city}, {guide.state}, {guide.country}
        </div>

        {/* Gender */}
        <div className="flex items-center justify-center text-sm text-gray-300 gap-1">
          <User className="w-4 h-4 text-yellow-400" />
          <span>{guide.gender}</span>
        </div>

        {/* Payment and Contact */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-3">
          {/* Pay Button */}
          <button
            onClick={handlePay}
            className="text-sm font-semibold bg-yellow-400 text-black px-4 py-1 rounded-md hover:bg-yellow-300 transition"
          >
            Pay ₹{guide.pay}
          </button>

          {/* Contact */}
          <div className="flex items-center gap-2">
            <div className="bg-gray-700 p-1.5 rounded-full">
              <Phone className="w-3 h-3 text-yellow-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Contact</div>
              <div className="text-xs text-white">{guide.phone}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;
