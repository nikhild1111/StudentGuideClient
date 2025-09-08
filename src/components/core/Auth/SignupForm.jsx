
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { Eye, EyeOff } from "lucide-react";   
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { sendOtp } from "../../../services/operations/authAPI";

// function SignupFormTemplate() {

//   const navigate=useNavigate();
//     const dispatch = useDispatch()
//   const { loading } = useSelector((state) => state.auth);
  
//   const [formData, setFormData] = useState({
//     name: "",
//     gender: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     department: "",
//     year: "",
//     college: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const {
//     name,
//     gender,
//     email,
//     password,
//     confirmPassword,
//     phone,
//     department,
//     year,
//     college,
//   } = formData;

//   const genderOptions = [
//     "Male",
//     "Female",
//     "Other",
//     "Prefer not to say"
//   ];

//   const departmentOptions = [
//     "Computer Science",
//     "Information Technology",
//     "Electronics & Communication",
//     "Mechanical Engineering",
//     "Civil Engineering",
//     "Electrical Engineering",
//     "Chemical Engineering",
//     "Biotechnology",
//     "Business Administration",
//     "Commerce",
//     "Arts",
//     "Science",
//     "Other",
//   ];

//   const yearOptions = [
//     { value: 1, label: "1st Year" },
//     { value: 2, label: "2nd Year" },
//     { value: 3, label: "3rd Year" },
//     { value: 4, label: "4th Year" },
//   ];

//   const collegeOptions = [
//     "Dr. D.Y. Patil College of Engineering Akurdi",
//     "PCCOE - Pimpri Chinchwad College Of Engineering",
//     "PCCOE - Pimpri Chinchwad College Of Engineering Ravet",
//     "Dr. D.Y. Patil Institute of Engineering, Management and Research",
//     "Dr. D.Y. Patil International University",
//     "Other"
//   ];

//   const handleOnChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();

//     // Validation
//     if (!name) {
//       toast.error("Name is required");
//       return;
//     }
//     if (!gender) {
//       toast.error("Please select gender");
//       return;
//     }
//     if (!email) {
//       toast.error("Email is required");
//       return;
//     }
//     if (!password || password.length < 6) {
//       toast.error("Password must be 6+ characters");
//       return;
//     }
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }
//     if (!phone || phone.length < 10) {
//       toast.error("Valid phone is required");
//       return;
//     }
//     if (!department) {
//       toast.error("Select your department");
//       return;
//     }
//     if (!year) {
//       toast.error("Select your year");
//       return;
//     }
//     if (!college) {
//       toast.error("Select your college");
//       return;
//     }

//     const signupData = {
//       name: name.trim(),
//       gender,
//       email: email.trim().toLowerCase(),
//       password,
//       phone: phone.trim(),
//       department: department.trim(),
//       year: parseInt(year),
//       college: college.trim(),
//       role: "student",
//     };

//     console.log("Signup Data:", signupData);


// dispatch(sendOtp(signupData, navigate));
    
//     // Reset form
//     // setFormData({
//     //   name: "",
//     //   gender: "",
//     //   email: "",
//     //   password: "",
//     //   confirmPassword: "",
//     //   phone: "",
//     //   department: "",
//     //   year: "",
//     //   college: "",
//     // });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-900 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-900 text-white">
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
          
//           {/* Left Section - Form */}
//           <div className="w-full lg:w-1/2 order-1 lg:order-1">
//             <div className="max-w-md mx-auto lg:mx-0">
//               <h1 className="text-3xl font-bold text-white mb-2">
//                 Join Our Learning Community
//               </h1>
//               <p className="text-slate-300 mb-8">
//                 Create your account and start your{" "}
//                 <span className="text-blue-400 font-semibold italic">
//                   educational journey
//                 </span>
//               </p>

