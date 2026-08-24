# Day 25 - API Deployment

## Overview

This project focuses on deploying an Express.js REST API to Render with MongoDB Atlas as the cloud database.

The API includes:

- User registration
- User login
- JWT authentication
- Protected task routes
- MongoDB integration using Mongoose
- Automated API tests using Jest and Supertest
- Deployment on Render
- MongoDB Atlas cloud database

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Jest
- Supertest
- Render

---

## Project Structure

```text
Day-25(API-DEPLOYMENT)
└── api
    ├── app.js
    ├── server.js
    ├── package.json
    ├── package-lock.json
    ├── .env.example
    ├── .gitignore
    ├── README.md
    │
    ├── config
    │   └── db.js
    │
    ├── controllers
    │   ├── auth.controller.js
    │   └── task.controller.js
    │
    ├── middleware
    │   └── auth.middleware.js
    │
    ├── models
    │   ├── Task.js
    │   └── User.js
    │
    ├── routes
    │   ├── auth.routes.js
    │   └── task.routes.js
    │
    └── tests
        ├── auth.test.js
        └── task.test.js