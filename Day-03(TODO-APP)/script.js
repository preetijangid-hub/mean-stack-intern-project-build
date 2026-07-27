// ===============================
// TaskFlow Todo App
// Day 03 - Part 1
// ===============================

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// ===============================
// Save Tasks
// ===============================

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// ===============================
// Update Counter
// ===============================

function updateCounter(){

    totalTasks.innerText = tasks.length;

    completedTasks.innerText =
        tasks.filter(task => task.completed).length;

    pendingTasks.innerText =
        tasks.filter(task => !task.completed).length;

}


// ===============================
// Render Tasks
// ===============================

function renderTasks(filter="all"){

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(filter === "completed"){

        filteredTasks =
            tasks.filter(task => task.completed);

    }

    if(filter === "pending"){

        filteredTasks =
            tasks.filter(task => !task.completed);

    }

    filteredTasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.className =
            task.completed
            ? "task completed"
            : "task";

        li.innerHTML = `

            <span>

                ${task.text}

            </span>

            <div class="actions">

                <button
                class="complete-btn"
                onclick="toggleTask(${index})">

                ✓

                </button>

                <button
                class="edit-btn"
                onclick="editTask(${index})">

                Edit

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

    updateCounter();

    saveTasks();

}


// ===============================
// Add Task
// ===============================

addBtn.addEventListener("click",()=>{

    const value = taskInput.value.trim();

    if(value===""){

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text:value,

        completed:false

    });

    taskInput.value="";

    renderTasks();

});


// ===============================
// Press Enter
// ===============================

taskInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        addBtn.click();

    }

});




// ===============================
// Toggle Complete
// ===============================

function toggleTask(index){

    tasks[index].completed = !tasks[index].completed;

    renderTasks();

}


// ===============================
// Delete Task
// ===============================

function deleteTask(index){

    if(confirm("Are you sure you want to delete this task?")){

        tasks.splice(index,1);

        renderTasks();

    }

}


// ===============================
// Edit Task
// ===============================

function editTask(index){

    const updatedTask = prompt(

        "Edit your task:",

        tasks[index].text

    );

    if(updatedTask !== null && updatedTask.trim() !== ""){

        tasks[index].text = updatedTask.trim();

        renderTasks();

    }

}


// ===============================
// Filter Buttons
// ===============================

const filterButtons =
document.querySelectorAll(".filter-btn");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
        button.getAttribute("data-filter");

        renderTasks(filter);

    });

});


// ===============================
// Initial Load
// ===============================

renderTasks();


// ===============================
// Save Before Closing
// ===============================

window.addEventListener("beforeunload",()=>{

    saveTasks();

});