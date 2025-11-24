import axios from "axios";              // Import Axios for making HTTP requests to the backend API

/**
 * ======================================================================
 * BACKEND URL RESOLUTION LOGIC
 * ======================================================================
 * Purpose:
 * 1. Choose the correct backend URL based on environment.
 * 2. Ensure clean URL formatting (avoid trailing slashes).
 * 3. Always produce a valid base API path for axios.
 *
 * How it works:
 * - In development → uses VITE_BACKEND_URL_LOCAL (e.g. http://localhost:5001)
 * - In production  → uses VITE_BACKEND_URL (Render or deployed URL)
 * - Removes trailing slash → prevents malformed URLs like "//api/auth"
 */
const ENV = import.meta.env; // environment variables provided by Vite


// Determine which backend URL to use
let BACKEND_URL =
    ENV.MODE === "development"
        ? ENV.VITE_BACKEND_URL_LOCAL // local dev server
        : ENV.VITE_BACKEND_URL;      // production server on Render/Vercel/etc.


// Prevent trailing slash issues (e.g., "https://domain.com/" → "https://domain.com")
if (BACKEND_URL?.endsWith("/")) {
    BACKEND_URL = BACKEND_URL.slice(0, -1);
}


// Final base API endpoint
// If BACKEND_URL is missing (should not happen in production), fallback to relative "/api"
const BASE_URL = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";


// ======================================================================
// AXIOS INSTANCE
// ======================================================================
// - baseURL: all requests automatically start with /api
// - withCredentials: allows sending cookies (important for JWT auth)
// - content-type: all requests use JSON by default
// ======================================================================
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // enables cookies + sessions across domains
    headers: {
        "Content-Type": "application/json",
    },
});
