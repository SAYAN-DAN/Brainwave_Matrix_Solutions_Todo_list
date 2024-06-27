const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

// Retrieve the list from localStorage and handle the case where it might be null
let list = JSON.parse(localStorage.getItem("list")) || [];

// Use forEach only if the list is not null
list.forEach((task) => {
  todolist(task);
});

formEl.addEventListener("submit", function (event) {
  event.preventDefault();
  todolist();
});

function todolist(task) {
  let newtask = inputEl.value;
  if (task) {
    newtask = task.name;
  }
  const liEl = document.createElement("li");
  liEl.innerText = newtask;
  ulEl.appendChild(liEl);
  inputEl.value = "";

  const checkbtnEl = document.createElement("div");
  checkbtnEl.innerHTML = `<i class="fa-solid fa-square-check"></i>`;
  liEl.appendChild(checkbtnEl);

  const trashbtnEl = document.createElement("div");
  trashbtnEl.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  liEl.appendChild(trashbtnEl);

  if (task && task.checked) {
    liEl.classList.add("checked");
  }

  checkbtnEl.addEventListener("click", function () {
    liEl.classList.toggle("checked");
    updatelocalstorage();
  });

  trashbtnEl.addEventListener("click", function () {
    liEl.remove();
    updatelocalstorage();
  });

  updatelocalstorage();
}

function updatelocalstorage() {
  const liEls = document.querySelectorAll("li");
  list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}
