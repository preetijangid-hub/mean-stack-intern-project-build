MEAN Stack Hands-on Exercises

This repository contains the daily hands-on exercises completed during the 6-week MEAN Stack learning plan.

Important: This repository is separate from the TaskFlow Project Build. Hands-on exercises are individual learning tasks; Project Build is the continuous TaskFlow application.

Week 1 --- JavaScript & TypeScript Foundations
Day 1 --- JavaScript Basics

Topics: variables, let/const, scope, == vs ===, truthy/falsy, operators, conditions, loops, functions.

Exercise

Build:

FizzBuzz
Temperature Converter

FizzBuzz checks divisibility by 3 and 5 and returns Fizz, Buzz, FizzBuzz, or the number.

The temperature converter uses reusable functions with input validation.

Practiced: functions, parameters, return values, conditions, validation, manual testing.

Run
node script.js
Day 2 --- Functions, Arrays & Objects (ES6)

Topics: arrow functions, this, destructuring, spread/rest, default parameters, map, filter, reduce, chaining, immutability.

Exercise

Solve 10 array-method problems using map, filter, and reduce.

Requirements:

No traditional loops.
Do not mutate input arrays.
Use array methods and chaining.

Example:

Input → filter() → map() → reduce() → Result
Run
node script.js
Day 3 --- Async JavaScript

Topics: event loop, callbacks, promises, async/await, try/catch, Fetch API.

Exercise

Fetch data from a public API using async/await.

Implemented:

API request
Loading flag
Error handling
Success handling
Two requests using Promise.all()

Flow:

Request → Loading → await fetch() → Success/Error → Loading false
Run
node script.js
Day 4 --- TypeScript Fundamentals

Topics: types, interfaces vs type, unions, literals, enums, generics, strict mode, tsconfig.

Exercise

Convert a JavaScript module to strict TypeScript.

Requirements:

Type every parameter.
Type every return value.
Remove unnecessary any.
Use interfaces/types appropriately.
Enable strict checking.

Example:

function add(a: number, b: number): number {
  return a + b;
}
Compile
npx tsc
Day 5 --- Node.js, npm & Modules

Topics: Node runtime, npm, scripts, CommonJS vs ES modules, package.json, JSON read/write.

Exercise

Create a Node CLI that:

Reads a JSON file.
Transforms the data.
Writes the result.
Runs through an npm script.

Flow:

JSON → Node script → Transform → Output
Run
npm install
npm run <script-name>

or:

node app.js
Week 2 --- Angular Fundamentals
Day 6 --- Angular Setup & Components

Topics: Angular CLI, project structure, standalone components, templates, styles, signals.

Exercise

Create two Angular components and render a small dashboard card driven by a signal value.

Practiced: components, templates, styles, signals and basic state updates.

Run
npm install
ng serve

Open:

http://localhost:4200
Day 7 --- Templates & Directives

Topics: interpolation, property/event binding, @if, @for, track, @switch, ngClass, ngStyle.

Exercise --- Todo List UI

Build a Todo List UI with:

Todo items
@for rendering
track
Filter buttons
Empty state
No backend

Filters:

All | Active | Completed

When no task matches the filter, display an empty-state message.

Run
npm install
ng serve
Day 8 --- Component Communication & Dependency Injection

Topics: @Input, @Output, signal inputs, services, Dependency Injection, providedIn: 'root'.

Exercise --- Shared Counter

Share state between parent and child through an injectable service so both components stay synchronized.

Structure:

Parent Component
       ↓
Shared Service
       ↑
Child Component

Implemented:

Shared counter
Increase/decrease actions
Parent-to-child synchronized state
Signal-based shared state

Example:

Parent Component
Counter: 6
[Increase] [Decrease]

Child Component
Shared Counter: 6
Run
npm install
ng serve

Important: Hands-on Day 8 is Component Communication + Shared Service. It is different from Project Build Day 8, which is TaskService + Add/Edit/Delete.

Day 9 --- Routing & Navigation

Topics: routes, routerLink, route params, query params, lazy loading, wildcard 404.

