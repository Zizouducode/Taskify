import React, { useState } from "react";

//Components
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";

//Models
import { Todo } from "./models/todo";

const App: React.FC = () => {
  //States and variables
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  //Functions
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };
  console.log("todos=>", todos);
  return (
    <div className="m-auto h-screen max-w-5xl justify-center bg-green-300 p-1">
      <h1 className="mb-5 text-center text-3xl font-bold">Taskify</h1>
      <InputField todo={todo} setTodo={setTodo} handleAddTodo={handleAddTodo} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
