import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function Todo({ todos, completeTodo, removeTodo, updatedTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const sumbitUpdate = (value) => {
    updatedTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={sumbitUpdate} />;
  }

  return todos
    .slice()
    .reverse()
    .map((todo, key) => (
      <div
        id={todo.isComplete ? "todo-row-complate" : "todo-row"}
        // style={{
        //   background:
        //     "linear-gradient(90deg,rgba(93, 12, 255, 1) 0%,rgba(155, 0, 250, 1) 100%)",
        // }}
        style={{ border: "1px solid white", boxShadow: "0 0 10px black" }}
        className="  relative text-white  rounded-[8px] w-[90%] max-w-full lg:ml-[50px] lg:h-[50px] text-center items-center flex justify-center ml-[15px]  h-[40px] "
        key={key}
      >
        <div
          style={{ textShadow: "0 0 10px black" }}
          className="whitespace-nowrap overflow-hidden overflow-ellipsis  "
          key={todo.id}
          onClick={() => completeTodo(todo.id)}
        >
          {todo.text}
        </div>
        <div
          //  className="icons"
          className="absolute right-1 cursor-pointer lg:space-y-2  lg:text-black text-white "
        >
          <RiCloseCircleLine
            onClick={() => removeTodo(todo.id)}
            className="delete-icon lg:hover:text-white"
          />
          <TiEdit
            onClick={() => setEdit({ id: todo.id, value: todo.text })}
            className="edit-icon lg:hover:text-white "
          />
        </div>
      </div>
    ));
}

export default Todo;
