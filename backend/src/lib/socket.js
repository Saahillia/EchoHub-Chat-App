import { Server } from "socket.io";     // Importing the Socket.IO Server class to create a WebSocket server
import http from "http";                // Importing Node's built-in HTTP server module
import express from "express";          // Importing Express to attach middleware if needed before binding to HTTP server

// Create an Express application instance
const app = express();
// Allow large JSON bodies (fixes 413 errors for image messages)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


// Create an actual HTTP server from the Express app.
// Socket.IO attaches to this server to upgrade HTTP → WebSocket connection.
const server = http.createServer(app);

// Allowed frontend origin (for CORS)
// Comes from environment variable or defaults to localhost for development
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Initialize a new Socket.IO server with CORS configuration
const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173", // Default local development frontend
            CLIENT_URL               // Production or custom frontend domain
        ],
        methods: ["GET", "POST"],    // Allowed HTTP methods
        credentials: true,           // Allow cookies/credentials over sockets
    },
});

// ================================================================
// USER → SOCKET ID MAPPING
// Purpose:
// - When a user logs in, we store their socket ID.
// - This allows sending messages directly to a specific online user.
// ================================================================
const userSocketMap = {};

// Helper function to get a receiver’s socket ID using their userId
export function getRecieverSocketId(userId) {
    return userSocketMap[userId];
}

// ================================================================
// SOCKET.IO CONNECTION HANDLER
// Triggered whenever a new client connects to the server.
// Equivalent to:
// Status: 101 Switching Protocols → WebSocket upgrade successful
// ================================================================
io.on("connection", (socket) => {
    console.log("New socket connected:", socket.id);

    // Extract userId sent by frontend during connection handshake
    // Example client: io("server-url", { query: { userId: loggedInUserId } })
    const userId = socket.handshake.query?.userId;
    // If userId exists, map it to this socket ID
    if (userId) userSocketMap[userId] = socket.id;
    // Notify all clients about current online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // ================================================================
    // LISTEN FOR "sendMessage" EVENT
    // This means: user wants to send a message to another user.
    // ================================================================
    socket.on("sendMessage", ({ toUserId, message }) => {
        const toSocketId = userSocketMap[toUserId];

        // Deliver message directly to receiver if they are online
        if (toSocketId) {
            io.to(toSocketId).emit("receiveMessage", {
                from: userId,
                message
            });
        }
        // If receiver is offline:
        // This behaves like HTTP 404 Not Found (receiver not online)
        // But we simply ignore since offline handling is done in DB
    });

    // ================================================================
    // DISCONNECT HANDLER
    // Triggered when user loses connection (tab closed, internet lost)
    //
    // Equivalent HTTP style meanings:
    // - 408 Request Timeout → user inactive
    // - 499 Client Closed Request → client disconnected suddenly
    // ================================================================
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);

        // Remove user from online map
        if (userId) delete userSocketMap[userId];

        // Broadcast updated list of online users
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});
// Export Socket.IO instance and server for use in other files
export { io, app, server };
