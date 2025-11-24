// Main backend entry point for the Express + Socket.IO server

import express from "express";              // Express framework for building backend REST APIs
import dotenv from "dotenv";                // dotenv loads environment variables from .env file into process.env
import cookieParser from "cookie-parser";   // Middleware for reading cookies (used for JWT auth)
import cors from "cors";                    // CORS controls which frontend origins can call this backend
import path from "path";                    // path is used for file system paths (mainly for serving frontend in production)



import { connectDB } from "./lib/db.js";    // Import database connection helper
import authRoutes from "./routes/auth.route.js";            // Import all authentication-related routes
import messageRoutes from "./routes/message.route.js";      // Import all message/chat routes
// socket.js exports an already created Express app,
// the HTTP server, and the Socket.IO instance
import { app, server, io } from "./lib/socket.js";

// Load environment variables
dotenv.config();
// PORT on which backend will run (default 5001 if not provided)
const PORT = process.env.PORT || 5001;

// Get root directory path (important for serving frontend later)
const __dirname = path.resolve();


/**
 * ============================
 *       GLOBAL MIDDLEWARE
 * ============================
 */

// Allowed frontend domain for CORS
// CLIENT_URL should be set in your .env file
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Middleware to read JWT token from cookies
app.use(cookieParser());

// CORS setup to allow frontend → backend requests
app.use(
    cors({
        origin: [
            "http://localhost:5173",   // Development frontend
            CLIENT_URL                 // Production frontend
        ],
        credentials: true,             // Allow cookies, JWT, sessions
    })
);


/**
 * ============================
 *            ROUTES
 * ============================
 * All API endpoints will be prefixed with /api
 */

// Authentication routes: signup, login, logout, check auth
app.use("/api/auth", authRoutes);

// Message routes: get users, fetch messages, send message
app.use("/api/messages", messageRoutes);


/**
 * ==========================================================
 * OPTIONAL: Serve frontend (ONLY if backend serves the build)
 * ==========================================================
 * If your React/Vite frontend is deployed separately, remove this block.
 */
/*
if (process.env.NODE_ENV === "production") {
    // Serve static frontend files from /dist
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // Any unknown route should load index.html
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}
*/


/**
 * ==========================================
 *     START DATABASE + HTTP/SOCKET SERVER
 * ==========================================
 */
const start = async () => {
    try {
        // Connect to MongoDB before lifting the server
        await connectDB();

        // Start HTTP + Socket.IO server
        server.listen(PORT, () => {
            console.log(`Server running on PORT: ${PORT}`);
        });

        // Equivalent HTTP meaning:
        // 200 OK → Backend started successfully

    } catch (err) {
        // If anything fails while starting the server
        console.error("Failed to start server:", err);

        // 500 Internal Server Error → Failed startup
        process.exit(1); // Exit the process with failure code
    }
};

start();
