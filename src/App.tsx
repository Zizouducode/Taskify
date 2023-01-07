import React, { useReducer, useState } from "react";

//Components
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";

//Models
import { Todo } from "./models/todo";

//Typing
type Actions =
  | {
      type: "add";
      payload: { todo: string; e: React.SyntheticEvent };
    }
  | {
      type: "remove";
      payload: number;
    }
  | {
      type: "done";
      payload: number;
    }
  | {
      type: "edit";
      payload: any;
    };

//Reducer
const TodoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case "add":
      return (
        action.payload.e.preventDefault(),
        [...state, { id: Date.now(), todo: action.payload.todo, isDone: false }]
      );
    case "remove":
      return state.filter((todo) => todo.id !== action.payload);
    case "done":
      return state.map((todo) => {
        return todo.id === action.payload
          ? { ...todo, isDone: !todo.isDone }
          : todo;
      });
    case "edit":
      return state.map((todo) => {
        return todo.id === action.payload.id
          ? { ...todo, todo: action.payload.editTodo }
          : todo;
      });
    default:
      return state;
  }
};

const App: React.FC = () => {
  //States and variables

  const [state, dispatch] = useReducer(TodoReducer, []);

  //Functions

  console.log("state=>", state);
  return (
    <div className="m-auto h-screen max-w-5xl justify-center bg-green-300 p-1">
      <h1 className="mb-5 text-center text-3xl font-bold">Taskify</h1>
      <InputField dispatch={dispatch} />
      <TodoList state={state} dispatch={dispatch} />
    </div>
  );
};

export default App;
