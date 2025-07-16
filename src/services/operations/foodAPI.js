// src/services/operations/foodAPI.js
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  setFoods,
  setLoading,
  setPagination,
  setError,
} from "../../slices/foodSlice";
import { getAuthHeaders } from "../../utils/authHeader"; // 🔐 import auth headers

const Backend_url = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = `${Backend_url}/api/hotel`; // using hotel routes for food

// 🔹 Fetch All Foods with filters, pagination, and search
export function fetchFoods({ page = 1, limit = 6, search = "", type = "all" }) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(
        `${BASE_URL}/list`,
        { page, limit, search, type },
        getAuthHeaders() // 🔐 include token
      );
      if (!data.success) throw new Error(data.message);
      dispatch(setFoods(data.data));
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

// 🔹 Create Food Place (Hotel)
export function createFood(formData, callback) {
  return async (dispatch) => {

    
    dispatch(setLoading(true));
    const toastId = toast.loading("Creating food place...");
    try {
      const response = await axios.post(
        `${BASE_URL}/`,
        formData,
        {
          ...getAuthHeaders(),
          headers: {
            ...getAuthHeaders().headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!response.data.success) throw new Error(response.data.message);
      toast.success("Food place created");
      callback && callback();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

// 🔹 Update Food
export function updateFood(id, formData, callback) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Updating food...");
    try {
      const response = await axios.put(
        `${BASE_URL}/${id}`,
        formData,
        {
          ...getAuthHeaders(),
          headers: {
            ...getAuthHeaders().headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!response.data.success) throw new Error(response.data.message);
      toast.success("Food place updated");
      callback && callback();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

// 🔹 Delete Food
export function deleteFood(id, callback) {
  return async () => {
    const toastId = toast.loading("Deleting food...");
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/${id}`,
        getAuthHeaders() // 🔐 delete with auth
      );
      if (!data.success) throw new Error(data.message);
      toast.success("Food place deleted");
      callback && callback();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      toast.dismiss(toastId);
    }
  };
}
