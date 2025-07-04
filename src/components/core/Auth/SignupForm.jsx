// import { useState } from "react"
// import { toast } from "react-hot-toast"
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { setSignupData } from "../../../slices/authSlice"


// function SignupForm() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   // student or instructor
//   // const [accountType, setAccountType] = useState()

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })

//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   const { firstName, lastName, email, password, confirmPassword } = formData

//   // Handle input fields, when some value changes
//   const handleOnChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   // Handle Form Submission
//   const handleOnSubmit = (e) => {
//     e.preventDefault()

//     if (password !== confirmPassword) {
//       toast.error("Passwords Do Not Match")
//       return
//     }
//     const signupData = {
//       ...formData,
//       accountType,

//     }



// // Ahh, now I understand your doubt clearly, Nikhil!

// // You're saying:

// // "I know dispatch calls a reducer — but here sendOtp() is not a reducer. So how is dispatch(sendOtp(...)) working?"

// // The answer is:

// // 🧠 Because of redux-thunk middleware.
// // It allows dispatch() to accept a function, not just action objects.
// // ✅ Normally, dispatch() works like this:
// // dispatch({ type: "SET_LOADING", payload: true });


// // ✅ But with redux-thunk, you can do this:
// // dispatch(sendOtp(email, navigate));
// // Here, sendOtp() returns a function like this:
// // This inner function gets dispatch as an argument — so now inside it, you can call:
// // (email, navigate) => async (dispatch) => { ... }

// // dispatch(setLoading(true));
// // That setLoading is a real Redux reducer action created by your authSlice.

// // dispatch(sendOtp(...))   <-- redux-thunk sees this is a function
// //      ↓
// // runs the function:  (dispatch) => { ... }
// //      ↓
// // inside it: dispatch(setLoading(true))
// //              ↓
// // calls reducer: updates state.auth.loading = true
// // Exactly right, Nikhil! ✅
// // 🔁 In redux-thunk, one function returns another function — and that inner function receives dispatch so it can call reducers.


// // export function sendOtp(email, navigate) {
// //   return async function (dispatch) {
// //     dispatch(setLoading(true));
// //     // ...API call
// //     dispatch(setLoading(false));
// //   };
// // }

// // functionThatReturnsFunction(email, navigate) -> returns (dispatch) => {}
// // dispatch(sendOtp(email, navigate));
// // This works because:

// // sendOtp(email, navigate) returns a function

// // Redux-thunk sees it and executes it

// // It gives dispatch to it

// // Then you can call reducers like dispatch(setLoading(true)) inside it





//     // Setting signup data to state
//     // To be used after otp verification
//     dispatch(setSignupData(signupData))
//     // Send OTP to user for verification
//     dispatch(sendOtp(formData.email, navigate))

//     // Reset
//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     })
//     // setAccountType(ACCOUNT_TYPE.STUDENT)
//   }

//   // data to pass to Tab component
//   // const tabData = [
//   //   {
//   //     id: 1,
//   //     tabName: "Student",
//   //     type: ACCOUNT_TYPE.STUDENT,
//   //   },
//   //   {
//   //     id: 2,
//   //     tabName: "Instructor",
//   //     type: ACCOUNT_TYPE.INSTRUCTOR,
//   //   },
//   // ]

