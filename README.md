# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# API Usage in Chat-Karo Frontend

This document lists all places in the frontend where API requests are sent to the backend, including the HTTP method, endpoint, and the file/component responsible.

---

## 1. **Authentication & User Context**

**File:** `src/context/authContext.jsx`  
**Library:** `axios`  
**Endpoints:**
- `POST /api/auth/signup` – User registration
- `POST /api/auth/verify-email` – Email verification
- `POST /api/auth/login` – User login
- `POST /api/auth/logout` – User logout
- `GET /api/auth/check-auth` – Check authentication status

---

## 2. **AI Chat**

**File:** `src/components/AiChat.jsx`  
**Library:** `axios`  
**Endpoint:**
- `POST /api/ai/chat` – Send prompt to Gemini AI and receive response

---

## 3. **Personalization**

**File:** `src/pages/Personalization.jsx`  
**Library:** `axios`  
**Endpoint:**
- `POST /api/user/preferences` – Save user preferences (theme, font, sound, background, etc.)

---

## 4. **User Profile (Dashboard)**

**File:** `src/pages/Dashboard.jsx`  
**Library:** `fetch`  
**Endpoint:**
- `POST /api/user/profile` – Update user profile (profile picture, language, etc.)

---

## 5. **Chat Messages (History)**

**File:** `src/pages/ChatRoom.jsx`  
**Library:** `fetch`  
**Endpoint:**
- `GET /api/messages/all` – Fetch all chat messages

---

## 6. **Real-Time Chat (Socket.IO)**

**File:** `src/context/SocketContext.jsx`, `src/pages/ChatRoom.jsx`, `src/components/MessageInput.jsx`, `src/components/MessageList.jsx`  
**Library:** `socket.io-client`  
**Events:**
- Connects to backend via Socket.IO (`http://localhost:5000`)
- Emits/receives events: `join`, `chat-message`, `typing`, `stop-typing`, `message-reaction`, etc.

---

## Notes

- All API URLs default to `http://localhost:5000` for local development.
- For deployment, update URLs to match your backend host.
- Some endpoints (like `/api/messages/all`) may use a different base URL if changed for production.

---
```// filepath: c:\Users\Dell\Desktop\chat-karo\frontend\api.md
# API Usage in Chat-Karo Frontend

This document lists all places in the frontend where API requests are sent to the backend, including the HTTP method, endpoint, and the file/component responsible.

---

## 1. **Authentication & User Context**

**File:** `src/context/authContext.jsx`  
**Library:** `axios`  
**Endpoints:**
- `POST /api/auth/signup` – User registration
- `POST /api/auth/verify-email` – Email verification
- `POST /api/auth/login` – User login
- `POST /api/auth/logout` – User logout
- `GET /api/auth/check-auth` – Check authentication status

---

## 2. **AI Chat**

**File:** `src/components/AiChat.jsx`  
**Library:** `axios`  
**Endpoint:**
- `POST /api/ai/chat` – Send prompt to Gemini AI and receive response

---

## 3. **Personalization**

**File:** `src/pages/Personalization.jsx`  
**Library:** `axios`  
**Endpoint:**
- `POST /api/user/preferences` – Save user preferences (theme, font, sound, background, etc.)

---

## 4. **User Profile (Dashboard)**

**File:** `src/pages/Dashboard.jsx`  
**Library:** `fetch`  
**Endpoint:**
- `POST /api/user/profile` – Update user profile (profile picture, language, etc.)

---

## 5. **Chat Messages (History)**

**File:** `src/pages/ChatRoom.jsx`  
**Library:** `fetch`  
**Endpoint:**
- `GET /api/messages/all` – Fetch all chat messages

---

## 6. **Real-Time Chat (Socket.IO)**

**File:** `src/context/SocketContext.jsx`, `src/pages/ChatRoom.jsx`, `src/components/MessageInput.jsx`, `src/components/MessageList.jsx`  
**Library:** `socket.io-client`  
**Events:**
- Connects to backend via Socket.IO (`http://localhost:5000`)
- Emits/receives events: `join`, `chat-message`, `typing`, `stop-typing`, `message-reaction`, etc.

---

## Notes

- All API URLs default to `http://localhost:5000` for local development.
- For deployment, update URLs to match your backend host.
- Some