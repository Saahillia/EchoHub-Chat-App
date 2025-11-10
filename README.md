
# 🗨️ ECHOHUB – Real-Time MERN Chat Application  

ECHOHUB is a **full-stack real-time chat application** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** with **Socket.io** for instant two-way communication.  
It allows users to register, log in, and chat with others in real-time, including image sharing, authentication, and a modern responsive UI.

---

## 🧩 Table of Contents
1. [✨ Features](#-features)  
2. [🧠 Technologies Used](#-technologies-used)  
3. [⚙️ System Architecture](#️-system-architecture)  
4. [📁 Folder Structure](#-folder-structure)  
5. [🚀 Getting Started (Installation Guide)](#-getting-started-installation-guide)  
6. [⚡ Backend Setup (Node + Express + MongoDB)](#-backend-setup-node--express--mongodb)  
7. [💻 Frontend Setup (React + Zustand + Tailwind)](#-frontend-setup-react--zustand--tailwind)  
8. [🌐 Deployment Guide](#-deployment-guide)  
9. [🔐 Security Practices](#-security-practices)  
10. [🧪 Testing](#-testing)  
11. [🧠 Methodology Used](#-methodology-used)  
12. [🤝 Contributing](#-contributing)  
13. [📜 License](#-license)

---

## ✨ Features

✅ **User Authentication** — Signup, login with JWT and password encryption  
✅ **Real-Time Messaging** — Powered by Socket.io for instant updates  
✅ **Message History** — All messages saved to MongoDB  
✅ **Image Uploads** — Cloudinary integration for media sharing  
✅ **User Online/Offline Status** — Presence tracking  
✅ **Modern UI** — Responsive Tailwind CSS design  
✅ **Notifications** — Real-time message and toast alerts  
✅ **State Management** — Lightweight global store using Zustand  
✅ **REST API** — Clean and modular API design  
✅ **Scalable Architecture** — Follows MVC & environment-based configuration  

---

## 🧠 Technologies Used

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, Zustand, Axios, Tailwind CSS, React Hot Toast |
| **Backend** | Node.js, Express.js, Socket.io, Mongoose |
| **Database** | MongoDB (Atlas) |
| **Cloud Storage** | Cloudinary |
| **Authentication** | JWT, bcrypt |
| **Utilities** | dotenv, nodemailer, multer |
| **Deployment** | Vercel (Frontend), Render/Heroku (Backend) |

---

## ⚙️ System Architecture

**Frontend:** React communicates with backend REST API via Axios and WebSockets.  
**Backend:** Express server handles APIs, authentication, and sockets.  
**Database:** MongoDB stores users, messages, and image URLs.  
**Sockets:** Enable live two-way communication between users.  

```
React (UI)
   ⬇️ Axios / WebSocket
Express API + Socket.io Server
   ⬇️
MongoDB Atlas (Database)
   ⬆️
Cloudinary (Image Hosting)
```

---

## 📁 Folder Structure

```
ECHOHUB MERN's Chat Application/
│
├── backend/
│   ├── src/
│   │   ├── controllers/         # Auth & Message controllers
│   │   ├── models/              # User & Message mongoose models
│   │   ├── routes/              # Auth & Message routes
│   │   ├── middelware/          # JWT authentication middleware
│   │   ├── lib/                 # DB connection, Cloudinary, socket, utils
│   │   ├── utils/               # Helper functions
│   │   ├── index.js             # Entry point
│   │
│   ├── .env                     # Environment variables
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Chat UI components
│   │   ├── store/               # Zustand store
│   │   ├── lib/                 # Utilities (axios, time formatter)
│   │   ├── App.js               # Main app
│   │
│   ├── package.json
│   ├── tailwind.config.js
│
└── README.md
```

---

## 🚀 Getting Started (Installation Guide)

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/echohub-chatapp.git
cd "ECHOHUB MERN's Chat Application"
```

### 2️⃣ Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## ⚡ Backend Setup (Node + Express + MongoDB)

1. Create `.env` file inside `/backend`:
   ```bash
   PORT=5001
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

2. Start Backend Server:
   ```bash
   cd backend
   npm start / npm run dev
   ```
   Your backend should now run on `http://localhost:5001`

---

## 💻 Frontend Setup (React + Zustand + Tailwind)

1. Create `.env` inside `/frontend`:
   ```bash
   VITE_BACKEND_URL=http://localhost:5001
   ```

2. Start Frontend:
   ```bash
   cd frontend
   npm run dev
   ```
   Visit the app at `http://localhost:5173`

---

## 🌐 Deployment Guide

### 🖥 Frontend (Vercel)
1. Push your frontend folder to GitHub.
2. Login to [Vercel](https://vercel.com).
3. Import your repo → select frontend → set environment variable:
   ```
   VITE_BACKEND_URL=https://your-backend-url.onrender.com
   ```
4. Click **Deploy**.

### ⚙️ Backend (Render / Railway / Heroku)
1. Push `/backend` folder to GitHub.
2. Import it on [Render](https://render.com).
3. Add environment variables (same as in `.env`).
4. Deploy & get live API link (e.g., `https://echohub-backend.onrender.com`).

---

## 🔐 Security Practices

- Hashed passwords using **bcrypt**
- JWT authentication middleware for route protection
- Sanitized MongoDB inputs via Mongoose
- `.env` file for sensitive configuration
- HTTPS (recommended) for deployment

---

## 🧪 Testing

- **Unit Testing:** Jest or Mocha (optional setup)
- **Manual Testing:** Postman for REST API  
- **Frontend Testing:** Check UI, message flow, and socket events in browser

---

## 🧠 Methodology Used

- **MERN Stack Development Approach**
- **MVC (Model–View–Controller)** architecture
- **RESTful API** design
- **Socket-based event-driven architecture**
- **Agile workflow** — iterative build & test

---

## 🤝 Contributing

1. Fork the repo  
2. Create your branch (`git checkout -b feature-name`)  
3. Commit your changes (`git commit -m "Added new feature"`)  
4. Push and open a pull request  

---

## 📜 License
This project is licensed under the **MIT License**.  
You are free to modify and distribute it with proper attribution.

---

## 👨‍💻 Developed by
**Saahil lia**  
4TH Year B.Tech CSE | M S Ramaiah University of Applied Sciences_____
📧 saahilklia22@gmail.com____
💼 [GitHub](https://github.com/saahililia) | [Portfolio](https://saahillia-portfolio.netlify.app)

---
