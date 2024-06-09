import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: { "Content-Type": "application/json" },
});

export default ({ method, url, data, token }) => {
  return api({
    method,
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
