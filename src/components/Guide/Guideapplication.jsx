


import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { applyForGuide } from "../../services/operations/guideAPI";
import ScreenBlocker from "../ScreenBlocker";
import { useNavigate } from "react-router-dom";

const ApplyGuideForm = () => {
  const [blocking, setBlocking] = useState(false);
  const dispatch = useDispatch();

    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    image: null,
    department: "",
    year: "",
    city: "",
    state: "",
    country: "",
    taluka: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

   

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Department validation
    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    // Year validation
    if (!formData.year) {
      newErrors.year = "Year is required";
    } else if (parseInt(formData.year) < 1 || parseInt(formData.year) > 4) {
      newErrors.year = "Year must be between 1 and 4";
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setBlocking(true);
    
    // Create FormData for file upload
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        submitData.append(key, formData[key]);
      }
    });

   dispatch(
      applyForGuide(submitData, (success) => {
        setBlocking(false);

        if (success) {
          // ✅ Navigate to guide dashboard
          
          navigate("/guide");
        } else {
          // ❌ Keep form as is, allow user to edit
          toast.error("Form submission failed, user can retry.");
        }
      })
    );
  };

  return (
    <>
      <ScreenBlocker
        visible={blocking}
        message="Sending your guide application..."
      />
      
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Become a <span className="text-cyan-400">Guide</span> for <span className="text-blue-400">Juniors</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Share your DYPCOE journey experience and help freshers start strong
            </p>
          </div>

          {/* Form */}
          <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
            <div className="space-y-6">
              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Profile Image <span className="text-red-900"> *</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
                />
                {errors.image && <p className="text-red-400 text-sm mt-1">{errors.image}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number <span className="text-red-900"> *</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                  required
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Department and Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Department <span className="text-red-900"> *</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics & Telecommunications">Electronics & Telecommunications</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                  </select>
                  {errors.department && <p className="text-red-400 text-sm mt-1">{errors.department}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Current Year <span className="text-red-900"> *</span>
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                  {errors.year && <p className="text-red-400 text-sm mt-1">{errors.year}</p>}
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Gender <span className="text-red-900"> *</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
              </div>

              {/* Location Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    City <span className="text-red-900"> *</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter your city"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                    required
                  />
                  {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Taluka <span className="text-red-900"> *</span>
                  </label>
                  <input
                    type="text"
                    name="taluka"
                    value={formData.taluka}
                    onChange={handleInputChange}
                    placeholder="Enter your taluka"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    State <span className="text-red-900"> *</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter your state"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Country <span className="text-red-900"> *</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter your country"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={blocking}
                  onClick={handleSubmit}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {blocking ? "Submitting..." : "Apply as Guide"}
                </button>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">Why Become a Guide?</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Share your DYPCOE journey experience</li>
              <li>• Help freshers navigate hostel life and mess hunts</li>
              <li>• Earn money for every student you guide</li>
              <li>• Build leadership and mentoring skills</li>
              <li>• Make a positive impact on junior students</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyGuideForm;