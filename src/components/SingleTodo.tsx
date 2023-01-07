import React, { useRef, useEffect, useState } from "react";

//Incons
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";

//Models
import { Todo } from "../models/todo";

//Props typing
interface Props {
  todo: Todo;

  dispatch: React.Dispatch<any>;
}

const SingleTodo: React.FC<Props> = ({ todo, dispatch }) => {
  //States and variables
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  //Functions
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setIsDisabled(!isDisabled);
    dispatch({ type: "edit", payload: { id: id, editTodo: editTodo } });
    // setTodos(
    //   todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    // );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setEditTodo(e.target.value);
  };

  //UseRef to create a ref on the input to update
  const inputRef = useRef<HTMLInputElement>(null);
  //Use effect to set to focus on the input when isDisbled change
  useEffect(() => {
    inputRef.current?.focus();
  }, [isDisabled]);

  return (
    <form
      className="m-5 flex h-36 w-6/12 justify-between bg-slate-300 p-8"
      onSubmit={(e) => {
        handleEdit(e, todo.id);
      }}
    >
      <input
        className={todo.isDone ? "line-through" : "none"}
        type="text"
        ref={inputRef}
        disabled={isDisabled}
        value={editTodo}
        onChange={(e) => {
          handleChange(e, todo.id);
        }}
      />
      <div className="flex  gap-5 text-lg">
        <span className="cursor-pointer">
          <AiOutlineEdit onClick={(e) => handleEdit(e, todo.id)} />
        </span>
        <span className="cursor-pointer">
          <AiFillDelete
            onClick={() => {
              dispatch({ type: "remove", payload: todo.id });
            }}
          />
        </span>
        <span
          className="cursor-pointer"
          onClick={() => {
            dispatch({ type: "done", payload: todo.id });
          }}
        >
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
