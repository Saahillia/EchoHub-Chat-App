// Import jsonwebtoken library used to create and verify JWT tokens.
// JWT = JSON Web Token → used for secure login authentication.
import jwt from "jsonwebtoken";

// ========================================================================
// generateToken()
// Purpose:
// - Creates a JWT token containing the user's ID
// - Stores the token in a secure cookie so the browser sends it automatically
// - Used during login and signup to authenticate the user
// ========================================================================
export const generateToken = (userId, res) => {

    // Create a JWT token.
    // Payload: { userId } → identifies user.
    // JWT_SECRET: Secret key stored in .env (NEVER expose publicly).
    // expiresIn: "7d" means token is valid for 7 days.
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });


    // ========================================================================
    // Set the JWT token in browser cookies
    // This cookie is sent automatically with every request → user stays logged in
    // ========================================================================
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,    // Cookie expiration time: 7 days (in ms)

        // httpOnly:
        //   - Cookie CANNOT be accessed by JavaScript (document.cookie)
        //   - Protects against XSS attacks
        httpOnly: true,

        // secure:
        //   - true → cookie only sent over HTTPS (production)
        //   - false → allowed in HTTP during local development
        secure: process.env.NODE_ENV === "production",

        // sameSite:
        //   - "none" → allows cross-site cookie usage (production hosting)
        //   - "lax"  → default, blocks cross-site cookies (local development)
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        // path:
        //   - "/" → cookie is available across the entire website
        path: "/",
    });


    // Return the token (not used often but available if needed)
    return token;
};
