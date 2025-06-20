# 🚀 Hirebuddy – AI-Powered Resume Job Matcher

Hirebuddy is a full-stack job board that matches resumes to jobs using keyword analysis. Upload a resume or search for roles — the app fetches relevant job listings in real-time.

---

## 🌐 Live Demo

- Frontend: [https://hirebuddy.vercel.app](https://hirebuddy.vercel.app)
- Backend API: [https://hirebuddy-backend.onrender.com](https://hirebuddy-backend.onrender.com)

---

## 📁 Project Structure

```
hirebuddy/
├── backend/          # Express backend (Node.js + MongoDB)
│   ├── index.js
│   ├── routes/
│   ├── models/
│   ├── seedJobs.js
│   └── .env
├── frontend/         # React frontend (Vite + CSS Modules)
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   ├── styles/
│   └── .env
```

---

## 🧠 Features

- ✅ Resume Upload via drag & drop
- ✅ Resume parsed and matched to job listings using keyword scoring
- ✅ Search bar with dynamic keyword tracking
- ✅ Clean modern UI
- ✅ Responsive & mobile-friendly
- ✅ Keywords stored and ranked by frequency
- ✅ Easy deployment on Render + Vercel

---

## ⚙️ Tech Stack

- **Frontend**: React, TypeScript, Vite, CSS Modules
- **Backend**: Node.js, Express
- **Database**: MongoDB (or Firestore/Supabase if replaced)
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 🔧 Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/hirebuddy.git
cd hirebuddy
```

### 2. Set up Backend

```bash
cd backend
npm install
```

**`.env` file:**
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hirebuddy?retryWrites=true&w=majority
```

**Seed Database (optional)**

```bash
node seedJobs.js
```

**Run Backend**
```bash
npm start
```

### 3. Set up Frontend

```bash
cd frontend
npm install
```

**`.env` file:**
```env
VITE_API_BASE_URL=https://hirebuddy-backend.onrender.com
```

**Run Frontend**
```bash
npm run dev
```

---

## 🚀 Deployment Guide

### Backend (Render)

- Go to [Render](https://render.com/)
- Create a new Web Service
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Add Environment Variable: `MONGODB_URI`
- Click Deploy

### Frontend (Vercel)

- Go to [Vercel](https://vercel.com/)
- Import project → Set root directory to `frontend`
- Add Environment Variable:  
  `VITE_API_BASE_URL=https://<render-backend-url>.onrender.com`
- Click Deploy

---

## 📌 Known Issues

- MongoDB Atlas connectivity can be flaky on free tier — Firestore is a drop-in alternative.
- Resume parsing currently uses basic keyword detection (no AI embedding or GPT).

---

## 📬 Contact

Made by [Your Name](https://github.com/yourusername)

> Contributions, feedback, or job offers welcome 😉
