// HotelCard.jsx
import { useState } from "react";
import { Star, MapPin, Phone, ArrowLeft, ArrowRight } from "lucide-react";

const HotelCard = ({ hotel, openModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = hotel.images || [];
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="max-w-sm rounded-xl bg-gray-900 text-white shadow-lg overflow-hidden">
      {/* Image Carousel */}
      <div className="relative h-60 bg-gray-800">
        {images.length > 0 && (
          <img
            src={`${backendUrl}${images[currentIndex]}`}
            alt={`Hotel Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        )}
        {images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full">
              <ArrowLeft className="text-white w-5 h-5" />
            </button>
            <button onClick={nextImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full">
              <ArrowRight className="text-white w-5 h-5" />
            </button>
          </>
        )}
        <span className="absolute top-2 right-2 bg-orange-500 text-sm px-2 py-1 rounded-full font-medium">
          {hotel.type}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold">{hotel.name}</h2>
        <div className="flex items-center gap-1 text-yellow-400">
          {[...Array(Math.round(hotel.rating || 0))].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400" />
          ))}
          <span className="text-sm text-gray-300 ml-1">({hotel.rating || 0})</span>
        </div>
        <p className="text-gray-400">{hotel.description}</p>
        <div className="flex items-center text-gray-400 text-sm gap-1">
          <MapPin className="w-4 h-4" />
          <span>{hotel.address?.full || "Location not available"}</span>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-gray-300">Popular Items:</h4>
          <div className="space-y-2 mt-2">
            {hotel.menu.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex justify-between bg-gray-800 p-2 rounded-lg">
                <div>
                  <p className="font-medium text-white">{item.item}</p>
                  <p className="text-xs text-gray-500">{item.details}</p>
                </div>
                <p className="text-yellow-300 font-semibold">₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Phone className="w-4 h-4" />
            <span>{hotel.contact}</span>
          </div>
          <button
            onClick={() => openModal("view", hotel)}
            className="bg-yellow-400 text-black px-4 py-1.5 rounded font-semibold hover:bg-yellow-300"
          >
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
