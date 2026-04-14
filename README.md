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
│   │   │   ├── admin/     # Admin layout & sidebar
│   │   │   ├── auth/      # Protected route wrapper
│   │   │   ├── layout/    # Navbar, Footer
│   │   │   ├── sections/  # Home page sections (Hero, Blog, FAQ, etc.)
│   │   │   └── ui/        # Animation utilities, shared UI
│   │   ├── context/       # AuthContext (global auth state)
│   │   ├── hooks/         # useApiData (data fetching with fallback)
│   │   ├── pages/         # Route-level pages
│   │   │   ├── admin/     # Admin Dashboard, Inquiries, Applications, ContentManager
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
├── package.json           # Monorepo root (npm workspaces)
├── vercel.json            # Vercel deployment config
└── render.yaml            # Render.com deployment config
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
Populates MongoDB with initial content (blog posts, jobs, FAQs, testimonials, case studies, and an admin account):
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

## 🔐 Admin Dashboard

Access the admin panel at **`/admin/login`** to manage all site content from a browser.

**Default credentials** (created by the seed script):
- **Email:** `admin@hackitiselabs.in`
- **Password:** `HackitiseAdmin@2026`

### What you can do:
| Feature | Description |
|---------|-------------|
| **Dashboard** | View real-time stats (inquiries count, application count) |
| **Inquiries** | View and manage Contact form submissions |
| **Applications** | Review career applications and download resumes |
| **Content Manager** | Create, edit, publish/unpublish, and delete Blog posts, Job listings, FAQs, Testimonials, and Case Studies |

> ⚠️ **Change the default password** before deploying to production.

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

### Protected (JWT token required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Admin login → returns JWT |
| GET | `/api/v1/auth/me` | Get current admin profile |
| GET | `/api/v1/contact` | List all contact submissions |
| GET | `/api/v1/applications` | List all applications |
| PUT | `/api/v1/{resource}/:id` | Update any content item |
| DELETE | `/api/v1/{resource}/:id` | Delete any content item |

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

## 🚢 Production Deployment

### Build for Production
```bash
npm run build    # Builds both frontend and backend
npm start        # Starts the backend (serves frontend/dist in production mode)
```

### Deployment Platforms
- **Vercel**: Pre-configured via `vercel.json`
- **Render**: Pre-configured via `render.yaml`
- **Any Node.js host**: Set env vars from `.env.example`, run `npm run build && npm start`

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

## 📊 Deployment Test Results

All 13 automated tests passed:

| # | Test | Result |
|---|------|--------|
| 1 | Health Check | ✅ Pass |
| 2 | GET /blog (4 posts) | ✅ Pass |
| 3 | GET /jobs (3 listings) | ✅ Pass |
| 4 | GET /faqs (4 items) | ✅ Pass |
| 5 | GET /testimonials (3 items) | ✅ Pass |
| 6 | GET /case-studies (3 items) | ✅ Pass |
| 7 | Admin Login (JWT) | ✅ Pass |
| 8 | Protected /me endpoint | ✅ Pass |
| 9 | 401 rejection (no token) | ✅ Pass |
| 10 | Contact form submission | ✅ Pass |
| 11 | Application + file upload | ✅ Pass |
| 12 | Admin: list contacts | ✅ Pass |
| 13 | Admin: list applications | ✅ Pass |

---

© 2026 Hackitise Labs. All rights reserved.
