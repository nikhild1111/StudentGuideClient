import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateGuide } from "../../services/operations/guideAPI";
import toast from "react-hot-toast";

const EditGuideModal = ({ guide, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    phone: guide.phone || "",
    image: null, // For new file upload
    department: guide.department || "",
    year: guide.year || "",
    city: guide.city || "",
    state: guide.state || "",
    country: guide.country || "",
    taluka: guide.taluka || "",
    gender: guide.gender || "",
  });

  const [preview, setPreview] = useState(guide.image || null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        submitData.append(key, formData[key]);
      }
    });

    dispatch(
      updateGuide(guide._id, submitData, () => {
        setLoading(false);
        toast.success("Guide updated successfully");
        onClose();
      })
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto p-4">
      <div className="bg-gray-900 text-white rounded-lg w-full max-w-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Guide</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">×</button>
        </div>

        {/* Profile Image */}
        <div className="mb-4 text-center">
          {preview && (
            <img
              src={preview}
              alt="Guide"
              className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
            />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
            >
              <option value="">Select Department</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics & Telecommunications">Electronics & Telecommunications</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Taluka</label>
            <input
              type="text"
              name="taluka"
              value={formData.taluka}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-black font-semibold disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Guide"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGuideModal;
