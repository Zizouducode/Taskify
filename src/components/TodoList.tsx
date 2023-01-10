import React from "react";
import { Droppable } from "react-beautiful-dnd";

//Models
import { Todo } from "../models/todo";

//Compnents
import SingleTodo from "./SingleTodo";

//Props typing
interface Props {
  state: Todo[];
  dispatch: React.Dispatch<any>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  state,
  dispatch,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className="flex flex-row gap-5 ">
      <Droppable droppableId="TodosList">
        {(provided) => (
          <div
            className="mt-5 flex w-6/12 flex-col items-center bg-white"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span>Active tasks</span>
            {state.map((todo, index) => (
              <SingleTodo
                todo={todo}
                key={todo.id}
                dispatch={dispatch}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="RemoveList">
        {(provided) => (
          <div
            className="mt-5 flex w-6/12 flex-col items-center bg-white"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span>Done Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                todo={todo}
                key={todo.id}
                dispatch={dispatch}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
