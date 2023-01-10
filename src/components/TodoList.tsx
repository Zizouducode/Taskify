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
    <div className="flex min-h-[30%] flex-row gap-5">
      <Droppable droppableId="TodosList">
        {(provided) => (
          <div
            className="mt-5 flex  min-h-[50]  w-4/12 flex-col justify-between rounded bg-light-grey p-5"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="text-slate-500 font-bold">Todo 👊🏻</span>
            {state.map((todo, index) => (
              <SingleTodo
                todo={todo}
                key={todo.id}
                dispatch={dispatch}
                index={index}
              />
            ))}
            {provided.placeholder}
            <span
              className="mt-5 w-6/12 cursor-pointer text-blue hover:bg-white"
              onClick={(e) => {
                dispatch({ type: "add", payload: { e: e, todo: "" } });
              }}
            >
              ➕ Ajouter une tâche
            </span>
          </div>
        )}
      </Droppable>
      <Droppable droppableId="RemoveList">
        {(provided) => (
          <div
            className="mt-5 flex  min-h-[50]  w-4/12 flex-col rounded bg-light-grey p-5"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="text-slate-500 font-bold ">Done ✅👍🏼</span>
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
