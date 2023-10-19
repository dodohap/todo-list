import { useEffect, useState } from "react";
import { useUserStorage } from "../../../../hooks/useUserStorage";
import { TodoType } from "../../../../types/TodoType";
import { getUserTodoListApi } from "../../../../services/api/todoApi";
import { Alert } from "../../../../components/Alert";
import AddTodo from "./AddTodo";
import Todo from "./Todo";

import "./TodoListStyle.css";

export default function TodoList() {
  const { user } = useUserStorage();

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [alert, setAlertState] = useState<alertType>({
    type: "off",
    message: "",
  });

  const setAlert = (type: "succes" | "error", message: string) => {
    if (alert.type === type) return;
    setAlertState((prev) => ({
      type,
      message,
    }));

    setTimeout(() => {
      setAlertState({ type: "off", message: "" });
    }, 4000);
  };

  const addTodo = (newTodo: TodoType): void => {
    console.log(newTodo);
    if (!newTodo) {
      console.log("New todo is " + newTodo);
      return;
    }

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTodoList = (updatedTodo: TodoType) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );

    setTodos(updatedTodos);
  };

  const removeTodo = (removedTodo: TodoType) => {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== removedTodo.id);
    });
  };

  const getUserTodo = async () => {
    const res = await getUserTodoListApi(user);
    if (res.status === "succes") {
      setTodos(res.res.data);
    }
  };

  useEffect(() => {
    getUserTodo();
  }, []);

  return (
    <>
      <div className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            updateTodoList={updateTodoList}
            removeTodo={removeTodo}
          />
        ))}

        <AddTodo addTodo={addTodo} setAlert={setAlert} />
      </div>
      {
        <Alert
          type={alert.type}
          message={alert.message}
          show={alert.type !== "off"}
        />
      }
    </>
  );
}
