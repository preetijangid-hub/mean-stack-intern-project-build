🚀 MEAN Stack Internship — TaskFlow Project Build

📌 Repository Overview

This repository contains the continuous TaskFlow Project Build developed during the MEAN Stack internship.

Important: This repository is separate from the Hands-on Exercises repository.Project Build is one continuous TaskFlow application, while Hands-on Exercises contains individual daily learning tasks.

📅 Week 1 — Project Foundation

Day 1 — TaskFlow Documentation

Topics

Project requirements documentation

TaskFlow application overview

Feature identification

User flows

Project scope

Initial application planning

Deliverable

Created the initial TaskFlow project documentation and defined the major application requirements.

Main Features Planned

Task management

Task creation

Task editing

Task deletion

Task status

Task workflow

Board structure

Day 2 — TaskFlow Design

Topics

UI/UX planning

Wireframes

Board layout

Task card design

Navigation planning

User interaction flow

Deliverable

Created UI sketches and design notes for the TaskFlow application.

Planned UI Areas

Dashboard

Task board

Task cards

Task forms

Navigation

Status and filter controls

Day 3 — TaskFlow Data

Topics

Application data structure

Task model

JSON data

Task fields

Data relationships

Mock-data planning

Task Data

Task ID

Title

Description

Status

Priority

Assignee

Due date

Deliverable

Prepared the initial TaskFlow data structure and sample data for application development.

Day 4 — TaskFlow Setup

Topics

Project setup

Repository structure

Development environment

Git configuration

Initial application setup

Deliverable

Created the initial project-build structure and prepared the project for implementation.

Day 5 — TaskFlow Node

Topics

Node.js setup

npm

Node modules

JSON data handling

Local backend/mock-data preparation

npm scripts

Deliverable

Prepared the Node.js side of the TaskFlow project for backend-related development and data handling.

📅 Week 2 — Angular Project Development

Day 6 — Angular Dashboard Project

Topics

Angular application setup

Angular components

Templates

Styling

Signals

Basic state management

Deliverable

Built the initial Angular dashboard for the TaskFlow application.

Dashboard Areas

Task summary

Task status information

Dashboard cards

Application layout

Day 7 — TaskList Project

Topics

Angular component structure

Task list

Task cards

Filtering

Task status display

Reusable UI components

Deliverable

Built the TaskList portion of the TaskFlow application.

Features

Task list rendering

Task card component

Task status

Task filtering

Task-board layout

Day 8 — Component Communication

Topics

Component communication

Parent/child interaction

Shared state

Angular services

Dependency Injection

Signals

Deliverable

Implemented component communication and shared state for the TaskFlow application.

Structure

Parent Component
       |
       v
 Shared Service
       |
       v
Child Components

Day 8 — TaskFlow Service Project

Topics

TaskService

Shared task state

CRUD operations

Angular service

Dependency Injection

Signal-based state

Deliverable

Implemented the main TaskService used by the TaskFlow application.

Features

Add task

Edit task

Delete task

Read/display tasks

Shared task state

Component synchronization

Important: Project Build Day 8 focuses on TaskFlow TaskService + task state.Hands-on Day 8 focuses on Component Communication + Shared Service.These are separate learning tracks.

Day 9 — Routing Project

Topics

Angular Router

Routes

routerLink

Route parameters

Query parameters

Navigation

Wildcard routes

Deliverable

Added routing and navigation to the TaskFlow application.

Main Routes

/login
/board
/task/:id

Features

Login navigation

Board navigation

Task detail navigation

Route parameters

Query parameters

Unknown-route handling

📅 Week 3 — Angular Advanced Features

Day 10 — TaskFlow Forms & Validation

Topics

Angular Reactive Forms

FormBuilder

Form controls

Validators

Validation messages

Form state

User input handling

Deliverable

Added structured forms and validation to the TaskFlow application.

Form Areas

Task title

Task description

Priority

Status

Assignee

Due date

Validation

Implemented validation for required fields and invalid user input.

Day 11 — TaskFlow HTTP / REST Integration

Topics

Angular HttpClient

REST API communication

GET

POST

PUT

DELETE

Observables

