import "./styles.scss";

////////////1.1. Grundläggande DOM-manipulation

//Type Assertions: HTMLInputElement -  to ensure we can use the value
const firstHeading = document.querySelector<HTMLElement>(".heading-one")!;
firstHeading.style.color = "pink";

const firstParagraph = document.querySelector(
  ".paragraph-one"
) as HTMLInputElement;
firstParagraph.style.border = "1px solid lightgreen";

const firstDiv = document.querySelector(".div-one") as HTMLElement;
firstDiv.innerHTML = "Hello World!";

//1.2. Typer och DOM

// type casting: as. Never gonna be null
const myForm = document.querySelector(".cat-form") as HTMLFormElement;
//                                                               ^?

// const toggleComplete = () => {
//   console.log("toggleComplete");
// };

//Optional chaining (?.)
myForm?.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  // console.log(myForm.children);

  const catName = document.querySelector("#catName") as HTMLInputElement;
  const catDescription = document.querySelector(
    "#catDescription"
  ) as HTMLInputElement;
  const goOutside = document.querySelector("#goOutside") as HTMLInputElement;

  console.log(
    "catName: ",
    catName.value,
    "catDescription: ",
    catDescription.value,
    "goOutside: ",
    goOutside.checked
  );

  //type?
  let selectedRadioValue;
  selectedRadioValue = (
    myForm?.querySelector('[name="color"]:checked') as HTMLInputElement
  ).value;

  catName.value = "";
  catDescription.value = "";
});

///////////Todolist 1
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

//original list
let todos: Todo[] = [
  {
    id: 1,
    title: "Make dinner",
    completed: true,
  },
  {
    id: 2,
    title: "Dancing",
    completed: false,
  },
];

//find elements
const todoListEl = document.querySelector<HTMLUListElement>("#todo-list")!;
const newTodoFormEl = document.querySelector<HTMLFormElement>("#new-todo-form");
const newTodoInputEl =
  document.querySelector<HTMLFormElement>("#new-todo-input");

//global scope
const _global = window /* browser */ as any;

//render UI list
const renderTodos = () => {
  todoListEl.innerHTML = todos
    .map((todo) => {
      // console.log("renderTodos-todo:", todo);
      return `<li id="new-todo-input" class="list-item">
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

_global.deleteTodo = (id: number) => {
  const updatedTodos = todos.filter((todo) => {
    return todo.id != id;
  });
  todos = updatedTodos;
  //render UI list
  renderTodos();
};
_global.toggleCompleted = (id: number) => {
  //map/if -> search for item to modify
  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    } else return todo;
  });
  todos = updatedTodos;
  //render UI list
  renderTodos();
};

//initial render UI list
renderTodos();

//submit form
newTodoFormEl?.addEventListener("submit", (e) => {
  e.preventDefault();
  //id
  const todoIds: number[] = todos.map((todo) => todo.id); // [1, 2, 3]
  const maxId = Math.max(0, ...todoIds); // Math.max( 1, 2, 3 )

  //new todo
  const newTodo: Todo = {
    id: maxId,
    title: newTodoInputEl?.value,
    completed: false,
  };

  //push to list
  todos.push(newTodo);
  // console.log("todos: ", todos);
  //render UI list
  renderTodos();

  if (newTodoInputEl) {
    newTodoInputEl.value = "";
  }
});
