// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import RestaurantModal from "./Parts/RestaurantModal"
// import { 
//   Search, 
//   Filter, 
//   Plus, 
//   Edit, 
//   Trash2, 
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   Star,
//   MapPin,
//   Phone,
//   X,
//   Save,
//   Camera,
//   Utensils
// } from 'lucide-react';
// import { fetchFoods, createFood, updateFood, deleteFood } from '../../services/operations/foodAPI';
// import restaurant from './Parts/RestaurantModal';
// const FoodManagement = () => {
//   const dispatch = useDispatch();
//   const { foods, loading, pagination, error } = useSelector(state => state.food);
  

//   console.log(foods);
//   // States
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
//   const [filterType, setFilterType] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState(''); // 'add', 'edit', 'view'
//   const [selectedFood, setSelectedFood] = useState(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   // Load foods on component mount and when filters change
//   useEffect(() => {
//     dispatch(fetchFoods({
//       page: currentPage,
//       limit: 6,
//       search: searchTerm,
//       type: filterType
//     }));
//   }, [dispatch, currentPage, searchTerm, filterType]);

//   // Handle search
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   // Handle filter
//   const handleFilter = (type) => {
//     setFilterType(type);
//     setCurrentPage(1);
//   };

//   // Handle pagination
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

  

//   // Handle form submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const submitData = new FormData();
//     Object.keys(formData).forEach(key => {
//       if (key === 'address') {
//         submitData.append('address', JSON.stringify(formData.address));
//       } else if (key === 'menu') {
//         submitData.append('menu', JSON.stringify(formData.menu));
//       } else if (key === 'images') {
//         formData.images.forEach(image => {
//           if (image instanceof File) {
//             submitData.append('images', image);
//           }
//         });
//       } else {
//         submitData.append(key, formData[key]);
//       }
//     });

//     if (modalType === 'add') {
//       dispatch(createFood(submitData, () => {
//         closeModal();
//         dispatch(fetchFoods({
//           page: currentPage,
//           limit: 6,
//           search: searchTerm,
//           type: filterType
//         }));
//       }));
//     } else if (modalType === 'edit') {
//       dispatch(updateFood(selectedFood._id, submitData, () => {
//         closeModal();
//         dispatch(fetchFoods({
//           page: currentPage,
//           limit: 6,
//           search: searchTerm,
//           type: filterType
//         }));
//       }));
//     }
//   };

//   // Handle delete
//   const handleDelete = (id) => {
//     setDeleteId(id);
//     setShowDeleteConfirm(true);
//   };

//   const confirmDelete = () => {
//     dispatch(deleteFood(deleteId, () => {
//       setShowDeleteConfirm(false);
//       setDeleteId(null);
//       dispatch(fetchFoods({
//         page: currentPage,
//         limit: 6,
//         search: searchTerm,
//         type: filterType
//       }));
//     }));
//   };


//   // Generate page numbers
//   const generatePageNumbers = () => {
//     const pages = [];
//     const total = pagination?.totalPages || 1;
    
//     for (let i = 1; i <= total; i++) {
//       pages.push(i);
//     }
    
//     return pages;
//   };


  

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-white">Food Management</h1>
//           <p className="text-gray-400 mt-1">Manage restaurants and food places</p>
//         </div>
//         <button
//           onClick={() => openModal('add')}
//           className="flex items-center space-x-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
//         >
//           <Plus className="w-5 h-5" />
//           <span>Add Restaurant</span>
//         </button>
//       </div>

//       {/* Search and Filter */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search restaurants by name or location..."
//             value={searchTerm}
//             onChange={handleSearch}
//             className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
//           />
//         </div>
        
//         <div className="flex items-center space-x-2">
//           <Filter className="w-5 h-5 text-gray-400" />
//           <select
//             value={filterType}
//             onChange={(e) => handleFilter(e.target.value)}
//             className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
//           >
//             <option value="all">All Types</option>
//             <option value="veg">Vegetarian</option>
//             <option value="non-veg">Non-Vegetarian</option>
//             <option value="both">Both</option>
//           </select>
//         </div>
//       </div>

