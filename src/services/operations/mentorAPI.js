import axios from "axios";
import { toast } from "react-hot-toast";
import {
  setMentors,
  setMentorLoading,
  setMentorPagination,
  setMentorError,
} from "../../slices/mentorSlice";
import { getAuthHeaders } from "../../utils/authHeader";

const Backend_url = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = `${Backend_url}/api/mentors`;

// 🔹 Fetch Mentors with filters, search, pagination
export function fetchMentors({ page = 1, limit = 6, search = "", department = "" }) {
  return async (dispatch) => {
    dispatch(setMentorLoading(true));
    try {
      const { data } = await axios.post(`${BASE_URL}/all`, { page, limit, search, department }, getAuthHeaders());
      if (!data.success) throw new Error(data.message);

      console.log(data);
      dispatch(setMentors(data.data));
      dispatch(setMentorPagination(data.pagination));
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
      dispatch(setMentorError(msg));
    } finally {
      dispatch(setMentorLoading(false));
    }
  };
}

// 🔹 Add Mentor
export function addMentor(formData, callback) {
  return async (dispatch) => {

    console.log(formData);
    dispatch(setMentorLoading(true));
    const toastId = toast.loading("Adding mentor...");
    try {
      const { data } = await axios.post(`${BASE_URL}/add`, formData, getAuthHeaders(true));
      if (!data.success) throw new Error(data.message);
      toast.success(data.message || "Mentor added");
      callback && callback(true);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      dispatch(setMentorLoading(false));
      callback && callback(false);
    } finally {
      dispatch(setMentorLoading(false));
      toast.dismiss(toastId);
    }
  };
}

// 🔹 Update Mentor
export function updateMentor(id, formData, callback) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating mentor...");
    try {
      const { data } = await axios.put(`${BASE_URL}/update/${id}`, formData, getAuthHeaders(true));
      if (!data.success) throw new Error(data.message);
      toast.success(data.message || "Updated");
        callback && callback(true);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
     callback && callback(false);
    } finally {
      toast.dismiss(toastId);
    }
  };
}

// 🔹 Delete Mentor
export function deleteMentor(id, callback) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting mentor...");
    try {
      const { data } = await axios.delete(`${BASE_URL}/delete/${id}`, getAuthHeaders());
      if (!data.success) throw new Error(data.message);
      toast.success(data.message || "Deleted");
      callback && callback();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      toast.dismiss(toastId);
    }
  };
}

// 🔹 Search Mentors
export function searchMentors(query = {}, callback) {
  return async (dispatch) => {
    dispatch(setMentorLoading(true));
    try {
      const { data } = await axios.post(
        `${BASE_URL}/search`,
        query, // now passed in the body
        getAuthHeaders() // this contains headers only
      );

      if (!data.success) throw new Error(data.message);

      dispatch(setMentors(data.data));
      dispatch(setMentorPagination(data.pagination));

      callback && callback(data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
      dispatch(setMentorError(msg));
    } finally {
      dispatch(setMentorLoading(false));
    }
  };
}

// 🔹 Sort Mentors
export function sortMentors({ sortBy = "name", order = "asc", page = 1, limit = 6 }, callback) {
  return async (dispatch) => {
    dispatch(setMentorLoading(true));
    try {
      const { data } = await axios.get(`${BASE_URL}/sort`, {
        params: { sortBy, order, page, limit },
        headers: getAuthHeaders().headers,
      });
      if (!data.success) throw new Error(data.message);
      dispatch(setMentors(data.data));
      dispatch(setMentorPagination(data.pagination));
      callback && callback(data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
      dispatch(setMentorError(msg));
    } finally {
      dispatch(setMentorLoading(false));
    }
  };
}