//   return (
//     <div>
//       {/* Tab */}
//       {/* <Tab tabData={tabData} field={accountType} setField={setAccountType} /> */}
//       {/* Form */}
//       <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
//         <div className="flex gap-x-4">
//           <label>
//             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//               First Name <sup className="text-pink-200">*</sup>
//             </p>
//             <input
//               required
//               type="text"
//               name="firstName"
//               value={firstName}
//               onChange={handleOnChange}
//               placeholder="Enter first name"
//               style={{
//                 boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//               }}
//               className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
//             />
//           </label>
//           <label>
//             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//               Last Name <sup className="text-pink-200">*</sup>
//             </p>
//             <input
//               required
//               type="text"
//               name="lastName"
//               value={lastName}
//               onChange={handleOnChange}
//               placeholder="Enter last name"
//               style={{
//                 boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//               }}
//               className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
//             />
//           </label>
//         </div>
//         <label className="w-full">
//           <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//             Email Address <sup className="text-pink-200">*</sup>
//           </p>
//           <input
//             required
//             type="text"
//             name="email"
//             value={email}
//             onChange={handleOnChange}
//             placeholder="Enter email address"
//             style={{
//               boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//             }}
//             className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
//           />
//         </label>
//         <div className="flex gap-x-4">
//           <label className="relative">
//             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//               Create Password <sup className="text-pink-200">*</sup>
//             </p>
//             <input
//               required
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={password}
//               onChange={handleOnChange}
//               placeholder="Enter Password"
//               style={{
//                 boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//               }}
//               className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
//             />
//             <span
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//             >
//               {showPassword ? (
//                 <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//               ) : (
//                 <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//               )}
//             </span>
//           </label>
//           <label className="relative">
//             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//               Confirm Password <sup className="text-pink-200">*</sup>
//             </p>
//             <input
//               required
//               type={showConfirmPassword ? "text" : "password"}
//               name="confirmPassword"
//               value={confirmPassword}
//               onChange={handleOnChange}
//               placeholder="Confirm Password"
//               style={{
//                 boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//               }}
//               className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
//             />
//             <span
//               onClick={() => setShowConfirmPassword((prev) => !prev)}
//               className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//             >
//               {showConfirmPassword ? (
//                 <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//               ) : (
//                 <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//               )}
//             </span>
//           </label>
//         </div>
//         <button
//           type="submit"
//           className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
//         >
//           Create Account
//         </button>
//       </form>
//     </div>
//   )
// }

// export default SignupForm







// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { sendOtp } from "../../../services/operations/authAPI";

// function SignupForm() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
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
//     firstName,
//     lastName,
//     email,
//     password,
//     confirmPassword,
//     phone,
//     department,
//     year,
//     college,
//   } = formData;

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

//   const handleOnChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();

//     if (!firstName || !lastName) return toast.error("Full name is required");
//     if (!email) return toast.error("Email is required");
//     if (!password || password.length < 6)
//       return toast.error("Password must be 6+ characters");
//     if (password !== confirmPassword) return toast.error("Passwords do not match");
//     if (!phone || phone.length < 10) return toast.error("Valid phone is required");
//     if (!department) return toast.error("Select your department");
//     if (!year) return toast.error("Select your year");
//     if (!college) return toast.error("College name is required");

//     const signupData = {
//       name: `${firstName} ${lastName}`,
//       email: email.trim().toLowerCase(),
//       password,
//       phone: phone.trim(),
//       department: department.trim(),
//       year: parseInt(year),
//       college: college.trim(),
//       role: "student",
//     };

//     dispatch(sendOtp(signupData, navigate));

//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       phone: "",
//       department: "",
//       year: "",
//       college: "",
//     });
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-4">

//         {/* First & Last Name */}
//         <div className="flex gap-4">
//           <label className="w-1/2">
//             <p className="mb-1 text-sm text-richblack-5">First Name <sup className="text-pink-200">*</sup></p>
//             <input type="text" name="firstName" value={firstName} onChange={handleOnChange}
//               placeholder="Enter first name"
//               className="bg-richblack-800 text-richblack-5 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
//           </label>
//           <label className="w-1/2">
//             <p className="mb-1 text-sm text-richblack-5">Last Name <sup className="text-pink-200">*</sup></p>
//             <input type="text" name="lastName" value={lastName} onChange={handleOnChange}
//               placeholder="Enter last name"
//               className="bg-richblack-800 text-richblack-5 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
//           </label>
//         </div>

//         {/* Email & Phone */}
//         <div className="flex gap-4">
//           <label className="w-1/2">
//             <p className="mb-1 text-sm text-richblack-5">Email Address <sup className="text-pink-200">*</sup></p>
//             <input type="email" name="email" value={email} onChange={handleOnChange}
//               placeholder="Enter email address"
//               className="bg-richblack-800 text-richblack-5 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
//           </label>
//           <label className="w-1/2">
//             <p className="mb-1 text-sm text-richblack-5">Phone <sup className="text-pink-200">*</sup></p>
//             <input type="tel" name="phone" value={phone} onChange={handleOnChange}
//               placeholder="Enter phone number"
//               className="bg-richblack-800 text-richblack-5 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
//           </label>
//         </div>

