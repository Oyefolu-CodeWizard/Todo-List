"use strict";
const todos = document.querySelector(".todo-list");
const newTask = document.querySelector(".add-task");

const renderTodos = async () => {
  let uri = "http://localhost:3000/todos";

  const res = await fetch(uri);
  const todo = await res.json();

  let template = "";
  todo.forEach((list) => {
    template += `
    <div class="todos">
        <p>${list.todo}</p>
        <div class="modify">
            <a href="/edit.html?id=${list.id}"><small>edit</small></a>
            <a href="/details.html?id=${list.id}"><small>delete</small></a>   
        </div>   
    </div>
  `;
  });
  todos.innerHTML = template;
};

newTask.addEventListener("click", () => {
  window.location.href = "/create.html";
});

window.addEventListener("DOMContentLoaded", () => renderTodos());
