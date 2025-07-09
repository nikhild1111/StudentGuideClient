
// // GuideCard.jsx
// import React from 'react';
// import { Phone, MapPin, Star, User, GraduationCap, DollarSign } from 'lucide-react';

// const GuideCard = ({ guide }) => {
//   const defaultImage = "https://via.placeholder.com/300x200?text=Guide";

//   return (
//     <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
//       <div className="relative">
//         <img
//            src={`${import.meta.env.VITE_BACKEND_URL}${guide.image}` || defaultImage} 
//           alt={guide.name}
//           className="w-full h-48 object-contain"
//         />
//         <div className="absolute top-4 right-4">
//           <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//             guide.role === 'Guide' ? 'bg-yellow-400 text-gray-900' : 'bg-blue-500 text-white'
//           }`}>
//             {guide.role}
//           </span>
//         </div>
//       </div>

//       <div className="p-4">
//         <h3 className="text-white font-semibold text-lg mb-2">{guide.name}</h3>

//         <div className="flex items-center gap-2 mb-2">
//           <GraduationCap className="w-4 h-4 text-yellow-400" />
//           <span className="text-gray-300 text-sm">{guide.department}</span>
//         </div>

//         <div className="flex items-center gap-2 mb-2">
//           <Star className="w-4 h-4 text-yellow-400" />
//           <span className="text-gray-300 text-sm">Year {guide.year}</span>
//         </div>

//         <div className="flex items-center gap-2 mb-2">
//           <MapPin className="w-4 h-4 text-yellow-400" />
//           <span className="text-gray-300 text-sm">
//             {guide.city}, {guide.taluka}, {guide.state}, {guide.country}
//           </span>
//         </div>

//         <div className="flex items-center gap-2 mb-2">
//           <User className="w-4 h-4 text-yellow-400" />
//           <span className="text-gray-300 text-sm">{guide.gender}</span>
//         </div>

//         <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
//           <div className="flex items-center gap-2">
//             <DollarSign className="w-4 h-4 text-yellow-400" />
//             <span className="text-yellow-400 font-bold text-lg">₹{guide.pay}</span>
//           </div>

//           <button className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg transition-colors">
//             <Phone className="w-4 h-4" />
//             <span className="text-sm font-medium">Contact</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GuideCard;



// import React from 'react';
// import { MapPin, Star, User, GraduationCap, Phone, DollarSign } from 'lucide-react';

// const GuideCard = ({ guide }) => {
//   const defaultImage = "https://via.placeholder.com/300x200?text=Guide";
//   const imageUrl = guide.image?.startsWith("/uploads/")
//     ? `${import.meta.env.VITE_BACKEND_URL}${guide.image}`
//     : guide.image || defaultImage;

//   return (
//     <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-500/30 transition duration-300 border border-gray-700">
//       {/* Top Image Section */}
//       <div className="relative">
//         <img
//           src={imageUrl}
//           alt={guide.name}
//           className="w-full h-56 object-contain"
//         />
//         <span className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold shadow">
//           {guide.role || "Guide"}
//         </span>
//       </div>

//       {/* Info Section */}
//       <div className="p-4 space-y-2">
//         <h3 className="text-xl font-semibold text-white">{guide.name}</h3>

//         <div className="flex items-center text-sm text-gray-300 gap-2">
//           <GraduationCap className="w-4 h-4 text-yellow-400" />
//           {guide.department}
//         </div>

//         <div className="flex items-center text-sm text-gray-300 gap-2">
//           <Star className="w-4 h-4 text-yellow-400" />
//           Year {guide.year}
//         </div>

//         <div className="flex items-center text-sm text-gray-300 gap-2">
//           <MapPin className="w-4 h-4 text-yellow-400" />
//           {guide.taluka}, {guide.city}, {guide.state}, {guide.country}
//         </div>

//         <div className="flex items-center text-sm text-gray-300 gap-2">
//           <User className="w-4 h-4 text-yellow-400" />
//           {guide.gender}
//         </div>

//         {/* Bottom Section */}
//         <div className="flex items-center justify-between border-t border-gray-700 pt-4 mt-4">
//           <div className="flex items-center gap-1 text-yellow-400 font-bold">
//             <DollarSign className="w-4 h-4" />
//             ₹{guide.pay}
//           </div>

//           <div className="flex items-center gap-2 text-white text-sm">
//             <Phone className="w-4 h-4 text-yellow-400" />
//             {guide.phone}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GuideCard;





import React from 'react';
import { MapPin, Star, User, GraduationCap, Phone, DollarSign } from 'lucide-react';

const GuideCard = ({ guide }) => {
  const defaultImage = "https://via.placeholder.com/150x150?text=Guide";
  const imageUrl = guide.image?.startsWith("/uploads/")
    ? `${import.meta.env.VITE_BACKEND_URL}${guide.image}`
    : guide.image || defaultImage;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 border border-gray-700 hover:border-yellow-500/50 max-w-7xl mx-auto mb-[25px]">
      {/* Profile Image Section */}
      <div className="relative p-4 pb-2">
        <div className="relative w-full h-40 mx-auto">
          <img
            src={imageUrl}
            alt={guide.name}
            className="w-full h-full object-contain rounded-lg"
          />
          <span className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-semibold">
            {guide.role || "Guide"}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-4 pb-4 space-y-3">
        {/* Name */}
        <h3 className="text-lg font-bold text-white text-center">{guide.name}</h3>
        
        {/* Department & Year */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
          <GraduationCap className="w-4 h-4 text-yellow-400" />
          <span>{guide.department}</span>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>Year {guide.year}</span>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
          <MapPin className="w-4 h-4 text-yellow-400" />
          <span>{guide.city}, {guide.state}</span>
        </div>

        {/* Gender */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
          <User className="w-4 h-4 text-yellow-400" />
          <span>{guide.gender}</span>
        </div>

        {/* Rate and Contact */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-1.5 rounded-full">
              {/* <span className="w-2 h-2 text-gray-900" >₹</span> */}
            </div>
            <div>
              <div className="text-xs text-white">Pay</div>
              <div className="text-sm font-bold text-yellow-400">₹{guide.pay}</div>
            </div>
          </div>

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