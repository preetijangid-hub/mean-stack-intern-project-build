# Day 05 - Node CLI

## Objective

Create a Node.js command-line application that:

- Reads a JSON file
- Transforms the data
- Writes the transformed data into another JSON file
- Runs using an npm script

---

## Folder Structure

```
Day-05(NODE-CLI)

│── app.js
│── tasks.json
│── output.json
│── package.json
└── README.md
```

---

## Features

- Read data from `tasks.json`
- Convert all **Pending** tasks to **In Progress**
- Generate `output.json`
- Run using `npm start`

---

## Technologies Used

- Node.js
- JavaScript
- JSON
- npm

---

## How to Run

### Install dependencies

```
npm install
```

### Run the project

```
npm start
```

---

## Input

`tasks.json`

```json
[
  {
    "id": 1,
    "title": "Learn JavaScript",
    "status": "Pending"
  }
]
```

---

## Output

`output.json`

```json
[
  {
    "id": 1,
    "title": "Learn JavaScript",
    "status": "In Progress"
  }
]
```

---

## Learning Outcomes

- Reading JSON using Node.js
- Writing JSON files
- Using the File System (`fs`) module
- Working with npm scripts
- Transforming JSON data using `map()`

---

## Author

Preeti Jangid