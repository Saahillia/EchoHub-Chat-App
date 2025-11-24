// Load environment variables from .env file (e.g., MONGODB_URI)
import { config } from "dotenv";

// Import database connection helper
import { connectDB } from "../lib/db.js";

// Import User model to insert seed data into the Users collection
import User from "../models/user.model.js";


// Initialize dotenv so we can use process.env values
config();


// ============================================================================
// SEED DATA
// Purpose:
// - These are sample users that will be inserted into the database
// - Used for testing chat UI, sidebar list, and messaging without signup
// - Each user contains: email, fullName, password, profilePic
// ============================================================================

const seedUsers = [
  // ---------------- Female Users ----------------
    {
        email: "emma.thompson@example.com",
        fullName: "Emma Thompson",
        password: "123456",            // NOTE: This is plaintext for seeding only.
        profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        email: "olivia.miller@example.com",
        fullName: "Olivia Miller",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        email: "sophia.davis@example.com",
        fullName: "Sophia Davis",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
        email: "ava.wilson@example.com",
        fullName: "Ava Wilson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        email: "isabella.brown@example.com",
        fullName: "Isabella Brown",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
        email: "mia.johnson@example.com",
        fullName: "Mia Johnson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
        email: "charlotte.williams@example.com",
        fullName: "Charlotte Williams",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
        email: "amelia.garcia@example.com",
        fullName: "Amelia Garcia",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
    },

  // ---------------- Male Users ----------------
    {
        email: "james.anderson@example.com",
        fullName: "James Anderson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        email: "william.clark@example.com",
        fullName: "William Clark",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
        email: "benjamin.taylor@example.com",
        fullName: "Benjamin Taylor",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
        email: "lucas.moore@example.com",
        fullName: "Lucas Moore",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
        email: "henry.jackson@example.com",
        fullName: "Henry Jackson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        email: "alexander.martin@example.com",
        fullName: "Alexander Martin",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
        email: "daniel.rodriguez@example.com",
        fullName: "Daniel Rodriguez",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
    },
];


// ============================================================================
// seedDatabase()
// Purpose:
// - Connect to MongoDB
// - Insert all seed users using insertMany()
// - Helpful for testing frontend without requiring manual signup
// ============================================================================
const seedDatabase = async () => {
    try {
        // Connect to MongoDB using the connection helper
        await connectDB();

        // Insert all the predefined users into the "users" collection
        // insertMany() inserts multiple documents at once
        await User.insertMany(seedUsers);

        console.log("Database seeded successfully");
        // 200 OK equivalent → Operation completed successfully

    } catch (error) {
        console.error("Error seeding database:", error);
        // 500 Internal Server Error → Something went wrong during seeding
    }
};


// Call the function automatically when script runs
seedDatabase();
