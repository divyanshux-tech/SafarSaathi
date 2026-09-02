import axios from "axios";

// Central Axios client - all API calls must use this instance
// Base URL comes from Vite env var -> never hardcode localhost
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request interceptor: attach JWT if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: global error handling (log, optionally redirect on 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Future: clear auth & redirect to /login
      // localStorage.removeItem("token");
      // window.location.href = "/login";
      console.warn("[API] Unauthorized - token may be expired");
    }
    return Promise.reject(error);
  }
);

export default api;
