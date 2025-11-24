// Import Express to create a modular route handler
import express from "express";
// Import middleware to ensure only logged-in users can access these routes
import { protectRoute } from "../middelware/auth.middleware.js";
// Import controllers that handle sending messages, fetching messages, and fetching user list
import { sendMessages, getMessages, getUsersForSidebar } from "../controllers/message.controller.js";


// Initialize a new router instance for message-related routes
const router = express.Router();

// ========================================================================
// GET /users
// Purpose: Get all users except the logged-in user
// Access: Protected (user must be logged in)
//
// HTTP meanings:
// - 200 OK → Successfully returned user list
// - 401 Unauthorized → No/Invalid JWT token
// ========================================================================
router.get("/users", protectRoute, getUsersForSidebar);


// ========================================================================
// GET /:id
// Purpose: Fetch chat messages between the logged-in user and another user
// :id = ID of the user you want to chat with
// Access: Protected
//
// HTTP meanings:
// - 200 OK → Messages fetched successfully
// - 401 Unauthorized → Token missing/invalid
// - 404 Not Found → User does not exist
// ========================================================================
router.get("/:id", protectRoute, getMessages);


// ========================================================================
// POST /send/:id
// Purpose: Send a message (text or image) to a specific user
// :id = receiver's user ID
// Access: Protected
//
// HTTP meanings:
// - 200 OK → Message sent successfully
// - 400 Bad Request → Message body missing
// - 401 Unauthorized → User not logged in
// ========================================================================
router.post("/send/:id", protectRoute, sendMessages);


// Export router so it can be used in the main server setup
export default router;
