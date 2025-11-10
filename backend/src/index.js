import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// ---------- CORS: allow local + deployed frontends ----------
const allowedOrigins = [
    "http://localhost:5173",
    // add ALL your deployed frontend URLs here:
    "https://echo-hub-chat-app-qho7.vercel.app",
    "https://echohub-chat.vercel.app", // keep as spare if you rename
    ];

    app.use(
    cors({
        origin(origin, cb) {
        // allow server-to-server/no-origin (like curl, Postman) and allowed origins
        if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
        console.log("CORS blocked:", origin);
        return cb(new Error("Not allowed by CORS"));
        },
        credentials: true, // allow cookies/authorization headers
    })
    );

    // ---------- Standard middleware ----------
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));
    app.use(cookieParser());

    // ---------- API routes ----------
    app.use("/api/auth", authRoutes);
    app.use("/api/messages", messageRoutes);

    // ---------- Optional: serve frontend when building both together ----------
    if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    // Express 5-safe fallback (no app.get('*'))
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
    }

    // ---------- Start server ----------
    server.listen(PORT, () => {
    console.log(`✅ Server running on PORT: ${PORT}`);
    connectDB();
});
