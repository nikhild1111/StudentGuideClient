


// import React from 'react';
// import {
//   ChevronLeft, ChevronRight, MapPin, Phone, Star, Edit, Trash2
// } from 'lucide-react';
// import { toast } from "react-hot-toast";

// const HotelCard = ({ 
//   hotel, 
//   currentImageIndex, 
//   onNextImage, 
//   onPrevImage,
//   userType = 'user', // 'user' or 'admin'
//   onEdit,
//   onDelete 
// }) => {
//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 0; i < Math.floor(rating); i++) {
//       stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
//     }
//     if (rating % 1 !== 0) {
//       stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
//     }
//     return stars;
//   };

//   const handleEdit = () => {
//     onEdit && onEdit(hotel);
//   };

//   const handleDelete = () => {
//     onDelete && onDelete(hotel._id);
//   };

//   const handleViewMenu = () => {
//     toast("🍴 Coming Soon!", { position: "top-center" });
//   };

//   return (
//     <div className="bg-gray-800 rounded-xl border overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
//       {/* Image Section */}
//       <div className="relative h-48 md:h-56">
//         {userType === 'admin' && (
//           <div className="absolute top-2 left-2 flex gap-2 z-20">
//             <button
//               onClick={handleEdit}
//               className="w-8 h-8 flex items-center justify-center rounded-md bg-yellow-500 hover:bg-yellow-600 transition-colors"
//               title="Edit Hotel"
//             >
//               <Edit className="w-4 h-4 text-black" />
//             </button>
//             <button
//               onClick={handleDelete}
//               className="w-8 h-8 flex items-center justify-center rounded-md bg-red-600 hover:bg-red-700 transition-colors"
//               title="Delete Hotel"
//             >
//               <Trash2 className="w-4 h-4 text-white" />
//             </button>
//           </div>
//         )}

//         {/* Hotel Image */}
//         {hotel.images && hotel.images.length > 0 ? (
//           <>
//             <img
//               src={hotel.images[currentImageIndex || 0]}
//               alt={hotel.name}
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop';
//               }}
//             />

//             {hotel.images.length > 1 && (
//               <>
//                 <button
//                   onClick={() => onPrevImage(hotel._id)}
//                   className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>

//                 <button
//                   onClick={() => onNextImage(hotel._id)}
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </button>

//                 {/* Indicators */}
//                 <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
//                   {hotel.images.map((_, index) => (
//                     <div
//                       key={index}
//                       className={`w-2 h-2 rounded-full ${
//                         index === (currentImageIndex || 0)
//                           ? 'bg-yellow-400'
//                           : 'bg-white bg-opacity-50'
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </>
//             )}
//           </>
//         ) : (
//           <div className="w-full h-full bg-gray-700 flex items-center justify-center">
//             <span className="text-gray-400">No image available</span>
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         {/* Name + Rating */}
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-lg font-bold text-white truncate max-w-[70%]">
//             {hotel.name}
//           </h3>
//           <div className="flex items-center gap-1">
//             {renderStars(hotel.rating)}
//             <span className="text-sm text-gray-400 ml-1">({hotel.rating})</span>
//           </div>
//         </div>

//         {userType === 'user' && hotel.description && (
//           <p className="text-gray-300 text-sm line-clamp-1 mb-2">
//             {hotel.description}
//           </p>
//         )}

//         {/* Address */}
//         <div className="flex items-start gap-1 text-gray-400 text-sm mb-2 h-10">
//           <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
//           <span className="line-clamp-2">{hotel.address?.full || hotel.address}</span>
//         </div>

//         {/* Popular Items */}
//         {hotel.menu && hotel.menu.length > 0 && (
//           <div className="mb-4">
//             <h4 className="text-sm font-medium text-gray-300 mb-2">Popular Items:</h4>
//             <div className="space-y-2">
//               {hotel.menu.slice(0, 2).map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="flex justify-between items-center bg-gray-700 p-2 rounded"
//                 >
//                   <div className="max-w-[70%]">
//                     <span className="text-white text-sm font-medium block truncate">
//                       {item.item}
//                     </span>
//                     <p className="text-xs text-gray-400 truncate">
//                       {item.details}
//                     </p>
//                   </div>
//                   <span className="text-yellow-400 font-bold whitespace-nowrap">
//                     ₹{item.price}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* View Menu + Contact */}
//         <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-3">
//           <button 
//             onClick={handleViewMenu} 
//             className="text-sm font-semibold bg-yellow-400 text-black px-4 py-1 rounded-md hover:bg-yellow-300 transition"
//           >
//             View Menu
//           </button>
//           <div className="flex items-center gap-2">
//             <div className="bg-gray-700 p-1.5 rounded-full">
//               <Phone className="w-3 h-3 text-yellow-400" />
//             </div>
//             <div>
//               <div className="text-xs text-gray-400">Contact</div>
//               <div className="text-xs text-white truncate max-w-[120px]">
//                 {hotel.contact}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelCard;



