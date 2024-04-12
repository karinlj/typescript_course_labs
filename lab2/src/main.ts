import "./styles.scss";
import { Todo } from "./todo_types";
import {
  getTodosFetch,
  createTodoFetch,
  getTodos,
  createTodo,
  updateTodoFetch,
  updateTodo,
  deleteTodoFetch,
  deleteTodo,
} from "./api";
import { CreateTodoData } from "./todo_types";

///////////Todolist 1
//find elements
const todoListEl = document.querySelector<HTMLUListElement>("#todo-list")!;
const newTodoFormEl = document.querySelector<HTMLFormElement>("#new-todo-form");

//local variable
let todos: Todo[] = [];

//need to have async-await, so new function
const getTodosAndRender = async () => {
  //get todos from serer
  todos = await getTodosFetch();

  //render UI
  renderTodos();
};

//global scope
const _global = window /* browser */ as any;

//render UI list
const renderTodos = () => {
  todoListEl.innerHTML = todos
    .map((todo) => {
      //   console.log("renderTodos-todo:", todo);
      return `<li id="listItem" class="list-item">
        <span  class="${todo.completed ? "completed" : ""}"> ${
        todo.title
      }</span>
        <div>
           <input type="checkbox" class="toggle" id="${todo.id}" ${
        todo.completed ? "checked" : ""
      } onchange="toggleCompleted(${todo.id})"/> 
        <button class="delete-todo" onclick="deleteTodo(${todo.id})">x</button>
        </div>
    </li>`;
    })
    .join("");
};

//submit form
//create new todo, POST and rerender
newTodoFormEl?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newTodoInputEl =
    document.querySelector<HTMLFormElement>("#new-todo-input");

  //new todo
  const newTodo: CreateTodoData = {
    title: newTodoInputEl?.value,
    completed: false,
  };

  //UTAN DB
  //todos.push(newTodo);

  // POST new todo to API
  await createTodoFetch(newTodo);

  if (newTodoInputEl) {
    newTodoInputEl.value = "";
  }
  //render UI list
  getTodosAndRender();
});

//toggleCompleted
_global.toggleCompleted = async (id: number) => {
  //UTAN DB
  //map/if -> search for item to modify
  // const updatedTodos = todos.map((todo) => {
  //   if (todo.id === id) {
  //     return { ...todo, completed: !todo.completed };
  //   } else return todo;
  // });
  // todos = updatedTodos;
  // renderTodos();

  //search for item to modify
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return;
  }
  await updateTodoFetch(id, { completed: !todo.completed });
  //render UI list
  getTodosAndRender();
};

//delete
_global.deleteTodo = async (id: number) => {
  //UTAN DB
  //   const updatedTodos = todos.filter((todo) => {
  //     return todo.id != id;
  //   });
  //   todos = updatedTodos;
  //   renderTodos();

  await deleteTodoFetch(id);
  //render UI list
  getTodosAndRender();
};

//initial render UI list
getTodosAndRender();
