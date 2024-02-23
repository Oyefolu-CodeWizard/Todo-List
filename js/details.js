const id = new URLSearchParams(window.location.search).get("id");

const details = document.querySelector(".details");
const deleteBtn = document.querySelector(".delete");

const renderDetails = async () => {
  const res = await fetch("http://localhost:3000/todos/" + id);
  const post = await res.json();
  console.log(post);

  const template = `
    <h3>${post.todo}</h3>
  `;

  details.innerHTML = template;
};

deleteBtn.addEventListener("click", async () => {
  const res = await fetch("http://localhost:3000/todos/" + id, {
    method: "DELETE",
  });
  window.location.replace("/index.html");
});

window.addEventListener("DOMContentLoaded", () => renderDetails());