//               <div className="space-y-4">
//                 {/* Name & Gender Fields */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-300 mb-1">
//                       Full Name <span className="text-red-400">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={name}
//                       onChange={handleOnChange}
//                       placeholder="Enter your full name"
//                       className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-300 mb-1">
//                       Gender <span className="text-red-400">*</span>
//                     </label>
//                     <select
//                       name="gender"
//                       value={gender}
//                       onChange={handleOnChange}
//                       className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">Select Gender</option>
//                       {genderOptions.map((g, i) => (
//                         <option key={i} value={g}>
//                           {g}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Email & Phone */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-300 mb-1">
//                       Email <span className="text-red-400">*</span>
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={email}
//                       onChange={handleOnChange}
//                       placeholder="Enter email"
//                       className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-300 mb-1">
//                       Phone <span className="text-red-400">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={phone}
//                       onChange={handleOnChange}
//                       placeholder="Enter phone"
//                       className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 {/* College */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-1">
//                     College/University <span className="text-red-400">*</span>
//                   </label>
//                   <select
//                     name="college"
//                     value={college}
//                     onChange={handleOnChange}
//                     className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select College</option>
//                     {collegeOptions.map((c, i) => (
//                       <option key={i} value={c}>
//                         {c}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Department & Year */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-300 mb-1">
//                       Department <span className="text-red-400">*</span>
//                     </label>
//                     <select
//                       name="department"
//                       value={department}
//                       onChange={handleOnChange}
//                       className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">Select Department</option>
//                       {departmentOptions.map((dept, i) => (
//                         <option key={i} value={dept}>
//                           {dept}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-300 mb-1">
//                       Year <span className="text-red-400">*</span>
//                     </label>
//                     <select
//                       name="year"
//                       value={year}
//                       onChange={handleOnChange}
//                       className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">Select Year</option>
//                       {yearOptions.map((y, i) => (
//                         <option key={i} value={y.value}>
//                           {y.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Password Fields */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-slate-300 mb-1">
//                       Password <span className="text-red-400">*</span>
//                     </label>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={password}
//                       onChange={handleOnChange}
//                       placeholder="Enter password"
//                       className="w-full px-3 py-2 pr-10 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-8 text-slate-400 hover:text-white"
//                     >
//                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-slate-300 mb-1">
//                       Confirm Password <span className="text-red-400">*</span>
//                     </label>
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       name="confirmPassword"
//                       value={confirmPassword}
//                       onChange={handleOnChange}
//                       placeholder="Confirm password"
//                       className="w-full px-3 py-2 pr-10 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute right-3 top-8 text-slate-400 hover:text-white"
//                     >
//                       {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   onClick={handleOnSubmit}
//                   className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-2 px-4 rounded-md transition-colors duration-200 mt-6"
//                 >
//                   Create Student Account
//                 </button>

//                 {/* Login Link */}
//                 <p className="text-center text-slate-400 text-sm mt-4">
//                   Already have an account?{" "}
//                   <button 
//                     type="button"
//                     className="text-blue-400 hover:text-blue-300 underline"
//                     onClick={() => navigate("/login")}
//                   >
//                     Sign In
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Right Section - Image */}
//           <div className="w-full lg:w-1/2 order-2 lg:order-2">
//             <div className="relative max-w-md mx-auto lg:max-w-lg">
//               {/* Frame Background */}
//               <div className="relative">
//                 <div className="w-full h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg backdrop-blur-sm border border-slate-700"></div>
                
//                 {/* Main Image */}
//                 <div className="absolute -top-4 -right-4 w-full h-96 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg shadow-2xl flex items-center justify-center">
//                   <div className="text-center text-white">
//                     <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1V3H9V1L3 7V9H21ZM3 19V21H21V19H3Z"/>
//                       </svg>
//                     </div>
//                     <h3 className="text-2xl font-bold mb-2">Welcome to Learning</h3>
//                     <p className="text-blue-100 text-sm">Join thousands of students on their educational journey</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignupFormTemplate;


import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { sendOtp } from "../../../services/operations/authAPI";

