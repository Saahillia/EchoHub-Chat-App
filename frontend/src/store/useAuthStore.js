import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

// Base URL used for WebSocket connections
// - In development → localhost backend
// - In production → Backend URL from environment variables
const BASE_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:5001"
        : import.meta.env.VITE_BACKEND_URL + "/";

/**
 * Zustand Store: Authentication + Socket Management
 * -------------------------------------------------
 * This store manages:
 * - User authentication state
 * - Signup / login / logout functionality
 * - Profile updates
 * - Real-time online user tracking using Socket.io
 * - Auth-checking on page load
 */
export const useAuthStore = create((set, get) => ({
    /** The authenticated user object */
    authUser: null,

    /** State flags for UI loading indicators */
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    /** List of online users received from backend socket events */
    onlineUsers: [],

    /** WebSocket connection instance */
    socket: null,

    /**
     * checkAuth()
     * -----------
     * - Called on app load to check if user has a valid JWT cookie
     * - If yes → sets authUser + connects socket
     * - If no → sets user to null
     */
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket(); // Initialize WebSocket connection
        } catch (error) {
            console.log("Error in checkAuth :", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false }); // Authentication check finished
        }
    },

    /**
     * signup()
     * --------
     * Sends signup request using form data.
     * On success:
     * - Saves user in store
     * - Shows success toast
     * - Connects socket
     */
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in SignUp :", error);
        } finally {
            set({ isSigningUp: false });
        }
    },

    /**
     * login()
     * -------
     * Sends login request.
     * On success:
     * - Sets authUser
     * - Shows toast
     * - Connects socket
     */
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    /**
     * logout()
     * --------
     * Calls logout endpoint, clears user data,
     * disconnects WebSocket, shows toast.
     */
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    /**
     * updateProfile()
     * ---------------
     * Sends updated profile data (e.g., profile picture)
     * and updates authUser in store.
     */
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update Profile:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    /**
     * connectSocket()
     * ----------------
     * Initializes WebSocket connection using:
     * - root backend URL
     * - user ID in query
     *
     * Also listens for:
     * `"getOnlineUsers"` event → updates online users list
     */
    connectSocket: () => {
        const { authUser } = get();

        // Do not reconnect if user not logged in or socket already active
        if (!authUser || get().socket?.connected) return;

        // Initialize socket connection
        const socket = io(BASE_URL, {
            query: { userId: authUser._id },
        });
        socket.connect();

        set({ socket }); // Save socket instance

        // Listen for real-time online user updates
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    /**
     * disconnectSocket()
     * ------------------
     * Safely disconnect WebSocket when user logs out.
     */
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}));
