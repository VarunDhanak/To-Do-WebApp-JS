// Selector

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document .querySelector(".filter-todo")

// Event Listeners

//If everything loads okay or the page refreshes.
//The corresponding function runs


document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo)
// Functions
function addTodo(e) {
  // Preventing the form submission
if (todoInput.value){
    
    e.preventDefault();
  // todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create Li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");

  // Getting the input to the input
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);

  // Saving todo to local storage
  todoLocalStorage(todoInput.value);

  // Creating CheckMark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-button");
  todoDiv.appendChild(completedButton);

  // Creating Delete button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  // Adding to the todoList
  todoList.appendChild(todoDiv);

  // Clear todoInput value
  todoInput.value = "";


}
  
}


// Function to get back saved todos in the todo list

function getTodos(){
    let todos;
    
    // if there isn't any todo in the local storage
    // We will make an empty array of todos to save the todos into 
    if (localStorage.getItem("todos")===null){
        todos = [];
    }else{
        //If there exist some todos in the local storage already
        //Then we willl parse them back into the array
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((todo) => {
    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create Li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");

    // Getting the input to the input
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);

    // Creating CheckMark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);

    // Creating Delete button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);

    // Adding to the todoList
    todoList.appendChild(todoDiv);
    });
}


// Function to save the do items in the local storage
function todoLocalStorage(todo){
    // Check if there's already a todoin the storage or not
    
    let todos;
    // If there isn't any todo in the local storage then will make an empty array
    if (localStorage.getItem("todos")===null){
        todos = [];
    }else{
        //If there exist some todos in the local storage already
        //Then we willl parse them back into the array
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // After having an empty array or with some todos in it
    // We can push the new todo into this array
    
    todos.push(todo);
    // After passinfg the todo in the array
    // We will store it back in the local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo){
    // Check if there's a todo in the 
    let todos;
    // If there isn't any todo in the local storage then will will make an empty array
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}




function deleteCheck(e) {
  const item = e.target;
  // Check for the trash button
  // We're comparing the classes of clicked element and the button's
  if (item.classList[0] === "trash-button") {
    // Get the parent item
    const todo = item.parentElement;
    // Remove todo from the local storage
    removeLocalTodos(todo);
    // Remove todo from the list on the page
    todo.remove();
  }

  // Checkmark
  if (item.classList[0] === "complete-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}


function filterTodo(e) {
  // Getting the child nodes of the div with todoList class
  const todo = todoList.childNodes;
  // Now after getting the child nodes
  // We are looping over the child elements
  // using the forEach method
  todo.forEach((todo) => {
    switch (e.target.value) {
      // e.target.value contains the value of the select bar
      // Every case is based on the value of the select bar
      case "all":
        // If the value is All
        // We will show all the to-do items
        todo.style.display = "flex";
        break;
      case "completed":
        // If the value is completed
        // We will check if the particular item has the class completed
        // And render only those items
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incompleted":
        // Checking if the element doesn't have the class "completed"
        // Then we will render the element into the div
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}














