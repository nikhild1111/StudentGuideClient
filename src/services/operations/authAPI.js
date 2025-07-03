// src/services/authAPI.js

import axios from "axios"
import { toast } from "react-hot-toast"
import {
  setLoading,
  setToken,
  setUser,
  setSignupData,
} from "../../slices/authSlices"
import { clearCart } from "../../slices/CartSlice"

const BASE_URL = "http://localhost:4000/api/v1/auth"

// ✅ SEND OTP
export function sendOtp(formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...")
    dispatch(setLoading(true))

    try {
      const { data } = await axios.post(`${BASE_URL}/send-otp`, {
        email: formData.email,
      })

      if (!data.success) {
        throw new Error(data.message)
      }

      dispatch(setSignupData(formData))
      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.error("SEND OTP ERROR:", error)
      toast.error("Could not send OTP")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// ✅ VERIFY OTP AND SIGNUP
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

      if (!verifyRes.data.success) {
        throw new Error(verifyRes.data.message)
      }

      toast.success("OTP Verified")

      const signUpRes = await axios.post(`${BASE_URL}/signup`, {
        ...form,
        otp,
      })

      if (!signUpRes.data.success) {
        throw new Error(signUpRes.data.message)
      }

      toast.success("Signup Successful")
      navigate("/")
    } catch (error) {
      console.error("VERIFY & SIGNUP ERROR:", error)
      toast.error(error.response?.data?.message || "Signup Failed")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
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

      if (!data.success) {
        throw new Error(data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(data.token))

      const userImage =
        `https://api.dicebear.com/5.x/initials/svg?seed=${data.payload.name}`

      dispatch(setUser({ ...data.payload, image: userImage }))

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.payload))

      navigate("/")
    } catch (error) {
      console.error("LOGIN ERROR:", error)
      toast.error("Login Failed")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// ✅ LOGOUT
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(clearCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}
