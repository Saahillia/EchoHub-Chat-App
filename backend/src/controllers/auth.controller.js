import {generateToken} from "../lib/utils.js"           // Imports a function that creates a JWT token and stores it in a cookie
import User from "../models/user.model.js"              // Imports the User model to interact with the users collection in MongoDB
import bcrypt from "bcryptjs"                           // Used for hashing passwords securely
import cloudinary from "../lib/cloudinary.js"           // Used to upload images (like profile pictures) to Cloudinary


// =======================================
//  SIGNUP CONTROLLER
//  Purpose:
//  - Create a new user account
//  - Validate input fields
//  - Hash the password before saving it
//  - Save the user in the database
//  - Generate and return a JWT token
// =======================================
export const signup = async (req,res) => {
    
    // Extract values sent from the frontend (Full Name, Email, Password)
    const {fullName, email, password} = req.body;

    try{
        // Check if any required field is missing
        if(!fullName || !email || !password){
            return res.status(400).json({message : "All fields are required"});
        }

        // Basic password validation
        if(password.length < 6){
            return res.status(400).json({message : "Password must be at least 6 characters"});
        }

        // Check if user already exists with same email
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({message: "Email already registered"});
        }
        
        // Create a salt and hash the password for added security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object with the hashed password
        const newUser = new User({
            fullName,   
            email,
            password : hashedPassword
        });

        // If user creation was successful, save the user and generate a token
        if(newUser){
            // Create JWT token and store it in a secure cookie
            generateToken(newUser._id, res);

            // Save new user record to the database
            await newUser.save();

            // Send back only safe information (never password)
            res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic,
            });

        } else {
            // If something failed during creation
            res.status(400).json({message : "Invalid user data"});
        }

    } catch (error){
        // Log error on server for debugging
        console.log("Error in signup controller", error.message);

        // Inform user that something went wrong on the server
        res.status(500).json({message : "Internal Server Error"});
    }
};



// =======================================
//  LOGIN CONTROLLER
//  Purpose:
//  - Allow a user to log in
//  - Verify email and password
//  - Generate a JWT token if login is successful
// =======================================
export const login = async (req,res) => {
    
    // Extract email and password from the request
    const {email, password} = req.body;

    try {
        // Find user with given email
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        // Compare entered password with the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        // Password is correct → generate token
        generateToken(user._id, res);

        // Send back safe user information
        res.status(200).json({
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            profilePic : user.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({message : "Internal Server Error"});
    }
};



// =======================================
//  LOGOUT CONTROLLER
//  Purpose:
//  - Remove the user's JWT cookie
//  - Log them out of the system
// =======================================
export const logout = (req,res) => {
    try {
        // Clear the JWT cookie instantly
        res.cookie("jwt", "", {maxAge: 0});

        res.status(200).json({message : "Logged Out Successfully"});

    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message : "Internal Server Error"});
    }
};



// =======================================
//  UPDATE PROFILE CONTROLLER
//  Purpose:
//  - Update the user's profile picture
//  - Upload the picture to Cloudinary
//  - Save the new image URL in the database
// =======================================
export const updateProfile = async(req, res) => {
    try {
        const {profilePic} = req.body;       // Image data (base64 or URL)
        const userId = req.user._id;         // User ID from JWT authentication

        // Check if the picture is provided
        if(!profilePic){
            return res.status(400).json({message : "Profile Pic is required"});
        }

        // Upload picture to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        // Update the user's profile picture URL
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            {profilePic : uploadResponse.secure_url},
            {new : true},                    // Return the updated user object
        );

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("Error in update profile", error);
        res.status(500).json({message : "Internal server error"});
    }
};



// =======================================
//  CHECK AUTH CONTROLLER
//  Purpose:
//  - Used to check whether a user is logged in
//  - Returns the user information if authenticated
// =======================================
export const checkAuth = async(req, res) => { 
    try {
        // req.user is filled by the authentication middleware
        res.status(200).json(req.user);

    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message : "Internal server error"});
    }
};
