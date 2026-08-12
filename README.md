MEAN Stack Internship — TaskFlow Project Build

Continuous Project: TaskFlowTrack: Project BuildStack: MEAN (MongoDB, Express.js, Angular, Node.js)

📌 Repository Overview

This repository contains the continuous TaskFlow Project Build developed throughout the MEAN Stack internship.

Important: This repository is separate from the Hands-on Exercises repository.

Project Build: One continuous TaskFlow application developed across the internship.

Hands-on Exercises: Individual daily exercises used to practice specific technologies and concepts.

🚀 Project Progress

Week 1 — Project Foundation

🟦 Day 1 — TaskFlow Documentation

Topics

Project requirements documentation

TaskFlow application overview

Feature identification

User flows

Project scope

Initial application planning

⭐ Highlights

Defined the overall TaskFlow application requirements.

Planned the major task-management features.

Established the initial application scope and workflow.

Main Features Planned

Task management

Task creation

Task editing

Task deletion

Task status

Task workflow

Board structure

🟦 Day 2 — TaskFlow Design

Topics

UI/UX planning

Wireframes

Board layout

Task card design

Navigation planning

User interaction flow

⭐ Highlights

Created UI sketches and design notes.

Planned the dashboard and task-board experience.

Defined the main user interaction areas.

Planned UI Areas

Dashboard

Task board

Task cards

Task forms

Navigation

Status and filter controls

🟦 Day 3 — TaskFlow Data

Topics

Application data structure

Task model

JSON data

Task fields

Data relationships

Mock-data planning

⭐ Highlights

Designed the initial TaskFlow data structure.

Defined the task model and important task fields.

Prepared sample data for application development.

Task Data

Task ID

Title

Description

Status

Priority

Assignee

Due date

🟦 Day 4 — TaskFlow Setup

Topics

Project setup

Repository structure

Development environment

Git configuration

Initial application setup

⭐ Highlights

Created the initial project-build structure.

Prepared the development environment.

Configured the project for implementation and version control.

🟦 Day 5 — TaskFlow Node

Topics

Node.js setup

npm

Node modules

JSON data handling

Local backend/mock-data preparation

npm scripts

⭐ Highlights

Prepared the Node.js side of TaskFlow.

Practiced npm and Node.js project setup.

Prepared backend-related data handling.

Week 2 — Angular Project Development

🟩 Day 6 — Angular Dashboard Project

Topics

Angular application setup

Angular components

Templates

Styling

Signals

Basic state management

⭐ Highlights

Built the initial Angular dashboard.

Created dashboard components and layout.

Added task summary and status information.

Started using Angular Signals for state.

Dashboard Areas

Task summary

Task status information

Dashboard cards

Application layout

🟩 Day 7 — TaskList Project

Topics

Angular component structure

Task list

Task cards

Filtering

Task status display

Reusable UI components

⭐ Highlights

Built the TaskList portion of TaskFlow.

Created task-card UI.

Added task status display and filtering.

Structured reusable Angular components.

Features

Task list rendering

Task card component

Task status

Task filtering

Task-board layout

🟩 Day 8 — TaskFlow Service Project

Topics

TaskService

Shared task state

CRUD operations

Angular services

Dependency Injection

Signal-based state

⭐ Highlights

Implemented the main TaskService.

Added task CRUD operations.

Created shared task state.

Connected components through Angular services and Signals.

Features

Add task

Edit task

Delete task

Read/display tasks

Shared task state

Component synchronization

Note: Project Build Day 8 focuses on TaskFlow TaskService + task state.Hands-on Day 8 focuses on Component Communication + Shared Service. These are separate learning tracks.

🟩 Day 9 — Routing Project

Topics

Angular Router

Routes

routerLink

Route parameters

Query parameters

Navigation

Wildcard routes

⭐ Highlights

Added routing and navigation to TaskFlow.

Added login, board, and task-detail routes.

