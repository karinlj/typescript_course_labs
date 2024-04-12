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

//find elements
const todoListEl = document.querySelector<HTMLUListElement>("#todo-list");
const newTodoFormEl = document.querySelector<HTMLFormElement>("#new-todo-form");
const newTodoInputEl =
  document.querySelector<HTMLFormElement>("#new-todo-input");

const createTodoElement = (todo: Todo) => {
  const listItem = document.createElement("li");
  listItem.classList.add("list-item");
  const text = document.createElement("span");
  text.innerHTML = todo.title;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    console.log("todos: ", todos);
    //toggle completed class
    text.classList.toggle("completed");
  });
  listItem.append(text, checkbox);
  todoListEl?.append(listItem);
};

//render todos
//pass in function
todos.forEach(createTodoElement);

//on form submit
newTodoFormEl?.addEventListener("submit", (e) => {
  e.preventDefault();

  //if null - return
  if (newTodoInputEl?.value == "" || newTodoInputEl?.value == null) return;

  //id
  const todoIds: number[] = todos.map((todo) => todo.id); // [1, 2, 3]
  const maxId = Math.max(0, ...todoIds); // Math.max( 1, 2, 3 )

  //new todo
  const newTodo: Todo = {
    id: maxId,
    title: newTodoInputEl.value,
    completed: false,
  };

  //add data to list
  todos.push(newTodo);

  //create UI
  createTodoElement(newTodo);
  newTodoInputEl.value = "";
});
