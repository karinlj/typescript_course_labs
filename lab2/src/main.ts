import "./styles.scss";

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
const todoListEl = document.querySelector<HTMLUListElement>("#todo-list");
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
