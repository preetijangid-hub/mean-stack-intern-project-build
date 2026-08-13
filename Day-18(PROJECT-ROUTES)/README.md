# Day 18 — Project Routes & Controllers

## Overview

This project implements a **Projects REST API** using Node.js and Express.js.

The main focus is separating API **routes** from **controllers** and maintaining consistent response shapes.

## Topics Covered

* Express.js routing
* REST API design
* Routes and controllers
* CRUD operations
* HTTP methods
* HTTP status codes
* Route parameters
* JSON request and response handling
* Consistent API response structure

## Project Structure

```text
Day-18(PROJECT-ROUTES)/
├── controllers/
│   └── projectsController.js
├── routes/
│   └── projects.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## API Endpoints

| Method | Endpoint            | Purpose          |
| ------ | ------------------- | ---------------- |
| GET    | `/api/projects`     | Get all projects |
| GET    | `/api/projects/:id` | Get one project  |
| POST   | `/api/projects`     | Create project   |
| PUT    | `/api/projects/:id` | Update project   |
| DELETE | `/api/projects/:id` | Delete project   |

## Response Shape

Successful responses use:

```json
{
  "success": true,
  "data": {}
}
```

Error responses use:

```json
{
  "success": false,
  "message": "Project not found"
}
```

This keeps the API responses consistent.

## Running the Project

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

Server:

```text
http://localhost:3000
```

## Example POST Request

```json
{
  "name": "E-Commerce Application",
  "description": "An online shopping project",
  "status": "active"
}
```

## Key Learning

The project demonstrates how to keep Express applications organized by moving business/request-handling logic into **controllers** while keeping URL definitions inside **routes**.

### Day 18 Highlight

**Projects API + Route/Controller Separation + CRUD + Consistent Response Shapes**
