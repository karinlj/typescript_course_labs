import "./styles.scss";
import { Todo, CreateTodoData } from "./todo_types";
import {
  getTodosFetch,
  createTodosFetch,
  updateTodoFetch,
  deleteTodoFetch,
} from "./api";

///////////Todolist 1
//find elements
const todoListEl = document.querySelector<HTMLUListElement>("#todo-list")!;
const newTodoFormEl = document.querySelector<HTMLFormElement>("#new-todo-form");

//local global variable - TYPE
let todos: Todo[] = [];

// const handleError = (err: unknown) => {
//   if (err instanceof AxiosError) {
//     alert("Network error, response code was: " + err.message);
//   } else if (err instanceof Error) {
//     alert("Something went wrong: " + err.message);
//   } else {
//     alert("Something went wrong.");
//   }
// };

//get todos - need to have async-await all the way
const getTodosAndRender = async () => {
  try {
    todos = await getTodosFetch();
    //render UI
    renderTodos();
  } catch (error) {
    console.error("Some Error Occurred:", error);
  }

  //   todos = await getTodosFetch();
  //   //render UI
  //   renderTodos();
};

//global scope for toggleCompleted and deleteTodo called from template literal
const _global = window /* browser */ as any;

//render UI list
const renderTodos = () => {
  todoListEl.innerHTML = todos
    .map((todo) => {
      //   console.log("renderTodos-todo:", todo);
      return `<li class="list-item">
        <span class="${todo.completed ? "completed" : ""}"> ${todo.title}</span>
        <div>
           <input type="checkbox" ${todo.completed ? "checked" : ""}
            onchange="toggleCompleted(${todo.id})"/>
       
        <button class="delete-todo" onclick="deleteTodo(${todo.id})">x</button>
        </div>
    </li>`;
    })
    .join("");
};

//submit form, create new todo, POST to db and rerender
newTodoFormEl?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newTodoInputEl =
    document.querySelector<HTMLFormElement>("#new-todo-input")!;

  //new todo - TYPE
  const newTodo: CreateTodoData = {
    title: newTodoInputEl?.value,
    completed: false,
  };

  createTodosFetch(newTodo);
  getTodosAndRender();
  newTodoInputEl.value = "";
});

//toggle comleted item
_global.toggleCompleted = async (id: number) => {
  //already reads completed from data to UI
  console.log("toggleCompleted", todos);
  //need to set completed to data from UI

  //find item
  const updatedTodo = todos.find((todo) => todo.id === id);
  //check
  if (!updatedTodo) {
    return;
  }
  updateTodoFetch(id, { completed: !updatedTodo.completed });
  //render UI list
  getTodosAndRender();
};

//delete item
_global.deleteTodo = async (id: number) => {
  deleteTodoFetch(id);
  getTodosAndRender();
};

//initial get and render
getTodosAndRender();
