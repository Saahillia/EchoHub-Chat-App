import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js"; // Make sure this is imported properly

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
    cors({
        origin: [
        "http://localhost:5173", // local dev
        process.env.FRONTEND_URL, // your render frontend URL
        ],
        credentials: true,
    })
    );

    // API routes
    app.use("/api/auth", authRoutes);
    app.use("/api/messages", messageRoutes);

    // Render deployment fix - serve frontend
    if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
    }

    server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
