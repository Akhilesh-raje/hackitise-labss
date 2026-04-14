# 🛡️ Hackitise Labs — Full-Stack Cybersecurity Platform

[![Project](https://img.shields.io/badge/Project-Hackitise_Labs-00ff00?style=for-the-badge&logo=shield-halflife&logoColor=white)](https://hackitise.com)
[![Stack](https://img.shields.io/badge/Stack-React_|_Express_|_MongoDB-blue?style=for-the-badge)](https://github.com/Akhilesh-raje/hackitise-labss)

The official website and management platform for **Hackitise Labs** — a cybersecurity firm providing training, consulting, and research services. This is a production-ready monorepo containing a premium React frontend and a secure Express/TypeScript API backend.

---

## 🏗️ Project Structure

```
hackitise-labs/
├── frontend/              # React 19 + Vite (Client Application)
│   ├── src/
│   │   ├── assets/        # Images, logos, team photos
│   │   ├── components/    # Reusable UI & section components
│   │   │   ├── layout/    # Navbar, Footer
│   │   │   ├── sections/  # Home page sections (Hero, Blog, FAQ, etc.)
│   │   │   └── ui/        # Animation utilities, shared UI
│   │   ├── hooks/         # useApiData (data fetching with fallback)
│   │   ├── pages/         # Route-level pages
│   │   │   ├── About.jsx
│   │   │   ├── Careers.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Services.jsx
│   │   └── utils/         # API client (api.js)
│   └── dist/              # Production build output (gitignored)
│
├── backend/               # Express 5 + TypeScript (API Server)
│   ├── src/
│   │   ├── config/        # Environment vars (env.ts), DB connection (db.ts)
│   │   ├── middleware/     # JWT auth (auth.ts), file upload (upload.ts)
│   │   ├── models/        # Mongoose schemas (8 models)
│   │   ├── routes/        # RESTful API routes
│   │   ├── scripts/       # Database seeder (seed.ts)
│   │   ├── utils/         # Email utility (mailer.ts)
│   │   └── index.ts       # Server entry point
│   ├── uploads/           # Resume uploads (gitignored, auto-created)
│   └── dist/              # Compiled JS output (gitignored)
│
├── .env.example           # Environment variable template
└── package.json           # Monorepo root (npm workspaces)
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 18
- **MongoDB** (local install or free [Atlas](https://cloud.mongodb.com) cluster)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example backend/.env
```
Edit `backend/.env` and set:
- `MONGODB_URI` — your MongoDB connection string
- `JWT_SECRET` — a strong random secret
- `SMTP_USER` / `SMTP_PASS` — (optional) Gmail credentials for email notifications

### 3. Seed the Database
Populates MongoDB with initial content (blog posts, jobs, FAQs, testimonials, case studies):
```bash
cd backend && npm run seed
```

### 4. Run Development Server
From the root directory:
```bash
npm run dev
```
| Service   | URL                        |
|-----------|----------------------------|
| Frontend  | http://localhost:5173       |
| Backend   | http://localhost:4000       |
| API Base  | http://localhost:4000/api/v1|
| Health    | http://localhost:4000/health|

---

## 📡 API Endpoints

### Public (no auth required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/blog` | List published blog posts |
| GET | `/api/v1/jobs` | List active job listings |
| GET | `/api/v1/faqs` | List published FAQs |
| GET | `/api/v1/testimonials` | List published testimonials |
| GET | `/api/v1/case-studies` | List published case studies |
| POST | `/api/v1/contact` | Submit a contact inquiry |
| POST | `/api/v1/applications` | Submit a job application (multipart/form-data) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite, Tailwind CSS 4, Framer Motion 12 |
| **Backend** | Express 5, TypeScript, Mongoose ODM |
| **Database** | MongoDB |
| **Auth** | JWT + bcrypt |
| **Security** | Helmet, CORS, express-rate-limit |
| **File Uploads** | Multer |
| **Email** | Nodemailer (SMTP) |

---

## 🚢 Production Build

```bash
npm run build    # Builds both frontend and backend
npm start        # Starts the backend (serves frontend/dist in production mode)
```

### Required Environment Variables
| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret key for JWT signing |
| `PORT` | No | Server port (default: 4000) |
| `NODE_ENV` | No | `production` or `development` |
| `SMTP_USER` | No | Gmail address for notifications |
| `SMTP_PASS` | No | Gmail app password |

---

## 📊 Test Results

All 13 automated API tests passed:

| # | Test | Result |
|---|------|--------|
| 1 | Health Check | ✅ |
| 2 | GET /blog (4 posts) | ✅ |
| 3 | GET /jobs (3 listings) | ✅ |
| 4 | GET /faqs (4 items) | ✅ |
| 5 | GET /testimonials (3 items) | ✅ |
| 6 | GET /case-studies (3 items) | ✅ |
| 7 | Admin Login (JWT) | ✅ |
| 8 | Protected /me endpoint | ✅ |
| 9 | 401 rejection (no token) | ✅ |
| 10 | Contact form submission | ✅ |
| 11 | Application + file upload | ✅ |
| 12 | Admin: list contacts | ✅ |
| 13 | Admin: list applications | ✅ |

---

© 2026 Hackitise Labs. All rights reserved.