//       {/* Content */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
//         </div>
//       ) : error ? (
//         <div className="text-center text-red-500 py-8">{error}</div>
//       ) : (
//         <>
//           {/* Food Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {foods?.map((food) => (
//               <div key={food._id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-all">
//                 <div className="relative h-48 bg-gray-700">
//                   {food.images?.[0] ? (
//                     <img 
//                       src={food.images[0]} 
//                       alt={food.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <Utensils className="w-16 h-16 text-gray-500" />
//                     </div>
//                   )}
//                   <div className="absolute top-2 right-2 flex space-x-1">
//                     <button
//                       onClick={() => openModal('view', food)}
//                       className="p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
//                     >
//                       <Eye className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => openModal('edit', food)}
//                       className="p-1.5 bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition-colors"
//                     >
//                       <Edit className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(food._id)}
//                       className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="p-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="text-lg font-semibold text-white truncate">{food.name}</h3>
//                     <span className={`px-2 py-1 rounded text-xs font-medium ${
//                       food.type === 'veg' ? 'bg-green-500/20 text-green-400' :
//                       food.type === 'non-veg' ? 'bg-red-500/20 text-red-400' :
//                       'bg-blue-500/20 text-blue-400'
//                     }`}>
//                       {food.type}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center mb-2">
//                     <Star className="w-4 h-4 text-yellow-500 mr-1" />
//                     <span className="text-gray-300">{food.rating || 0}</span>
//                   </div>
                  
//                   <div className="flex items-center text-gray-400 mb-2">
//                     <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
//                     <span className="text-sm truncate">{food.address?.full}</span>
//                   </div>
                  
//                   <div className="flex items-center text-gray-400">
//                     <Phone className="w-4 h-4 mr-1 flex-shrink-0" />
//                     <span className="text-sm">{food.contact}</span>
//                   </div>
                  
//                   {food.description && (
//                     <p className="text-gray-400 text-sm mt-2 line-clamp-2">{food.description}</p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Pagination */}
//           {pagination && pagination.totalPages > 1 && (
//             <div className="flex justify-center items-center space-x-2 mt-8">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`p-2 rounded-lg border ${
//                   currentPage === 1
//                     ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
//                     : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
//                 }`}
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
              
//               {generatePageNumbers().map(page => (
//                 <button
//                   key={page}
//                   onClick={() => handlePageChange(page)}
//                   className={`px-3 py-2 rounded-lg border ${
//                     currentPage === page
//                       ? 'bg-yellow-500 border-yellow-500 text-black font-medium'
//                       : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}
              
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === pagination.totalPages}
//                 className={`p-2 rounded-lg border ${
//                   currentPage === pagination.totalPages
//                     ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
//                     : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
//                 }`}
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           )}
//         </>
//       )}

//       {/* View Modal */}
//       {showModal && modalType === 'view' && selectedFood && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-white">Restaurant Details</h2>
//                 <button
//                   onClick={closeModal}
//                   className="text-gray-400 hover:text-white"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <div className="space-y-4">
//                     <div>
//                       <h3 className="text-lg font-semibold text-white mb-2">{selectedFood.name}</h3>
//                       <div className="flex items-center space-x-4">
//                         <span className={`px-3 py-1 rounded-full text-sm ${
//                           selectedFood.type === 'veg' ? 'bg-green-500/20 text-green-400' :
//                           selectedFood.type === 'non-veg' ? 'bg-red-500/20 text-red-400' :
//                           'bg-blue-500/20 text-blue-400'
//                         }`}>
//                           {selectedFood.type}
//                         </span>
//                         <div className="flex items-center">
//                           <Star className="w-4 h-4 text-yellow-500 mr-1" />
//                           <span className="text-gray-300">{selectedFood.rating || 0}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <h4 className="text-sm font-medium text-gray-300 mb-1">Description</h4>
//                       <p className="text-gray-400">{selectedFood.description || 'No description available'}</p>
//                     </div>

//                     <div>
//                       <h4 className="text-sm font-medium text-gray-300 mb-1">Address</h4>
//                       <div className="text-gray-400 space-y-1">
//                         <p>{selectedFood.address?.full}</p>
//                         {selectedFood.address?.landmark && <p>Near: {selectedFood.address.landmark}</p>}
//                         {selectedFood.address?.gully && <p>Street: {selectedFood.address.gully}</p>}
//                         {selectedFood.address?.building && <p>Building: {selectedFood.address.building}</p>}
//                       </div>
//                     </div>

