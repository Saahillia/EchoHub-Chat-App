// Import mongoose, which is an ODM (Object Data Modeling) library that helps
// interact with MongoDB using JavaScript objects and schemas.
import mongoose from "mongoose";


// Function to connect to MongoDB using Mongoose.
// This function is called when the server starts.
export const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the connection string from environment variables.
        // The `MONGODB_URI` is kept in a .env file for security.
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        // If the connection is successful, log the host MongoDB is connected to.
        console.log(`MongoDB connected: ${conn.connection.host}`);

        // HTTP status codes are not returned here because this runs at server start,
        // but this log indicates a successful connection similar to: 
        // 200 OK → Successfully connected to database.

    } catch (error) {
        // If connection fails, log the error message.
        console.log("MongoDB connection error:", error);

        // This situation is similar to a:
        // 500 Internal Server Error → Server cannot connect to database.
    }
};
