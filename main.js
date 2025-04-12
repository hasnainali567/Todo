let inputDisplay = document.getElementById("inputDisplay");
let addBtn = document.getElementById("addBtn");
let tasks = document.getElementById("tasks");
let tasksCount = document.getElementById("tasksCount");
let countP = document.getElementById("countP");

let editBtns = `<i id="editBtn" class="fa-solid fa-pen"></i>
                <i onclick="deleteElem(event)" id="deleteBtn" class="fa-solid fa-trash"></i>`;

let attribute = {
  onmouseenter: "toggleClass(event, 'enter')",
  onmouseleave: "toggleClass(event, 'leave')",
  class: "task",
};

addBtn.addEventListener("click",()=>{
    let inputVal = inputDisplay.value;

    createTask(inputVal);
});


inputDisplay.onkeydown = (key) => {
    if (key.keyCode === 13) {
        let inputVal = inputDisplay.value;

    createTask(inputVal);

    }
    
}

function toggleClass(event, type) {
  let elem = event.target;

  if (type === "enter") {
    elem.classList.add("toggle");
  } else {
    elem.classList.remove("toggle");
  }
}

function clearAll() {
  tasks.innerHTML = "";
  countP.textContent = "You have 0 remaining tasks";
  inputDisplay.value = "";
}

function deleteElem(event) {
  event.target.parentElement.remove();
  let taskCount = tasks.querySelectorAll("div").length;
  countP.textContent = `You have ${taskCount} remaining tasks`;
}

function createTask(inputVal) {
  

  if (inputVal) {
    inputVal = inputVal.toString();
    inputVal = inputVal.slice(0, 1).toUpperCase() + inputVal.slice(1);
    inputVal = inputVal.trim();

  }
  let task = document.createElement("div");
  for (const key in attribute) {
    task.setAttribute(key, attribute[key]);
  }
//   console.log(task);

  let taskP = document.createElement("p");
  taskP.textContent = inputVal;

  task.appendChild(taskP);
  task.innerHTML += editBtns;

  if (inputVal) {
    tasks.appendChild(task);
    let taskCount = tasks.querySelectorAll("div").length;

    countP.textContent = `You have ${taskCount} remaining tasks`;
  }
}
