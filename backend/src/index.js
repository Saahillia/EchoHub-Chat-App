// backend/src/index.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server, io } from "./lib/socket.js"; // socket.js exports app & server

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

/**
 * Middleware
 */
// allow credentials and the client origin (set CLIENT_URL in env)
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: [
        "http://localhost:5173",              // local dev
        "https://echohub-chat-app-2.onrender.com",   // your frontend
    ],
        credentials: true,
    })
);

/**
 * Routes (mount under /api)
 */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/**
 * Serve frontend in production if you choose to serve from backend (optional)
 * If you deploy frontend separately (as a static site) you can remove this block.
 */
    // if (process.env.NODE_ENV === "production") {
    // app.use(express.static(path.join(__dirname, "../frontend/dist")));
    // app.use((req, res) => {
    //     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    // });
    // }

/**
 * Start DB + Server
 */
const start = async () => {
    try {
        await connectDB(); // connect before accepting traffic
        server.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};

start();
