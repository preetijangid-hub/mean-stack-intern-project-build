# Day 22 - Mongoose Models

## Topic
Define Mongoose models: User, Project, Task with references, timestamps and validation.

## Work Completed

- Created User Mongoose schema
- Created Project Mongoose schema
- Created Task Mongoose schema
- Added field validation
- Added required fields
- Added enum validation
- Added email validation
- Added timestamps
- Added User references
- Added Project references
- Used ObjectId for document relationships

## Models

### User
Stores user information such as:
- Name
- Email
- Password
- Role

### Project
Stores project information such as:
- Project name
- Description
- Owner
- Members
- Status

### Task
Stores task information such as:
- Title
- Description
- Project reference
- Assigned user
- Creator
- Status
- Priority
- Due date

## Folder Structure

```text
Day-22(MONGOOSE-MODELS)
├── models
│   ├── User.js
│   ├── Project.js
│   └── Task.js
└── README.md


Learning Outcome

Learned how to create Mongoose schemas and models with validation, timestamps, ObjectId references and relationships between User, Project and Task.