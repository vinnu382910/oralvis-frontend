// src/api/api.js
import axios from "axios";

const DEFAULT_BACKEND = "https://oralvis-backend-dftl.onrender.com/api";

// If you want to override the backend URL, create a .env file at the project root:
// REACT_APP_API_URL=https://your-backend-url.com/api
const base = process.env.REACT_APP_API_URL || DEFAULT_BACKEND;

const API = axios.create({
  baseURL: base,
});

// Attach token automatically to requests (reads from localStorage key: oralvis_auth)
API.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("oralvis_auth");
    if (raw) {
      const { token } = JSON.parse(raw);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

export default API;
