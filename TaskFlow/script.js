const input=document.getElementById("taskInput");
const button=document.getElementById("addBtn");
const list=document.getElementById("taskList");

let tasks=[];
let currentFilter="all";

/* LOAD TASKS */
const savedTasks=localStorage.getItem("tasks");
if(savedTasks){
    tasks=JSON.parse(savedTasks);
}

renderTasks();

/* EVENTS */
button.addEventListener("click",addTask);

input.addEventListener("keypress",(e)=>{
    if(e.key==="Enter") addTask();
});

/* ADD TASK */
function addTask(){

    const text=input.value.trim();
    if(text==="") return;

    tasks.push({
        text:text,
        completed:false
    });

    input.value="";
    saveTasks();
    renderTasks();
}

/* FILTER */
function filterTasks(type){
    currentFilter=type;
    renderTasks();
}

/* RENDER */
function renderTasks(){

    list.innerHTML="";

    let filtered=tasks;

    if(currentFilter==="active")
        filtered=tasks.filter(t=>!t.completed);

    if(currentFilter==="completed")
        filtered=tasks.filter(t=>t.completed);

    filtered.forEach((task,index)=>{

        const li=document.createElement("li");

        if(task.completed)
            li.classList.add("completed");

        li.innerHTML=`
            <span onclick="toggleTask(${index})">
                ${task.text}
            </span>
            <button onclick="deleteTask(${index})">❌</button>
        `;

        list.appendChild(li);
    });

    updateCounter();
}

/* TOGGLE */
function toggleTask(index){
    tasks[index].completed=!tasks[index].completed;
    saveTasks();
    renderTasks();
}

/* DELETE */
function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
    renderTasks();
}

/* SAVE */
function saveTasks(){
    localStorage.setItem("tasks",
        JSON.stringify(tasks));
}

/* COUNTER */
function updateCounter(){

    const completed=
        tasks.filter(t=>t.completed).length;

    document.getElementById("counter")
        .textContent=
        `${completed}/${tasks.length} completed`;
}

/* THEME */
const themeBtn=
document.getElementById("themeToggle");

themeBtn.addEventListener("click",()=>{
    document.body.classList.toggle("light");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("light")
    );
});

if(localStorage.getItem("theme")==="true"){
    document.body.classList.add("light");
}