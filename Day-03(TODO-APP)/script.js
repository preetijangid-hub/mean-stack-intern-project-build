const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");

let tasks = [];

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    renderTasks();

}

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.className = task.completed
            ? "task-item completed"
            : "task-item";

        li.innerHTML = `

            <span>${task.text}</span>

            <div class="actions">

                <button
                    class="complete-btn"
                    onclick="toggleTask(${index})">

                    ${task.completed ? "Undo" : "Complete"}

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${index})">

                    Delete

                </button>

            </div>

        `;

        taskList.appendChild(li);

    });

    updateStats();

}

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    renderTasks();

}

function deleteTask(index) {

    tasks.splice(index, 1);

    renderTasks();

}

function updateStats() {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const pending = total - completed;

    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;

    const percent =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);

    progressFill.style.width = percent + "%";

    progressPercent.textContent = percent + "%";

}

renderTasks();