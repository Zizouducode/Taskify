import React from "react";
import { useState } from "react";

interface Props {
  dispatch: React.Dispatch<any>;
}

const InputField = ({ dispatch }: Props) => {
  const [todo, setTodo] = useState<string>("");
  //Functions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    dispatch({ type: "add", payload: { todo: todo, e: e } });
    setTodo("");
  };
  return (
    <form
      className="relative m-auto flex w-11/12 items-center justify-center"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        className="w-full rounded-full border-none px-8 py-5  text-2xl outline-green-600 duration-200"
        type="text"
        placeholder="Entrez une tâche"
        value={todo}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button
        className=" absolute right-0 m-3 h-12 w-12 rounded-full bg-black font-bold text-white shadow-inner hover:scale-125 hover:bg-green-300"
        type="submit"
      >
        GO
      </button>
    </form>
  );
};

export default InputField;
