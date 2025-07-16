




// import React, { useState, useEffect } from 'react';
// import { X, Plus, Trash2, Save, Upload, Star } from 'lucide-react';

// const RestaurantModal = ({ 
//   isOpen, 
//   onClose, 
//   onSubmit, 
//   restaurant = null, 
//   loading = false 
// }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     type: 'veg',
//     rating: 0,
//     description: '',
//     address: {
//       full: '',
//       landmark: '',
//       gully: '',
//       building: ''
//     },
//     contact: '',
//     images: [],
//     menu: []
//   });

//   const [imageFiles, setImageFiles] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [errors, setErrors] = useState({});

//   const isEditMode = Boolean(restaurant);

//   // Initialize form data
//   useEffect(() => {
//     if (restaurant) {
//       setFormData({
//         ...restaurant,
//         address: {
//           full: restaurant.address?.full || '',
//           landmark: restaurant.address?.landmark || '',
//           gully: restaurant.address?.gully || '',
//           building: restaurant.address?.building || ''
//         },
//         menu: restaurant.menu || []
//       });
//       setImagePreviews(restaurant.images || []);
//     } else {
//       resetForm();
//     }
//   }, [restaurant, isOpen]);

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       type: 'veg',
//       rating: 0,
//       description: '',
//       address: {
//         full: '',
//         landmark: '',
//         gully: '',
//         building: ''
//       },
//       contact: '',
//       images: [],
//       menu: []
//     });
//     setImageFiles([]);
//     setImagePreviews([]);
//     setErrors({});
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setImageFiles(prev => [...prev, ...files]);
    
//     // Create previews
//     files.forEach(file => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreviews(prev => [...prev, e.target.result]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removeImage = (index) => {
//     setImageFiles(prev => prev.filter((_, i) => i !== index));
//     setImagePreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   const addMenuItem = () => {
//     setFormData(prev => ({
//       ...prev,
//       menu: [...prev.menu, {
//         item: '',
//         price: 0,
//         type: 'veg',
//         details: ''
//       }]
//     }));
//   };

//   const updateMenuItem = (index, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       menu: prev.menu.map((item, i) => 
//         i === index ? { ...item, [field]: value } : item
//       )
//     }));
//   };

//   const removeMenuItem = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       menu: prev.menu.filter((_, i) => i !== index)
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.name.trim()) newErrors.name = 'Restaurant name is required';
//     if (!formData.contact.trim()) newErrors.contact = 'Contact is required';
//     if (!formData.address.full.trim()) newErrors['address.full'] = 'Address is required';
//     if (formData.rating < 0 || formData.rating > 5) newErrors.rating = 'Rating must be between 0 and 5';
    
//     // Validate menu items
//     formData.menu.forEach((item, index) => {
//       if (!item.item.trim()) newErrors[`menu.${index}.item`] = 'Item name is required';
//       if (!item.price || item.price <= 0) newErrors[`menu.${index}.price`] = 'Valid price is required';
//     });
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
    
//     if (!validateForm()) return;

//     // Create FormData for multipart/form-data
//     const submitData = new FormData();
    
//     // Append basic fields
//     submitData.append('name', formData.name);
//     submitData.append('type', formData.type);
//     submitData.append('rating', formData.rating);
//     submitData.append('description', formData.description);
//     submitData.append('contact', formData.contact);
    
//     // Append address as JSON
//     submitData.append('address', JSON.stringify(formData.address));
    
//     // Append menu as JSON
//     submitData.append('menu', JSON.stringify(formData.menu));
    
//     // Append image files
//     imageFiles.forEach((file, index) => {
//       submitData.append('images', file);
//     });
    
//     // If editing, append existing images that weren't removed
//     if (isEditMode && restaurant.images) {
//       const existingImages = imagePreviews.filter(preview => 
//         typeof preview === 'string' && preview.startsWith('http')
//       );
//       submitData.append('existingImages', JSON.stringify(existingImages));
//     }
    
