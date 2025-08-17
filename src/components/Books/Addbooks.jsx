import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { uploadBooks, updateBook } from "../../services/operations/booksApi";

export default function Addbooks({
  isEdit = false,
  initialData = {},
  onClose
}) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.book);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
    semister: "",
    contact: "",
    price: "",
    booksname: [""],
    images: []
  });

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Pre-fill when editing
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        department: initialData.department || "",
        year: initialData.year || "",
        semister: initialData.semister || "",
        contact: initialData.contact || "",
        price: initialData.price || "",
        booksname: initialData.booksname?.length
          ? initialData.booksname
          : [""],
        images: []
      });
    }
  }, [isEdit, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookNameChange = (index, value) => {
    const updated = [...formData.booksname];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, booksname: updated }));
  };

  const addBookField = () => {
    if (formData.booksname.length < 6) {
      setFormData((prev) => ({
        ...prev,
        booksname: [...prev.booksname, ""]
      }));
    }
  };

  const removeBookField = (index) => {
    const updated = [...formData.booksname];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, booksname: updated }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const total = formData.images.length + files.length;
    if (total > 56) {
      alert("You can upload up to 56 images only.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    const updated = [...formData.images];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "booksname") {
        value.forEach((book) => submitData.append("booksname[]", book));
      } else if (key === "images") {
        value.forEach((img) => submitData.append("images", img));
      } else {
        submitData.append(key, value);
      }
    });

    const action = isEdit ? updateBook : uploadBooks;
    dispatch(
      action(submitData, (success) => {
        if (success) {
          onClose();
          setFormData({
            name: "",
            email: "",
            department: "",
            year: "",
            semister: "",
            contact: "",
            price: "",
            booksname: [""],
            images: []
          });
        }
      })
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              {isEdit ? "Edit Book" : "Add New Books"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "email", "contact"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)} *
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
                >
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="CE">CE</option>
                  <option value="ME">ME</option>
                  <option value="EE">ENTC</option>
                  <option value="EE">Chem</option>
                  <option value="EE">Civil</option>
                  <option value="EE">AIDS</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Year *
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
                >
                  <option value="">Select Year</option>
                  {[1, 2, 3, 4].map((y) => (
                    <option key={y} value={y}>
                      Year {y}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Semester
                </label>
                <select
                  name="semister"
                  value={formData.semister}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
                >
                  <option value="">Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="₹500"
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
              />
            </div>

            {/* Book names */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Book Names *
                </label>
                <button
                  type="button"
                  onClick={addBookField}
                  disabled={formData.booksname.length >= 6}
                  className="text-yellow-400 hover:text-yellow-300 text-sm"
                >
                  + Add Book
                </button>
              </div>
              {formData.booksname.map((book, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={book}
                    onChange={(e) =>
                      handleBookNameChange(index, e.target.value)
                    }
                    placeholder={`Book ${index + 1} name`}
                    required
                    className="flex-1 px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
                  />
                  {formData.booksname.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBookField(index)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Book Images (max 56)
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
                  ? "Update Books"
                  : "Add Books"}
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
