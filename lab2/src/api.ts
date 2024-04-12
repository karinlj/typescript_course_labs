import axios from "axios";
import { Todo } from "./todo_types";
import { CreateTodoData, UpdateTodoData } from "./todo_types";

const baseUrl = import.meta.env.VITE_API_BASEURL || "http://localhost:3000";

//fetch - get
export const getTodosFetch = async () => {
  const response = await fetch(baseUrl + "/todos");
  if (!response.ok) {
    throw new Error("Response was not OK!");
  }
  //typa här
  const data: Todo[] = await response.json();
  console.log("getTodosFetch:", data);
  //varför type assertion här??
  //   return data as Todo[];
  return data;
  //   return (await response.json()) as Todo[];
};
//axios- get
export const getTodos = async () => {
  const response = await axios.get<Todo[]>(baseUrl + "/todos");
  console.log("axios_data:", response.data);
  return response.data;
};

//fetch - create
export const createTodoFetch = async (item: CreateTodoData) => {
  const response = await fetch(baseUrl + "/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw Error("Fetch data error: ");
  }
  const data: Todo[] = await response.json();
  console.log("createTodoFetch:", data);
  return data;
};

//axios- create
export const createTodo = async (item: CreateTodoData) => {
  const response = await axios.post<Todo>(baseUrl + "/todos", item);
  return response.data;
};

//fetch - update
export const updateTodoFetch = async (id: number, itemData: UpdateTodoData) => {
  const response = await fetch(baseUrl + "/todos/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemData),
  });
  if (!response.ok) {
    throw Error("Fetch data error: ");
  }
  const data: Todo[] = await response.json();
  console.log("updateTodoFetch:", data);
  return data;
};

//axios- update
export const updateTodo = async (id: number, itemData: UpdateTodoData) => {
  const response = await axios.patch<Todo>(baseUrl + "/todos/" + id, itemData);
  return response.data;
};

//fetch - delete
export const deleteTodoFetch = async (id: number) => {
  const response = await fetch(baseUrl + "/todos/" + id, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw Error("Fetch data error: ");
  }
  const data: Todo[] = await response.json();
  console.log("deleteTodoFetch:", data);
  return data;
};

//axios- delete
export const deleteTodo = async (id: number) => {
  const response = await axios.delete<Todo>(baseUrl + "/todos/" + id);
  return response.data;
};
