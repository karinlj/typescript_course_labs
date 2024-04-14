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
// const handleError = (err: unknown) => {
//   if (err instanceof Error) {
//     alert("Something went wrong: " + err.message);
//   } else {
//     //this should never happen??
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
    console.error("###get todos and render error:", error);
  }
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

  try {
    await createTodosFetch(newTodo);
  } catch (error) {
    console.error("###create todo error:", error);
  }
  newTodoInputEl.value = "";

  getTodosAndRender();
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

  try {
    updateTodoFetch(id, { completed: !updatedTodo.completed });
  } catch (error) {
    console.error("###update todo error:", error);
  }
  //render UI list
  getTodosAndRender();
};

//delete item
_global.deleteTodo = async (id: number) => {
  try {
    await deleteTodoFetch(id);
  } catch (error) {
    console.error("###delete todo error:", error);
  }
  getTodosAndRender();
};

//initial get and render
getTodosAndRender();