Typed responses

Loading and error handling

Deliverable

Connected the Angular application to backend/API-style data operations.

Data Flow

Angular Component
       |
       v
    Service
       |
       v
   HttpClient
       |
       v
    REST API
       |
       v
    Response
       |
       v
      UI

Operations

GET tasks

POST new task

PUT/update task

DELETE task

Day 12 — RxJS / Search & Reactive Data Flow

Topics

RxJS Observables

Reactive data flow

Search/filtering

debounceTime

switchMap

Combining reactive streams

Error handling

Deliverable

Improved TaskFlow's reactive data handling and search/filter workflow.

Search Flow

User Input
    |
    v
debounceTime
    |
    v
switchMap
    |
    v
API / Data Source
    |
    v
Latest Results
    |
    v
TaskFlow UI

Day 13 — Custom Pipe & Directive

Topics

Angular pipes

Custom pipes

Attribute directives

HostListener

UI transformation

Deliverable

Added reusable display transformations and UI behavior to the TaskFlow application.

Custom Pipe — timeAgo

Converts dates into readable text.

2026-08-11T10:00:00
        ↓
   2 hours ago

Custom Directive

Implemented a highlight-on-hover style directive using HostListener.

The directive changes the visual appearance of an element when the user moves the mouse over it.

📅 Week 4 — Authentication, UI & Backend

Day 14 — Authentication Guard

Topics

Angular route guards

Authentication flow

Protected routes

Unauthorized navigation

Authentication state

Deliverable

Added authentication protection to TaskFlow routes.

Protected Route

/board

Authentication Flow

User
 |
 v
Protected Route
 |
 v
Auth Guard
 |
 +---- Authenticated ------> Allow
 |
 +---- Not Authenticated --> Login

Day 15 — Angular Material + Review

Topics

Angular Material

Toolbar

Cards

Form fields

Buttons

Inputs

Tables

Theming

Responsive design

Accessibility basics

Deliverable

Restyled the TaskFlow application using Angular Material components.

Material Components

Toolbar

Cards

Form fields

Buttons

Inputs

Table-related UI

Improvements

Improved board layout

Responsive design

Consistent visual styling

Better spacing

Improved user experience

Basic accessibility improvements

🖥️ Phase 3 — Backend API (Express)

Day 16 — Backend API (Express)

Objective

Day 16 starts the backend API development for the TaskFlow application.

Topics

Express server setup

Backend project structure

Health/API route

Nodemon

npm scripts

Request logging middleware

REST API foundation

Project Structure

Day-16(BACKEND-API-EXPRESS)/
│
└── server/
    ├── server.js
    ├── package.json
    ├── package-lock.json
    └── node_modules/

node_modules is generated locally by npm and should normally be excluded from Git.

Dependencies

Production dependency

express

Development dependency

nodemon

Express Server

The backend server is implemented in server.js.

The server runs on:

http://localhost:3000

API Response

The backend returns a JSON response confirming that the Day 16 backend is running.

{
  "message": "Day 16 Backend API is running"
}

Request Logging

Request logging middleware records incoming HTTP requests in the terminal.

Example:

GET /health - 11ms

Nodemon

Nodemon watches backend files and automatically restarts the Express server whenever source files are changed.

npm Scripts

The backend uses npm scripts for development and production-style execution.

{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}

Run Day 16

Go to the server folder:

cd "Day-16(BACKEND-API-EXPRESS)\server"

Install dependencies:

npm install

Run in development mode:

npm run dev

Run normally:

npm start

Open:

http://localhost:3000

Day 16 Deliverable

Express Server
      |
      v
Nodemon Development Setup
      |
      v
Request Logger
      |
      v
Health / API Route
      |
      v
JSON Response
      |
      v
Backend Foundation Ready

📂 Current Project Build Structure

