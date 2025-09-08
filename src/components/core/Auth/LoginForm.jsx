






import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../../services/operations/authAPI"



function LoginFormTemplate() {


    const dispatch=useDispatch();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // setLoading(true);
        dispatch(login(email, password, navigate));
    
  
  };

  const handleForgotPassword = () => {
    console.log("Navigate to forgot password");
    alert("Navigate to forgot password page");
  };

  const handleNavigateToSignup = () => {
  
    navigate("/signup");
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
          
          {/* Left Section - Form */}
          <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-2xl">
              <h1 className="text-3xl font-bold text-white mb-2 text-center lg:text-left">
                Welcome Back
              </h1>
              <p className="text-slate-300 mb-8 text-center lg:text-left">
                Continue your{" "}
                <span className="text-blue-400 font-semibold italic">
                  educational journey
                </span>{" "}
                with us
              </p>

              {/* General Error */}
              {errors.general && (
                <div className="rounded-md bg-red-900/20 border border-red-500/30 p-3 text-red-300 text-sm mb-4">
                  {errors.general}
                </div>
              )}

              <div className="space-y-4">
                {/* Email Field */}
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
                    className={`w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-500/50 bg-red-900/10' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-300">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter your password"
                    className={`w-full px-3 py-2 pr-10 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.password ? 'border-red-500/50 bg-red-900/10' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-300">{errors.password}</p>
                  )}
                  
                  {/* Forgot Password Link */}
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="mt-2 text-xs text-blue-400 hover:text-blue-300 underline transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleOnSubmit}
                  disabled={loading}
                  className={`w-full font-semibold py-2 px-4 rounded-md transition-all duration-200 mt-6 ${
                    loading
                      ? 'bg-yellow-600/50 text-slate-500 cursor-not-allowed'
                      : 'bg-yellow-400 hover:bg-yellow-500 text-slate-900 hover:scale-[0.98] active:scale-[0.96]'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-slate-700 border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-slate-400 text-sm mt-4">
                  Don't have an account?{" "}
                  <button 
                    type="button"
                    className="text-blue-400 hover:text-blue-300 underline"
                    onClick={handleNavigateToSignup}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:mx-0">
            <div className="relative">
              {/* Frame Background */}
              <div className="w-full h-80 lg:h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg backdrop-blur-sm border border-slate-700"></div>
              
              {/* Main Image */}
              <div className="absolute -top-4 -right-4 w-full h-80 lg:h-96 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 lg:w-12 lg:h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-2">Welcome Back</h3>
                  <p className="text-blue-100 text-sm px-4">Continue your learning journey with us</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-2 -left-2 w-16 h-16 lg:w-20 lg:h-20 bg-yellow-400/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 lg:w-16 lg:h-16 bg-blue-400/20 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFormTemplate;