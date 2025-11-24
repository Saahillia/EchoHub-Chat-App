import mongoose from "mongoose";                    // Import mongoose, the ODM library used to define models and interact with MongoDB

// ======================================================================
// MESSAGE SCHEMA
// Purpose:
// - Defines how a chat message is stored in MongoDB
// - Each message includes a sender, receiver, text, and optional image
// ======================================================================
const messageSchema = new mongoose.Schema(
    {
        // ID of the user who sent the message
        // ObjectId references the User collection
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",     // Tells Mongoose this refers to a User document
            required: true,  // Message cannot exist without a sender
        },

        // ID of the user receiving the message
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",     // Also references the User collection
            required: true,  // Message must have a receiver
        },

        // The text content of the message.
        // Optional because a message may contain only an image.
        text: {
            type: String,
        },

        // URL of the image (if an image is sent in the message)
        // Stored as a string after uploading to Cloudinary
        image: {
            type: String,
        },
    },

    // Timestamps option automatically adds:
    // - createdAt: date when message was created
    // - updatedAt: date when message was last modified
    // Helps in sorting chats by time
    { timestamps: true }
);
// Create and export Message model so it can be used in controllers.
// "Message" is the collection name in MongoDB.
const Message = mongoose.model("Message", messageSchema);
export default Message;