Exercise --- Multi-route App

Add:

/login
/board
/task/:id

Implemented:

Login route
Board route
Task detail route
routerLink navigation
Route parameters
Query parameters
One lazy-loaded route
Wildcard 404 route

Example:

/task/10

where 10 is the task ID.

Unknown URLs display a 404 page.

Run
npm install
ng serve
Day 10 --- Forms & Validation

Topics: Reactive Forms, FormBuilder, validators, custom validators, error messages, dirty/touched state.

Exercise --- Reactive Signup Form

Build a signup form with:

Name
Email
Password
Confirm Password

Implemented:

Required validation
Email validation
Password validation
Custom password-match validator
Per-field error messages
dirty / touched / valid / invalid states

Password rule:

Password === Confirm Password
Run
npm install
ng serve
Week 3 --- Angular in Depth
Day 11 --- HttpClient & REST

Topics: provideHttpClient, GET/POST/PUT/DELETE, typed responses, Observables, async pipe.

Exercise --- Public API Data

Fetch and display typed data from a public API using Angular HttpClient and the async pipe.

Implemented:

HTTP GET
Typed interface/model
Observable
Async pipe
Loading state
Error state

Flow:

Component → HttpClient → REST API → Observable → async pipe → UI
Run
npm install
ng serve
Day 12 --- RxJS in Practice

Topics: Observable vs Promise, map, filter, switchMap, debounceTime, combineLatest, takeUntilDestroyed.

Exercise --- Search Box

Build a search box that:

Accepts input.
Debounces typing.
Calls an API.
Uses switchMap.
Cancels stale requests.
Handles errors.
Displays latest results.

Flow:

Input → debounceTime → switchMap → API → Results
Run
npm install
ng serve
Day 13 --- Pipes, Custom Directives & Lifecycle

Topics: built-in pipes, pure/impure pipes, custom pipes, attribute directives, HostListener, ngOnInit, ngOnDestroy.

Exercise

Create:

A custom timeAgo pipe.
A highlight-on-hover directive.

timeAgo converts dates into readable text such as:

2 hours ago

The highlight directive changes the element appearance when the mouse is over it using HostListener.

Also practice:

ngOnInit
ngOnDestroy
Run
npm install
ng serve
Day 14 --- Guards, Interceptors & Shared State

Topics: functional route guards, HTTP interceptors, auth headers, shared signal/service state.

Exercise

Build:

An auth guard for a protected route.
An HTTP interceptor that attaches a token.
Handling for HTTP 401 Unauthorized.

Protected example:

/board

Interceptor concept:

Authorization: Bearer <token>

On 401, handle authentication failure appropriately.

Run
npm install
ng serve
Day 15 --- Angular Material + Review

Topics: Angular Material, toolbar, cards, inputs, table, theming, accessibility basics.

Exercise --- Material Todo App

Restyle the Todo application using Angular Material.

Use Material components for:

Toolbar
Cards
Form fields
Buttons
Inputs

Also improve:

Board layout
Responsiveness
Visual consistency
Accessibility warnings
Run
npm install
ng serve
Week 4 --- Node.js Backend & Express
Day 16 --- Backend API (Express)

Topics: Node.js backend development, Express.js, HTTP server, REST API basics, routes, middleware, request logging, Nodemon, npm scripts.

Exercise --- Express Backend API

Create an initial backend server using Node.js and Express.

Project structure:

Day-16(BACKEND-API-EXPRESS)/
└── server/
    ├── server.js
    ├── package.json
    ├── package-lock.json
    └── .gitignore
Implemented
Express server setup
Express application initialization
HTTP server running on port 3000
Health check endpoint
Request logging middleware
Nodemon development workflow
npm development script
npm start script
Basic REST API structure
Health Check

The backend provides:

GET /health

The endpoint is used to verify that the backend server is running correctly.

Request Logging

A middleware logs incoming requests so that the HTTP method, requested URL and request processing can be monitored during development.

Example:

GET /health
Development Workflow

Nodemon automatically restarts the server whenever source files are changed.

Run the backend with:

npm install
npm run dev

The server runs at:

