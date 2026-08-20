# Day 23 — MongoDB Integration

## Objective

Replace the in-memory data store with MongoDB persistence across the TaskFlow API.

## Topics Covered

- MongoDB Atlas
- Mongoose
- MongoDB connection
- Environment variables
- Mongoose schemas
- Models
- Controllers
- REST API CRUD
- Persistent data
- Not-found handling
- Database error handling
- ObjectId validation
- async/await

## Project Structure

Day-23(MONGODB-INTEGRATION)/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── task.controller.js
│   └── user.controller.js
│
├── models/
│   ├── task.model.js
│   └── user.model.js
│
├── routes/
│   ├── task.routes.js
│   └── user.routes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js

## API Routes

### Tasks

GET /api/tasks
GET /api/tasks/:id
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id

### Users

GET /api/users
GET /api/users/:id

## MongoDB

The API uses MongoDB Atlas through Mongoose.

The MongoDB connection string is stored in `.env`.

`.env` is excluded from Git using `.gitignore`.

## Run Project

npm install

npm run dev

Server:

http://localhost:5000

## Day 23 Deliverable

The TaskFlow backend now uses MongoDB instead of an in-memory store.

Data persists in MongoDB and the API handles:

- Successful CRUD operations
- Invalid IDs
- Resource not found
- Database errors
- Validation errors

## Status

Day 23 Project Build — Completed