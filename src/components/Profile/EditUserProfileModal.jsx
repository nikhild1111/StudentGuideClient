import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../services/operations/profileAPI";
import toast from "react-hot-toast";
import { X, Upload } from "lucide-react";

const EditUserProfileModal = ({ user, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user.name || "",
    college: user.college || "",
    gender: user.gender || "Prefer not to say",
    department: user.department || "",
    year: user.year || "",
    phone: user.phone || "",
    profileImage: null, // For new file upload
  });

  const [preview, setPreview] = useState(user.profileImage?.url || null);
  const [loading, setLoading] = useState(false);

  const departmentOptions = [
    "Computer Science",
    "Information Technology",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Chemical Engineering",
    "Biotechnology",
    "Business Administration",
    "Commerce",
    "Arts",
    "Science",
    "Other",
  ];

  const genderOptions = [
    "Male",
    "Female", 
    "Other",
    "Prefer not to say"
  ];

  const yearOptions = [
    { value: 1, label: "1st Year" },
    { value: 2, label: "2nd Year" },
    { value: 3, label: "3rd Year" },
    { value: 4, label: "4th Year" },
  ];

  const collegeOptions = [
    "Dr. D.Y. Patil College of Engineering Akurdi",
    "PCCOE - Pimpri Chinchwad College Of Engineering",
    "PCCOE - Pimpri Chinchwad College Of Engineering Ravet",
    "Dr. D.Y. Patil Institute of Engineering, Management and Research",
    "Dr. D.Y. Patil International University",
    "Other"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.college.trim()) {
      toast.error("College is required");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Phone is required");
      return;
    }
    if (!formData.department) {
      toast.error("Department is required");
      return;
    }
    if (!formData.year || formData.year < 1 || formData.year > 4) {
      toast.error("Valid year (1-4) is required");
      return;
    }

    setLoading(true);
    const submitData = new FormData();
    
    // Append basic fields
    submitData.append("name", formData.name);
    submitData.append("college", formData.college);
    submitData.append("gender", formData.gender);
    submitData.append("phone", formData.phone);
    submitData.append("department", formData.department);
    submitData.append("year", formData.year);
    
    // Append profile image if selected
    if (formData.profileImage) {
      submitData.append("profileImage", formData.profileImage);
    }

    dispatch(
      updateUserProfile(submitData, (success) => {
        setLoading(false);
        if (success) {
          onSuccess && onSuccess();
        }
      })
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999] p-4">
      <div className="bg-slate-900 text-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Edit Profile</h2>
            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-white text-xl p-1 hover:bg-slate-800 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Image */}
          <div className="text-center">
            <div className="mb-3">
              <img
                src={preview || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-slate-700"
              />
            </div>
            <div className="flex justify-center">
              <label className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Change Image</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* College & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                College/University <span className="text-red-400">*</span>
              </label>
              <select
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Select College</option>
                {collegeOptions.map((college, index) => (
                  <option key={index} value={college}>{college}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                {genderOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Department & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Department <span className="text-red-400">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Select Department</option>
                {departmentOptions.map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Year <span className="text-red-400">*</span>
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Select Year</option>
                {yearOptions.map((y, index) => (
                  <option key={index} value={y.value}>
                    {y.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-900 border-t border-slate-700 px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2 bg-slate-600 hover:bg-slate-500 rounded transition-colors disabled:opacity-50 text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2 bg-yellow-400 hover:bg-yellow-500 rounded text-slate-900 font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfileModal;