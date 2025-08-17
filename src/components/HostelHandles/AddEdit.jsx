import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createHostel, updateHostel } from "../../services/operations/hostelAPI";

export default function AddHostel({ isEdit = false, initialData = {}, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.hostel);

  const [formData, setFormData] = useState({
    name: "",
    type: "boys",
    rent: "",
    rating: "",
    description: "",
    services: [],
    contact: "",
    address: {
      full: "",
      landmark: "",
      gully: "",
      building: "",
    },
    images: [],
    video: "",
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

  const handleServicesChange = (service) => {
    setFormData((prev) => {
      const services = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "services") {
        value.forEach((s) => submitData.append("services[]", s));
      } else if (key === "images") {
        value.forEach((img) => submitData.append("images", img));
      } else if (key === "address") {
        Object.entries(value).forEach(([k, v]) =>
          submitData.append(`address[${k}]`, v)
        );
      } else {
        submitData.append(key, value);
      }
    });

    const action = isEdit
      ? updateHostel(initialData._id, submitData, onSuccess)
      : createHostel(submitData, onSuccess);

    dispatch(action);
  };

  const serviceOptions = [
    "wifi",
    "security",
    "electricity",
    "food",
    "washing",
    "washroom",
    "personal_toilet",
    "water_filter",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999] p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              {isEdit ? "Edit Hostel" : "Add Hostel"}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "contact", "rent", "rating"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
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
                  <option value="boys">Boys</option>
                  <option value="girls">Girls</option>
                </select>
              </div>
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
                  placeholder={field}
                  className="mt-2 w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
                />
              ))}
            </div>

            {/* Services */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Services
              </label>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((service) => (
                  <button
                    type="button"
                    key={service}
                    onClick={() => handleServicesChange(service)}
                    className={`px-3 py-1 rounded text-sm ${
                      formData.services.includes(service)
                        ? "bg-yellow-500 text-black"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Hostel Images
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
                  ? "Update Hostel"
                  : "Add Hostel"}
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
