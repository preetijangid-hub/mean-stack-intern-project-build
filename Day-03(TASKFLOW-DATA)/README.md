# TaskFlow Sample Data

## Overview

This project contains sample JSON data for the TaskFlow application.

The data models three main entities:

- Users
- Projects
- Tasks

Each entity uses unique IDs and references to demonstrate relationships between records.

---

## Data Structure

### Users

Stores user information.

Fields:

- id
- name
- email
- role

---

### Projects

Stores project details.

Fields:

- id
- name
- description
- ownerId
- status

ownerId references a user.

---

### Tasks

Stores task information.

Fields:

- id
- title
- description
- status
- priority
- projectId
- assignedTo

projectId references a project.

assignedTo references a user.

---

## Technologies

- JSON
- Markdown

---

## Author

Preeti Jangid

Mean Stack Internship – Day 03