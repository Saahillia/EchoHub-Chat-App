import axios from "axios";

/**
 * set VITE_BACKEND_URL in frontend environment on Render.
 * Example: VITE_BACKEND_URL = https://your-backend.onrender.com
 * axios will call `${VITE_BACKEND_URL}/api` in production.
 */
const BACKEND = import.meta.env.VITE_BACKEND_URL || (import.meta.env.MODE === "development" ? "http://localhost:5001" : "");

export const axiosInstance = axios.create({
    baseURL: BACKEND ? `${BACKEND}/api` : "/api",
    withCredentials: true,
});
