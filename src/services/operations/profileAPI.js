import axios from "axios";
const Backend_url = import.meta.env.VITE_BACKEND_URL;

const BASE_URL = `${Backend_url}/api/v1/auth`;
import { getAuthHeaders } from "../../utils/authHeader"; // 🔐 import auth headers



export const getProfile = async (token) => {
  return axios.get(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateProfile = async (data, token) => {
  return axios.put(`${BASE_URL}/profile/update`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const addBook = async (bookId, token) => {
  return axios.put(`${BASE_URL}/profile/books/add`, { bookId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const removeBook = async (bookId, token) => {
  return axios.put(`${BASE_URL}/profile/books/remove`, { bookId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateMentor = async (mentorId, token) => {
  return axios.put(`${BASE_URL}/profile/mentor`, { mentorId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateGuide = async (guideId, token) => {
  return axios.put(`${BASE_URL}/profile/guide`, { guideId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