//     onSubmit(submitData);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-gray-800 rounded-xl w-full max-w-5xl max-h-[95vh] overflow-y-auto shadow-2xl">
//         <div className="sticky top-0 bg-gray-800 p-6 border-b border-gray-700 z-10">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
//               <span>{isEditMode ? 'Edit Restaurant' : 'Add New Restaurant'}</span>
//             </h2>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 space-y-8">
//           {/* Basic Information */}
//           <div className="bg-gray-700 rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Restaurant Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 bg-gray-600 border ${
//                     errors.name ? 'border-red-500' : 'border-gray-500'
//                   } rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors`}
//                   placeholder="Enter restaurant name"
//                 />
//                 {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Type *
//                 </label>
//                 <select
//                   name="type"
//                   value={formData.type}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
//                 >
//                   <option value="veg">Vegetarian</option>
//                   <option value="non-veg">Non-Vegetarian</option>
//                   <option value="both">Both</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Rating
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     name="rating"
//                     value={formData.rating}
//                     onChange={handleInputChange}
//                     min="0"
//                     max="5"
//                     step="0.1"
//                     className={`w-full px-4 py-3 bg-gray-600 border ${
//                       errors.rating ? 'border-red-500' : 'border-gray-500'
//                     } rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors`}
//                     placeholder="0.0"
//                   />
//                   <Star className="absolute right-3 top-3 w-5 h-5 text-yellow-500" />
//                 </div>
//                 {errors.rating && <p className="text-red-400 text-sm mt-1">{errors.rating}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Contact *
//                 </label>
//                 <input
//                   type="text"
//                   name="contact"
//                   value={formData.contact}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 bg-gray-600 border ${
//                     errors.contact ? 'border-red-500' : 'border-gray-500'
//                   } rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors`}
//                   placeholder="Phone number or email"
//                 />
//                 {errors.contact && <p className="text-red-400 text-sm mt-1">{errors.contact}</p>}
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   rows={3}
//                   className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
//                   placeholder="Tell us about this restaurant..."
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Address */}
//           <div className="bg-gray-700 rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-white mb-4">Address Details</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Full Address *
//                 </label>
//                 <input
//                   type="text"
//                   name="address.full"
//                   value={formData.address.full}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 bg-gray-600 border ${
//                     errors['address.full'] ? 'border-red-500' : 'border-gray-500'
//                   } rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors`}
//                   placeholder="Complete address"
//                 />
//                 {errors['address.full'] && <p className="text-red-400 text-sm mt-1">{errors['address.full']}</p>}
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Landmark
//                   </label>
//                   <input
//                     type="text"
//                     name="address.landmark"
//                     value={formData.address.landmark}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
//                     placeholder="Near..."
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Street/Gully
//                   </label>
//                   <input
//                     type="text"
//                     name="address.gully"
//                     value={formData.address.gully}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
//                     placeholder="Street name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Building
//                   </label>
//                   <input
//                     type="text"
//                     name="address.building"
//                     value={formData.address.building}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
//                     placeholder="Building name/number"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Images */}
//           <div className="bg-gray-700 rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-white mb-4">Images</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Upload Images
//                 </label>
//                 <div className="flex items-center justify-center w-full">
//                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-600 hover:bg-gray-600/80 transition-colors">
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <Upload className="w-8 h-8 mb-2 text-gray-400" />
//                       <p className="text-sm text-gray-400">
//                         <span className="font-semibold">Click to upload</span> or drag and drop
//                       </p>
//                     </div>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                     />
//                   </label>
//                 </div>
//               </div>
              