project-build/
│
├── Day-01(TASKFLOW-DOCUMENTATION)/
├── Day-02(TASKFLOW-DESIGN)/
├── Day-03(TASKFLOW-DATA)/
├── Day-04(TASKFLOW-SETUP)/
├── Day-05(TASKFLOW-NODE)/
├── Day-06(ANGULAR-DASHBOARD-PROJECT)/
├── Day-07(TASKLIST-PROJECT)/
├── Day-08(COMPONENT-COMMUNICATION)/
├── Day-08(TASKFLOW-SERVICE-PROJECT)/
├── Day-09(ROUTING-PROJECT)/
├── Day-13(CUSTOM-PIPE-DIRECTIVE)/
├── Day-14(AUTH-GUARD)/
├── Day-15(ANGULAR-MATERIAL-REVIEW)/
├── Day-16(BACKEND-API-EXPRESS)/
│   └── server/
│       ├── server.js
│       ├── package.json
│       └── package-lock.json
│
└── README.md

▶️ Running the Projects

Angular Projects

Go to the required Angular project:

cd <project-folder>
npm install
ng serve

Open:

http://localhost:4200

If Angular CLI is not installed globally:

npx ng serve

Node.js Projects

Run a JavaScript/Node script:

node script.js

or:

node app.js

For an npm project:

npm install
npm run <script-name>

Express Backend — Day 16

cd "Day-16(BACKEND-API-EXPRESS)\server"
npm install
npm run dev

Server:

http://localhost:3000

🔀 GitHub Workflow

The Project Build work is maintained on the:

project-build

branch.

Check Current Branch

git branch --show-current

Check Git Status

git status

Stage Changes

git add .

Commit Changes

git commit -m "Day 16 Project Build: Express Backend API"

Push Changes

git push origin project-build

📈 Project Build Learning Progress

By Day 16, the TaskFlow Project Build has progressed through the following areas.

Foundation

Project documentation

UI/UX design

Data modeling

Project setup

Node.js foundation

Angular

Angular dashboard

Components

Task list

Component communication

Services

Dependency Injection

Shared state

Routing

Reactive Forms

Validation

HttpClient

REST API integration

RxJS

Custom pipes

Directives

Authentication guards

Angular Material

Responsive UI

Accessibility basics

Backend

Node.js backend foundation

Express server

API route

Health check

Nodemon

npm scripts

Request logging

🏗️ TaskFlow Architecture

The application is progressing toward a full-stack MEAN architecture.

                  TaskFlow Application
                         |
             +-----------+-----------+
             |                       |
             v                       v
         Angular UI             Express API
             |                       |
             v                       v
      Angular Services          Backend Routes
             |                       |
             +-----------+-----------+
                         |
                         v
                      Database
                    (Future Phase)

🔄 Project Build vs Hands-on Exercises

These two tracks must remain separate.

Project Build

The Project Build is the continuous TaskFlow application.

It combines features across multiple days into one application.

Examples:

TaskService

Add task

Edit task

Delete task

Shared task state

Routing

Authentication

Angular Material

Express backend

Hands-on Exercises

Hands-on Exercises are individual daily learning tasks used to practice specific technologies and concepts.

They are maintained in the separate Hands-on repository.

✅ Day 16 Completion Status

By the end of Day 16:

Day 16 project folder created in the correct location

Express installed

Nodemon installed

Express server created

Server running successfully on port 3000

API/health response implemented

Request logging implemented

npm development script configured

Backend foundation ready for future TaskFlow API development

🎯 Current Status

Project Build Progress: Day 16 Completed

Current Phase: Backend API — Express

Next Direction: Continue expanding the Express backend into the TaskFlow REST API and connect it with the Angular frontend.

📌 Technology Stack

Layer

Technology

Frontend

Angular

Language

TypeScript

Backend

Node.js + Express

API Communication

REST API

Reactive Programming

RxJS

UI Library

Angular Material

State

Angular Signals / Services

Version Control

Git + GitHub

Development Server

Nodemon

<<<<<<< Updated upstream
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

_____________________________________________________________________________________________________________________________________________________
## Day-17(BACKEND-API-EXPRESS)
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

_____________________________________________________________________________________________________________________________________________
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
=======

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
>>>>>>> Stashed changes

## Project Structure

```text
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes

Install dependencies:

```bash
<<<<<<< Updated upstream
npm install
```

Start the server:

```bash
node server.js
=======
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
>>>>>>> Stashed changes
```

Server:

```text
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
