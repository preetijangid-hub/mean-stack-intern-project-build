# Day 27 API
Standalone live Task CRUD API.

Run: `npm install`, copy `.env.example` to `.env`, fill MongoDB Atlas/JWT values, then `npm run dev`.
Routes: POST `/api/auth/register`, POST `/api/auth/login`, GET/POST `/api/tasks`, PUT/DELETE `/api/tasks/:id`. Task routes require `Authorization: Bearer <JWT>`.
