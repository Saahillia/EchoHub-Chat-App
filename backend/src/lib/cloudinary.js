// Import Cloudinary v2 SDK, which is used to upload and manage images in the cloud
import { v2 as cloudinary } from "cloudinary";

// Import dotenv to load environment variables from a .env file into process.env
import { config } from "dotenv";

// Initialize dotenv so environment variables become available throughout the app
config();


// Configure the Cloudinary instance using secret credentials
// These values come from the .env file and are kept hidden for security reasons:
// - cloud_name  : Identifies your Cloudinary account
// - api_key     : Public API key used for authentication
// - api_secret  : Private key used to securely sign requests
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key    : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});

// Export the configured Cloudinary instance so it can be used
// in other parts of the app to upload images or manage files
export default cloudinary;
