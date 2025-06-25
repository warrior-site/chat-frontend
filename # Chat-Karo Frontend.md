# Chat-Karo Frontend

This is the **React + Vite** frontend for the Chat-Karo application. It connects to the backend for authentication, real-time chat, AI chat, user profile, and personalization features.

---

## 📁 Folder Structure

```
frontend/
│
├── index.html                # Main HTML entry point
├── package.json              # NPM dependencies and scripts
├── vite.config.js            # Vite build config
├── vercel.json               # Vercel deployment config
├── README.md                 # Project documentation
│
├── public/
│   └── sounds/               # Notification sounds for chat
│
└── src/
    ├── App.jsx               # Main React component, handles auth check and routing
    ├── main.jsx              # React entry point, wraps app with providers
    ├── index.css             # Global styles (Tailwind, custom)
    │
    ├── assets/               # Static assets (SVGs, images)
    ├── components/           # UI components (chat, input, spinner, etc.)
    ├── context/              # React context for auth, socket, user
    ├── pages/                # Page-level components (ChatRoom, Dashboard, etc.)
    ├── routes/               # React Router setup
    └── utils/                # Utility functions (personalization, etc.)
```

---

## 🔄 How Frontend & Backend Work Together

### User Authentication & Profile

```
[User] 
   │
   ▼
[Frontend: Login/Signup Page]
   │  (POST /api/auth/signup or /login)
   ▼
[Backend: auth.route.js]
   │  (Validates, creates user, sends verification email)
   ▼
[Frontend: VerifyEmail Page]
   │  (POST /api/auth/verify-email)
   ▼
[Backend: auth.controller.js]
   │  (Verifies code, updates user)
   ▼
[Frontend: Dashboard Page]
   │  (GET/POST /api/user/profile, /api/user/preferences)
   ▼
[Backend: user.route.js, user.controller.js]
```

### Real-Time Chat

```
[User]
   │
   ▼
[Frontend: ChatRoom.jsx]
   │  (Connects via Socket.IO)
   ▼
[Backend: socket.js]
   │  (Handles join, chat-message, reactions)
   ▼
[MongoDB: message.model.js]
   │
   ▼
[All Connected Users]
```

### AI Chat

```
[User]
   │
   ▼
[Frontend: AIChat.jsx]
   │  (POST /api/ai/chat)
   ▼
[Backend: chat.route.js]
   │  (Calls Gemini API, returns AI response)
   ▼
[Frontend: AIChat.jsx]
```

### Personalization

```
[User]
   │
   ▼
[Frontend: Personalization.jsx]
   │  (POST /api/user/preferences)
   ▼
[Backend: user.route.js, user.controller.js]
   │  (Saves theme, font, background, etc.)
   ▼
[Frontend: Applies preferences]
```

---

## 🔗 Key Frontend-Backend Interactions

| Frontend Page/Component      | Backend Route / Socket Event           | Purpose                                  |
|-----------------------------|----------------------------------------|------------------------------------------|
| LoginPage, SignUp           | `/api/auth/login`, `/api/auth/signup`  | User authentication                      |
| VerifyEmail                 | `/api/auth/verify-email`               | Email verification                       |
| Dashboard                   | `/api/user/profile`                    | Profile info, profile picture upload     |
| Personalization             | `/api/user/preferences`                | Theme, font, sound, background settings  |
| ChatRoom                    | `Socket.IO` events, `/api/messages/all`| Real-time chat, fetch chat history       |
| MessageInput, MessageList   | `Socket.IO` events                     | Send/receive messages, emoji reactions   |
| AIChat                      | `/api/ai/chat`                         | AI-powered chat (Gemini API)             |

---

## 🧩 Main Features

- **Authentication**: Signup, login, logout, email verification (with backend).
- **User Profile**: View and update profile, upload profile picture.
- **Personalization**: Choose chat theme, font, text size, sound, background image.
- **Real-Time Chat**: Send/receive messages instantly, emoji reactions, typing indicators.
- **AI Chat**: Chat with Gemini-powered AI assistant.
- **Notifications**: Sound and toast notifications for chat events.

---

## 🚀 How to Run

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the frontend:
   ```sh
   npm run dev
   ```
3. Make sure the backend is running at `http://localhost:5000` (or update API URLs if needed).

---

## 📝 Notes

- All API calls and Socket.IO connections are designed to work with the backend described in [# Chat-Karo Backend](c:/Users/Dell/Desktop/chat-karo/backend/#%20Chat-Karo%20Backend-documentation.md).
- For deployment, update API endpoints to match your backend host.
- For full-stack local development, run both frontend and backend servers.