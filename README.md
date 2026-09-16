# MEAN Stack Internship — 30 Day Project Build

A structured 30-day MEAN Stack internship journey covering JavaScript, TypeScript, Node.js, Express.js, MongoDB, Mongoose, Angular, REST APIs, authentication, testing, deployment, and full-stack application development.

This repository contains the **Project Build** work completed throughout the internship, progressing from individual concepts and backend/frontend exercises to a complete full-stack application.

---

## 🚀 Final Project — TaskFlow

**TaskFlow** is a full-stack task management application developed as the final capstone project.

The application brings together the concepts covered throughout the internship:

* User authentication
* JWT-based authorization
* Task management
* Project management
* Task status and priority
* Protected Angular routes
* HTTP authentication interceptor
* REST API integration
* MongoDB persistence
* Server-side project search and pagination
* Loading, error and empty states
* Angular UI/UX
* API testing
* Production deployment

### Core Entities

```text
User
 ├── Projects
 └── Tasks

Project
 └── Team Members

Task
 ├── Title
 ├── Description
 ├── Status
 └── Priority
```

---

## 🛠️ Technology Stack

### Frontend

* Angular
* TypeScript
* HTML5
* CSS3
* Angular Router
* Angular HttpClient
* RxJS
* Angular Guards
* HTTP Interceptors
* Angular Material

### Backend

* Node.js
* Express.js
* REST API
* JWT
* bcrypt
* express-validator

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

### Testing

* Jest
* Supertest
* Postman

### Development & Deployment

* Git
* GitHub
* VS Code
* PowerShell
* Render

---

# 📚 30-Day Learning Roadmap

## Week 1 — JavaScript & TypeScript Foundations

### Day 01 — JavaScript Basics

Covered the fundamentals of JavaScript:

* Variables
* Data types
* Operators
* Conditional statements
* Loops
* Basic problem solving

---

### Day 02 — Functions, Arrays & Objects

Worked with core JavaScript data structures and reusable logic:

* Functions
* Function parameters and return values
* Arrays
* Array methods
* Objects
* Object properties and methods

---

### Day 03 — Asynchronous JavaScript

Learned how JavaScript handles asynchronous operations:

* Callbacks
* Promises
* Async/await
* Error handling
* Asynchronous execution

---

### Day 04 — TypeScript Fundamentals

Introduced TypeScript and static typing:

* Type annotations
* Primitive types
* Arrays
* Objects
* Interfaces
* Functions
* Type-safe development

---

### Day 05 — Node.js, npm & Modules

Started backend development with Node.js:

* Node.js runtime
* npm
* `package.json`
* CommonJS modules
* `require` and `module.exports`
* Basic Node.js application structure

---

## Week 2 — Angular Foundations

### Day 06 — Angular Setup & Components

Started Angular development:

* Angular CLI
* Project structure
* Components
* Component metadata
* TypeScript in Angular
* Angular development workflow

---

### Day 07 — Angular Templates & Directives

Worked with Angular templates:

* Template syntax
* Property binding
* Event binding
* Interpolation
* Structural directives
* Attribute directives

---

### Day 08 — Component Communication & Dependency Injection

Covered communication between Angular components:

* Parent-child communication
* `@Input`
* `@Output`
* Event emitters
* Services
* Dependency injection

---

### Day 09 — Routing & Navigation

Implemented Angular navigation:

* Angular Router
* Routes
* Router links
* Route parameters
* Navigation
* Page-based application structure

---

### Day 10 — Forms & Validation

Worked with Angular forms:

* Form handling
* Reactive forms
* Form controls
* Validation
* Validation messages
* User input handling

---

### Day 11 — HttpClient & REST APIs

Connected Angular applications with backend APIs:

* Angular HttpClient
* GET requests
* POST requests
* PUT requests
* DELETE requests
* REST API concepts
* API response handling

---

### Day 12 — RxJS

Introduced reactive programming:

* Observables
* Subscriptions
* RxJS operators
* Asynchronous data streams
* HTTP observables

---

### Day 13 — Pipes, Directives & Lifecycle

Covered Angular application behavior and presentation:

* Custom pipes
* Directives
* Component lifecycle
* Lifecycle hooks
* Reusable UI behavior

---

### Day 14 — Guards, Interceptors & State

Introduced application-level control:

* Route guards
* HTTP interceptors
* Authentication flow
* Request handling
* Basic state management concepts

---

### Day 15 — Angular Material & Review

Worked with Angular Material and reviewed the Angular concepts covered during the first two weeks:

* Angular Material components
* UI structure
* Forms
* Routing
* Services
* HTTP
* Guards
* Interceptors

---

# 🧩 Week 3 — Backend & API Development

The third phase focused on building backend applications with Node.js, Express and MongoDB.

### Day 16 — Node.js & Express Backend

Worked with:

* Express.js
* Server setup
* Routes
* Middleware
* Request/response handling
* REST API structure

---

### Day 17 — REST API Development

Practiced designing REST APIs:

* API routes
* HTTP methods
* Request bodies
* Route parameters
* Status codes
* JSON responses

---

### Day 18 — MongoDB & Mongoose

Introduced database integration:

* MongoDB
* MongoDB Atlas
* Mongoose
* Schemas
* Models
* Database connection
* CRUD operations

---

### Day 19 — Validation & Error Handling

Implemented consistent API validation and error handling using:

* `express-validator`
* Request validation
* Email validation
* Centralized validation handling
* Central error middleware
* Structured error responses
* HTTP status codes

---

### Day 20 — Authentication

Implemented backend authentication concepts:

* Password hashing
* bcrypt
* JWT
* Login
* Registration
* Authentication middleware
* Protected API routes

---

### Day 21 — Environment Configuration & API Structure

Worked with production-oriented backend configuration:

* Environment variables
* `.env`
* `.gitignore`
* Database configuration
* API organization
* Controllers
* Routes
* Middleware

Sensitive environment files were kept out of version control.

---

### Day 22 — Backend CRUD

Built CRUD functionality around application data:

* Create
* Read
* Update
* Delete
* MongoDB queries
* Mongoose models
* Controller-based architecture
* API testing

---

### Day 23 — Full API Integration & Review

Reviewed and integrated the backend concepts:

* Authentication
* CRUD APIs
* Validation
* Error handling
* Database integration
* Protected endpoints
* API testing

---

# 🧪 Week 4 — Testing & Deployment

## Day 24 — API Testing with Jest & Supertest

Implemented automated API testing using:

* Jest
* Supertest
* Authentication tests
* API response assertions
* Validation tests
* Protected route tests
* Error response tests

The Day-24 API test suite was verified with **17 passing tests across 2 test suites**.

---

## Day 25 — API Deployment

Deployed the Express/MongoDB backend and worked with:

* Production environment variables
* MongoDB Atlas
* Render
* Production API configuration
* API health checks
* Deployed API testing

---

# 🏗️ Week 5 — TaskFlow Capstone

## Day 26 — Frontend + Live API + JWT

Integrated the Angular frontend with the deployed backend.

Implemented:

* Angular services
* HttpClient
* Login
* Registration
* JWT authentication
* Authentication interceptor
* Protected routes
* Local token handling
* Live API integration

The frontend communicates with the deployed TaskFlow API instead of relying only on mock/local data.

---

## Day 27 — Task CRUD

Implemented the core TaskFlow task management functionality:

* Create tasks
* Read tasks
* Update tasks
* Delete tasks
* Task status
* Task priority
* Authentication-protected task operations
* Angular task service
* Backend task API

TaskFlow supports statuses such as:

* Not Started
* In Progress
* Completed

and priorities:

* High
* Medium
* Low

---

## Day 28 — Projects, Filtering & Pagination

Extended TaskFlow with project management and improved data handling.

### Projects

Implemented:

* Project model
* Project API
* Authenticated project routes
* Project creation
* Project listing
* Team members
* Project descriptions

### Server-side pagination

The backend supports:

* `page`
* `limit`
* `search`
* MongoDB `skip()`
* MongoDB `limit()`
* Total record count
* Total page count

### Search

Project search is handled on the server using a case-insensitive name search.

### Frontend

The Angular project page includes:

* Search
* Pagination
* Loading state
* Error state
* Empty state
* Protected project route

---

## Day 29 — Capstone Integration & Polish

Focused on bringing the complete application together.

Work included:

* Frontend/backend integration
* Authentication flow verification
* Task CRUD verification
* Project functionality
* Search and pagination
* UI improvements
* Error handling
* Loading states
* Empty states
* Code cleanup
* Test verification
* README/documentation preparation

The Angular production build was verified successfully.

---

## Day 30 — Final Deployment & Demo

Final stage of the internship project:

* Production frontend build
* Frontend deployment
* Backend/frontend integration verification
* Final application testing
* Project documentation
* Screenshots/demo preparation
* Final TaskFlow presentation

This marks the completion of the 30-day MEAN Stack Project Build journey.

---

# 📂 Repository Structure

The repository is organized by learning day.

```text
mean-stack-intern-project-build/
│
├── Day-01/
├── Day-02/
├── Day-03/
├── ...
│
├── Day-24(API-TESTING-JEST-SUPERTEST)/
│   ├── api/
│   └── tests/
│
├── Day-25(API-DEPLOYMENT)/
│   └── api/
│
├── Day-26(FE-LIVE-API-JWT)/
│   └── taskflow-client/
│
├── Day-27(TASK-CRUD-LIVE-API)/
│   ├── api/
│   └── client/
│
├── Day-28(PROJECTS-FILTERING-PAGINATION)/
│   ├── api/
│   └── client/
│
├── Day-29(CAPSTONE-INTEGRATE-POLISH)/
│   └── capstone-taskflow/
│
├── Day-30/
│
├── .gitignore
└── README.md
```

Generated Angular build and cache directories such as `dist/` and `.angular/` are excluded through the root `.gitignore`.

---

# 🔐 Security Practices

The project follows basic security practices throughout development:

* Passwords are hashed using bcrypt.
* JWT is used for authentication.
* Protected routes require authentication.
* Environment variables are not committed.
* `.env` files are ignored by Git.
* Sensitive credentials were removed from repository history when required.
* Input validation is applied to API requests.
* Unauthorized and forbidden requests are handled separately.
* Centralized error handling is used by the backend.

---

# 🧪 Testing

Testing was performed using:

* Jest
* Supertest
* Postman
* PowerShell API requests
* Angular production builds

Testing covered areas including:

* Registration
* Login
* Authentication
* Protected routes
* Task CRUD
* Validation
* Error responses
* Project creation
* Project search
* Server-side pagination
* Invalid page/limit handling

---

# 🌐 Backend API

The TaskFlow backend was deployed using Render.

```text
https://taskflow-api-zad8.onrender.com/api
```

The backend includes authentication, task and project functionality.

---

# 📌 Key Learning Outcomes

By the end of the internship, the project covered the complete flow from frontend development to backend deployment:

```text
Angular UI
    ↓
Angular Services
    ↓
HttpClient / Interceptor
    ↓
Express REST API
    ↓
JWT Authentication
    ↓
Controllers
    ↓
Mongoose Models
    ↓
MongoDB Atlas
```

The internship provided practical experience with:

* Full-stack web development
* Angular application architecture
* REST API design
* Authentication and authorization
* MongoDB database integration
* API validation
* Error handling
* Automated API testing
* Frontend/backend integration
* Server-side pagination
* Search
* Git and GitHub
* Production deployment
* Debugging and code maintenance

---

# 🎯 Final Capstone

**TaskFlow** represents the final integration of the concepts learned throughout the 30-day MEAN Stack internship.

The project demonstrates the ability to build a full-stack application from:

**Planning → Database → Backend API → Authentication → Angular Frontend → Testing → Deployment → Final Integration**

---

## 👩‍💻 Developer

**Preeti Jangid**

B.Tech — Computer Science & Engineering

GitHub:
https://github.com/preetijangid-hub

---

## 📖 Repository

**MEAN Stack Internship — Project Build**

https://github.com/preetijangid-hub/mean-stack-intern-project-build
