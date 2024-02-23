"use strict";
const id = new URLSearchParams(window.location.search).get("id");

const details = document.querySelector(".details");
const editBtn = document.querySelector(".edit");
const txtArea = document.querySelector("#textarea");

const renderDetails = async () => {
  const res = await fetch("http://localhost:3000/todos/" + id);
  const post = await res.json();

  txtArea.value = post.todo;
};

editBtn.addEventListener("click", async () => {
  const res = await fetch("http://localhost:3000/todos/" + id, {
    method: "PATCH",
    body: JSON.stringify({ todo: txtArea.value }),
    headers: { "Content-Type": "application/json" },
  });
  window.location.replace("/index.html");
});

window.addEventListener("DOMContentLoaded", () => renderDetails());