//         {/* College */}
//         <label>
//           <p className="mb-1 text-sm text-richblack-5">College/University <sup className="text-pink-200">*</sup></p>
//           <input type="text" name="college" value={college} onChange={handleOnChange}
//             placeholder="Enter college/university"
//             className="bg-richblack-800 text-richblack-5 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
//         </label>

//         {/* Department & Year */}
//         <div className="flex gap-4">
//           <label className="w-1/2">
//             <p className="mb-1 text-sm text-richblack-5">Department <sup className="text-pink-200">*</sup></p>
//             <select name="department" value={department} onChange={handleOnChange}
//               className="bg-richblack-800 text-richblack-5 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
//               <option value="">Select Department</option>
//               {departmentOptions.map((dept, i) => <option key={i} value={dept}>{dept}</option>)}
//             </select>
//           </label>
//           <label className="w-1/2">
//             <p className="mb-1 text-sm text-richblack-5">Year <sup className="text-pink-200">*</sup></p>
//             <select name="year" value={year} onChange={handleOnChange}
//               className="bg-richblack-800 text-richblack-5 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
//               <option value="">Select Year</option>
//               {yearOptions.map((y, i) => <option key={i} value={y.value}>{y.label}</option>)}
//             </select>
//           </label>
//         </div>

//         {/* Password & Confirm Password */}
//         <div className="flex gap-4">
//           <label className="relative w-1/2">
//             <p className="mb-1 text-sm text-richblack-5">Password <sup className="text-pink-200">*</sup></p>
//             <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={handleOnChange}
//               placeholder="Enter Password"
//               className="bg-richblack-800 text-richblack-5 rounded-md p-3 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
//             <span onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-9 cursor-pointer">
//               {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
//             </span>
//           </label>
//           <label className="relative w-1/2">
//             <p className="mb-1 text-sm text-richblack-5">Confirm Password <sup className="text-pink-200">*</sup></p>
//             <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={confirmPassword} onChange={handleOnChange}
//               placeholder="Confirm Password"
//               className="bg-richblack-800 text-richblack-5 rounded-md p-3 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
//             <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-9 cursor-pointer">
//               {showConfirmPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
//             </span>
//           </label>
//         </div>

//         {/* Submit */}
//         <button type="submit"
//           className="mt-6 bg-yellow-50 text-richblack-900 rounded-md py-3 hover:bg-yellow-100 font-semibold transition">
//           Create Student Account
//         </button>

//         {/* Login Redirect */}
//         <p className="text-sm text-center text-richblack-100 mt-2">
//           Already have an account?{" "}
//           <span className="text-blue-400 underline cursor-pointer" onClick={() => navigate("/login")}>
//             Sign In
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default SignupForm;




// import { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { sendOtp } from "../../../services/operations/authAPI";
// import frameImg from "../../../assets/Images/frame.png"

// import signupImg from "../../../assets/Images/signup.webp"


// const SignupPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     department: "",
//     year: "",
//     college: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const departmentOptions = [
//     "Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil", "Electrical", "Other",
//   ];

//   const yearOptions = [
//     { value: 1, label: "1st Year" },
//     { value: 2, label: "2nd Year" },
//     { value: 3, label: "3rd Year" },
//     { value: 4, label: "4th Year" },
//   ];

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { firstName, email, phone, password, confirmPassword, department, year, college } = formData;

//     if (!firstName || !email || !phone || !password || !confirmPassword || !department || !year || !college) {
//       return toast.error("All fields are required");
//     }

//     if (password.length < 6) return toast.error("Password must be at least 6 characters");
//     if (password !== confirmPassword) return toast.error("Passwords do not match");

//     const signupData = {
//       name: firstName.trim(),
//       email: email.trim().toLowerCase(),
//       phone: phone.trim(),
//       password,
//       department,
//       year: parseInt(year),
//       college: college.trim(),
//       role: "student",
//     };

//     dispatch(sendOtp(signupData, navigate));
//     setFormData({ firstName: "", email: "", phone: "", password: "", confirmPassword: "", department: "", year: "", college: "" });
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-richblack-900 text-white px-4 py-10 md:py-0">
      
//       {/* Left - Form */}
//       <div className="w-full md:w-1/2 max-w-xl">
//         <h2 className="text-3xl font-semibold mb-6 text-richblack-5">Create your free account</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">