Practiced route parameters and query parameters.

Added unknown-route handling.

Main Routes

/login
/board
/task/:id

Week 3 — Angular Advanced Features

🟨 Day 10 — TaskFlow Forms & Validation

Topics

Angular Reactive Forms

FormBuilder

Form controls

Validators

Validation messages

Form state

User input handling

⭐ Highlights

Added structured forms to TaskFlow.

Implemented Reactive Forms and FormBuilder.

Added validation for required fields and invalid input.

Improved user-input handling.

Form Areas

Task title

Task description

Priority

Status

Assignee

Due date

🟨 Day 11 — TaskFlow HTTP / REST Integration

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

⭐ Highlights

Connected Angular to backend/API-style data operations.

Implemented CRUD-style HTTP operations.

Practiced typed API responses.

Added loading and error-handling concepts.

Data Flow

Angular Component
       ↓
    Service
       ↓
   HttpClient
       ↓
   REST API
       ↓
   Response
       ↓
      UI

Operations

GET tasks

POST new task

PUT/update task

DELETE task

🟨 Day 12 — RxJS / Search & Reactive Data Flow

Topics

RxJS Observables

Reactive data flow

Search/filtering

debounceTime

switchMap

Combining reactive streams

Error handling

⭐ Highlights

Improved TaskFlow's reactive data handling.

Built a reactive search/filter workflow.

Used debounceTime to control user input.

Used switchMap for latest-result handling.

Practiced reactive API/data-source workflows.

Search Flow

User Input
    ↓
debounceTime
    ↓
switchMap
    ↓
API / Data Source
    ↓
Latest Results
    ↓
TaskFlow UI

🟨 Day 13 — Custom Pipe & Directive

Topics

Angular pipes

Custom pipes

Attribute directives

HostListener

UI transformation

⭐ Highlights

Added reusable display transformations.

Created the custom timeAgo pipe.

Created a highlight-on-hover directive.

Practiced HostListener for UI behavior.

Custom Pipe — timeAgo

Converts dates into readable text.

2026-08-11T10:00:00
        ↓
    2 hours ago

Custom Directive

Implemented a highlight-on-hover directive using HostListener.

The directive changes the visual appearance of an element when the user moves the mouse over it.

Week 4 — Authentication, UI & Backend

🟥 Day 14 — Authentication Guard

Topics

Angular route guards

Authentication flow

Protected routes

Unauthorized navigation

Authentication state

⭐ Highlights

Added authentication protection to TaskFlow routes.

Protected the board route.

Practiced route guards and authentication state.

Redirected unauthenticated users toward login.

Protected Route

/board

Authentication Flow

User
  ↓
Protected Route
  ↓
Auth Guard
  ├── Authenticated ──→ Allow
  └── Not Authenticated ──→ Login

🟥 Day 15 — Angular Material + Review

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

⭐ Highlights

Restyled TaskFlow using Angular Material.

Improved board layout and spacing.

Added consistent Material-based UI styling.

Improved responsive behavior.

Added basic accessibility improvements.

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

Phase 3 — Backend API (Express)

🟪 Day 16 — Backend API (Express)

Objective

Day 16 started backend API development for the TaskFlow application.

Topics

Express server setup

Backend project structure

Health/API route

Nodemon

npm scripts

Request logging middleware

REST API foundation

⭐ Highlights

Created the Express backend foundation.

Configured an Express server on port 3000.

Added a health/API response.

Added request logging middleware.

Added Nodemon for development.

Configured npm scripts for development and normal execution.

Project Structure

Day-16(BACKEND-API-EXPRESS)/
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

Server:

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

{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}

Run Day 16

cd "Day-16(BACKEND-API-EXPRESS)\server"
npm install
npm run dev

Normal execution:

npm start

Open:

http://localhost:3000

Day 16 Deliverable

Express Server
      ↓
Nodemon Development Setup
      ↓
Request Logger
      ↓