import React from 'react';
import {
  ChevronLeft, ChevronRight, MapPin, Phone, Star, Edit, Trash2
} from 'lucide-react';
import { toast } from "react-hot-toast";

const HotelCard = ({ 
  hotel, 
  currentImageIndex, 
  onNextImage, 
  onPrevImage,
  userType = 'user', // 'user' or 'admin'
  onEdit,
  onDelete 
}) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (rating % 1 !== 0) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }
    return stars;
  };

  const handleEdit = () => {
    onEdit && onEdit(hotel);
  };

  const handleDelete = () => {
    onDelete && onDelete(hotel._id);
  };

  const handleViewMenu = () => {
    toast("🍴 Coming Soon!", { position: "top-center" });
  };

  return (
    <div className="bg-gray-800 rounded-xl border overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Image Section */}
      <div className="relative h-48 md:h-56">

        {/* Type Badge */}
        {hotel.type && (
          <div
            className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-md shadow-md
              ${hotel.type === "veg" ? "bg-green-600 text-white" : ""}
              ${hotel.type === "non-veg" ? "bg-red-600 text-white" : ""}
              ${hotel.type === "both" ? "bg-yellow-500 text-black" : ""}`}
          >
            {hotel.type === "veg" && "Veg"}
            {hotel.type === "non-veg" && "Non-Veg"}
            {hotel.type === "both" && "Both"}
          </div>
        )}

        {/* Admin Edit/Delete Buttons */}
        {userType === 'admin' && (
          <div className="absolute top-2 left-2 flex gap-2 z-20">
            <button
              onClick={handleEdit}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-yellow-500 hover:bg-yellow-600 transition-colors"
              title="Edit Hotel"
            >
              <Edit className="w-4 h-4 text-black" />
            </button>
            <button
              onClick={handleDelete}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-red-600 hover:bg-red-700 transition-colors"
              title="Delete Hotel"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        {/* Hotel Image */}
        {hotel.images && hotel.images.length > 0 ? (
          <>
            <img
              src={hotel.images[currentImageIndex || 0]}
              alt={hotel.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop';
              }}
            />

            {hotel.images.length > 1 && (
              <>
                <button
                  onClick={() => onPrevImage(hotel._id)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNextImage(hotel._id)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {hotel.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === (currentImageIndex || 0)
                          ? 'bg-yellow-400'
                          : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name + Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white truncate max-w-[70%]">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1">
            {renderStars(hotel.rating)}
            <span className="text-sm text-gray-400 ml-1">({hotel.rating})</span>
          </div>
        </div>

        {userType === 'user' && hotel.description && (
          <p className="text-gray-300 text-sm line-clamp-1 mb-2">
            {hotel.description}
          </p>
        )}

        {/* Address */}
        <div className="flex items-start gap-1 text-gray-400 text-sm mb-2 h-10">
          <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span className="line-clamp-2">{hotel.address?.full || hotel.address}</span>
        </div>

        {/* Popular Items */}
        {hotel.menu && hotel.menu.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Popular Items:</h4>
            <div className="space-y-2">
              {hotel.menu.slice(0, 2).map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-gray-700 p-2 rounded"
                >
                  <div className="max-w-[70%]">
                    <span className="text-white text-sm font-medium block truncate">
                      {item.item}
                    </span>
                    <p className="text-xs text-gray-400 truncate">
                      {item.details}
                    </p>
                  </div>
                  <span className="text-yellow-400 font-bold whitespace-nowrap">
                    ₹{item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View Menu + Contact */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-3">
          <button 
            onClick={handleViewMenu} 
            className="text-sm font-semibold bg-yellow-400 text-black px-4 py-1 rounded-md hover:bg-yellow-300 transition"
          >
            View Menu
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-gray-700 p-1.5 rounded-full">
              <Phone className="w-3 h-3 text-yellow-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Contact</div>
              <div className="text-xs text-white truncate max-w-[120px]">
                {hotel.contact}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
