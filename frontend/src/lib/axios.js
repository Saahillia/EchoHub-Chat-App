import axios from "axios";

/**
 * BACKEND URL RESOLUTION LOGIC
 * -----------------------------
 * 1. Uses VITE_BACKEND_URL on Render deployment.
 * 2. Uses localhost in development.
 * 3. Guarantees clean URL (no double slashes, no empty URLs).
 */

const ENV = import.meta.env;

// Determine backend URL
let BACKEND_URL = (ENV.MODE === "development" ? ENV.VITE_BACKEND_URL_LOCAL : ENV.VITE_BACKEND_URL);

// Remove trailing slash so `${BACKEND_URL}/api` is always correct
if (BACKEND_URL?.endsWith("/")) {
    BACKEND_URL = BACKEND_URL.slice(0, -1);
}

// Fallback if BACKEND_URL is empty (should never happen on Render)
const BASE_URL = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
