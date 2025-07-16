"use strict";
let inputDisplay = document.getElementById("inputDisplay");
let addBtn = document.getElementById("addBtn");
let tasks = document.getElementById("tasks");
let tasksCount = document.getElementById("tasksCount");
let countP = document.getElementById("countP");
let editBtns = `<i onclick="editTaskVal(event)" id="editBtn" class="fa-solid fa-pen"></i>
                <i onclick="deleteElem(event)" id="deleteBtn" class="fa-solid fa-trash"></i>`;
let editVal = `<div id="edit">
                    <input type="text" name="" id="editVal">
                    <button onclick="dnoneEdit(event)">Cancel</button>
                    <button onclick="updateTask(event)">Update</button>`;
let attribute = {
    onmouseenter: "toggleClass(event, 'enter')",
    onmouseleave: "toggleClass(event, 'leave')",
    class: "task",
};
function setLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks.innerHTML));
}
window.addEventListener("load", () => {
    const tasksStoredStr = localStorage.getItem("tasks");
    const taskCountStr = localStorage.getItem("tasksCount");
    const tasksStored = tasksStoredStr ? JSON.parse(tasksStoredStr) : '';
    const taskCount = taskCountStr ? JSON.parse(taskCountStr) : null;
    console.log(taskCount);
    if (tasksStored) {
        tasks.innerHTML = tasksStored;
        countP.textContent = (taskCount === null || taskCount === void 0 ? void 0 : taskCount.toString()) || '';
    }
});
addBtn.addEventListener("click", () => {
    let inputVal = inputDisplay.value;
    createTask(inputVal);
});
inputDisplay.onkeydown = (key) => {
    if (key.keyCode === 13) {
        let inputVal = inputDisplay.value;
        createTask(inputVal);
    }
};
function toggleClass(event, type) {
    let elem = event.target;
    elem = elem.querySelector("#editBtn");
    let elem2 = event.target;
    elem2 = elem2.querySelector("#deleteBtn");
    if (type === "enter") {
        elem.classList.add("toggle");
        elem2.classList.add("red");
    }
    else {
        elem.classList.remove("toggle");
        elem2.classList.remove("red");
    }
}
function clearAll() {
    tasks.innerHTML = "";
    countP.textContent = "You have 0 remaining tasks";
    localStorage.setItem("tasksCount", JSON.stringify(countP.textContent));
    inputDisplay.value = "";
}
function deleteElem(event) {
    var _a;
    (_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
    let taskCount = tasks.querySelectorAll(".task").length;
    countP.textContent = `You have ${taskCount} remaining tasks`;
    localStorage.setItem("tasksCount", JSON.stringify(countP.textContent));
    setLocalStorage();
}
function createTask(inputVal) {
    if (inputVal.trim()) {
        inputVal = inputVal.toString();
        inputVal = inputVal.slice(0, 1).toUpperCase() + inputVal.slice(1);
        inputVal = inputVal.trim();
    }
    else {
        return;
    }
    let task = document.createElement('div');
    for (const key in attribute) {
        task.setAttribute(key, attribute[key]);
    }
    let taskP = document.createElement('p');
    taskP.setAttribute('id', 'taskP');
    taskP.textContent = inputVal;
    task.appendChild(taskP);
    task.innerHTML += editBtns;
    task.innerHTML += editVal;
    if (inputVal) {
        tasks.prepend(task);
        localStorage.clear();
        setLocalStorage();
        let taskCount = tasks.querySelectorAll('.task').length;
        countP.textContent = `You have ${taskCount} remaining tasks`;
        localStorage.setItem('tasksCount', JSON.stringify(countP.textContent));
        console.log(countP.textContent);
        tasks.scrollTop = 0;
    }
}
function editTaskVal(event) {
    let taskVal = event.target.parentElement;
    let clss = event.target.parentElement;
    document.querySelectorAll('#edit').forEach((el) => el.classList.remove('dflex'));
    clss = clss.querySelector('#edit');
    clss.classList.add('dflex');
    let taskP = taskVal.querySelector('#taskP').textContent;
    let editInput = clss.querySelector('#editVal');
    if (editInput)
        editInput.placeholder = taskP;
    clss.addEventListener('keydown', (key) => {
        if (key.keyCode === 9) {
            if (editInput)
                editInput.value = taskP;
        }
    });
    setLocalStorage();
}
function dnoneEdit(event) {
    const clss = event.target.parentElement;
    clss.classList.remove('dflex');
    setLocalStorage();
}
function updateTask(event) {
    const task = event.target.parentElement;
    const editValue = task.querySelector('#editVal');
    const taskText = task.parentElement.querySelector('#taskP');
    if (editValue.value) {
        let updatedValue = editValue.value.toString();
        updatedValue = updatedValue.slice(0, 1).toUpperCase() + updatedValue.slice(1);
        updatedValue = updatedValue.trim();
        taskText.textContent = updatedValue;
        dnoneEdit(event);
        editValue.placeholder = '';
        editValue.value = '';
        setLocalStorage();
    }
    else {
        editValue.placeholder = 'Plz Enter your task here';
        setLocalStorage();
    }
}
