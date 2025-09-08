// import { useEffect, useState } from "react";
// import OtpInput from "react-otp-input";
// import { Link } from "react-router-dom";
// import { BiArrowBack } from "react-icons/bi";
// import { RxCountdownTimer } from "react-icons/rx";
// import { useDispatch, useSelector } from "react-redux";
// import { sendOtp, verifyOtpAndSignUp } from "../services/operations/authAPI";
// import { useNavigate } from "react-router-dom";

// function VerifyEmail() {
//   const [otp, setOtp] = useState("");
//   const { signupData, loading } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Only allow access of this route when user has filled the signup form
//     if (!signupData) {
//       navigate("/signup");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleVerifyAndSignup = (e) => {
//     e.preventDefault();
//     const { 
//     name, 
//     email, 
//     password, 
//     confirmPassword, 
//     phone, 
//     department, 
//     year, 
//     college 
//   } = signupData;

//     dispatch(
//       verifyOtpAndSignUp(
//         otp,
//         navigate
//       )
//     );
//   };

//   return (
//     <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
//       {loading ? (
//         <div>
//           <div className="spinner"></div>
//         </div>
//       ) : (
//         <div className="max-w-[500px] p-4 lg:p-8">
//           <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
//             Verify Email
//           </h1>
//           <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
//             A verification code has been sent to you. Enter the code below
//           </p>
//           <form onSubmit={handleVerifyAndSignup}>
//             <OtpInput
//               value={otp}
//               onChange={setOtp}
//               numInputs={6}
//               renderInput={(props) => (
//                 <input
//                   {...props}
//                   placeholder="-"
//                   style={{
//                     boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                   }}
//                   className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
//                 />
//               )}
//               containerStyle={{
//                 justifyContent: "space-between",
//                 gap: "0 6px",
//               }}
//             />
//             <button
//               type="submit"
//               className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
//             >
//               Verify Email
//             </button>
//           </form>
//           <div className="mt-6 flex items-center justify-between">
//             <Link to="/signup">
//               <p className="text-richblack-5 flex items-center gap-x-2">
//                 <BiArrowBack /> Back To Signup
//               </p>
//             </Link>
//             <button
//               className="flex items-center text-blue-100 gap-x-2"
//               onClick={() => dispatch(sendOtp(signupData.email))}
//             >
//               <RxCountdownTimer />
//               Resend it
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default VerifyEmail;



import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, verifyOtpAndSignUp } from "../services/operations/authAPI";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    dispatch(verifyOtpAndSignUp(otp, navigate));
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center bg-richblack-900 px-4">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] w-full p-6 lg:p-10 bg-richblack-800 rounded-xl shadow-lg flex flex-col">
          <h1 className="text-yellow-50 font-extrabold text-3xl mb-2 text-center lg:text-left">
            Verify Email
          </h1>
          <p className="text-richblack-100 text-base lg:text-lg mb-6 text-center lg:text-left">
            Enter the 6-digit verification code sent to your email
          </p>
          <form onSubmit={handleVerifyAndSignup} className="flex flex-col gap-6">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="w-[50px] lg:w-[60px] border-0 bg-richblack-700 rounded-md text-white aspect-square text-center text-lg lg:text-xl font-medium focus:outline-2 focus:outline-yellow-50"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
              )}
              containerStyle={{
                display: "flex",
                justifyContent: "space-between",
                gap: "0 8px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-3 rounded-lg text-richblack-900 font-semibold text-lg hover:bg-yellow-400 transition-colors"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <Link
              to="/signup"
              className="text-yellow-50 flex items-center gap-2 hover:text-yellow-400"
            >
              <BiArrowBack /> Back To Signup
            </Link>
            <button
              onClick={() => dispatch(sendOtp(signupData.email))}
              className="flex items-center gap-2 text-yellow-50 hover:text-yellow-400"
            >
              <RxCountdownTimer /> Resend
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
