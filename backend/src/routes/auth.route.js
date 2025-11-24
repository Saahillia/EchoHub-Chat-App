import express from "express";                  // Import Express to create routes
// Import authentication controllers that handle the logic for each route
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
// Import middleware that protects routes by verifying JWT tokens
import { protectRoute } from "../middelware/auth.middleware.js";


// Create a new Router instance to group authentication-related routes
const router = express.Router();
// ========================================================================
// AUTH ROUTES
// Each route below corresponds to an authentication action.
// =======================================================================
// ---------------------------------------------------------
// POST /signup
// Purpose: Create a new user account (public route)
// Controller: signup
// Equivalent HTTP meaning:
// - 201 Created → successful signup
// - 400 Bad Request → missing details, invalid input
// ---------------------------------------------------------
router.post("/signup", signup);
// ---------------------------------------------------------
// POST /login
// Purpose: Log in a user by verifying credentials (public route)
// Controller: login
// HTTP meanings:
// - 200 OK → login successful
// - 400 Bad Request → invalid credentials
// ---------------------------------------------------------
router.post("/login", login);
// ---------------------------------------------------------
// POST /logout
// Purpose: Log the user out by clearing their JWT cookie (public route)
// Controller: logout
// HTTP meanings:
// - 200 OK → logout successful
// ---------------------------------------------------------
router.post("/logout", logout);
// ---------------------------------------------------------
// PUT /update-profile
// Purpose: Update user's profile picture (protected route)
// Only authenticated users can update profile → protectRoute required
// Controller: updateProfile
// HTTP meanings:
// - 200 OK → profile updated
// - 401 Unauthorized → no token provided
// ---------------------------------------------------------
router.put("/update-profile", protectRoute, updateProfile);
// ---------------------------------------------------------
// GET /check
// Purpose: Check if user is authenticated (protected route)
// protectRoute ensures token is valid before allowing access
// Controller: checkAuth
// HTTP meanings:
// - 200 OK → user authenticated
// - 401 Unauthorized → invalid or missing token
// ---------------------------------------------------------
router.get("/check", protectRoute, checkAuth);
// Export router so it can be mounted in server.js / index.js
export default router;
