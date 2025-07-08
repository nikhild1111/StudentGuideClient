// src/services/operations/hostelAPI.js
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  setHostels,
  setLoading,
  setPagination,
  setError,
} from "../../slices/hostelSlice";

const Backend_url = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = `${Backend_url}/api/hostels`;

// 🔹 Fetch Hostels with filters, search, pagination
export function fetchHostels({ page = 1, limit = 6, search = "", type = "all" }) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(`${BASE_URL}/fetch`, { page, limit, search, type });
      if (!data.success) throw new Error(data.message);
     
        console.log(data.data);
        console.log(data.pagination);
      dispatch(setHostels(data.data));
      dispatch(setPagination(data.pagination));

   
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
      dispatch(setError(msg));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 🔹 Create Hostel
export function createHostel(formData, callback) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Creating hostel...");
    try {
      const response = await axios.post(`${BASE_URL}/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (!response.data.success) throw new Error(response.data.message);
      toast.success("Hostel created");
      callback && callback(); // refresh or navigate
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

// 🔹 Update Hostel
export function updateHostel(id, formData, callback) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Updating hostel...");
    try {
      const response = await axios.put(`${BASE_URL}/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (!response.data.success) throw new Error(response.data.message);
      toast.success("Hostel updated");
      callback && callback(); // refresh or navigate
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

// 🔹 Delete Hostel
export function deleteHostel(id, callback) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting...");
    try {
      const { data } = await axios.delete(`${BASE_URL}/delete/${id}`);
      if (!data.success) throw new Error(data.message);
      toast.success("Hostel deleted");
      callback && callback();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      toast.dismiss(toastId);
    }
  };
}
