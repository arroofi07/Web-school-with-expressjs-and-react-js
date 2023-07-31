import { useEffect, useRef, useState } from "react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!input.trim()) {
    //   return;
    // }

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput("");
  };
  return (
    <form
      // className="todo-form"
      className="space-x-4"
      onSubmit={handleSubmit}
    >
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Edit  list"
            value={input}
            name="text"
            autoComplete="off"
            style={{
              border: "2px solid white",
              boxShadow: "0 0 10px skyblue",
            }}
            // className="todo-input"
            className="rounded-[8px] pl-1 ml-[29px] outline-none lg:ml-[23px] lg:w-[400px] bg-sky-500 placeholder:text-black focus:placeholder-transparent w-[210px] "
            onChange={handleChange}
            ref={inputRef}
          />
          <button
            // className="todo-button"
            className="text-black text-[20px]  "
          >
            <CiEdit />
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Masukkan list..."
            value={input}
            name="text"
            autoComplete="off"
            style={{
              border: "2px solid white",
              boxShadow: "0 0 10px skyblue",
            }}
            // className="todo-input"
            className="rounded-[8px] pl-1 ml-[29px] lg:ml-[20px] outline-none bg-sky-500 placeholder:text-black focus:placeholder-transparent lg:w-[400px] w-[210px] "
            onChange={handleChange}
            ref={inputRef}
          />
          <button
            // className="todo-button"
            className="text-[17px] text-black font-extralight "
          >
            <BsFillPlusSquareFill />
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
