// // AddHotel.jsx
// import React, { useEffect, useState } from "react";
// import { X, Plus, Trash2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { createFood, updateFood } from "../../services/operations/foodAPI";

// export default function AddHotel({ isEdit = false, initialData = {}, onClose, onSuccess }) {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.food);

//   const [formData, setFormData] = useState({
//     name: "",
//     type: "veg",
//     rating: "",
//     description: "",
//     contact: "",
//     address: {
//       full: "",
//       landmark: "",
//       gully: "",
//       building: "",
//     },
//     images: [],
//     menu: [],
//   });

//   // Lock background scroll
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => (document.body.style.overflow = "auto");
//   }, []);

//   // Pre-fill when editing
//   useEffect(() => {
//     if (isEdit && initialData) {
//       setFormData({
//         ...formData,
//         ...initialData,
//         images: [],
//         menu: initialData.menu || [],
//       });
//     }
//   }, [isEdit, initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith("address.")) {
//       const key = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         address: { ...prev.address, [key]: value },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData((prev) => ({
//       ...prev,
//       images: [...prev.images, ...files],
//     }));
//   };

//   const removeImage = (index) => {
//     setFormData((prev) => {
//       const updated = [...prev.images];
//       updated.splice(index, 1);
//       return { ...prev, images: updated };
//     });
//   };

//   // Menu handling functions
//   const addMenuItem = () => {
//     setFormData((prev) => ({
//       ...prev,
//       menu: [...prev.menu, { item: "", price: "", type: "veg", details: "" }],
//     }));
//   };

//   const removeMenuItem = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       menu: prev.menu.filter((_, i) => i !== index),
//     }));
//   };

