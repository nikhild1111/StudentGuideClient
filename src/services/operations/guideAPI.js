// // src/services/operations/guideAPI.js
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { getAuthHeaders } from "../../utils/authHeader";
// import {
//   setGuides,
//   setStudents,
//   setLoading,
//   setError,
// } from "../../slices/guideSlice";

// const Backend_url = import.meta.env.VITE_BACKEND_URL;
// const BASE_URL = `${Backend_url}/api/guide`;

// // 🔹 Apply for Guide
// export function applyForGuide(formData, callback) {
//   return async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//       const { data } = await axios.post(`${BASE_URL}/apply-guide`, formData, getAuthHeaders());
//       if (!data.success) throw new Error(data.message);
//       toast.success(data.message || "Application submitted");
//       callback && callback(true);  // ✅ Success
//     } catch (err) {
//       const msg = err.response?.data?.message || err.message;
//       toast.error(msg+"please Login first" || "Server Error");
//       dispatch(setError(msg));
//       callback && callback(false);  // ❌ Failure
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };
// }



// // 🔹 Get All Guides and Students (admin only)
// export function fetchAllGuideApplicants(filters = {}) {
//   return async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//       const { data } = await axios.post(
//         `${BASE_URL}/admin/guides`,
//         filters,
//         getAuthHeaders()
//       );

//       if (!data.success) throw new Error(data.message);

//       dispatch(setStudents(data.students));
//       dispatch(setGuides(data.guides));
//     } catch (err) {
//       const msg = err.response?.data?.message || err.message;
//       toast.error(msg);
//       dispatch(setError(msg));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };
// }



// // 🔹 Approve Guide
// export function approveGuide(id, callback) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Approving...");
//     try {
//       const { data } = await axios.put(`${BASE_URL}/admin/approve-guide/${id}`, {}, getAuthHeaders());
//       if (!data.success) throw new Error(data.message);
//       toast.success(data.message || "Approved");
//       callback && callback();
//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message);
//     } finally {
//       toast.dismiss(toastId);
//     }
//   };
// }


// // 🔹 Delete Guide
// export function deleteGuide(id, callback) {
//   return async () => {
//     const toastId = toast.loading("Deleting...");
//     try {
//       const { data } = await axios.delete(`${BASE_URL}/admin/guide/${id}`, getAuthHeaders());
//       if (!data.success) throw new Error(data.message);
//       toast.success(data.message || "Deleted");
//       callback && callback();
//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message);
//     } finally {
//       toast.dismiss(toastId);
//     }
//   };
// }










import axios from "axios";
import { toast } from "react-hot-toast";
import { getAuthHeaders } from "../../utils/authHeader";
import {
  setGuides,
  setStudents,
  setLoading,
  setError,
} from "../../slices/guideSlice";

const Backend_url = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = `${Backend_url}/api/guide`;


// 🔹 Get All Guides and Students (admin only)
export function fetchAllGuideApplicants(filters = {}) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(
        `${BASE_URL}/admin/guides`,
        filters,
        getAuthHeaders()
      );

      if (!data.success) throw new Error(data.message);

      dispatch(setStudents(data.students));
      dispatch(setGuides(data.guides));
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
      dispatch(setError(msg));
    } finally {
      dispatch(setLoading(false));
    }
  };
}


// 🔹 Apply for Guide
export function applyForGuide(formData, callback) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(`${BASE_URL}/apply-guide`, formData, getAuthHeaders());
      if (!data.success) throw new Error(data.message);
      toast.success(data.message || "Application submitted");
     await  dispatch(fetchAllGuideApplicants());
      callback && callback(true);  // ✅ Success
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg + " please Login first");
      dispatch(setError(msg));
      callback && callback(false);  // ❌ Failure
    } finally {
      dispatch(setLoading(false));
    }
  };
}


// 🔹 Approve Guide
export function approveGuide(id, callback) {
  return async (dispatch) => {
    const toastId = toast.loading("Approving...");
    try {
      const { data } = await axios.put(
        `${BASE_URL}/admin/approve-guide/${id}`,
        {},
        getAuthHeaders()
      );

      if (!data.success) throw new Error(data.message);

      toast.success(data.message || "Approved");

      // ✅ Refetch after approve
   await   dispatch(fetchAllGuideApplicants());

      callback && callback();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      toast.dismiss(toastId);
    }
  };
}

// 🔹 Update Guide (Admin)
export function updateGuide(id, formData, callback) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating...");
    try {
      const { data } = await axios.put(
        `${BASE_URL}/admin/guide/${id}`,
        formData,
        getAuthHeaders(true) // multipart/form-data
      );

      if (!data.success) throw new Error(data.message);

      toast.success(data.message || "Guide updated");

      // ✅ Refetch after update
    await  dispatch(fetchAllGuideApplicants());

      callback && callback(data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      toast.dismiss(toastId);
    }
  };
}

// 🔹 Delete Guide
export function deleteGuide(id, callback) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting...");
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/admin/guide/${id}`,
        getAuthHeaders()
      );

      if (!data.success) throw new Error(data.message);

      toast.success(data.message || "Deleted");

      // ✅ Refetch after delete
     await dispatch(fetchAllGuideApplicants());

      callback && callback();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      toast.dismiss(toastId);
    }
  };
}