function SignupFormTemplate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    department: "",
    year: "",
    college: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    name,
    gender,
    email,
    password,
    confirmPassword,
    phone,
    department,
    year,
    college,
  } = formData;

  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];

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
    "Other",
  ];

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!name) return toast.error("Name is required");
    if (!gender) return toast.error("Please select gender");
    if (!email) return toast.error("Email is required");
    if (!password || password.length < 6)
      return toast.error("Password must be 6+ characters");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");
    if (!phone || phone.length < 10) return toast.error("Valid phone is required");
    if (!department) return toast.error("Select your department");
    if (!year) return toast.error("Select your year");
    if (!college) return toast.error("Select your college");

    const signupData = {
      name: name.trim(),
      gender,
      email: email.trim().toLowerCase(),
      password,
      phone: phone.trim(),
      department: department.trim(),
      year: parseInt(year),
      college: college.trim(),
      role: "student",
    };

    dispatch(sendOtp(signupData, navigate));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl mx-auto min-h-[calc(90vh-4rem)]">
          <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:mx-0">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-2xl">
              <h1 className="text-3xl font-bold text-white mb-2 text-center lg:text-left">
                Join Our Community
              </h1>
              <p className="text-slate-300 mb-8 text-center lg:text-left">
                Start your{" "}
                <span className="text-blue-400 font-semibold italic">
                  educational journey
                </span>{" "}
                with us today
              </p>

              <div className="space-y-4">
                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleOnChange}
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Gender <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="gender"
                      value={gender}
                      onChange={handleOnChange}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      {genderOptions.map((g, i) => (
                        <option key={i} value={g} className="bg-slate-800">
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleOnChange}
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={handleOnChange}
                      placeholder="Enter phone number"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    College/University <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="college"
                    value={college}
                    onChange={handleOnChange}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select College</option>
                    {collegeOptions.map((c, i) => (
                      <option key={i} value={c} className="bg-slate-800">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Department <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="department"
                      value={department}
                      onChange={handleOnChange}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Department</option>
                      {departmentOptions.map((dept, i) => (
                        <option key={i} value={dept} className="bg-slate-800">
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Year <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="year"
                      value={year}
                      onChange={handleOnChange}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Year</option>
                      {yearOptions.map((y, i) => (
                        <option key={i} value={y.value} className="bg-slate-800">
                          {y.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Password <span className="text-red-400">*</span>
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={handleOnChange}
                      placeholder="Create password"
                      className="w-full px-3 py-2 pr-10 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-8 text-slate-400 hover:text-white transition-colors z-10"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Confirm Password <span className="text-red-400">*</span>
                    </label>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleOnChange}
                      placeholder="Confirm password"
                      className="w-full px-3 py-2 pr-10 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-8 text-slate-400 hover:text-white transition-colors z-10"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleOnSubmit}
                  disabled={loading}
                  className={`w-full font-semibold py-2 px-4 rounded-md transition-all duration-200 mt-6 ${
                    loading
                      ? "bg-yellow-600/50 text-slate-500 cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-500 text-slate-900 hover:scale-[0.98] active:scale-[0.96]"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-slate-700 border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    "Create Student Account"
                  )}
                </button>

                <p className="mt-4 text-center text-sm text-slate-300">
                  Already have an account?{" "}
                  <Link
                    to="/login"
 className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:mx-0">
            <div className="relative">
              <div className="w-full h-80 lg:h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg backdrop-blur-sm border border-slate-700"></div>
              <div className="absolute -top-4 -right-4 w-full h-80 lg:h-96 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 lg:w-12 lg:h-12"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1V3H9V1L3 7V9H21ZM3 19V21H21V19H3Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-2">
                    Join Our Community
                  </h3>
                  <p className="text-blue-100 text-sm px-4">
                    Start your educational journey with thousands of students
                  </p>
                </div>
              </div>
              <div className="absolute -top-2 -left-2 w-16 h-16 lg:w-20 lg:h-20 bg-yellow-400/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 lg:w-16 lg:h-16 bg-blue-400/20 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupFormTemplate;
