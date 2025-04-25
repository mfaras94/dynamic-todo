const form = document.querySelector("[data-form]");
const input = document.querySelector("[data-input]");
const todoList = document.querySelector("[data-todo-list]");
const todoCount = document.querySelector("[data-todo-count]");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const todoText = input.value.trim();
  if (todoText.length === 0) {
    alert("Please enter a todo!");
    return;
  }
  const todo = document.createElement("li");
  todo.dataset.todo = Date.now();
  todo.classList.add("todo-item");
  todo.innerHTML = `
        <span data-todo-text>${todoText}</span>
        <button data-edit>Edit</button>
        <button data-delete>Delete</button>
        <button data-done>Done</button>
    `;
  todoList.append(todo);
  input.value = "";
  updateCount();
});
function updateCount() {
  const count = listCount().newCount;
  todoCount.textContent = count;
}
updateCount();

function listCount() {
  let todoList = document.querySelectorAll(".todo-item");
  const count = `${todoList.length} items`;
  return {
    newCount: count,
  };
}

function deleteTodo(todo) {
  confirm("Are you sure!") ? todo.remove() : null;
}
function editTodo(todo) {
  const todoText = todo.querySelector("[data-todo-text]");
  const newText = prompt("Edit your todo:", todoText.textContent);
  newText ? (todoText.textContent = newText.trim()) : null;
}

function doneTodo(todo) {
  const todoText = todo.querySelector("[data-todo-text]");
  todoText.style.textDecoration = "line-through";
  todoText.style.color = "gray";
  todoText.style.fontStyle = "italic";
  const buttons = todo.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.remove();
  });
}

todoList.addEventListener("click", function (e) {
  const todo = e.target.closest(".todo-item");
  if (!todo) return;

  if (e.target.matches("[data-delete]")) deleteTodo(todo);
  if (e.target.matches("[data-edit]")) editTodo(todo);
  if (e.target.matches("[data-done]")) doneTodo(todo);

  updateCount();
});
