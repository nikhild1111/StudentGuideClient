import React from 'react';
import {
  ChevronLeft, ChevronRight, MapPin, Phone, Wifi, Shield, Zap,
  UtensilsCrossed, Shirt, Bath, Droplets, Star, Edit, Trash2
} from 'lucide-react';

const HostelCard = ({ 
  hostel, 
  currentImageIndex, 
  onNextImage, 
  onPrevImage,
  userType = 'user', // 'user' or 'admin'
  onEdit,
  onDelete 
}) => {
  const serviceIcons = {
    wifi: <Wifi className="w-4 h-4" />, 
    security: <Shield className="w-4 h-4" />, 
    electricity: <Zap className="w-4 h-4" />,
    food: <UtensilsCrossed className="w-4 h-4" />, 
    washing: <Shirt className="w-4 h-4" />, 
    washroom: <Bath className="w-4 h-4" />,
    personal_toilet: <Bath className="w-4 h-4" />, 
    water_filter: <Droplets className="w-4 h-4" />
  };

  const serviceNames = {
    wifi: "Wi-Fi", 
    security: "Security", 
    electricity: "Electricity", 
    food: "Food",
    washing: "Washing", 
    washroom: "Washroom", 
    personal_toilet: "Personal Toilet", 
    water_filter: "Water Filter"
  };

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
    onEdit && onEdit(hostel);
  };

  const handleDelete = () => {
    onDelete && onDelete(hostel._id);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Image Carousel */}
      <div className="relative h-48 md:h-56">
        {hostel.images && hostel.images.length > 0 ? (
          <>
            <img
              src={hostel.images[currentImageIndex || 0]}
              alt={hostel.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop';
              }}
            />
            
            {/* Navigation buttons */}
            {hostel.images.length > 1 && (
              <>
                <button
                  onClick={() => onPrevImage(hostel._id)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => onNextImage(hostel._id)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                {/* Image indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {hostel.images.map((_, index) => (
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
        
        {/* Type badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
          hostel.type === 'boys' ? 'bg-blue-600' : 'bg-pink-600'
        }`}>
          {hostel.type === 'boys' ? 'Boys Only' : 'Girls Only'}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white">{hostel.name}</h3>
          <div className="flex items-center gap-1">
            {renderStars(hostel.rating)}
            <span className="text-sm text-gray-400 ml-1">({hostel.rating})</span>
          </div>
        </div>
        
        {/* Description - Only show for regular users */}
        {userType === 'user' && hostel.description && (
          <p className="text-gray-300 text-sm line-clamp-1 mb-2 h-5">{hostel.description}</p>
        )}
        
        <div className="flex items-center gap-1 text-gray-400 text-sm h-12">
          <MapPin className="w-5 h-5 flex-shrink-0" />
          <span className="line-clamp-2">
            {hostel.address?.full || hostel.address}
          </span>
        </div>
        
        {/* Services */}
        {hostel.services && hostel.services.length > 0 && (
          <div className="mb-4 h-20">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Services</h4>
            <div className="flex flex-wrap gap-2">
              {hostel.services.map(service => (
                <div
                  key={service}
                  className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded-lg text-xs"
                  title={serviceNames[service]}
                >
                  {serviceIcons[service]}
                  <span className="inline">{serviceNames[service]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Price and Contact */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-700 relative bottom-0">
          <div>
            <div className="text-xl font-bold text-yellow-400">₹{hostel.rent}</div>
            <div className="text-xs text-gray-400">per month</div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300">{hostel.contact}</span>
          </div>
        </div>

        {/* Admin Actions */}
        {userType === 'admin' && (
          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-700">
            <button
              onClick={handleEdit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelCard;