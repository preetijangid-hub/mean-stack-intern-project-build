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