//               {imagePreviews.length > 0 && (
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {imagePreviews.map((preview, index) => (
//                     <div key={index} className="relative group">
//                       <img
//                         src={preview}
//                         alt={`Preview ${index + 1}`}
//                         className="w-full h-24 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Menu Items */}
//           <div className="bg-gray-700 rounded-lg p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-white">Menu Items</h3>
//               <button
//                 type="button"
//                 onClick={addMenuItem}
//                 className="flex items-center space-x-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
//               >
//                 <Plus className="w-4 h-4" />
//                 <span>Add Item</span>
//               </button>
//             </div>
            
//             {formData.menu.length === 0 ? (
//               <p className="text-gray-400 text-center py-8">No menu items added yet. Click "Add Item" to get started.</p>
//             ) : (
//               <div className="space-y-4">
//                 {formData.menu.map((item, index) => (
//                   <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-600 rounded-lg">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-1">
//                         Item Name *
//                       </label>
//                       <input
//                         type="text"
//                         value={item.item}
//                         onChange={(e) => updateMenuItem(index, 'item', e.target.value)}
//                         className={`w-full px-3 py-2 bg-gray-500 border ${
//                           errors[`menu.${index}.item`] ? 'border-red-500' : 'border-gray-400'
//                         } rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors`}
//                         placeholder="Item name"
//                       />
//                       {errors[`menu.${index}.item`] && (
//                         <p className="text-red-400 text-xs mt-1">{errors[`menu.${index}.item`]}</p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-1">
//                         Price *
//                       </label>
//                       <input
//                         type="number"
//                         value={item.price}
//                         onChange={(e) => updateMenuItem(index, 'price', parseFloat(e.target.value) || 0)}
//                         className={`w-full px-3 py-2 bg-gray-500 border ${
//                           errors[`menu.${index}.price`] ? 'border-red-500' : 'border-gray-400'
//                         } rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors`}
//                         placeholder="0.00"
//                       />
//                       {errors[`menu.${index}.price`] && (
//                         <p className="text-red-400 text-xs mt-1">{errors[`menu.${index}.price`]}</p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-1">
//                         Type
//                       </label>
//                       <select
//                         value={item.type}
//                         onChange={(e) => updateMenuItem(index, 'type', e.target.value)}
//                         className="w-full px-3 py-2 bg-gray-500 border border-gray-400 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
//                       >
//                         <option value="veg">Veg</option>
//                         <option value="non-veg">Non-Veg</option>
//                         <option value="other">Other</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-1">
//                         Details
//                       </label>
//                       <input
//                         type="text"
//                         value={item.details}
//                         onChange={(e) => updateMenuItem(index, 'details', e.target.value)}
//                         className="w-full px-3 py-2 bg-gray-500 border border-gray-400 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
//                         placeholder="Description"
//                       />
//                     </div>
//                     <div className="flex items-end">
//                       <button
//                         type="button"
//                         onClick={() => removeMenuItem(index)}
//                         className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                         title="Remove item"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Form Actions */}
//           <div className="sticky bottom-0 bg-gray-800 p-6 border-t border-gray-700 flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-3 text-gray-300 hover:text-white transition-colors font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={loading}
//               className="flex items-center space-x-2 bg-yellow-500 text-black px-8 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Save className="w-5 h-5" />
//               <span>{loading ? 'Saving...' : (isEditMode ? 'Update Restaurant' : 'Create Restaurant')}</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };









import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Upload, Star } from 'lucide-react';

const RestaurantModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = null, 
  type = 'add',
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'veg',
    rating: 0,
    description: '',
    address: { full: '', landmark: '', gully: '', building: '' },
    contact: '',
    images: [],
    menu: []
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});

  const isEditMode = type === 'edit';

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        address: {
          full: initialData.address?.full || '',
          landmark: initialData.address?.landmark || '',
          gully: initialData.address?.gully || '',
          building: initialData.address?.building || ''
        },
        menu: initialData.menu || []
      });
      setImagePreviews(initialData.images || []);
    } else {
      resetForm();
    }
  }, [initialData, isOpen]);

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'veg',
      rating: 0,
      description: '',
      address: { full: '', landmark: '', gully: '', building: '' },
      contact: '',
      images: [],
      menu: []
    });
    setImageFiles([]);
    setImagePreviews([]);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreviews(prev => [...prev, e.target.result]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const addMenuItem = () => {
    setFormData(prev => ({
      ...prev,
      menu: [...prev.menu, { item: '', price: 0, type: 'veg', details: '' }]
    }));
  };

  const updateMenuItem = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      menu: prev.menu.map((item, i) => i === index ? { ...item, [field]: value } : item)
    }));
  };

  const removeMenuItem = (index) => {
    setFormData(prev => ({ ...prev, menu: prev.menu.filter((_, i) => i !== index) }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Restaurant name is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact is required';
    if (!formData.address.full.trim()) newErrors['address.full'] = 'Address is required';
    if (formData.rating < 0 || formData.rating > 5) newErrors.rating = 'Rating must be 0–5';
    formData.menu.forEach((item, i) => {
      if (!item.item.trim()) newErrors[`menu.${i}.item`] = 'Item name is required';
      if (!item.price || item.price <= 0) newErrors[`menu.${i}.price`] = 'Valid price required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    const submitData = new FormData();
    
    // Append basic fields
    submitData.append('name', formData.name);
    submitData.append('type', formData.type);
    submitData.append('rating', formData.rating);
    submitData.append('description', formData.description);
    submitData.append('contact', formData.contact);
    
    // Append complex objects as JSON
    submitData.append('address', JSON.stringify(formData.address));
    submitData.append('menu', JSON.stringify(formData.menu));
    
    // Append image files
    imageFiles.forEach(file => submitData.append('images', file));
    
    // For edit mode, handle existing images
    if (isEditMode && initialData?.images) {
      const existingImages = imagePreviews.filter(p => 
        typeof p === 'string' && p.startsWith('http')
      );
      submitData.append('existingImages', JSON.stringify(existingImages));
    }
    
    onSave(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4">
      <div className="bg-gray-900 text-white w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-xl shadow-2xl">
        
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 p-4 flex justify-between items-center border-b border-gray-700 z-10">
          <h2 className="text-xl font-semibold">
            {isEditMode ? 'Edit Restaurant' : 'Add New Restaurant'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          
          {/* Basic Information */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Restaurant Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 bg-gray-700 border ${
                    errors.name ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-white focus:outline-none focus:border-yellow-500`}
                  placeholder="Enter restaurant name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                >
                  <option value="veg">Vegetarian</option>
                  <option value="non-veg">Non-Vegetarian</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                <div className="relative">
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className={`w-full px-3 py-2 bg-gray-700 border ${
                      errors.rating ? 'border-red-500' : 'border-gray-600'
                    } rounded-lg text-white focus:outline-none focus:border-yellow-500`}
                  />
                  <Star className="absolute right-3 top-2.5 w-4 h-4 text-yellow-500" />
                </div>
                {errors.rating && <p className="text-red-400 text-sm mt-1">{errors.rating}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Contact *</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 bg-gray-700 border ${
                    errors.contact ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-white focus:outline-none focus:border-yellow-500`}
                  placeholder="Phone or email"
                />
                {errors.contact && <p className="text-red-400 text-sm mt-1">{errors.contact}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  placeholder="Describe the restaurant..."
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Address</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Address *
                </label>
                <input
                  type="text"
                  name="address.full"
                  value={formData.address.full}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 bg-gray-700 border ${
                    errors['address.full'] ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-white focus:outline-none focus:border-yellow-500`}
                  placeholder="Complete address"
                />
                {errors['address.full'] && (
                  <p className="text-red-400 text-sm mt-1">{errors['address.full']}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Landmark</label>
                  <input
                    type="text"
                    name="address.landmark"
                    value={formData.address.landmark}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                    placeholder="Near..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Street/Gully</label>
                  <input
                    type="text"
                    name="address.gully"
                    value={formData.address.gully}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                    placeholder="Street name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Building</label>
                  <input
                    type="text"
                    name="address.building"
                    value={formData.address.building}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                    placeholder="Building name/number"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Images</h3>
            <div className="space-y-4">
              <div>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="text-sm text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                   accept=".jpg,.jpeg,.png"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Menu Section */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Menu Items</h3>
              <button
                type="button"
                onClick={addMenuItem}
                className="flex items-center space-x-2 bg-yellow-500 text-black px-3 py-1.5 rounded-lg hover:bg-yellow-600 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>
            
            {formData.menu.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                No menu items added yet. Click "Add Item" to get started.
              </p>
            ) : (
              <div className="space-y-3">
                {formData.menu.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 bg-gray-700 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Item Name *
                      </label>
                      <input
                        type="text"
                        value={item.item}
                        onChange={(e) => updateMenuItem(index, 'item', e.target.value)}
                        className={`w-full px-3 py-2 bg-gray-600 border ${
                          errors[`menu.${index}.item`] ? 'border-red-500' : 'border-gray-500'
                        } rounded-lg text-white focus:outline-none focus:border-yellow-500`}
                        placeholder="Item name"
                      />
                      {errors[`menu.${index}.item`] && (
                        <p className="text-red-400 text-xs mt-1">{errors[`menu.${index}.item`]}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Price *
                      </label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateMenuItem(index, 'price', parseFloat(e.target.value) || 0)}
                        className={`w-full px-3 py-2 bg-gray-600 border ${
                          errors[`menu.${index}.price`] ? 'border-red-500' : 'border-gray-500'
                        } rounded-lg text-white focus:outline-none focus:border-yellow-500`}
                        placeholder="0.00"
                      />
                      {errors[`menu.${index}.price`] && (
                        <p className="text-red-400 text-xs mt-1">{errors[`menu.${index}.price`]}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                      <select
                        value={item.type}
                        onChange={(e) => updateMenuItem(index, 'type', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                      >
                        <option value="veg">Veg</option>
                        <option value="non-veg">Non-Veg</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Details</label>
                      <input
                        type="text"
                        value={item.details}
                        onChange={(e) => updateMenuItem(index, 'details', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                        placeholder="Description"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeMenuItem(index)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 p-4 flex justify-end space-x-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : (isEditMode ? 'Update' : 'Create')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};



export default RestaurantModal;


// // Example usage component
// const App = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
//   const [modalType, setModalType] = useState('add');
//   const [loading, setLoading] = useState(false);

//   const handleSave = async (formData) => {
//     setLoading(true);
//     try {
//       console.log('Form data:', formData);
//       // Your API call here
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       setShowModal(false);
//       setSelectedRestaurant(null);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openAddModal = () => {
//     setModalType('add');
//     setSelectedRestaurant(null);
//     setShowModal(true);
//   };

//   const openEditModal = () => {
//     setModalType('edit');
//     setSelectedRestaurant({
//       name: 'Sample Restaurant',
//       type: 'both',
//       rating: 4.5,
//       description: 'Great food and service',
//       address: {
//         full: '123 Main St, City',
//         landmark: 'Near Park',
//         gully: 'Food Street',
//         building: 'Tower A'
//       },
//       contact: '+1234567890',
//       images: ['https://via.placeholder.com/150'],
//       menu: [
//         { item: 'Pizza', price: 12.99, type: 'veg', details: 'Margherita' },
//         { item: 'Burger', price: 8.99, type: 'non-veg', details: 'Beef burger' }
//       ]
//     });
//     setShowModal(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex space-x-4 mb-8">
//           <button
//             onClick={openAddModal}
//             className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
//           >
//             Add New Restaurant
//           </button>
//           <button
//             onClick={openEditModal}
//             className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
//           >
//             Edit Sample Restaurant
//           </button>
//         </div>

//         <RestaurantModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           onSave={handleSave}
//           initialData={selectedRestaurant}
//           type={modalType}
//           loading={loading}
//         />
//       </div>
//     </div>
//   );
// };

// export default App;