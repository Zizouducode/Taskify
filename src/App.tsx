import React, { useReducer, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

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

//Create Reducer
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
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  //Functions
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    let add,
      active = state,
      complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      active.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    setCompletedTodos(complete);
  };

  console.log("state=>", state);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="m-auto h-screen max-w-5xl justify-center bg-green-300 p-1">
        <h1 className="mb-5 text-center text-3xl font-bold">Taskify</h1>
        <InputField dispatch={dispatch} />
        <TodoList
          state={state}
          dispatch={dispatch}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
