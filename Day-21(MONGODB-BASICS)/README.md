# Day 21 - MongoDB Basics

## Topic

MongoDB Basics - Atlas + Compass + CRUD + Query Operators + Projection + Indexes

---

## Objective

The objective of Day 21 is to understand MongoDB database integration with a Node.js and Express application.

The following concepts were practiced:

- MongoDB Atlas
- MongoDB Compass
- Database and Collection creation
- MongoDB connection using Mongoose
- CRUD operations
- Query operators
- Projection
- Indexes
- Environment variables
- Express API integration

---

## MongoDB Setup

### Database

```text
internshipDB

Collection
users
Sample Document
{
  "name": "Preeti",
  "email": "preeti@example.com",
  "age": 22,
  "city": "Jaipur"
}
Technologies Used
Node.js
Express.js
MongoDB
MongoDB Atlas
MongoDB Compass
Mongoose
dotenv
Installation

Install the required packages:

npm init -y
npm install express mongoose dotenv
Environment Variables

Create a .env file:

MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/internshipDB
PORT=5000

The .env file must not be committed to GitHub.

Run the Application

Start the server:

node server.js

Expected output:

MongoDB connected successfully
Server running on http://localhost:5000
API Endpoints
1. Home
GET
GET /

Returns the server status.

2. Create User
POST
POST /users

Example request:

{
  "name": "Preeti",
  "email": "preeti@example.com",
  "age": 22,
  "city": "Jaipur"
}
3. Get All Users
GET
GET /users

Returns all users from MongoDB.

4. Filter Users by Age
GET
GET /users/filter/age?minAge=23

This uses the MongoDB $gt operator.

Example MongoDB query:

{
  age: {
    $gt: 23
  }
}
5. Filter Users by City
GET
GET /users/filter/city?cities=Jaipur,Delhi

This uses the MongoDB $in operator.

Example MongoDB query:

{
  city: {
    $in: ["Jaipur", "Delhi"]
  }
}
6. Projection
GET
GET /users/summary

Only selected fields are returned:

name
email

The _id field is excluded.

7. Update User
PUT
PUT /users/:id

Example request:

{
  "age": 23
}
8. Delete User
DELETE
DELETE /users/:id

Deletes a user using its MongoDB ObjectId.

MongoDB Concepts Practiced
CRUD
Create
db.users.insertOne({
  name: "Preeti",
  email: "preeti@example.com",
  age: 22,
  city: "Jaipur"
});
Read
db.users.find();
Update
db.users.updateOne(
  { name: "Preeti" },
  { $set: { age: 23 } }
);
Delete
db.users.deleteOne({
  name: "TestUser"
});
Query Operators
$gt
db.users.find({
  age: {
    $gt: 23
  }
});
$in
db.users.find({
  city: {
    $in: ["Jaipur", "Delhi"]
  }
});
Projection
db.users.find(
  {},
  {
    name: 1,
    email: 1,
    _id: 0
  }
);
Index

An index was created on the age field to improve query performance.

db.users.createIndex({
  age: 1
});
Explain Query

Query execution was checked using MongoDB Compass Explain.

Example:

db.users.find({
  age: {
    $gt: 23
  }
}).explain("executionStats");
Day 21 Deliverables
MongoDB Atlas deployment created
MongoDB Compass connected
internshipDB database created
users collection created
Sample users inserted
CRUD operations practiced
$gt operator practiced
$in operator practiced
Projection practiced
Index created
Explain query checked
MongoDB connected with Node.js and Mongoose
Connection string stored in .env
Security

The MongoDB connection string is stored in .env.

The .env file must be added to .gitignore and must never be committed to GitHub.

Status

Day 21 MongoDB Basics completed.



---


## 4. Packages install karna


Ab `Day-21(MONGODB-BASICS)` folder ke terminal mein ye chalao:


```powershell
npm init -y

phir:

npm install express mongoose dotenv

Phir server run:

node server.js

Expected:

MongoDB connected successfully
Server running on http://localhost:5000