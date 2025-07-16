// src/components/Mentor/ApplyMentorForm.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMentor } from "../../services/operations/mentorAPI";
import ScreenBlocker from "../ScreenBlocker";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ApplyMentorForm = () => {
  const [blocking, setBlocking] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
    resume: null,
    department: "",
    domain: "",
    passoutYear: "",
    companies: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit number";
    }

    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.passoutYear) newErrors.passoutYear = "Year is required";
    if (!formData.companies) newErrors.companies = "At least one company required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = () => {
  console.log("  this is data",formData);

    if (!validateForm()) return;



    setBlocking(true);
    const submitData = new FormData();
Object.keys(formData).forEach((key) => {
  const value = formData[key];
  if (value !== null && value !== undefined) {
    if (key === "companies") {
      const companiesArray = value.split(",").map((c) => c.trim());
      submitData.append("companies", JSON.stringify(companiesArray));
    } else {
      submitData.append(key, value);
    }
  }
});


  console.log("🚀 SubmitData entries:");
for (let [key, value] of submitData.entries()) {
  console.log(`${key}:`, value);
}


    dispatch(
      addMentor(submitData, (success) => {
        setBlocking(false);
        if (success) {
          navigate("/mentor");
        } else {
          toast.error("Submission failed. Please try again.");
        }
      })
    );
  };

  return (
    <>
      <ScreenBlocker visible={blocking} message="Submitting mentor application..." />
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Become a <span className="text-yellow-400">Mentor</span> for Juniors
            </h1>
            <p className="text-gray-300 text-lg">
              Share your success journey and help students find their path
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 shadow-xl space-y-6">

            {/* Name */}
            <div>
              <label className="block mb-2">Full Name<span className="text-red-900"> *</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 rounded"
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2">Email<span className="text-red-900"> *</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 rounded"
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2">Phone Number<span className="text-red-900"> *</span></label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 rounded"
              />
              {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
            </div>

            {/* Department */}
            <div>
              <label className="block mb-2">Department<span className="text-red-900"> *</span></label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 rounded"
              >
                <option value="">Select Department</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
                <option value="Instrumentation & Control Engineering">Instrumentation & Control Engineering</option>
                <option value="Robotics & Automation">Robotics & Automation</option>
                <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </select>
              {errors.department && <p className="text-red-400 text-sm">{errors.department}</p>}
            </div>

            {/* Domain */}
            <div>
              <label className="block mb-2">Domain<span className="text-red-900"> *</span></label>
              <input
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
                placeholder="e.g., Web Development, AI/ML"
                className="w-full px-4 py-2 bg-gray-700 rounded"
              />
            </div>

            {/* Passout Year */}
            <div>
              <label className="block mb-2">Passout Year<span className="text-red-900"> *</span></label>
              <input
                type="number"
                name="passoutYear"
                value={formData.passoutYear}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 rounded"
              />
              {errors.passoutYear && <p className="text-red-400 text-sm">{errors.passoutYear}</p>}
            </div>

            {/* Companies */}
            <div>
              <label className="block mb-2">Companies<span className="text-red-900"> *</span></label>
              <input
                type="text"
                name="companies"
                value={formData.companies}
                onChange={handleInputChange}
                placeholder="Comma-separated, e.g., TCS, Infosys"
                className="w-full px-4 py-2 bg-gray-700 rounded"
              />
              {errors.companies && <p className="text-red-400 text-sm">{errors.companies}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-2">Gender<span className="text-red-900"> *</span></label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 rounded"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              {errors.gender && <p className="text-red-400 text-sm">{errors.gender}</p>}
            </div>

            {/* Image */}
            <div>
              <label className="block mb-2">Profile Image<span className="text-red-900"> *</span></label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 bg-gray-700 rounded"
              />
            </div>

            {/* Resume */}
            <div>
              <label className="block mb-2">Resume (PDF)<span className="text-red-900"> *</span></label>
              <input
                type="file"
                name="resume"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-4 py-2 bg-gray-700 rounded"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={blocking}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {blocking ? "Submitting..." : "Apply as Mentor"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyMentorForm;
