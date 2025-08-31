import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Building2, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Briefcase,
  X,
  Upload
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock API functions - replace with your actual API calls
const mockAPI = {
  updateMentor: (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Updating mentor:', id, data);
        resolve({ success: true });
      }, 1500);
    });
  },
  deleteMentor: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Deleting mentor:', id);
        resolve({ success: true });
      }, 1000);
    });
  }
};

// View Mentor Modal Component
const ViewMentorModal = ({ mentor, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999] p-4">
      <div className="bg-gray-900 text-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Mentor Details</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white text-xl p-1 hover:bg-gray-800 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <img
              src={mentor.image?.url || "/api/placeholder/112/112"}
              alt="Mentor"
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-gray-700"
            />
            <h3 className="text-2xl font-semibold mb-1">{mentor.name}</h3>
            <p className="text-gray-400 text-lg mb-2">{mentor.email}</p>
            {mentor.domain && mentor.domain !== "none" && (
              <p className="text-yellow-400 font-medium">{mentor.domain}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-yellow-400 border-b border-gray-700 pb-2">
                Personal Information
              </h4>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-gray-400 text-sm">Phone:</span>
                  <p className="text-white">{mentor.phone || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-gray-400 text-sm">Gender:</span>
                  <p className="text-white">{mentor.gender || "Prefer not to say"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-yellow-400 border-b border-gray-700 pb-2">
                Academic Information
              </h4>
              
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-gray-400 text-sm">Department:</span>
                  <p className="text-white">{mentor.department || "Not specified"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-gray-400 text-sm">Passout Year:</span>
                  <p className="text-white">{mentor.passoutYear || "Not specified"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-semibold text-yellow-400 border-b border-gray-700 pb-2 mb-4">
              Work Experience
            </h4>
            <div className="space-y-3">
              {mentor.companies && mentor.companies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mentor.companies.map((company, index) => (
                    <div key={index} className="flex items-center gap-3 bg-gray-800 rounded-lg p-3">
                      <Building2 className="w-5 h-5 text-blue-400" />
                      <span className="text-white">{company}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">No companies listed</p>
              )}
            </div>
          </div>

          {mentor.resume && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-yellow-400 border-b border-gray-700 pb-2 mb-4">
                Resume
              </h4>
              <div className="flex items-center gap-3 bg-gray-800 rounded-lg p-4">
                <FileText className="w-6 h-6 text-green-400" />
                <div className="flex-1">
                  <p className="text-white font-medium">Resume Available</p>
                  <p className="text-gray-400 text-sm">Click to view or download</p>
                </div>
                <a
                  href={mentor.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  View Resume
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 px-6 py-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-black font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Edit Mentor Modal Component
const EditMentorModal = ({ mentor, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: mentor.name || "",
    email: mentor.email || "",
    phone: mentor.phone || "",
    image: null,
    department: mentor.department || "",
    passoutYear: mentor.passoutYear || "",
    companies: mentor.companies || [""],
    gender: mentor.gender || "Prefer not to say",
    domain: mentor.domain || "",
    resume: null,
  });

  const [preview, setPreview] = useState(mentor.image?.url || null);
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

  const handleSubmit = async () => {
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

    setLoading(true);
    
    try {
      const result = await mockAPI.updateMentor(mentor._id, formData);
      if (result.success) {
        toast.success("Mentor updated successfully");
        onSuccess && onSuccess();
      }
    } catch (error) {
      toast.error("Failed to update mentor");
    } finally {
      setLoading(false);
    }
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
          <div className="text-center">
            <div className="mb-3">
              <img
                src={preview || "/api/placeholder/96/96"}
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
              <label className="block text-sm font-medium mb-2">Passout Year</label>
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

          <div>
            <label className="block text-sm font-medium mb-2">Companies</label>
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

// Delete Confirmation Modal
const DeleteConfirmModal = ({ mentor, onClose, onConfirm, loading }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999] p-4">
      <div className="bg-gray-900 text-white rounded-lg w-full max-w-md shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Delete Mentor</h3>
              <p className="text-gray-400 text-sm">This action cannot be undone</p>
            </div>
          </div>
          
          <p className="text-gray-300 mb-6">
            Are you sure you want to delete <span className="font-semibold text-white">{mentor.name}</span>? 
            All mentor data will be permanently removed.
          </p>
          
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Mentor Dashboard Component
const MentorDashboard = () => {
  // Mock mentor data - replace with actual data from Redux store
  const [mentors, setMentors] = useState([
    {
      _id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 9876543210",
      department: "Computer Science Engineering",
      passoutYear: "2020",
      gender: "Male",
      domain: "Full Stack Development",
      companies: ["Google", "Microsoft", "Amazon"],
      image: { url: "/api/placeholder/200/200" },
      resume: "https://example.com/resume.pdf",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-02-20T14:45:00Z"
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+91 9876543211",
      department: "Information Technology",
      passoutYear: "2019",
      gender: "Female",
      domain: "Data Science",
      companies: ["Netflix", "Spotify"],
      image: { url: "/api/placeholder/200/200" },
      createdAt: "2024-01-10T09:15:00Z",
      updatedAt: "2024-02-18T11:30:00Z"
    }
  ]);

  const [selectedMentor, setSelectedMentor] = useState(null);
  const [modalType, setModalType] = useState(null); // 'view', 'edit', 'delete'
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleViewMentor = (mentor) => {
    setSelectedMentor(mentor);
    setModalType('view');
  };

  const handleEditMentor = (mentor) => {
    setSelectedMentor(mentor);
    setModalType('edit');
  };

  const handleDeleteMentor = (mentor) => {
    setSelectedMentor(mentor);
    setModalType('delete');
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      const result = await mockAPI.deleteMentor(selectedMentor._id);
      if (result.success) {
        setMentors(mentors.filter(m => m._id !== selectedMentor._id));
        toast.success("Mentor deleted successfully");
        closeModal();
      }
    } catch (error) {
      toast.error("Failed to delete mentor");
    } finally {
      setDeleteLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedMentor(null);
    setModalType(null);
  };

  const handleEditSuccess = () => {
    // Refresh mentors list - in real app, you'd refetch from API
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Mentors</h1>
            <p className="text-gray-400 mt-2">Manage your mentor profiles</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-medium transition-colors">
            <Plus className="w-4 h-4" />
            Add New Mentor
          </button>
        </div>

        {/* Mentors Grid */}
        {mentors.length === 0 ? (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Mentors Found</h3>
            <p className="text-gray-400 mb-6">Start by adding your first mentor profile</p>
            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-medium transition-colors">
              Add Your First Mentor
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <div key={mentor._id} className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-gray-600 transition-colors">
                {/* Profile Section */}
                <div className="text-center mb-4">
                  <img
                    src={mentor.image?.url || "/api/placeholder/80/80"}
                    alt={mentor.name}
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-gray-700"
                  />
                  <h3 className="text-xl font-semibold mb-1">{mentor.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{mentor.email}</p>
                  {mentor.domain && (
                    <span className="inline-block px-3 py-1 bg-yellow-500 text-black text-xs rounded-full font-medium">
                      {mentor.domain}
                    </span>
                  )}
                </div>

                {/* Quick Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{mentor.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">Class of {mentor.passoutYear}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">
                      {mentor.companies?.length > 0 
                        ? `${mentor.companies.length} ${mentor.companies.length === 1 ? 'Company' : 'Companies'}`
                        : 'No companies listed'
                      }
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => handleViewMentor(mentor)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleEditMentor(mentor)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-medium transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMentor(mentor)}
                    className="flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modals */}
        {modalType === 'view' && selectedMentor && (
          <ViewMentorModal 
            mentor={selectedMentor} 
            onClose={closeModal} 
          />
        )}

        {modalType === 'edit' && selectedMentor && (
          <EditMentorModal 
            mentor={selectedMentor} 
            onClose={closeModal}
            onSuccess={handleEditSuccess}
          />
        )}

        {modalType === 'delete' && selectedMentor && (
          <DeleteConfirmModal 
            mentor={selectedMentor}
            onClose={closeModal}
            onConfirm={confirmDelete}
            loading={deleteLoading}
          />
        )}
      </div>
    </div>
  );
};

export default MentorDashboard;