//   const updateMenuItem = (index, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       menu: prev.menu.map((item, i) =>
//         i === index ? { ...item, [field]: value } : item
//       ),
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const submitData = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (key === "images") {
//         value.forEach((img) => submitData.append("images", img));
//       } else if (key === "address") {
//         Object.entries(value).forEach(([k, v]) =>
//           submitData.append(`address[${k}]`, v)
//         );
//       } else if (key === "menu") {
//         submitData.append("menu", JSON.stringify(value));
//       } else {
//         submitData.append(key, value);
//       }
//     });

//     const action = isEdit
//       ? updateFood(initialData._id, submitData, onSuccess)
//       : createFood(submitData, onSuccess);

//     dispatch(action);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999] p-4 overflow-y-auto">
//       <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-bold text-white">
//               {isEdit ? "Edit Hotel" : "Add Hotel"}
//             </h2>
//             <button onClick={onClose} className="text-gray-400 hover:text-white">
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {["name", "contact", "rating"].map((field) => (
//                 <div key={field}>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   <input
//                     type={field === "rating" ? "number" : "text"}
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     required={field !== "rating"}
//                     className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
//                   />
//                 </div>
//               ))}

//               {/* Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Type
//                 </label>
//                 <select
//                   name="type"
//                   value={formData.type}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
//                 >
//                   <option value="veg">Veg</option>
//                   <option value="non-veg">Non-Veg</option>
//                   <option value="both">Both</option>
//                 </select>
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="3"
//                 className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
//               />
//             </div>

//             {/* Address */}
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">
//                 Full Address
//               </label>
//               <input
//                 type="text"
//                 name="address.full"
//                 value={formData.address.full}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
//               />
//               {["landmark", "gully", "building"].map((field) => (
//                 <input
//                   key={field}
//                   type="text"
//                   name={`address.${field}`}
//                   value={formData.address[field]}
//                   onChange={handleChange}
//                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                   className="mt-2 w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
//                 />
//               ))}
//             </div>

//             {/* Menu Items */}
//             <div>
//               <div className="flex justify-between items-center mb-2">
//                 <label className="block text-sm font-medium text-gray-300">
//                   Menu Items
//                 </label>
//                 <button
//                   type="button"
//                   onClick={addMenuItem}
//                   className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-medium hover:bg-yellow-400 transition flex items-center gap-1"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Add Item
//                 </button>
//               </div>
              
//               {formData.menu.length > 0 && (
//                 <div className="space-y-3 max-h-60 overflow-y-auto bg-gray-700 p-4 rounded-lg">
//                   {formData.menu.map((item, index) => (
//                     <div key={index} className="bg-gray-600 p-3 rounded-lg">
//                       <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-2">
//                         <div>
//                           <label className="block text-xs text-gray-300 mb-1">Item Name *</label>
//                           <input
//                             type="text"
//                             value={item.item}
//                             onChange={(e) => updateMenuItem(index, "item", e.target.value)}
//                             placeholder="Egg Curry"
//                             className="w-full px-2 py-1 text-sm rounded bg-gray-700 border border-gray-600 text-white"
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-xs text-gray-300 mb-1">Price *</label>
//                           <input
//                             type="number"
//                             value={item.price}
//                             onChange={(e) => updateMenuItem(index, "price", Number(e.target.value))}
//                             placeholder="80"
//                             className="w-full px-2 py-1 text-sm rounded bg-gray-700 border border-gray-600 text-white"
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-xs text-gray-300 mb-1">Type</label>
//                           <select
//                             value={item.type}
//                             onChange={(e) => updateMenuItem(index, "type", e.target.value)}
//                             className="w-full px-2 py-1 text-sm rounded bg-gray-700 border border-gray-600 text-white"
//                           >
//                             <option value="veg">Veg</option>
//                             <option value="non-veg">Non-Veg</option>
//                             <option value="other">Other</option>
//                           </select>
//                         </div>
//                         <div className="flex items-end">
//                           <button
//                             type="button"
//                             onClick={() => removeMenuItem(index)}
//                             className="bg-red-600 hover:bg-red-500 text-white p-2 rounded transition"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                       <div>
//                         <label className="block text-xs text-gray-300 mb-1">Details</label>
//                         <input
//                           type="text"
//                           value={item.details}
//                           onChange={(e) => updateMenuItem(index, "details", e.target.value)}
//                           placeholder="Boiled eggs in spicy curry"
//                           className="w-full px-2 py-1 text-sm rounded bg-gray-700 border border-gray-600 text-white"
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Images */}
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">
//                 Hotel Images
//               </label>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
//               />
//               {formData.images.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.images.map((img, i) => (
//                     <div
//                       key={i}
//                       className="relative w-16 h-16 border border-gray-500 rounded overflow-hidden"
//                     >
//                       <img
//                         src={URL.createObjectURL(img)}
//                         alt="preview"
//                         className="w-full h-full object-cover"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(i)}
//                         className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1 rounded-bl"
//                       >
//                         X
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>



//             <div className="flex gap-3 pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
//               >
//                 {loading
//                   ? "Processing..."
//                   : isEdit
//                   ? "Update Hotel"
//                   : "Add Hotel"}
//               </button>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }






// AddHotel.jsx
import React, { useEffect, useState } from "react";
import { X, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createFood, updateFood } from "../../services/operations/foodAPI";

export default function AddHotel({ isEdit = false, initialData = {}, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.food);

  const [formData, setFormData] = useState({
    name: "",
    type: "veg",
    rating: "",
    description: "",
    contact: "",
    address: {
      full: "",
      landmark: "",
      gully: "",
      building: "",
    },
    images: [],
    menu: [],
  });

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  // Pre-fill when editing
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...formData,
        ...initialData,
        images: [],
        menu: initialData.menu || [],
      });
    }
  }, [isEdit, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => {
      const updated = [...prev.images];
      updated.splice(index, 1);
      return { ...prev, images: updated };
    });
  };

  // Menu handling functions
  const addMenuItem = () => {
    setFormData((prev) => ({
      ...prev,
      menu: [...prev.menu, { item: "", price: "", type: "veg", details: "" }],
    }));
  };

  const removeMenuItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      menu: prev.menu.filter((_, i) => i !== index),
    }));
  };

  const updateMenuItem = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      menu: prev.menu.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((img) => submitData.append("images", img));
      } else if (key === "address") {
        Object.entries(value).forEach(([k, v]) =>
          submitData.append(`address[${k}]`, v)
        );
      } else if (key === "menu") {
        submitData.append("menu", JSON.stringify(value));
      } else {
        submitData.append(key, value);
      }
    });

    const action = isEdit
      ? updateFood(initialData._id, submitData, onSuccess)
      : createFood(submitData, onSuccess);

    dispatch(action);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999] p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              {isEdit ? "Edit Hotel" : "Add Hotel"}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "contact", "rating"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "rating" ? "number" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required={field !== "rating"}
                    className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
                  />
                </div>
              ))}

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
                >
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Address
              </label>
              <input
                type="text"
                name="address.full"
                value={formData.address.full}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
              />
              {["landmark", "gully", "building"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={`address.${field}`}
                  value={formData.address[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="mt-2 w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
                />
              ))}
            </div>

            {/* Menu Items */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Menu Items
                </label>
                <button
                  type="button"
                  onClick={addMenuItem}
                  className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-medium hover:bg-yellow-400 transition flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>
              
              {formData.menu.length > 0 && (
                <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-700 p-3 rounded-lg">
                  {formData.menu.map((item, index) => (
                    <div key={index} className="bg-gray-600 p-2 rounded">
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <input
                          type="text"
                          value={item.item}
                          onChange={(e) => updateMenuItem(index, "item", e.target.value)}
                          placeholder="Item Name"
                          className="px-2 py-1 text-sm rounded bg-gray-700 border border-gray-600 text-white"
                          required
                        />
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateMenuItem(index, "price", Number(e.target.value))}
                          placeholder="Price"
                          className="px-2 py-1 text-sm rounded bg-gray-700 border border-gray-600 text-white"
                          required
                        />
                        <select
                          value={item.type}
                          onChange={(e) => updateMenuItem(index, "type", e.target.value)}
                          className="px-2 py-1 text-sm rounded bg-gray-700 border border-gray-600 text-white"
                        >
                          <option value="veg">Veg</option>
                          <option value="non-veg">Non-Veg</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={item.details}
                          onChange={(e) => updateMenuItem(index, "details", e.target.value)}
                          placeholder="Details"
                          className="flex-1 px-2 py-1 text-sm rounded bg-gray-700 border border-gray-600 text-white"
                        />
                        <button
                          type="button"
                          onClick={() => removeMenuItem(index)}
                          className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs transition"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Hotel Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
              />
              {formData.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative w-16 h-16 border border-gray-500 rounded overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1 rounded-bl"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>



            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : isEdit
                  ? "Update Hotel"
                  : "Add Hotel"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}