//                     <div>
//                       <h4 className="text-sm font-medium text-gray-300 mb-1">Contact</h4>
//                       <p className="text-gray-400">{selectedFood.contact}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   {selectedFood.images && selectedFood.images.length > 0 && (
//                     <div className="mb-4">
//                       <h4 className="text-sm font-medium text-gray-300 mb-2">Images</h4>
//                       <div className="grid grid-cols-2 gap-2">
//                         {selectedFood.images.map((image, index) => (
//                           <img
//                             key={index}
//                             src={image}
//                             alt={`${selectedFood.name} ${index + 1}`}
//                             className="w-full h-32 object-cover rounded-lg"
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Menu */}
//               {selectedFood.menu && selectedFood.menu.length > 0 && (
//                 <div className="mt-6">
//                   <h4 className="text-lg font-semibold text-white mb-4">Menu</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {selectedFood.menu.map((item, index) => (
//                       <div key={index} className="bg-gray-700 p-4 rounded-lg">
//                         <div className="flex justify-between items-start mb-2">
//                           <h5 className="font-medium text-white">{item.item}</h5>
//                           <span className="text-yellow-500 font-semibold">₹{item.price}</span>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <span className={`px-2 py-1 rounded text-xs ${
//                             item.type === 'veg' ? 'bg-green-500/20 text-green-400' :
//                             item.type === 'non-veg' ? 'bg-red-500/20 text-red-400' :
//                             'bg-blue-500/20 text-blue-400'
//                           }`}>
//                             {item.type}
//                           </span>
//                         </div>
//                         {item.details && (
//                           <p className="text-gray-400 text-sm mt-2">{item.details}</p>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-gray-800 rounded-lg w-full max-w-md">
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-white mb-4">Confirm Delete</h2>
//               <p className="text-gray-300 mb-6">
//                 Are you sure you want to delete this restaurant? This action cannot be undone.
//               </p>
              
//               <div className="flex justify-end space-x-4">
//                 <button
//                   onClick={() => setShowDeleteConfirm(false)}
//                   className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={confirmDelete}
//                   className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && (!foods || foods.length === 0) && (
//         <div className="text-center py-12">
//           <Utensils className="w-16 h-16 text-gray-500 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold text-gray-300 mb-2">No restaurants found</h3>
//           <p className="text-gray-500 mb-4">
//             {searchTerm || filterType !== 'all' 
//               ? 'Try adjusting your search or filter criteria' 
//               : 'Start by adding your first restaurant'}
//           </p>
//           <button
//             onClick={() => openModal('add')}
//             className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
//           >
//             Add Restaurant
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FoodManagement;














// FoodManagement.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RestaurantModal from "./Parts/RestaurantModal";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Phone,
  X,
  Utensils
} from 'lucide-react';
import HotelModal from "../Admin/Parts/Hotelcard"
import { fetchFoods, createFood, updateFood, deleteFood } from '../../services/operations/foodAPI';
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
const FoodManagement = () => {
  const dispatch = useDispatch();
  const { foods, loading, pagination, error } = useSelector(state => state.food);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchFoods({ page: currentPage, limit: 6, search: searchTerm, type: filterType }));
  }, [dispatch, currentPage, searchTerm, filterType]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilter = (type) => {
    setFilterType(type);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const openModal = (type, food = null) => {
    setModalType(type);
    setSelectedFood(food);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFood(null);
    setModalType('');
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    dispatch(deleteFood(deleteId, () => {
      setShowDeleteConfirm(false);
      setDeleteId(null);
      dispatch(fetchFoods({ page: currentPage, limit: 6, search: searchTerm, type: filterType }));
    }));
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'veg':
        return <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">Veg Only</span>;
      case 'non-veg':
        return <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">Non-Veg</span>;
      case 'both':
        return <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">Both</span>;
      default:
        return null;
    }
  };


    const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-500" />);
    }

    return stars;
  };


//   const handleSave = (data, files) => {

  
//     const formData = new FormData();
//     for (const key in data) {
//       if (key === 'address' || key === 'menu') {
//         formData.append(key, JSON.stringify(data[key]));
//       } else {
//         formData.append(key, data[key]);
//       }
//     }
//     if (files && files.length) {
//       files.forEach(file => formData.append('images', file));
//     }

//     if (modalType === 'add') {
//       dispatch(createFood(formData, closeModal));
//     } else {
//       dispatch(updateFood(selectedFood._id, formData, closeModal));
//     }
//   };


