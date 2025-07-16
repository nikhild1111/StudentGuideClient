import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
   const Backend_url = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = `${Backend_url}/api/v1/auth`
const useUserRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get(`${BASE_URL}/role`, { withCredentials: true })
      .then(response => {
        setRole(response.data.user.role);
        toast.success(`Logged in as ${response.data.user.role}`);
      })
      .catch(error => {
        toast.error(error.response?.data?.message || "Failed to fetch user role");
      })
      .finally(() => setLoading(false));
  }, []);

  return { role, loading };
};

export default useUserRole;