//           <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
//             placeholder="Full Name" required
//             className="rounded-md p-3 bg-richblack-800 text-white focus:ring-2 focus:ring-blue-500" />

//           <input type="email" name="email" value={formData.email} onChange={handleChange}
//             placeholder="Email Address" required
//             className="rounded-md p-3 bg-richblack-800 text-white focus:ring-2 focus:ring-blue-500" />

//           <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
//             placeholder="Phone Number" required
//             className="rounded-md p-3 bg-richblack-800 text-white focus:ring-2 focus:ring-blue-500" />

//           <input type="text" name="college" value={formData.college} onChange={handleChange}
//             placeholder="College / University" required
//             className="rounded-md p-3 bg-richblack-800 text-white focus:ring-2 focus:ring-blue-500" />

//           <div className="flex gap-4 flex-col md:flex-row">
//             <select name="department" value={formData.department} onChange={handleChange} required
//               className="w-full rounded-md p-3 bg-richblack-800 text-white focus:ring-2 focus:ring-blue-500">
//               <option value="">Select Department</option>
//               {departmentOptions.map((dept, i) => <option key={i} value={dept}>{dept}</option>)}
//             </select>

//             <select name="year" value={formData.year} onChange={handleChange} required
//               className="w-full rounded-md p-3 bg-richblack-800 text-white focus:ring-2 focus:ring-blue-500">
//               <option value="">Select Year</option>
//               {yearOptions.map((y, i) => <option key={i} value={y.value}>{y.label}</option>)}
//             </select>
//           </div>

//           {/* Passwords */}
//           <div className="relative">
//             <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
//               placeholder="Password" required
//               className="w-full rounded-md p-3 pr-10 bg-richblack-800 text-white focus:ring-2 focus:ring-blue-500" />
//             <span className="absolute right-3 top-[14px] cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
//             </span>
//           </div>

//           <div className="relative">
//             <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
//               placeholder="Confirm Password" required
//               className="w-full rounded-md p-3 pr-10 bg-richblack-800 text-white focus:ring-2 focus:ring-blue-500" />
//             <span className="absolute right-3 top-[14px] cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//               {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
//             </span>
//           </div>

//           <button type="submit"
//             className="mt-2 bg-yellow-50 text-richblack-900 font-bold rounded-md py-3 hover:bg-yellow-100 transition">
//             Create Account
//           </button>

//           <p className="text-sm text-center text-richblack-100">
//             Already have an account?{" "}
//             <span onClick={() => navigate("/login")} className="text-blue-400 cursor-pointer underline">
//               Sign In
//             </span>
//           </p>
//         </form>
//       </div>

//       {/* Right - Image */}
//       <div className="w-full md:w-1/2 mt-10 md:mt-0 px-4">
//        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
//                   <img
//                     src={frameImg}
//                     alt="Pattern"
//                     width={558}
//                     height={504}
//                     loading="lazy"
//                   />
//                   <img
//                     src={signupImg}
//                     alt="Students"
//                     width={558}
//                     height={504}
//                     loading="lazy"
//                     className="absolute -top-4 right-4 z-10"
//                   />

//       </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;



// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { Eye, EyeOff } from "lucide-react";

// function SignupFormTemplate() {
//   const { loading } = useSelector((state) => state.auth);
  
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
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
//     firstName,
//     lastName,
//     email,
//     password,
//     confirmPassword,
//     phone,
//     department,
//     year,
//     college,
//   } = formData;

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

//   const handleOnChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();

//     // Validation
//     if (!firstName || !lastName) {
//       alert("Full name is required");
//       return;
//     }
//     if (!email) {
//       alert("Email is required");
//       return;
//     }
//     if (!password || password.length < 6) {
//       alert("Password must be 6+ characters");
//       return;
//     }
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }
//     if (!phone || phone.length < 10) {
//       alert("Valid phone is required");
//       return;
//     }
//     if (!department) {
//       alert("Select your department");
//       return;
//     }
//     if (!year) {
//       alert("Select your year");
//       return;
//     }
//     if (!college) {
//       alert("College name is required");
//       return;
//     }

