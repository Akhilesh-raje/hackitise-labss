# ⚙️ Hackitise Labs - Backend API

This is the central API service for the Hackitise Labs platform, built with **Express 5** and **TypeScript 6**.

## 🚀 Development

### Scripts
- `npm run dev`: Start the server in watch mode using `tsx`.
- `npm run build`: Build the TypeScript project.
- `npm run start`: Run the compiled server.

## 📡 API Endpoints

### Health Check
- **GET** `/health`
  - Status check for infrastructure monitoring.

### Profile
- **GET** `/api/v1/profile`
  - Returns mock administrative profile data.

### Contact
- **POST** `/api/v1/contact`
  - Receives contact form submissions (currently mocks successful receipt).

## 🛠️ Tech Stack
- **Express 5**: Fast, unopinionated, minimalist web framework.
- **TypeScript 6**: Type-safe development with modern JS features.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing.
- **tsx**: Modern TypeScript runtime and bundler.

## 📂 Folder Structure
- `src/index.ts`: Application entry point and route definitions.
