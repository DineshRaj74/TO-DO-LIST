var listEl = document.getElementById("list");
var input = document.getElementById("userinput");
var addBtn = document.getElementById("addBtn");
var countEl = document.getElementById("count");
var emptyState = document.getElementById("emptyState");

var tasks = JSON.parse(localStorage.getItem("tasks")) || [
  { text: "Good morning — Leran JAVA today", done: false, hash: makeHash() },
];

// fake commit hash for the "committed" tasks
function makeHash() {
  return Math.random().toString(16).slice(2, 9);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  listEl.innerHTML = "";

  tasks.forEach(function (task, i) {
    var li = document.createElement("li");
    if (task.done) li.classList.add("done");

    li.innerHTML =
      '<div class="checkbox">' +
      (task.done ? "✓" : "") +
      "</div>" +
      '<div class="task-body">' +
      '<div class="task-text">' +
      task.text +
      "</div>" +
      '<div class="meta">' +
      (task.done
        ? 'committed <span class="hash">#' + task.hash + "</span>"
        : "staged") +
      "</div>" +
      "</div>" +
      '<button class="btn-revert">revert</button>';

    li.querySelector(".checkbox").onclick = function () {
      toggleTask(i);
    };
    li.querySelector(".btn-revert").onclick = function () {
      deleteTask(i);
    };

    listEl.appendChild(li);
  });

  var openCount = tasks.filter(function (t) {
    return !t.done;
  }).length;
  countEl.textContent = openCount;

  emptyState.style.display = tasks.length === 0 ? "block" : "none";
  listEl.style.display = tasks.length === 0 ? "none" : "flex";

  saveTasks();
}

function add() {
  var text = input.value.trim();
  if (!text) return;

  tasks.push({ text: text, done: false, hash: makeHash() });
  input.value = "";
  input.focus();
  render();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  render();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  render();
}

addBtn.addEventListener("click", add);
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") add();
});

render();
