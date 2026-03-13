# Grievance Redressal System

A full-stack grievance management system with:
- **React frontend** (citizen + officer dashboards)
- **Node/Express backend** with user auth + grievance CRUD
- **MongoDB** persistence
- **AI-powered grievance analysis** via a local BERT sentiment service

---

## 🚀 Quick Start (recommended)

### 1) Setup the backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the following (example):

```env
MONGO_URI=mongodb://localhost:27017/grievance
JWT_SECRET=your_jwt_secret_here
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
CLIENT_URL=http://localhost:3000
PORT=5000
```

> **Note:** `EMAIL_USER` and `EMAIL_PASS` are only required if you want password-reset emails to work.

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`.

---

### 2) Setup the frontend

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`.

---

### 3) Setup the AI sentiment service (optional but recommended)

This service is used by the backend to analyze grievance descriptions and infer sentiment/priority.

```bash
cd ml_service
python -m venv .venv
# Windows
.\.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
python bert.py
```

By default it listens on `http://127.0.0.1:5000`.

---

## 📦 Project Structure

- `backend/` — Express API, auth, grievance routes, MongoDB models
- `frontend/` — React UI (citizen + officer dashboards)
- `ml_service/` — Flask microservice using `transformers` (BERT) for sentiment analysis

---

## 🧠 Environment Variables

| Name | Required | Description |
|------|----------|-------------|
| `MONGO_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret used to sign auth tokens |
| `EMAIL_USER` | ❌ | SMTP user for password reset emails |
| `EMAIL_PASS` | ❌ | SMTP password for password reset emails |
| `CLIENT_URL` | ❌ | URL of frontend (default: `http://localhost:3000`) |
| `PORT` | ❌ | Backend port (default: `5000`) |

---

## ✅ Notes

- The `uploads/` folder is created automatically by the backend and is used to store grievance attachments.
- Do **not** commit Python virtual environments (`ml_service/venv`) — they are ignored by `.gitignore`.
- If you skip running the AI service, the system will still work; it will just skip the BERT sentiment analysis.

---

## 💡 Optional Improvements

- Add Docker support (Docker Compose for backend + frontend + MongoDB)
- Add proper user roles and access control on the frontend
- Add tests (unit + integration)

---

If you want help adding CI, deployment, or a more robust AI pipeline, just say so! 😊
