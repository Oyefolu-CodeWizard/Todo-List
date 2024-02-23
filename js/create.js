"use strict";
const todoInput = document.querySelector(".todo-input");

const createTodos = async (e) => {
  e.preventDefault();

  const todos = {
    todo: todoInput.newTodos.value,
  };

  await fetch("http://localhost:3000/todos", {
    method: "POST",
    body: JSON.stringify(todos),
    headers: { "Content-Type": "application/json" },
  });
  window.location.replace("/index.html");
};

todoInput.addEventListener("submit", createTodos);
