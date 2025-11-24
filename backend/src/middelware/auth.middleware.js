import jwt from "jsonwebtoken";                             // Import JWT library for verifying the token
import User from "../models/user.model.js";                 // Import User model to fetch user details from the database

// ==========================================================================
// protectRoute (Middleware)
// Purpose:
// - Protects private routes
// - Ensures that only authenticated users can access certain API endpoints
// - Verifies JWT token stored in cookies
// - Attaches the logged-in user object to req.user
// ==========================================================================
export const protectRoute = async (req, res, next) => {
    try {

        // Extract JWT token from cookies
        const token = 
            req.cookies.jwt || 
            req.headers.authorization?.replace("Bearer ", "");
        
        // If token is missing → User is not logged in
        // 401 Unauthorized → Client must log in first
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        // Verify the JWT token using the secret key from the .env file
        // If the token is expired or invalid, jwt.verify() will throw an error
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If decoding fails (rare case)
        // 401 Unauthorized → Token cannot be trusted
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        // Token is valid → Find user associated with token
        // decoded.userId ← comes from generateToken()
        // .select("-password") removes password before sending user object
        const user = await User.findById(decoded.userId).select("-password");

        // If no user is found in database
        // 404 Not Found → User does not exist anymore
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach authenticated user to the request object
        // This allows protected routes to access req.user
        req.user = user;

        // Move to next route / controller
        next();

    } catch (error) {
        // If anything goes wrong in verification or database fetch
        console.log("Error in protectRoute Middleware:", error.message);

        // 500 Internal Server Error → Something broke on server side
        res.status(500).json({ message: "Internal server error" });
    }
};
