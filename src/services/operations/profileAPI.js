import axios from "axios";
import { toast } from "react-hot-toast";
import { getAuthHeaders } from "../../utils/authHeader";
import { setLoading, setUser, logout } from "../../slices/authSlices";
import { clearCart } from "../../slices/CartSlice";

const Backend_url = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = `${Backend_url}/api/v1/user/profile`;

// ------------------ UPDATE PROFILE ------------------
export function updateUserProfile(formData, callback) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating profile...");
    dispatch(setLoading(true));

    try {
      const { data } = await axios.put(`${BASE_URL}/update`, formData, getAuthHeaders());

      if (!data.success) throw new Error(data.message);

      toast.success("Profile updated successfully ✅");
      dispatch(setUser(data.user));
      
      // Call the callback with success
      callback && callback(true);

    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Failed to update profile";
      toast.error(msg);
      console.error("UPDATE PROFILE ERROR:", msg);
      
      // Call the callback with failure
      callback && callback(false);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
// ------------------ DELETE PROFILE ------------------
export function deleteUserProfile(navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting profile...");
    dispatch(setLoading(true));

    try {
      const { data } = await axios.delete(`${BASE_URL}/delete`, getAuthHeaders());

      if (!data.success) throw new Error(data.message);

      toast.success("Profile deleted successfully ❌");
      
      // Clear auth & cart after deletion
      dispatch(logout(null));
      dispatch(clearCart());
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/"); // redirect to homepage

    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Failed to delete profile";
      toast.error(msg);
      console.error("DELETE PROFILE ERROR:", msg);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
