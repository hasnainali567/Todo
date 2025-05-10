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
  let tasksStored = localStorage.getItem("tasks");
  tasksStored = JSON.parse(tasksStored);
  let taskCount = JSON.parse(localStorage.getItem("tasksCount"));

  console.log(taskCount);

  if (tasksStored) {
    tasks.innerHTML = tasksStored;
    countP.textContent = taskCount;
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

  // let deleteBtn = document.getElementById('');

  if (type === "enter") {
    elem.classList.add("toggle");
    elem2.classList.add("red");
  } else {
    elem.classList.remove("toggle");
    elem2.classList.remove("red");
  }
}

function clearAll() {
  tasks.innerHTML = "";
  countP.textContent = "You have 0 remaining tasks";
  localStorage.setItem("tasksCount", JSON.stringify(countP.textContent));
  inputDisplay.value = "";
  localStorage.clear();
}

function deleteElem(event) {
  event.target.parentElement.remove();
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
  } else {
    return;
  }
  let task = document.createElement("div");
  for (const key in attribute) {
    task.setAttribute(key, attribute[key]);
  }

  let taskP = document.createElement("p");
  taskP.setAttribute("id", "taskP");
  taskP.textContent = inputVal;

  task.appendChild(taskP);
  task.innerHTML += editBtns;
  task.innerHTML += editVal;

  if (inputVal) {
    tasks.prepend(task);
    localStorage.clear();

    setLocalStorage();

    let taskCount = tasks.querySelectorAll(".task").length;

    countP.textContent = `You have ${taskCount} remaining tasks`;
    localStorage.setItem("tasksCount", JSON.stringify(countP.textContent));
    console.log(countP.textContent);

    tasks.scrollTop = 0;
  }
}

function editTaskVal(event) {
  let taskP = event.target.parentElement;
  let clss = event.target.parentElement;
  document
    .querySelectorAll("#edit")
    .forEach((el) => el.classList.remove("dflex"));

  clss = clss.querySelector("#edit");
  clss.classList.add("dflex");

  taskP = taskP.querySelector("#taskP").textContent;
  clss = clss.querySelector("#editVal");
  clss.placeholder = taskP;

  clss.addEventListener("keydown", (key) => {
    if (key.keyCode === 9) {
      clss.value = taskP;
    }
  });
  setLocalStorage();
}

function dnoneEdit(event) {
  let clss = event.target.parentElement;
  clss.classList.remove("dflex");
  setLocalStorage();
}

function updateTask(event) {
  let task = event.target.parentElement;
  let editVal = task.querySelector("#editVal");

  let taskP = task.parentElement.querySelector("#taskP");

  if (editVal.value) {
    let updatedVal = editVal.value.toString();
    updatedVal = updatedVal.slice(0, 1).toUpperCase() + updatedVal.slice(1);
    updatedVal = updatedVal.trim();
    taskP.textContent = updatedVal;
    dnoneEdit(event);
    editVal.placeholder = "";
    editVal.value = "";
    setLocalStorage();
  } else {
    editVal.placeholder = "Plz Enter your task here";
    setLocalStorage();
  }
}