http://localhost:3000
Production-style Start

The application can also be started using:

npm start
Day 16 Learning Outcome

By completing Day 16, the following backend concepts were practiced:

Node.js runtime
Express.js
Backend project setup
npm package management
Express middleware
HTTP methods
REST API fundamentals
API health checks
Request logging
Nodemon
npm scripts
Basic backend project structure
Running Angular Exercises

Go to the required Angular project:

cd <project-folder>
npm install
ng serve

Open:

http://localhost:4200

If Angular CLI is not installed globally:

npx ng serve
Running JavaScript / Node Exercises

For JavaScript exercises:

node script.js

For Node exercises:

node app.js

For npm projects:

npm install
npm run <script-name>

For the Day 16 Express backend:

cd Day-16(BACKEND-API-EXPRESS)/server
npm install
npm run dev
GitHub Workflow

Hands-on work is pushed to the hands-on branch.

git checkout hands-on
git add .
git commit -m "Day 16 Hands-on: Express Backend API"
git push origin hands-on
Example Commit Messages
Day 1 Hands-on: FizzBuzz and temperature converter
Day 2 Hands-on: Array methods
Day 3 Hands-on: Async JavaScript and Fetch API
Day 4 Hands-on: TypeScript conversion
Day 5 Hands-on: Node CLI
Day 6 Hands-on: Angular components
Day 7 Hands-on: Todo list UI
Day 8 Hands-on: Component communication and shared service
Day 9 Hands-on: Angular routing
Day 10 Hands-on: Reactive forms and validation
Day 11 Hands-on: HttpClient and REST API
Day 12 Hands-on: RxJS search
Day 13 Hands-on: Custom pipe and directive
Day 14 Hands-on: Guards and interceptors
Day 15 Hands-on: Angular Material
Day 16 Hands-on: Express Backend API
Repository Structure
mean-stack-hands-on/
│
├── Day-01(JAVASCRIPT-BASICS)/
├── Day-02(FUNCTIONS-ARRAYS-OBJECTS)/
├── Day-03(ASYNC-JAVASCRIPT)/
├── Day-04(TYPESCRIPT-FUNDAMENTALS)/
├── Day-05(NODE-NPM-MODULES)/
├── Day-06(ANGULAR-SETUP-COMPONENTS)/
├── Day-07(ANGULAR-TODO)/
├── Day-08(COMPONENT-COMMUNICATION)/
├── Day-09(ROUTING-NAVIGATION)/
├── Day-10(FORMS-VALIDATION)/
├── Day-11(HTTPCLIENT-REST)/
├── Day-12(RXJS)/
├── Day-13(PIPES-DIRECTIVES-LIFECYCLE)/
├── Day-14(AUTH-GUARD)/
├── Day-15(ANGULAR-MATERIAL-REVIEW)/
├── Day-16(NODE-DEEPER)/
└── README.md

Folder names may vary according to the local project setup.

Hands-on Learning Outcome

By completing these exercises, the following areas are practiced:

JavaScript
Variables
Functions
Arrays
Objects
ES6
Async JavaScript
Promises
Fetch API
TypeScript
Types
Interfaces
Unions
Enums
Generics
Strict mode
tsconfig
Node.js
Node runtime
npm
Modules
JSON processing
CLI scripts
Express.js
HTTP server
REST API fundamentals
Middleware
Request logging
Nodemon
npm scripts
Angular
Components
Templates
Control flow
Signals
Services
Dependency Injection
Component communication
Routing
Reactive Forms
HttpClient
RxJS
Pipes
Directives
Lifecycle hooks
Guards
Interceptors
Angular Material
Project Build vs Hands-on

The Hands-on and Project Build tracks should remain separate.

Hands-on exercises focus on learning and practicing individual technologies and concepts.

The Project Build focuses on developing the continuous TaskFlow application.

For example, Hands-on Day 8 focuses on:

Component communication
Shared service
Shared counter

Whereas Project Build Day 8 focuses on:

TaskService
Add task
Edit task
Delete task
Shared task state

This separation should be maintained throughout the internship.
