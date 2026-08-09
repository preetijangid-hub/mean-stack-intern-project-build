# Task Flow — Project Build

Task Flow is a MEAN-stack task management application built progressively during the 6-week project plan.

## Project Goal

Build a task manager where users can:
- View tasks on a task board
- Add, edit, and delete tasks
- Search and filter tasks
- View task details
- Submit validated task forms
- Load tasks through a REST API
- Protect the board with authentication
- Use a responsive Angular UI

---

########################################################## Phase 0 — Project Setup & Planning

## Day 1 — App Selection & Requirements

### Work completed
Selected **TaskFlow** as the application idea and defined:
- Feature list
- User stories
- Acceptance criteria

### Main features
- User authentication
- Task board
- Task creation/editing/deletion
- Task status
- Due dates
- Search/filter
- Project/task relationships

### Output
Requirements documentation for TaskFlow.

---

## Day 2 — UI Sketches & Entities

### Work completed
Planned the main screens:
- Login
- Task Board
- Task Form

Identified entities:
- User
- Project
- Task

Defined their basic relationships.

### Output
UI sketches and entity/relationship planning.

---

## Day 3 — JSON Data Design

### Work completed
Designed JSON structures for:
- Users
- Projects
- Tasks

Added IDs, references, and sample records.

Example:

```json
{
  "id": 1,
  "title": "Complete dashboard",
  "status": "in-progress",
  "dueDate": "2026-08-10",
  "projectId": 1
}
```

### Output
Sample JSON data for the application.

---

## Day 4 — GitHub & Project Setup

### Work completed
- Created GitHub repository
- Added README
- Added `.gitignore`
- Planned client/server structure
- Created first commit

### Output
Initial GitHub project structure.

---

## Day 5 — Node.js Seed/Print Script

### Work completed
Created a Node.js script that:
- Reads sample JSON
- Loads tasks
- Groups tasks by status
- Sorts tasks by due date
- Prints processed task information

### Run

```bash
node app.js
```

or, if configured:

```bash
npm run start
```

### Output
Node.js task data processing script.

---

####################################################### Phase 1 — Frontend Skeleton

## Day 6 — Angular Setup

### Work completed
- Created Angular standalone application
- Set up project structure
- Created initial components
- Added styling
- Ran Angular development server

### Run

```bash
cd client
npm install
ng serve
```

Open:

```text
http://localhost:4200
```

### Output
Running Angular application.

---

## Day 7 — Task List & TaskCard

### Work completed
Built the task list UI using:
- `TaskList`
- `TaskCard`
- Angular `@for`
- `track`
- Empty-state handling

Sample tasks are rendered in a task-board style UI.

### Concepts
- Angular templates
- Components
- Control flow
- List rendering
- Empty states

### Output
Functional Task List UI.

---

## Day 8 — Task Service & CRUD

### Work completed
Added a signal-based in-memory `TaskService`.

Implemented:
- Add task
- Edit task
- Delete task
- Shared task state
- Component communication

### Concepts
- Angular signals
- Services
- Dependency injection
- Shared state

### Output
Working in-memory CRUD functionality.

---

## Day 9 — Routing & Navigation

### Work completed
Added routes:
- `/login`
- `/board`
- `/task/:id`

Also implemented:
- Navigation shell
- `routerLink`
- Route parameters
- Query parameters
- Lazy-loaded route
- Wildcard `404` route

Example:

```text
/task/5
```

The route parameter identifies the selected task.

### Output
Multi-route Angular application with navigation and 404 handling.

---

## Day 10 — Reactive Task Form & Validation

### Work completed
Built Add/Edit Task reactive form with:
- Title
- Status
- Due date

Added:
- `FormBuilder`
- Required validation
- Form state
- Dirty/touched state
- Per-field error messages

### Output
Validated Add/Edit Task form.

---

#################################################### Phase 2 — Frontend Features & Polish

## Day 11 — Mock REST API + HttpClient

### Work completed
Moved task loading to a mock REST API using `json-server`.

Implemented:
- Angular `HttpClient`
- HTTP GET
- Typed task model
- Observables
- Async pipe
- Loading state
- Error state

