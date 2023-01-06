import React from "react";
import { useState } from "react";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";

//Models
import { Todo } from "../models/todo";

//Props typing
interface Props {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, setTodos }) => {
  //States and variables
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  //Functions
  const handleEdit = () => {
    setIsDisabled(!isDisabled);
  };

  //   const handleChange = (e) => {
  //     setTodo
  //   };
  return (
    <div className="m-5 flex h-36 w-6/12 justify-between bg-slate-300 p-8">
      <input
        type="text"
        disabled={isDisabled}
        value={todo.todo}
        // onChange={handleChange}
      />
      <div className="flex gap-5 text-lg">
        <AiOutlineEdit onClick={handleEdit} />
        <MdDone />
        <AiFillDelete />
      </div>
    </div>
  );
};

export default SingleTodo;
