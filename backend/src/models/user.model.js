import mongoose from "mongoose";            // Import mongoose to create schemas and interact with MongoDB

// ======================================================================
// USER SCHEMA
// Purpose:
// - Defines how a user is stored in MongoDB
// - Includes fields for email, full name, password, and profile picture
// - Ensures validation and data consistency
// ======================================================================
const userSchema = new mongoose.Schema(
    {
        // User email address (must be unique for login)
        email: {
            type: String,
            required: true,   // Email is mandatory
            unique: true,     // Two users cannot have the same email
        },

        // User's full name used in profile and chat display
        fullName: {
            type: String,
            required: true,   // Must provide a name during signup
        },

        // Hashed password stored securely (actual hashing happens in controller)
        password: {
            type: String,
            required: true,   // Password must be provided
            minlength: 6,     // Minimum length validation for security
        },

        // Profile picture URL (usually Cloudinary URL)
        // Empty string means default profile picture on the frontend
        profilePic: {
            type: String,
            default: "",
        },
    },

    // Automatically adds:
    // createdAt → when user was created
    // updatedAt → when user was last updated
    // Helps track user account timeline
    { timestamps: true }
);
// Create the User model from the schema.
// This is what controllers use to interact with the "User" collection.
const User = mongoose.model("User", userSchema);

export default User;
