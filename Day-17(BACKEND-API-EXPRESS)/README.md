Day 17 — Backend API with Express.js

Overview

On Day 17, I learned the fundamentals of backend API development using Node.js and Express.js. I created a RESTful backend API with separate routes for users and tasks and implemented the main HTTP methods used in CRUD operations.

Topics Covered

Node.js backend development

Express.js setup and configuration

Creating an Express server

Middleware

express.json()

Routing and route handlers

REST API architecture

HTTP request and response

JSON data handling

Route parameters

CRUD operations

GET, POST, PUT and DELETE methods

Separating routes into different files

HTTP status codes

Basic error handling

Project Built

Task Management REST API

I built a basic Task Management REST API using Node.js and Express.js.

Project Structure

Day-17(BACKEND-API-EXPRESS)
│
├── node_modules/
├── routes/
│   ├── tasks.js
│   └── users.js
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js

Server Setup

The Express application uses JSON middleware:

const express = require("express");

const app = express();

app.use(express.json());

The server runs on:

http://localhost:3000

API Routes

Users API

GET /api/users
GET /api/users/:id

Tasks API

GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id

Create a Task

{
  "title": "Learn Express"
}

Update a Task

{
  "title": "Learn Express REST API",
  "completed": true
}

REST API Operations

HTTP Method

Purpose

GET

Retrieve data

POST

Create new data

PUT

Update existing data

DELETE

Delete data

Route Organization

The API routes are separated into individual files:

routes/
├── users.js
└── tasks.js

They are connected to the Express application using:

app.use("/api/users", usersRouter);
app.use("/api/tasks", tasksRouter);

Testing

GET requests can be tested in the browser. POST, PUT and DELETE requests can be tested using an API testing tool such as Postman.

How to Run

Install dependencies:

npm install

Start the server:

node server.js

The console displays:

Server running on http://localhost:3000

Day 17 Outcome

Successfully built a basic Express.js REST API with:

Express server

Middleware

Separate routes

Users API

Tasks API

GET, POST, PUT and DELETE APIs

JSON request and response handling

Route parameters

Basic error handling

Status

Day 17 Project Build — Completed