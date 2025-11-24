import User from "../models/user.model.js";                 // User model to access users stored in MongoDB
import Message from "../models/message.model.js";           // Message model to store and fetch chat messages
import cloudinary from "../lib/cloudinary.js";              // Cloudinary instance for uploading message images
import { getRecieverSocketId, io } from "../lib/socket.js"; // Socket.io helpers for real-time message delivery

// ========================================================
//  CONTROLLER: getUsersForSidebar
//  Purpose:
//  - Fetch all users except the currently logged-in user
//  - Used to show the list of available users in the chat sidebar
// ========================================================
export const getUsersForSidebar = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;  // ID of the user currently logged in
        // Fetch all users except the logged-in user
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId }}).select("-password");
        res.status(200).json(filteredUsers);  
        // 200 OK → Request succeeded, sending the list of users back successfully
    } catch (error) {
        console.error("Error in getUsersForSidebar : ", error.message);
        res.status(500).json({ error : "Internal server error" });
        // 500 Internal Server Error → Something failed on the server (not client fault)
    }
};

// ========================================================
//  CONTROLLER: getMessages
//  Purpose:
//  - Fetch all messages between the logged-in user and selected chat user
//  - Includes both sent and received messages
// ========================================================
export const getMessages = async(req, res) => {
    try {
        const { id: userToChatId } = req.params;    // ID of the user we are chatting with
        const myId = req.user._id;                 // ID of the logged-in user
        // Fetch messages in both directions (sent and received)
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });
        res.status(200).json(messages);  
        // 200 OK → Messages fetched successfully
    } catch (error) {
        console.log("Error in getMessages controller : ", error.message);
        res.status(500).json({ error : "Internal server error " });
        // 500 Internal Server Error → Unexpected issue while fetching messages
    }
};

// ========================================================
//  CONTROLLER: sendMessages
//  Purpose:
//  - Create a new message (text or image)
//  - Save it to the database
//  - Send it in real-time to receiver using Socket.io
// ========================================================
export const sendMessages = async(req, res) => {
    try {
        const { text, image } = req.body;          // Message content sent by the user
        const { id: receiverId } = req.params;     // ID of the receiver
        const senderId = req.user._id;             // ID of sender (logged-in user)

        let imageUrl;

        // If an image is included, upload to Cloudinary
        if (image) {
            // Add Base64 prefix if missing
            const base64Image = image.startsWith("data:")
                ? image
                : `data:image/png;base64,${image}`;

            const uploadResponse = await cloudinary.uploader.upload(base64Image, {
                resource_type: "image",
            });

            imageUrl = uploadResponse.secure_url;
        }

        // Create a new message entry
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        await newMessage.save();  
        // Saves the message to MongoDB
        // Socket logic to send message in real-time
        const receiverSocketId = getRecieverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
            // Emits "newMessage" event only to that receiver's socket
        }
        res.status(200).json(newMessage);
        // 200 OK → Message sent + saved successfully
    } catch (error) {
        console.log("Error in sendMessage Controller : ", error.message);
        res.status(500).json({ error : "Internal server error" });
        // 500 Internal Server Error → Something failed while sending message
    }
};
