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







import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../../services/operations/authAPI";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phone,
    department,
    year,
    college,
  } = formData;

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

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName) return toast.error("Full name is required");
    if (!email) return toast.error("Email is required");
    if (!password || password.length < 6)
      return toast.error("Password must be 6+ characters");
    if (password !== confirmPassword) return toast.error("Passwords do not match");
    if (!phone || phone.length < 10) return toast.error("Valid phone is required");
    if (!department) return toast.error("Select your department");
    if (!year) return toast.error("Select your year");
    if (!college) return toast.error("College name is required");

    const signupData = {
      name: `${firstName} ${lastName}`,
      email: email.trim().toLowerCase(),
      password,
      phone: phone.trim(),
      department: department.trim(),
      year: parseInt(year),
      college: college.trim(),
      role: "student",
    };

    dispatch(sendOtp(signupData, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      department: "",
      year: "",
      college: "",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-4">

        {/* First & Last Name */}
        <div className="flex gap-4">
          <label className="w-1/2">
            <p className="mb-1 text-sm text-richblack-5">First Name <sup className="text-pink-200">*</sup></p>
            <input type="text" name="firstName" value={firstName} onChange={handleOnChange}
              placeholder="Enter first name"
              className="bg-richblack-800 text-richblack-5 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
          <label className="w-1/2">
            <p className="mb-1 text-sm text-richblack-5">Last Name <sup className="text-pink-200">*</sup></p>
            <input type="text" name="lastName" value={lastName} onChange={handleOnChange}
              placeholder="Enter last name"
              className="bg-richblack-800 text-richblack-5 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
        </div>

        {/* Email & Phone */}
        <div className="flex gap-4">
          <label className="w-1/2">
            <p className="mb-1 text-sm text-richblack-5">Email Address <sup className="text-pink-200">*</sup></p>
            <input type="email" name="email" value={email} onChange={handleOnChange}
              placeholder="Enter email address"
              className="bg-richblack-800 text-richblack-5 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
          <label className="w-1/2">
            <p className="mb-1 text-sm text-richblack-5">Phone <sup className="text-pink-200">*</sup></p>
            <input type="tel" name="phone" value={phone} onChange={handleOnChange}
              placeholder="Enter phone number"
              className="bg-richblack-800 text-richblack-5 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
        </div>

        {/* College */}
        <label>
          <p className="mb-1 text-sm text-richblack-5">College/University <sup className="text-pink-200">*</sup></p>
          <input type="text" name="college" value={college} onChange={handleOnChange}
            placeholder="Enter college/university"
            className="bg-richblack-800 text-richblack-5 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </label>

        {/* Department & Year */}
        <div className="flex gap-4">
          <label className="w-1/2">
            <p className="mb-1 text-sm text-richblack-5">Department <sup className="text-pink-200">*</sup></p>
            <select name="department" value={department} onChange={handleOnChange}
              className="bg-richblack-800 text-richblack-5 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Department</option>
              {departmentOptions.map((dept, i) => <option key={i} value={dept}>{dept}</option>)}
            </select>
          </label>
          <label className="w-1/2">
            <p className="mb-1 text-sm text-richblack-5">Year <sup className="text-pink-200">*</sup></p>
            <select name="year" value={year} onChange={handleOnChange}
              className="bg-richblack-800 text-richblack-5 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Year</option>
              {yearOptions.map((y, i) => <option key={i} value={y.value}>{y.label}</option>)}
            </select>
          </label>
        </div>

        {/* Password & Confirm Password */}
        <div className="flex gap-4">
          <label className="relative w-1/2">
            <p className="mb-1 text-sm text-richblack-5">Password <sup className="text-pink-200">*</sup></p>
            <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={handleOnChange}
              placeholder="Enter Password"
              className="bg-richblack-800 text-richblack-5 rounded-md p-3 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <span onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer">
              {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </span>
          </label>
          <label className="relative w-1/2">
            <p className="mb-1 text-sm text-richblack-5">Confirm Password <sup className="text-pink-200">*</sup></p>
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={confirmPassword} onChange={handleOnChange}
              placeholder="Confirm Password"
              className="bg-richblack-800 text-richblack-5 rounded-md p-3 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 cursor-pointer">
              {showConfirmPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </span>
          </label>
        </div>

        {/* Submit */}
        <button type="submit"
          className="mt-6 bg-yellow-50 text-richblack-900 rounded-md py-3 hover:bg-yellow-100 font-semibold transition">
          Create Student Account
        </button>

        {/* Login Redirect */}
        <p className="text-sm text-center text-richblack-100 mt-2">
          Already have an account?{" "}
          <span className="text-blue-400 underline cursor-pointer" onClick={() => navigate("/login")}>
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
