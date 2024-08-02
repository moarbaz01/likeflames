import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const apiRequest = ({ method, url, data, token }) => {
  // Determine content type based on the presence of FormData
  const isFormData = data instanceof FormData;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": isFormData ? "multipart/form-data" : "application/json",
  };

  return api({
    method,
    url,
    data,
    headers,
  });
};

export default apiRequest;
