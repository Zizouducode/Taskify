import React, { useRef, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

//Incons
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";

//Models
import { Todo } from "../models/todo";

//Props typing
interface Props {
  todo: Todo;
  dispatch: React.Dispatch<any>;
  index: number;
}

const SingleTodo: React.FC<Props> = ({ todo, dispatch, index }) => {
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
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          onSubmit={(e) => {
            handleEdit(e, todo.id);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          key={index}
        >
          <div className="  m-2 flex h-24 items-start rounded-lg bg-light-white p-8 drop-shadow-md transition duration-300 hover:scale-110 ">
            <input
              className={todo.isDone ? " line-through" : "none"}
              type="text"
              ref={inputRef}
              disabled={isDisabled}
              value={editTodo}
              onChange={(e) => {
                handleChange(e, todo.id);
              }}
            />
            <div className="flex  gap-1.5 text-lg">
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
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