//     const signupData = {
//       name: `${firstName} ${lastName}`,
//       email: email.trim().toLowerCase(),
//       password,
//       phone: phone.trim(),
//       department: department.trim(),
//       year: parseInt(year),
//       college: college.trim(),
//       role: "student",
//     };

//     console.log("Signup Data:", signupData);
    
//     // Reset form
//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       phone: "",
//       department: "",
//       year: "",
//       college: "",
//     });
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
          
//           {/* Left Section - Form (appears first on mobile) */}
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
//                 {/* Name Fields */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-300 mb-1">
//                       First Name <span className="text-red-400">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       value={firstName}
//                       onChange={handleOnChange}
//                       placeholder="Enter first name"
//                       className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-300 mb-1">
//                       Last Name <span className="text-red-400">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="lastName"
//                       value={lastName}
//                       onChange={handleOnChange}
//                       placeholder="Enter last name"
//                       className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
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
//                   <input
//                     type="text"
//                     name="college"
//                     value={college}
//                     onChange={handleOnChange}
//                     placeholder="Enter college/university"
//                     className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
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
//                     onClick={() => console.log("Navigate to login")}
//                   >
//                     Sign In
//                   </button>
//                 </p>
//                 </div>
//             </div>
//           </div>

//           {/* Right Section - Image (appears second on mobile) */}
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
import { useSelector } from "react-redux";
import { Eye, EyeOff } from "lucide-react";   
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { sendOtp } from "../../../services/operations/authAPI";

function SignupFormTemplate() {

  const navigate=useNavigate();
    const dispatch = useDispatch()
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

  const genderOptions = [
    "Male",
    "Female",
    "Other",
    "Prefer not to say"
  ];

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
    "Other"
  ];

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name) {
      toast.error("Name is required");
      return;
    }
    if (!gender) {
      toast.error("Please select gender");
      return;
    }
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be 6+ characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!phone || phone.length < 10) {
      toast.error("Valid phone is required");
      return;
    }
    if (!department) {
      toast.error("Select your department");
      return;
    }
    if (!year) {
      toast.error("Select your year");
      return;
    }
    if (!college) {
      toast.error("Select your college");
      return;
    }

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

    console.log("Signup Data:", signupData);


dispatch(sendOtp(signupData, navigate));
    
    // Reset form
    // setFormData({
    //   name: "",
    //   gender: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    //   phone: "",
    //   department: "",
    //   year: "",
    //   college: "",
    // });
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
          
          {/* Left Section - Form */}
          <div className="w-full lg:w-1/2 order-1 lg:order-1">
            <div className="max-w-md mx-auto lg:mx-0">
              <h1 className="text-3xl font-bold text-white mb-2">
                Join Our Learning Community
              </h1>
              <p className="text-slate-300 mb-8">
                Create your account and start your{" "}
                <span className="text-blue-400 font-semibold italic">
                  educational journey
                </span>
              </p>

              <div className="space-y-4">
                {/* Name & Gender Fields */}
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
                      placeholder="Enter your full name"
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
                        <option key={i} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleOnChange}
                      placeholder="Enter email"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={handleOnChange}
                      placeholder="Enter phone"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* College */}
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
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Department & Year */}
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
                        <option key={i} value={dept}>
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
                        <option key={i} value={y.value}>
                          {y.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Password Fields */}
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
                      placeholder="Enter password"
                      className="w-full px-3 py-2 pr-10 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-8 text-slate-400 hover:text-white"
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-8 text-slate-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleOnSubmit}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-2 px-4 rounded-md transition-colors duration-200 mt-6"
                >
                  Create Student Account
                </button>

                {/* Login Link */}
                <p className="text-center text-slate-400 text-sm mt-4">
                  Already have an account?{" "}
                  <button 
                    type="button"
                    className="text-blue-400 hover:text-blue-300 underline"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="w-full lg:w-1/2 order-2 lg:order-2">
            <div className="relative max-w-md mx-auto lg:max-w-lg">
              {/* Frame Background */}
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg backdrop-blur-sm border border-slate-700"></div>
                
                {/* Main Image */}
                <div className="absolute -top-4 -right-4 w-full h-96 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg shadow-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1V3H9V1L3 7V9H21ZM3 19V21H21V19H3Z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Welcome to Learning</h3>
                    <p className="text-blue-100 text-sm">Join thousands of students on their educational journey</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupFormTemplate;