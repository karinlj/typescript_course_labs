//Interface: - like a type alias, but it can be extended.
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
//Omit: - omits id from Todo.
export type CreateTodoData = Omit<Todo, "id">;

//Partial: all the properties are optional
export type UpdateTodoData = Partial<Todo>;
