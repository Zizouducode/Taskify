import React from "react";

//Models
import { Todo } from "../models/todo";

//Compnents
import SingleTodo from "./SingleTodo";

//Props typing
interface Props {
  state: Todo[];
  dispatch: React.Dispatch<any>;
}

const TodoList: React.FC<Props> = ({ state, dispatch }: Props) => {
  return (
    <div>
      {state.map((todo) => (
        <SingleTodo todo={todo} key={todo.id} dispatch={dispatch} />
      ))}
    </div>
  );
};

export default TodoList;
