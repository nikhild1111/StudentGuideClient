// src/services/operations/authAPI.js

import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ correct
import { toast } from "react-hot-toast";
import { getAuthHeaders } from "../../utils/authHeader";


import {
  setLoading,
  setToken,
  setUser,
  setSignupData,
  logout
} from "../../slices/authSlices";
import { clearCart } from "../../slices/CartSlice";
 const Backend_url = import.meta.env.VITE_BACKEND_URL;

const BASE_URL = `${Backend_url}/api/v1/auth`;


// ✅ SEND OTP
export function sendOtp(formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...")
    dispatch(setLoading(true))

    try {
      const { data } = await axios.post(`${BASE_URL}/send-otp`, {
        email: formData.email,
      })

      if (!data.success) throw new Error(data.message)

      dispatch(setSignupData(formData))
      toast.success("OTP sent successfully ")
      navigate("/verify-email")
    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || "Failed to send OTP"
      toast.error(msg)
      console.error("SEND OTP ERROR:", msg)
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

// ✅ VERIFY OTP & SIGNUP
export function verifyOtpAndSignUp(otp, navigate) {
  return async (dispatch, getState) => {
    const toastId = toast.loading("Verifying OTP...")
    dispatch(setLoading(true))

    const form = getState().auth.signupData

    try {
      const verifyRes = await axios.post(`${BASE_URL}/verify-otp`, {
        email: form.email,
        otp,
      })

      if (!verifyRes.data.success) throw new Error(verifyRes.data.message)
      toast.success("OTP verified ✅")

      const signUpRes = await axios.post(`${BASE_URL}/signup`, {
        ...form,
        otp,
      })

      if (!signUpRes.data.success) throw new Error(signUpRes.data.message)

      toast.success("Signup successful 🎉")

      console.log(signUpRes);

      console.log("in the signup ",signUpRes.data )
        dispatch(setUser(signUpRes.data.payload));
        dispatch(setToken(signUpRes.data.token));
localStorage.setItem("token", signUpRes.data.token)
      navigate("/")
    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || "Signup failed"
      toast.error(msg)
      console.error("SIGNUP ERROR:", msg)
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

// ✅ LOGIN
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...")
    dispatch(setLoading(true))

    try {
      const { data } = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      })

      if (!data.success) throw new Error(data.message)

      dispatch(setToken(data.token))
      // const userImage = `https://api.dicebear.com/5.x/initials/svg?seed=${data.payload.name}`
      // dispatch(setUser({ ...data.payload, image: userImage }))
// localStorage.setItem("user", JSON.stringify(data.payload))

      toast.success("Login successful ")
       console.log("in the login ",data )
        localStorage.setItem("token", data.token)
        dispatch(setUser(data.payload));
        dispatch(setToken(data.token));
      navigate("/")
    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || "Login failed"
      toast.error(msg)
      console.error("LOGIN ERROR:", msg)
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}


// Global variable to store the timeout ID
let authTimeoutId = null;

// ✅ LOGOUT
export function logoutauth(navigate) {
  return async (dispatch) => {
    try{

  let res=    await axios.post(`${BASE_URL}/logout`, {},getAuthHeaders());
    if (!res.data.success) {
        throw new Error(res.data.message || "Logout failed");
      }

       if (authTimeoutId) {
        clearTimeout(authTimeoutId);
      }

      
         dispatch(logout(null))
    dispatch(clearCart());
   localStorage.removeItem("user");
      localStorage.removeItem("token");

    toast.success("Logged out ")
    navigate("/")

    }catch(err){
           console.error("Logout error:", err);
      toast.error("Something went wrong during logout");
    }

  }
}




export function checkAuthOnAppLoad(navigate) {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout(null));
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // ✅ If token expired, logout immediately
      if (decoded.exp < currentTime) {
        dispatch(logout(null));
        toast.error("Token Expired. Please login again.");
        navigate("/home");
        return;
      }

      // ✅ Clear any previous timeout to avoid duplicates
      if (authTimeoutId) {
        clearTimeout(authTimeoutId);
      }

      // ✅ Calculate remaining time until token expires
      const remainingTime = (decoded.exp - currentTime) * 1000;

      // ✅ Set timeout to re-check auth when token is about to expire
      authTimeoutId = setTimeout(() => {
        dispatch(checkAuthOnAppLoad(navigate));
      }, remainingTime);

      // ✅ Fetch profile to confirm user is valid
      dispatch(setLoading(true));
      const { data } = await axios.get(`${BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!data.success) throw new Error(data.message);

      dispatch(setToken(token));
      dispatch(setUser(data.user));
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Auth failed";
      dispatch(logout(null));
      toast.error(msg);
      console.error("AUTH CHECK ERROR:", msg);
    } finally {
      dispatch(setLoading(false));
    }
  };
}
