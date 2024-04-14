import axios from "axios";
import { Todo } from "./todo_types";
import { CreateTodoData, UpdateTodoData } from "./todo_types";

const baseUrl = import.meta.env.VITE_API_BASEURL || "http://localhost:3000";

//fetch - get all
export const getTodosFetch = async () => {
  const response = await fetch(baseUrl + "/todos");
  if (!response.ok) {
    throw new Error("Response is not ok!");
  }
  const data: Todo[] = await response.json(); //- TYPE
  //   console.log("getTodosFetch :", data);
  return data;
};

//fetch - create new
//- TYPE
export const createTodosFetch = async (newItem: CreateTodoData) => {
  const response = await fetch(baseUrl + "/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  });
  if (!response.ok) {
    throw new Error(
      "Unable to Fetch Data, Please check URL or Network connectivity"
    );
  }
  const data: Todo[] = await response.json(); //- TYPE
  // console.log("createTodosFetch :", data);
  return data;
};

//fetch - update item
//- TYPE
export const updateTodoFetch = async (id: number, itemData: UpdateTodoData) => {
  const response = await fetch(baseUrl + "/todos/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemData),
  });
  if (!response.ok) {
    throw new Error(
      "Unable to Fetch Data, Please check URL or Network connectivity"
    );
  }
  const data: Todo[] = await response.json(); //- TYPE
  // console.log("updateTodoFetch :", data);
  return data;
};

//fetch - delete item
export const deleteTodoFetch = async (id: number) => {
  const response = await fetch(baseUrl + "/todos/" + id, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(
      "Unable to Fetch Data, Please check URL or Network connectivity"
    );
  }
  const data: Todo[] = await response.json(); //- TYPE
  // console.log("deleteTodoFetch :", data);
  return data;
};

//AXIOS
//axios- get
export const getTodos = async () => {
  const response = await axios.get<Todo[]>(baseUrl + "/todos");
  console.log("axios_data:", response.data);
  return response.data;
};

//axios- create
export const createTodo = async (item: CreateTodoData) => {
  const response = await axios.post<Todo>(baseUrl + "/todos", item);
  return response.data;
};

//axios- update
export const updateTodo = async (id: number, itemData: UpdateTodoData) => {
  const response = await axios.patch<Todo>(baseUrl + "/todos/" + id, itemData);
  return response.data;
};
//axios- delete
export const deleteTodo = async (id: number) => {
  const response = await axios.delete<Todo>(baseUrl + "/todos/" + id);
  return response.data;
};
