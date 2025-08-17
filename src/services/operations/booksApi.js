// booksActions.js
import axios from "axios";
import { toast } from "react-hot-toast";
import { getAuthHeaders } from "../../utils/authHeader";
import { setbooks, setPagination, setLoading } from "../../slices/booksSlice";

const Backend_url = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = `${Backend_url}/api/books`;

// 🔹 Upload Books
export function uploadBooks(formData, callback) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(
        `${BASE_URL}/uploadbooks`,
        formData,
        getAuthHeaders(true) // multipart/form-data
      );
      if (!data.success) throw new Error(data.message);
      toast.success(data.message || "Books uploaded successfully");
      callback && callback(true);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
      callback && callback(false);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 🔹 Get All Books with filters + pagination
export function fetchAllBooks(filters = {}) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(
        `${BASE_URL}/getbooksall`,
        filters,
        getAuthHeaders()
      );

      if (!data.success) throw new Error(data.message);

      dispatch(setbooks(data.books));
      dispatch(setPagination(data.pagination));
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 🔹 Get Logged-in User Books
export function fetchUserBooks() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(
        `${BASE_URL}/getbooksuser`,
        getAuthHeaders()
      );

      if (!data.success) throw new Error(data.message);

      dispatch(setbooks(data.books));
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// 🔹 Update Book
export function updateBook(formData, callback) {
  return async () => {
    const toastId = toast.loading("Updating book...");
    try {
      const { data } = await axios.put(
        `${BASE_URL}/updatebooks`,
        formData,
        getAuthHeaders(true)
      );
      if (!data.success) throw new Error(data.message);
      toast.success(data.message || "Book updated");
      callback && callback(true);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      callback && callback(false);
    } finally {
      toast.dismiss(toastId);
    }
  };
}

// 🔹 Delete Book
export function deleteBook(bookId, callback) {
  return async () => {
    const toastId = toast.loading("Deleting book...");
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/deletebooks`,
        {
          ...getAuthHeaders(),
          data: { bookId } // axios delete needs data separately
        }
      );
      if (!data.success) throw new Error(data.message);
      toast.success(data.message || "Book deleted");
      callback && callback(true);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      callback && callback(false);
    } finally {
      toast.dismiss(toastId);
    }
  };
}
