# EchoHub – Real-Time Chat Application

A full‑stack, real‑time messaging platform built using **React + Vite**, **Node.js**, **Express**, **MongoDB**, **Socket.IO**, **Zustand**, **Cloudinary**, and **Tailwind/DaisyUI**.  
Designed for speed, clean UI, modern animations, and a seamless chat experience.

---

## 🚀 Features

### 🔐 Authentication
- JWT‑based authentication  
- Secure cookies (HttpOnly, SameSite, Secure)  
- Signup & Login  
- Full form validation  
- Password visibility toggle  

### 💬 Real‑Time Messaging
- WebSocket communication using **Socket.IO**  
- Send text messages  
- Send image attachments  
- Real‑time updates without refresh  
- Message read positioning & smooth scroll  
- Message timestamps  

### 📡 Backend Services
- REST APIs using Express  
- MongoDB database using Mongoose  
- Cloudinary image upload for profile pictures & message images  
- Nodemailer email system (OTP‑ready structure)  

### 👤 Profile System
- Upload & update profile photo  
- Auto‑detect border color from profile image  
- Full‑screen avatar viewer with zoom  
- Member info & account status display  

### 🎨 Themes & Personalization
- Over 20+ DaisyUI themes  
- Live theme preview  
- Theme stored in localStorage  
- Fully responsive design  

### 🧭 Sidebar & User Search
- Live list of all users  
- Online/offline indicators  
- "Show online only" filtered mode  

### 🧱 Clean Architecture
- Zustand for global state management  
- Modular folder structure  
- Reusable components  
- Full error handling with toast notifications  

---

## 🧩 Tech Stack

### Frontend
- **React + Vite**
- **Zustand** for state management  
- **TailwindCSS + DaisyUI** for UI  
- **Lucide‑React** icons  
- **React Router** for navigation  
- **React‑Hot‑Toast** for notifications  

### Backend
- **Node.js + Express**
- **JWT Authentication**
- **MongoDB + Mongoose**
- **Socket.IO** (real‑time communication)
- **Cloudinary** for images  
- **Nodemailer** for emails  

---

## 📁 Folder Structure

```
/backend
   ├── src
   │   ├── controllers
   │   ├── middleware
   │   ├── models
   │   ├── routes
   │   ├── lib (DB, Cloudinary, Socket)
   │   └── index.js

/frontend
   ├── src
   │   ├── components
   │   ├── pages
   │   ├── store
   │   ├── lib
   │   └── App.jsx
```

---

## ⚙️ Environment Variables

Create `.env` in **backend**:

```
MONGODB_URI=your_mongo_url
PORT=5001
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourname/echohub.git
cd echohub
```

---

# Backend Setup

### 2️⃣ Install Backend Dependencies
```bash
cd backend
npm install
```

### 3️⃣ Start Backend Server
Development mode (auto‑reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Backend runs at:
```
http://localhost:5001
```

---

# Frontend Setup

### 4️⃣ Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 5️⃣ Start Frontend
```bash
npm run dev
```

App runs at:
```
http://localhost:5173
```

---

## 🧪 API Endpoints Overview

### Auth
| Method | Route | Description |
|--------|--------|-------------|
| POST | /auth/signup | Create new user |
| POST | /auth/login | Login user |
| POST | /auth/logout | Logout user |
| GET | /auth/check | Auto‑login / verify token |
| PUT | /auth/update-profile | Change profile picture |

### Messages
| Method | Route | Description |
|--------|--------|-------------|
| GET | /messages/users | Get all users except self |
| GET | /messages/:id | Get chat history |
| POST | /messages/send/:id | Send message to user |

---

## 🎯 How It Works (High‑Level)

### Authentication Flow
1. User signs in  
2. Backend validates credentials  
3. JWT token generated  
4. Token stored in secure HttpOnly cookies  
5. Frontend auto‑checks auth on app load  

### Real‑Time Chat Flow
1. User logs in → connects to Socket.IO server  
2. Backend maps socket.id → userId  
3. When user sends message:
   - Stored in DB  
   - Sent to receiver in real time via WebSocket  
4. UI updates instantly  

### Image Upload Flow
- User chooses image  
- Frontend converts file → Base64  
- Sends to backend  
- Backend uploads to Cloudinary  
- Cloudinary returns secure URL  
- URL saved in DB and displayed  

---

## 🧪 Local Development Notes

### Common Commands

| Purpose | Command |
|---------|---------|
| Install dependencies | `npm install` |
| Start frontend | `npm run dev` |
| Start backend dev mode | `npm run dev` |
| Start backend prod mode | `npm start` |
| Format code | `npm run format` |
| Restart nodemon | `rs` |

---

## 🧠 Why These Technologies?

### Vite + React  
- Lightning‑fast HMR  
- Minimal setup  
- Perfect for modern SPAs  

### Zustand  
- Simpler than Redux  
- No boilerplate  
- Persistent store  
- Perfect for real‑time apps  

### Socket.IO  
- WebSocket wrapper  
- Auto‑reconnect  
- Event‑based  
- Best for chat applications  

### Cloudinary  
- Optimized CDN  
- Auto‑compression  
- Fast global delivery  

### DaisyUI  
- Minimal theme switching  
- Built on TailwindCSS  

---

## 🖼 Future Enhancements
- Seen/Delivered indicators  
- Message deletion  
- Typing indicators  
- Push notifications  
- Voice/video calls (WebRTC)  

---

## ❤️ Contributing
Feel free to submit issues or open PRs!

---

## 📜 License
MIT License © 2024 EchoHub

