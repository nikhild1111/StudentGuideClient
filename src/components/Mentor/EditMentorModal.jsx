import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMentor } from "../../services/operations/mentorAPI";
import toast from "react-hot-toast";
import { X, Upload, Plus, Trash2 } from "lucide-react";

const EditMentorModal = ({ mentor, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: mentor.name || "",
    email: mentor.email || "",
    phone: mentor.phone || "",
    image: null, // For new file upload
    department: mentor.department || "",
    passoutYear: mentor.passoutYear || "",
    companies: mentor.companies || [""],
    gender: mentor.gender || "Prefer not to say",
    domain: mentor.domain || "",
    resume: null, // For new file upload
  });

  const [preview, setPreview] = useState(mentor.image || null);
  const [loading, setLoading] = useState(false);

  const departmentOptions = [
    "Computer Science Engineering",
    "Information Technology",
    "Electronics & Communication",
    "Electrical Engineering", 
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Aerospace Engineering",
    "Biotechnology",
    "Other"
  ];

  const genderOptions = [
    "Male",
    "Female", 
    "Other",
    "Prefer not to say"
  ];

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

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleCompanyChange = (index, value) => {
    const updatedCompanies = [...formData.companies];
    updatedCompanies[index] = value;
    setFormData((prev) => ({ ...prev, companies: updatedCompanies }));
  };

  const addCompany = () => {
    setFormData((prev) => ({
      ...prev,
      companies: [...prev.companies, ""]
    }));
  };

  const removeCompany = (index) => {
    const updatedCompanies = formData.companies.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, companies: updatedCompanies }));
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!formData.department) {
      toast.error("Department is required");
      return;
    }
    if (!formData.passoutYear) {
      toast.error("Passout year is required");
      return;
    }

    const validCompanies = formData.companies.filter(company => company.trim());
    if (validCompanies.length === 0) {
      toast.error("At least one company is required");
      return;
    }

    setLoading(true);
    const submitData = new FormData();
    
    // Append basic fields
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("department", formData.department);
    submitData.append("passoutYear", formData.passoutYear);
    submitData.append("gender", formData.gender);
    submitData.append("domain", formData.domain);
    
    // Append companies as JSON array
    submitData.append("companies", JSON.stringify(validCompanies));
    
    // Append files if selected
    if (formData.image) {
      submitData.append("image", formData.image);
    }
    if (formData.resume) {
      submitData.append("resume", formData.resume);
    }

    dispatch(
      updateMentor(mentor._id, submitData, (success) => {
        setLoading(false);
        if (success) {
          toast.success("Mentor updated successfully");
          onSuccess && onSuccess();
        }
      })
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999] p-4">
      <div className="bg-gray-900 text-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Edit Mentor</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white text-xl p-1 hover:bg-gray-800 rounded"
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
                src={preview || "/default-avatar.png"}
                alt="Mentor"
                className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-gray-700"
              />
            </div>
            <div className="flex justify-center">
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded cursor-pointer transition-colors">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter mentor name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                {genderOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Academic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Department *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select Department</option>
                {departmentOptions.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Passout Year *</label>
              <input
                type="number"
                name="passoutYear"
                value={formData.passoutYear}
                onChange={handleInputChange}
                min="1900"
                max={new Date().getFullYear() + 10}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g., 2020"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Domain/Specialization</label>
              <input
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g., Software Development, Data Science, etc."
              />
            </div>
          </div>

          {/* Companies */}
          <div>
            <label className="block text-sm font-medium mb-2">Companies *</label>
            <div className="space-y-2">
              {formData.companies.map((company, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => handleCompanyChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder={`Company ${index + 1}`}
                  />
                  {formData.companies.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCompany(index)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addCompany}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Company
              </button>
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Resume</label>
            <div className="flex items-center gap-4">
              {mentor.resume && (
                <a
                  href={mentor.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 text-sm underline"
                >
                  View Current Resume
                </a>
              )}
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Upload New Resume</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 px-6 py-4">
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-black font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Mentor"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMentorModal;