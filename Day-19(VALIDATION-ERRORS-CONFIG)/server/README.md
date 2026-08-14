# Day 19 – Validated & Safe API

## Overview

Day 19 Project Build focuses on improving an Express.js backend by adding input validation, centralized error handling, CORS, and environment-based configuration.

The goal is to create a **validated, safe, and maintainable API** using a layered backend structure.

## Project Objective

Build an Express.js User API with:

* Input validation using `express-validator`
* Centralized error-handling middleware
* 404 route handling
* CORS configuration
* Environment configuration using `dotenv`
* Controller-based API logic
* Consistent JSON responses

## Project Structure

```text
Day-19(VALIDATION-ERRORS-CONFIG)
└── server
    ├── config
    │   └── env.js
    ├── controllers
    │   └── userController.js
    ├── middleware
    │   ├── errorHandler.js
    │   └── notFound.js
    ├── routes
    │   └── userRoutes.js
    ├── validators
    │   └── userValidator.js
    ├── .env
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    └── server.js
```

## Technologies Used

* Node.js
* Express.js
* express-validator
* dotenv
* CORS
* Nodemon
* Thunder Client

## Architecture

The project follows a simple layered architecture:

```text
Client
   ↓
CORS
   ↓
Express JSON Middleware
   ↓
Routes
   ↓
Validation
   ↓
Controller
   ↓
Response
```

Errors follow:

```text
Error
  ↓
next(error)
  ↓
Central Error Handler
  ↓
Consistent JSON Response
```

## Installation

Initialize the project:

```bash
npm init -y
```

Install dependencies:

```bash
npm install express express-validator cors dotenv
```

Install Nodemon:

```bash
npm install --save-dev nodemon
```

## Environment Configuration

`.env`:

```env
PORT=5000
NODE_ENV=development
```

Environment configuration is loaded through:

```text
config/env.js
```

The `.env` file is excluded from version control.

## API Endpoints

### 1. Health Check

```http
GET /
```

Example response:

```json
{
  "success": true,
  "message": "Day 19 Validated API is running",
  "environment": "development"
}
```

### 2. Create User

```http
POST /api/users
```

Request body:

```json
{
  "name": "Preeti",
  "email": "preeti@example.com",
  "age": 22
}
```

Successful response:

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 123456789,
    "name": "Preeti",
    "email": "preeti@example.com",
    "age": 22
  }
}
```

## Input Validation

The API validates the following fields.

### Name

* Required
* Minimum 3 characters
* Maximum 50 characters

### Email

* Required
* Must be a valid email address
* Normalized using `normalizeEmail()`

### Age

* Required
* Must be an integer
* Minimum 18
* Maximum 100

Example invalid request:

```json
{
  "name": "P",
  "email": "invalid-email",
  "age": 15
}
```

The API returns:

```text
400 Bad Request
```

with validation details.

## Centralized Error Handling

The project uses:

```text
middleware/errorHandler.js
```

Instead of handling errors separately in every route, errors are forwarded to one central middleware.

Example:

```javascript
next(error);
```

Consistent error response:

```json
{
  "success": false,
  "error": {
    "message": "Input validation failed",
    "statusCode": 400,
    "details": []
  }
}
```

## 404 Handling

Unknown routes are handled through:

```text
middleware/notFound.js
```

Example:

```http
GET /api/unknown
```

Response:

```json
{
  "success": false,
  "error": {
    "message": "Route not found: /api/unknown",
    "statusCode": 404,
    "details": []
  }
}
```

## CORS Configuration

CORS is enabled globally:

```javascript
app.use(cors());
```

This prepares the backend to communicate with frontend applications hosted on different origins.

## Controller Layer

User creation logic is separated into:

```text
controllers/userController.js
```

This keeps route definitions clean and makes the application easier to maintain.

## Validation Layer

Validation is separated into:

```text
validators/userValidator.js
```

This ensures that invalid requests are rejected before reaching the controller.

## Running the Project

Development mode:

```bash
npm run dev
```

Normal start:

```bash
npm start
```

Server:

```text
http://localhost:5000
```

## Testing

The API was tested using Thunder Client.

### Tested Cases

* Health check
* Valid user creation
* Invalid name
* Invalid email
* Invalid age
* Missing fields
* Unknown routes
* Centralized error responses
* Environment configuration

## Deliverable

**Validated, safe API ✅**

The project successfully implements:

* Request validation
* Centralized error handling
* CORS
* dotenv configuration
* 404 handling
* Layered Express architecture
* Consistent JSON API responses

## Learning Outcome

After completing this project, the following backend concepts were strengthened:

* Express middleware architecture
* Request validation
* Error propagation
* Centralized error handling
* Environment configuration
* CORS
* Controller and route separation
* Building safer APIs
* API testing

## Status

**Day 19 Project Build – Completed ✅**
