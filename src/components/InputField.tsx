import React from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleAddTodo }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
  return (
    <form
      className="relative m-auto flex w-11/12 items-center justify-center"
      onSubmit={handleAddTodo}
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
