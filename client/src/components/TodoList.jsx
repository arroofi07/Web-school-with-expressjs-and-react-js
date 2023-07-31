import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useState, useEffect } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  const updatedTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );

    const storedTodos = JSON.parse(localStorage.getItem("todos"));

    if (storedTodos) {
      const updatedStoredTodos = storedTodos.map((storedTodo) =>
        storedTodo.id === todoId ? newValue : storedTodo
      );
      localStorage.setItem("todos", JSON.stringify(updatedStoredTodos));
    }
  };

  const removeTodo = (id) => {
    const removeArr = todos.filter((todo) => todo.id !== id);
    setTodos(removeArr);

    const storedTodos = JSON.parse(localStorage.getItem("todos"));

    if (storedTodos) {
      const updatedStoredTodos = storedTodos.filter(
        (storedTodo) => storedTodo.id !== id
      );
      localStorage.setItem("todos", JSON.stringify(updatedStoredTodos));
    }
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div
      style={{
        boxShadow: "0 0 10px black",
        background:
          "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
      }}
      className="inline-block font-extralightsad space-y-3  items-center justify-center bg-yellow-600 w-[80%] mt-24 rounded-2xl  "
    >
      <h1 className="text-[20px] font-serif text-black capitalize mt-3 ">
        apa rencanamu hari ini
      </h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updatedTodo={updatedTodo}
      />
      <p className="text-transparent h-2 "> </p>
    </div>
  );
}

export default TodoList;
