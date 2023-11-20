let todoNav = document.querySelector(".todo-nav")
let todoList = document.querySelector(".todo-list");
let todoInput = document.querySelector(".todo-input");
let submitTaskBtn = document.querySelector(".submit");
let newTaskBtn = document.querySelector(".add-task");
let inputText = document.querySelector(".todo-text");
let editForm = document.querySelector(".edit-form");
let editInput = document.querySelector(".edit-input");
let bars = todoNav.querySelector(".fas");

let todo_list = [];

let localDb = [];

let TODOS_ = new Map();

let uniqueId = 0;


function persistState(){
  let toDos = localStorage.getItem('toDos')

  if(toDos === null){
    localStorage.setItem('toDos', JSON.stringify(localDb))
  } else {
    localDb = JSON.parse(toDos)
  }
}
persistState()

function setLocalStorage() {
  localDb = [...localDb, inputText.value]
  localStorage.setItem('toDos', JSON.stringify(localDb))
}

bars.addEventListener('click', ()=>{
  console.log("Clicked");

  let getToDos = localStorage.getItem("toDos")
  let parsedToDos = JSON.parse(getToDos)

  const mapToDos = parsedToDos.map(t =>{
    return `<li>
            ${t}
    </li>`
  }).join('')

    todoList.innerHTML = `<ol>${mapToDos}</ol>`
    return todoList;
})

function handleCreateNewTask() {
  todoInput.addEventListener("submit", (e) => {
    e.preventDefault();
    setLocalStorage()
    todoList.innerHTML = "";
    TODOS_.set((uniqueId += 1), { content: inputText.value, id: uniqueId });
    todoInput.style.display = "none";
    todo_list = createTodo(TODOS_);
  });
}
handleCreateNewTask();

newTaskBtn.addEventListener("click", () => {
  todoInput.style.display = "block";
  inputText.value = "";
  inputText.focus();
});

const handleEditClick = (id) => {
  editForm.style.display = "block";
  let items = todo_list[id - 1].querySelector(".items");
  editInput.value = items.textContent;
  editInput.focus();

  function editHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    const isId = TODOS_.has(id);
    // console.log(items)
    if (isId) {
      TODOS_.set(id, { content: editInput.value });
      let items = todo_list[id - 1].querySelector(".items");
      items.textContent = editInput.value;
      editForm.style.display = "none";
    }
    editForm.removeEventListener("submit", editHandler);
  }
  editForm.addEventListener("submit", editHandler);
};

const handleDeleteClick = (id)=>{
    console.log(todo_list[id - 1]);
    todo_list[id - 1].remove()
}

function createTodo(TODOS_) {
  let createdElement = [];
  TODOS_.forEach((x, i) => {
    const todosElement = document.createElement("div");
    todosElement.setAttribute("class", "todos");
    const element = document.createElement("span");
    const element1 = document.createElement("span");

    element.addEventListener("click", () => handleEditClick(x.id));
    element1.addEventListener("click", () => handleDeleteClick(x.id));
    element.textContent = "edit";
    element1.textContent = "delete";

    let markup = document.createElement("div");
    markup.classList.add("items");
    markup.textContent = x.content;

    let buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons");
    buttonsContainer.appendChild(element);
    buttonsContainer.appendChild(element1);

    let allEelms = [markup, buttonsContainer];

    todosElement.replaceChildren(...allEelms);
    todoList.appendChild(todosElement);
    createdElement.push(todosElement);
  });
  return createdElement;
}