Health / API Route
      ↓
JSON Response
      ↓
Backend Foundation Ready

🟪 Day 17 — Backend API with Express.js

Objective

Day 17 continued the backend/API phase by building a basic Task Management REST API using Node.js and Express.js.

⭐ Day 17 Highlights

Built a RESTful backend API.

Added separate users.js and tasks.js route files.

Practiced Express middleware.

Used express.json() for JSON request bodies.

Implemented GET, POST, PUT and DELETE operations.

Practiced route parameters.

Structured APIs into separate route modules.

Prepared the backend for future TaskFlow API expansion.

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

🚀 Day 17 Project — Task Management REST API

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

const express = require("express");

const app = express();

app.use(express.json());

Server:

http://localhost:3000

Users API

GET /api/users
GET /api/users/:id

Tasks API

GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id

Create Task

{
  "title": "Learn Express"
}

Update Task

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

routes/
├── users.js
└── tasks.js

Routes are connected to the Express application using:

app.use("/api/users", usersRouter);
app.use("/api/tasks", tasksRouter);

Testing

GET requests can be tested in the browser.

POST requests can be tested using Postman.

PUT requests can be tested using Postman.

DELETE requests can be tested using Postman.

Run Day 17

npm install
node server.js

Server:

http://localhost:3000

🏁 Day 17 Completion

Day 17 Project Build — Completed

📁 Current Project Build Structure

project-build/
│
├── Day-01(TASKFLOW-DOCUMENTATION)/
├── Day-02(TASKFLOW-DESIGN)/
├── Day-03(TASKFLOW-DATA)/
├── Day-04(TASKFLOW-SETUP)/
├── Day-05(TASKFLOW-NODE)/
├── Day-06(ANGULAR-DASHBOARD-PROJECT)/
├── Day-07(TASKLIST-PROJECT)/
├── Day-08(TASKFLOW-SERVICE-PROJECT)/
├── Day-09(ROUTING-PROJECT)/
├── Day-13(CUSTOM-PIPE-DIRECTIVE)/
├── Day-14(AUTH-GUARD)/
├── Day-15(ANGULAR-MATERIAL-REVIEW)/
├── Day-16(BACKEND-API-EXPRESS)/
├── Day-17(BACKEND-API-EXPRESS)/
└── README.md

▶️ Running the Projects

Angular Projects

cd <project-folder>
npm install
ng serve

Open:

http://localhost:4200

If Angular CLI is not installed globally:

npx ng serve

Node.js Projects

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

Express Backend — Day 17

cd "Day-17(BACKEND-API-EXPRESS)"
npm install
node server.js

Server:

http://localhost:3000

🔧 GitHub Workflow

Check current branch:

git branch --show-current

Check Git status:

git status

Stage changes:

git add .

Commit:

git commit -m "Update TaskFlow Project Build"

Push:

git push origin project-build

📈 Project Build Learning Progress

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

API routes

Health check

Nodemon

npm scripts

Request logging

REST API

Users routes

Tasks routes

CRUD operations

JSON request/response handling

🏗️ TaskFlow Architecture

The application is progressing toward a full-stack MEAN architecture.

                    TaskFlow Application
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
           Angular UI            Express API
                │                     │
                ▼                     ▼
       Angular Services        Backend Routes
                │                     │
                └──────────┬──────────┘
                           │
                           ▼
                       Database
                    (Future Phase)

🔀 Project Build vs Hands-on Exercises

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

REST API

Hands-on Exercises

Hands-on Exercises are individual daily learning tasks used to practice specific technologies and concepts.

They are maintained in the separate Hands-on repository.

🛠️ Technology Stack

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

✅ Current Status

Project Build Progress

Day 17 Completed

Current Phase

Backend API — Express

Latest Milestone

Task Management REST API with Express.js

Next Direction

Continue expanding the Express backend into the TaskFlow REST API and connect it with the Angular frontend.
