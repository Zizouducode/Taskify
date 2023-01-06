import React from "react";

//Models
import { Todo } from "../models/todo";

//Compnents
import SingleTodo from "./SingleTodo";

//Props typing
interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }: Props) => {
  return (
    <div>
      {todos.map((todo) => (
        <SingleTodo todo={todo} setTodos={setTodos} key={todo.id} />
      ))}
    </div>
  );
};

export default TodoList;
