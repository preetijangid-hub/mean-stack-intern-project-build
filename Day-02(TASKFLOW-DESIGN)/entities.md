# TaskFlow - Entities

---

# 1. User

Represents a registered user of TaskFlow.

Attributes

- userId
- name
- email
- password
- role

Relationship

One User

↓

Can create many Projects.

↓

Can be assigned many Tasks.

---

# 2. Project

Represents a collection of tasks.

Attributes

- projectId
- title
- description
- createdAt

Relationship

One Project

↓

Contains many Tasks.

---

# 3. Task

Represents a single work item.

Attributes

- taskId
- title
- description
- dueDate
- priority
- status
- assignedUserId

Relationship

Many Tasks

↓

Belong to one Project.

↓

Assigned to one User.