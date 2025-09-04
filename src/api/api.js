import axios from "axios";

const API = axios.create({
  baseURL: "https://oralvis-backend-dftl.onrender.com/api", // update when deployed
});

API.interceptors.request.use((config) => {
  const raw = localStorage.getItem("oralvis_auth");
  if (raw) {
    const { token } = JSON.parse(raw);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
