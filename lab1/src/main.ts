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
const todoListEl = document.querySelector<HTMLUListElement>(".todo-list")!;
// console.log("todoListEl: ", todoListEl);

const newTodoForm = document.querySelector<HTMLFormElement>(".new-todo-form");
// console.log("newTodoForm: ", newTodoForm);

const newTodoTitleEl =
  document.querySelector<HTMLFormElement>(".new-todo-title");

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

//original list
const todos: Todo[] = [
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

//render list
const renderTodos = () => {
  todoListEl.innerHTML = todos
    .map((todo) => {
      return `<li id="listItem" class="list-item ${
        todo.completed ? "completed" : ""
      }">
    ${todo.title}
  </li>`;
    })
    .join("");
};

const completeTodo = () => {
  todos.forEach;
};
//submit form
newTodoForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  //id
  const todoIds: number[] = todos.map((todo) => todo.id); // [1, 2, 3]
  const maxId = Math.max(0, ...todoIds); // Math.max( 1, 2, 3 )

  //new title
  const newTodoTitle = newTodoTitleEl?.value;

  //new todo
  const newTodo: Todo = {
    id: maxId,
    title: newTodoTitle,
    completed: false,
  };

  //push to list
  todos.push(newTodo);

  //render new list
  renderTodos();

  if (newTodoTitleEl) {
    newTodoTitleEl.value = "";
  }
});

//initial render of list
renderTodos();
