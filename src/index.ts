let inputDisplay: HTMLInputElement = document.getElementById("inputDisplay") as HTMLInputElement;
let addBtn: HTMLButtonElement = document.getElementById("addBtn") as HTMLButtonElement;
let tasks: HTMLDivElement = document.getElementById("tasks") as HTMLDivElement;
let tasksCount: HTMLDivElement = document.getElementById("tasksCount") as HTMLDivElement;
let countP: HTMLParagraphElement = document.getElementById("countP") as HTMLParagraphElement;

let editBtns: string = `<i onclick="editTaskVal(event)" id="editBtn" class="fa-solid fa-pen"></i>
                <i onclick="deleteElem(event)" id="deleteBtn" class="fa-solid fa-trash"></i>`;
let editVal: string = `<div id="edit">
                    <input type="text" name="" id="editVal">
                    <button onclick="dnoneEdit(event)">Cancel</button>
                    <button onclick="updateTask(event)">Update</button>`;
let attribute: { [key: string]: string } = {
  onmouseenter: "toggleClass(event, 'enter')",
  onmouseleave: "toggleClass(event, 'leave')",
  class: "task",
};

function setLocalStorage(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks.innerHTML));
}
window.addEventListener("load", () => {
  const tasksStoredStr: string | null = localStorage.getItem("tasks");
  const taskCountStr: string | null = localStorage.getItem("tasksCount");

  const tasksStored: string = tasksStoredStr ? JSON.parse(tasksStoredStr) : '';
  const taskCount: string | null = taskCountStr ? JSON.parse(taskCountStr) : null;

  console.log(taskCount);

  if (tasksStored) {
    tasks.innerHTML = tasksStored;
    countP.textContent = taskCount?.toString() || '';
  }
});

addBtn.addEventListener("click", () => {
  let inputVal: string = inputDisplay.value;

  createTask(inputVal);
});

inputDisplay.onkeydown = (key: KeyboardEvent) => {
  if (key.keyCode === 13) {
    let inputVal: string = inputDisplay.value;

    createTask(inputVal);
  }
};

function toggleClass(event: MouseEvent, type: string): void {
  let elem = event.target as HTMLElement;
  elem = elem.querySelector("#editBtn") as HTMLElement;
  let elem2 = event.target as HTMLElement;
  elem2 = elem2.querySelector("#deleteBtn") as HTMLElement;

  if (type === "enter") {
    elem.classList.add("toggle");
    elem2.classList.add("red");
  } else {
    elem.classList.remove("toggle");
    elem2.classList.remove("red");
  }
}

function clearAll(): void {
  tasks.innerHTML = "";
  countP.textContent = "You have 0 remaining tasks";
  localStorage.setItem("tasksCount", JSON.stringify(countP.textContent));
  inputDisplay.value = "";
}

function deleteElem(event: MouseEvent): void {
  (event.target as HTMLElement).parentElement?.remove();
  
   let taskCount:number= tasks.querySelectorAll(".task").length; 
   countP.textContent= `You have ${taskCount} remaining tasks`;
   localStorage.setItem("tasksCount", JSON.stringify(countP.textContent));
   setLocalStorage();
}

function createTask(inputVal:string): void {
   if (inputVal.trim()) { 
      inputVal= inputVal.toString(); 
      inputVal= inputVal.slice(0,1).toUpperCase() + inputVal.slice(1); 
      inputVal= inputVal.trim(); 
   } else { return; }

   let task :HTMLDivElement= document.createElement('div');
   for(const key in attribute){
       task.setAttribute(key,attribute[key]);
   }

   let taskP :HTMLParagraphElement= document.createElement('p');
   taskP.setAttribute('id','taskP');
   taskP.textContent=inputVal;

   task.appendChild(taskP);
   task.innerHTML += editBtns; 
   task.innerHTML += editVal; 

   if(inputVal){ 
       tasks.prepend(task); 
       localStorage.clear();

       setLocalStorage();

       let taskCount:number= tasks.querySelectorAll('.task').length; 

       countP.textContent=`You have ${taskCount} remaining tasks`; 
       localStorage.setItem('tasksCount',JSON.stringify(countP.textContent)); 
       console.log(countP.textContent);

       tasks.scrollTop=0;  
     } 
}

function editTaskVal(event:MouseEvent):void { 
     let taskVal :HTMLElement= (event.target as HTMLElement).parentElement!;
     let clss :HTMLElement= (event.target as HTMLElement).parentElement!; 

     document.querySelectorAll('#edit').forEach((el)=> el.classList.remove('dflex')); 

     clss= clss.querySelector('#edit')!;
     clss.classList.add('dflex');

     let taskP: string = taskVal.querySelector('#taskP')!.textContent!;
     let editInput = clss.querySelector('#editVal') as HTMLInputElement;
     if (editInput) editInput.placeholder=taskP;

     clss.addEventListener('keydown',(key)=>{ 
         if(key.keyCode===9){ 
             if (editInput) editInput.value=taskP; 
         } 
     }); 

     setLocalStorage();  
}

function dnoneEdit(event:MouseEvent):void { 
      const clss :HTMLElement=(event.target as HTMLElement).parentElement!;  
      clss.classList.remove('dflex');   
      setLocalStorage();  
}

function updateTask(event:MouseEvent):void {    
      const task :HTMLElement=(event.target as HTMLElement).parentElement!;    
      const editValue :HTMLInputElement| null=(task.querySelector('#editVal')as HTMLInputElement);     
      
      const taskText :HTMLElement=(task.parentElement!.querySelector('#taskP')as HTMLElement);      

      if(editValue.value){         
          let updatedValue:string= editValue.value.toString();       
          updatedValue=updatedValue.slice(0,1).toUpperCase()+updatedValue.slice(1);        
          updatedValue=updatedValue.trim();          
          taskText.textContent=updatedValue;         
          dnoneEdit(event);        
          editValue.placeholder='';         
          editValue.value='';         
          setLocalStorage();      
      } else {          
           editValue.placeholder='Plz Enter your task here';         
           setLocalStorage();      
      }   
}