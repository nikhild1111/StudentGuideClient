
// GuideCard.jsx
import React from 'react';
import { Phone, MapPin, Star, User, GraduationCap, DollarSign } from 'lucide-react';

const GuideCard = ({ guide }) => {
  const defaultImage = "https://via.placeholder.com/300x200?text=Guide";

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
      <div className="relative">
        <img
           src={`${import.meta.env.VITE_BACKEND_URL}${guide.image}` || defaultImage} 
          alt={guide.name}
          className="w-full h-48 object-contain"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            guide.role === 'Guide' ? 'bg-yellow-400 text-gray-900' : 'bg-blue-500 text-white'
          }`}>
            {guide.role}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2">{guide.name}</h3>

        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="w-4 h-4 text-yellow-400" />
          <span className="text-gray-300 text-sm">{guide.department}</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-gray-300 text-sm">Year {guide.year}</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-yellow-400" />
          <span className="text-gray-300 text-sm">
            {guide.city}, {guide.taluka}, {guide.state}, {guide.country}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <User className="w-4 h-4 text-yellow-400" />
          <span className="text-gray-300 text-sm">{guide.gender}</span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-lg">₹{guide.pay}</span>
          </div>

          <button className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg transition-colors">
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">Contact</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;
