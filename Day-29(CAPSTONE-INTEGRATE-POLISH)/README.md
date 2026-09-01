# TaskFlow Capstone

A full-featured Task Management application built with Angular. The application provides secure JWT authentication, live API integration, task management, projects, team members, performance tracking, filtering, loading states, error handling, empty states, and a polished responsive UI.

## Features

### Authentication
- User Registration
- User Login
- JWT Token Storage
- HTTP Authentication Interceptor
- Auth Guard for protected routes
- Guest Guard for login and registration routes
- Automatic redirect to Dashboard after successful login or registration
- Logout functionality

### Dashboard
- Total Tasks overview
- Completed Tasks count
- In Progress Tasks count
- Not Started Tasks count
- Overall task completion progress
- Recent Tasks
- Performance Overview
- Status Distribution
- Priority Distribution
- Project Performance
- Team Performance

### Task Management
- Create Tasks
- View Tasks
- Edit Tasks
- Delete Tasks
- Search Tasks
- Filter Tasks by Status
- Filter Tasks by Priority
- Filter Tasks by Project
- Task Sorting
- Task Progress tracking
- Task Status:
  - Not Started
  - In Progress
  - Completed
- Task Priority:
  - High
  - Medium
  - Low
- Project assignment
- Team Member assignment

### Project Management
- Create Projects
- Edit Projects
- Delete Projects
- Search Projects
- Sort Projects
- Active and Completed Project statistics
- Project Progress tracking
- Project task statistics
- Not Started, In Progress, and Completed task counts
- Empty States
- Loading States
- Error States

### Team Management
- Add Team Members
- Edit Team Members
- Delete Team Members
- Search Team Members
- Sort Team Members
- Assigned Task statistics
- Completed Task statistics
- Completion Rate
- Team Performance tracking
- Top Performer section
- Average Team Completion

### User Experience
- Responsive UI
- Desktop, Tablet, and Mobile support
- Loading States
- Error States
- Empty States
- Retry functionality
- Toast Notifications
- Success Messages
- Error Messages
- Active Sidebar Navigation
- Reusable Shared Components
- Custom Directive
- Custom Pipe

## Technology Stack

- Angular
- TypeScript
- SCSS
- RxJS
- Angular Router
- Angular Reactive Forms
- Angular HttpClient
- JWT Authentication
- REST API
- MongoDB Backend

## Application Architecture

```text
src/
└── app/
    ├── core/
    │   ├── guards/
    │   │   ├── auth.guard.ts
    │   │   └── guest.guard.ts
    │   ├── interceptors/
    │   │   └── auth.interceptor.ts
    │   └── services/
    │       ├── auth.ts
    │       ├── task.ts
    │       └── toast.ts
    │
    ├── features/
    │   ├── auth/
    │   │   ├── login/
    │   │   └── register/
    │   ├── dashboard/
    │   ├── tasks/
    │   ├── projects/
    │   └── team/
    │
    ├── models/
    │   ├── auth.model.ts
    │   └── task.model.ts
    │
    ├── shared/
    │   ├── components/
    │   │   ├── header/
    │   │   ├── sidebar/
    │   │   └── toast/
    │   ├── directives/
    │   │   └── highlight.directive.ts
    │   └── pipes/
    │       └── task-status.pipe.ts
    │
    ├── app.config.ts
    ├── app.routes.ts
    ├── app.ts
    ├── app.html
    └── app.scss