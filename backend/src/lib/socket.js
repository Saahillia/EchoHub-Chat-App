// backend/src/lib/socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Allow front-end origin from env
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const io = new Server(server, {
    cors: {
        origin: [
        "http://localhost:5173",
        "https://echohub-chat-app-2.onrender.com",
        ],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

/**
 * Simple user socket map helpers
 */
const userSocketMap = {};

export function getRecieverSocketId(userId) {
    return userSocketMap[userId];
}

/**
 * Socket handlers
 */
io.on("connection", (socket) => {
    console.log("New socket connected:", socket.id);

    // If client sends userId as handshake query param
    const userId = socket.handshake.query?.userId;
    if (userId) userSocketMap[userId] = socket.id;

    // Broadcast online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("sendMessage", ({ toUserId, message }) => {
        const toSocketId = userSocketMap[toUserId];
        if (toSocketId) {
        io.to(toSocketId).emit("receiveMessage", { from: userId, message });
        }
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        if (userId) delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };
