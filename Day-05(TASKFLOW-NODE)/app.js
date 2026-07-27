const fs = require("fs");

// Read JSON file
const tasks = JSON.parse(
  fs.readFileSync("./seed/sample-data.json", "utf8")
);

// Sort by due date
tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

// Group by status
const groupedTasks = {};

tasks.forEach(task => {
  if (!groupedTasks[task.status]) {
    groupedTasks[task.status] = [];
  }

  groupedTasks[task.status].push(task);
});

// Print grouped tasks
for (const status in groupedTasks) {
  console.log(`\n===== ${status.toUpperCase()} =====`);

  groupedTasks[status].forEach(task => {
    console.log(`${task.title} | Due: ${task.dueDate}`);
  });
}