Example endpoint:

```text
GET /tasks
```

### Run json-server

From the folder containing `db.json`:

```bash
npx json-server --watch db.json
```

Usually available at:

```text
http://localhost:3000
```

### Run Angular

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

### Output
Tasks are loaded over HTTP instead of only in-memory data.

---

## Day 12 — Search & Status Filter with RxJS

### Work completed
Added task search and status filtering using RxJS.

Used concepts such as:
- `debounceTime`
- `switchMap`
- Observable streams
- Search input handling
- Status filtering
- Cancellation of stale requests

### Flow

```text
Search input
    ↓
debounceTime
    ↓
switchMap
    ↓
Latest API request
    ↓
Filtered tasks
```

### Output
Search and filtering functionality.

---

## Day 13 — Custom Pipe & Status Directive

### Work completed
Added:
- `dueSoon` custom pipe
- Status-color attribute directive

The pipe identifies/displays tasks whose due dates are approaching.

The directive applies styling based on task status such as:
- Todo
- In Progress
- Done

### Concepts
- Custom pipes
- Attribute directives
- Host interaction
- Template transformation

### Output
Task cards with due-date information and status-based styling.

---

## Day 14 — Authentication & Route Guard

### Work completed
Added authentication service stub and protected `/board`.

Implemented:
- Login flow
- Token storage
- Auth service
- Functional route guard
- Protected board
- Unauthorized access handling

### Flow

```text
Login
  ↓
Store token
  ↓
Access /board
```

Unauthenticated users are redirected/blocked from the protected board.

### Output
Guarded TaskFlow board.

---

## Day 15 — Angular Material & Final UI Polish

### Work completed
Applied Angular Material and improved the frontend.

Added/styled:
- Toolbar
- Cards
- Form fields
- Buttons
- Task board layout
- Responsive layout

Also reviewed and cleaned accessibility warnings.

### Output
Polished Angular frontend MVP.

---

# Technology Stack

## Frontend
- Angular
- TypeScript
- HTML
- CSS
- Angular Signals
- Reactive Forms
- Angular Router
- Angular HttpClient
- RxJS
- Angular Material

## Backend / Mock API
- Node.js
- json-server
- JSON

## Version Control
- Git
- GitHub

---

################################################################### Project Structure

A simplified structure:

```text
TaskFlow/
├── client/
│   └── Angular application
├── server/
│   └── Node.js / API files
├── data/
│   └── JSON / mock API data
├── README.md
└── .gitignore
```

The exact structure can change as the project progresses.

---

# How to Run

## 1. Clone repository

```bash
git clone <repository-url>
cd <repository-folder>
```

## 2. Install dependencies

Angular:

```bash
cd client
npm install
```

Node.js server, if present:

```bash
cd server
npm install
```

## 3. Start mock REST API

```bash
npx json-server --watch db.json
```

## 4. Start Angular

```bash
cd client
ng serve
```

Open:

```text
http://localhost:4200
```

---

# Git Workflow

Each day's work can be committed separately.

```bash
git add .
git commit -m "Day 11: Add HttpClient task loading"
git push
```

Example commit messages:

```text
Day 6: Angular app setup
Day 7: Build task list and TaskCard
Day 8: Add TaskService and CRUD
Day 9: Add Angular routing
Day 10: Add reactive task form validation
Day 11: Add HttpClient and mock REST API
Day 12: Add RxJS search and filtering
Day 13: Add custom pipe and status directive
Day 14: Add authentication guard
Day 15: Apply Angular Material and polish UI
```

---

# Final Outcome

By the end of the project build, TaskFlow evolves from a basic task-management idea into a frontend MVP with:

- Angular standalone architecture
- Component-based task board
- Shared state
- Task CRUD
- Routing and route parameters
- Reactive forms and validation
- REST API integration
- Typed HTTP responses
- RxJS search/filtering
- Custom pipes
- Custom directives
- Authentication service/route guard
- Angular Material UI
- Responsive frontend layout

This project demonstrates the progression from requirements and data modelling to a functional Angular task-management application.