const handleSave = (formData) => {

      console.log("🚀 SubmitData entries:");
for (let [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}

  if (modalType === 'add') {
    dispatch(createFood(formData, closeModal));
  } else {
    dispatch(updateFood(selectedFood._id, formData, closeModal));
  }
};


  const generatePageNumbers = () => {
    const pages = [];
    const total = pagination?.totalPages || 1;
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-white font-bold">Food Management</h1>
        <button
          onClick={() => openModal('add')}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-1" /> Add Restaurant
        </button>
      </div>

 <div className="flex flex-col sm:flex-row sm:items-center gap-4">
  {/* Search Box */}
  <div className="relative w-full sm:w-96">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      placeholder="Search by name or location..."
      value={searchTerm}
      onChange={handleSearch}
      className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg"
    />
  </div>

  {/* Filter Dropdown */}
  <div className="relative w-full sm:w-48">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <Filter className="w-4 h-4 text-gray-400" />
    </div>
    <select
      value={filterType}
      onChange={(e) => handleFilter(e.target.value)}
      className="bg-gray-800 text-white border border-gray-700 rounded-lg pl-10 pr-3 py-2 w-full"
    >
      <option value="all">All</option>
      <option value="veg">Vegetarian</option>
      <option value="non-veg">Non-Vegetarian</option>
      <option value="both">Both</option>
    </select>
  </div>
</div>
              
  {/* Hotels Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {foods.map((hotel) => (
              <div key={hotel._id} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* Hotel Image */}
                <div className="relative h-48 bg-gray-700">
                  {hotel.images && hotel.images[0] ? (
                    <img
                      src={`${Backend_url}/${hotel.images[0]}`}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Utensils className="w-16 h-16 text-gray-500" />
                    </div>
                  )}
                  
                  {/* Type Badge */}
                  <div className="absolute top-3 right-3">
                    {getTypeBadge(hotel.type)}
                  </div>


                       <div className="absolute top-2 left-2 flex gap-1">
                {/* <button onClick={() => openModal('view', food)} className="bg-blue-500 p-1.5 rounded-full">
                  <Eye className="w-4 h-4 text-white" />
                </button> */}
                <button onClick={() => openModal('edit', hotel)} className="bg-yellow-500 p-1.5 rounded-full">
                  <Edit className="w-4 h-4 text-black" />
                </button>
                <button onClick={() => handleDelete(hotel._id)} className="bg-red-500 p-1.5 rounded-full">
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>

                  {/* Navigation Arrows */}
                  <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Hotel Info */}
                <div className="p-4">
                  {/* Hotel Name and Rating */}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{hotel.name}</h3>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {renderStars(hotel.rating)}
                      </div>
                      <span className="text-sm text-gray-400">({hotel.rating})</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">{hotel.description}</p>

                  {/* Address */}
                  <div className="flex items-start gap-2 text-sm text-gray-400 mb-4">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{hotel.address.full}</span>
                  </div>

                  {/* Menu Items */}
                  {hotel.menu && hotel.menu.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Popular Items:</h4>
                      <div className="space-y-2">
                        {hotel.menu.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                            <div>
                              <span className="text-white text-sm font-medium">{item.item}</span>
                              <p className="text-xs text-gray-400">{item.details}</p>
                            </div>
                            <span className="text-yellow-400 font-bold">₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Phone className="w-4 h-4" />
                      <span>{hotel.contact}</span>
                    </div>
                    <button className="px-4 py-2 bg-yellow-400 text-gray-900 text-sm font-medium rounded-lg hover:bg-yellow-500 transition-colors">
                      View Menu
                    </button>
                  </div>
                </div>
              </div>
            ))}


          </div>
        )}

        {/* No Results */}
        {!loading && foods.length === 0 && (
          <div className="text-center py-12">
            <Utensils className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No restaurants found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          {generatePageNumbers().map(num => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`px-3 py-1 rounded ${num === currentPage ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'}`}
            >
              {num}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pagination.totalPages}>
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      )}

      {/* Restaurant Modal */}
      {showModal && modalType!=='view' &&(
        <RestaurantModal
          type={modalType}
          isOpen={showModal}
          onClose={closeModal}
          initialData={selectedFood}
          onSave={handleSave}
        />
      )}



      {/* ⬇ Show modal only when requested */}
      {/* {showModal && modalType === 'view' && selectedFood && (
        <HotelModal food={selectedFood} closeModal={closeModal} />
      )} */}





      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Confirm Delete</h2>
            <p className="text-gray-400 mb-6">Are you sure you want to delete this restaurant?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowDeleteConfirm(false)} className="text-gray-400">Cancel</button>
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodManagement;
