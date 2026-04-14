# ⚙️ Hackitise Labs — Backend API

RESTful API service powering the Hackitise Labs platform. Built with **Express 5**, **TypeScript**, and **MongoDB**.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot-reload (`tsx watch`) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled production server |
| `npm run seed` | Populate MongoDB with initial site content |
| `npm test` | Run test suite (Vitest) |

## Folder Structure

```
src/
├── config/
│   ├── db.ts          # MongoDB connection handler
│   └── env.ts         # Centralized environment config
├── middleware/
│   ├── auth.ts        # JWT authentication & route protection
│   └── upload.ts      # Multer file upload config
├── models/
│   ├── Admin.ts       # Admin user schema (bcrypt password hashing)
│   ├── Application.ts # Career application schema
│   ├── BlogPost.ts    # Blog post schema
│   ├── CaseStudy.ts   # Case study schema
│   ├── Contact.ts     # Contact inquiry schema
│   ├── FAQ.ts         # FAQ schema
│   ├── JobListing.ts  # Job listing schema
│   └── Testimonial.ts # Testimonial schema
├── routes/
│   ├── auth.ts        # Login, /me endpoints
│   ├── applications.ts
│   ├── blog.ts
│   ├── caseStudies.ts
│   ├── contact.ts
│   ├── faqs.ts
│   ├── jobs.ts
│   └── testimonials.ts
├── scripts/
│   └── seed.ts        # Database seeder (migrates hardcoded content)
├── utils/
│   └── mailer.ts      # Nodemailer email utility
└── index.ts           # Express app entry point
```

## Security

- **Authentication**: JWT tokens with configurable expiry
- **Password Hashing**: bcrypt with automatic salting
- **Headers**: Helmet middleware
- **Rate Limiting**: express-rate-limit on all endpoints
- **CORS**: Configurable origin whitelist
- **File Uploads**: Filtered by MIME type, stored in `uploads/`
