import { useEffect, useState } from "react";
import { useUserStorage } from "../../../../hooks/useUserStorage";
import {
  addTodoApi,
  deleteTodoApi,
  getUserTodoListApi,
  updateTodoApi,
} from "../../../../services/api/todoApi";
import AddTodo from "./AddTodo";
import Todo from "./Todo";
import "./TodoListStyle.css";
import {
  ALERT_TYPE,
  API_RESPONSE_STATUS,
  ApiResponseType,
  TODO_STATUS,
  TodoType,
} from "../../../../typesAndEnums";
import { useAlert } from "../../../AlertContext";
import { statusMap } from "../../../../utils/todoStatusUtil";
import { isTooManyUserRequest } from "../../../../services/api/userRequestManager";

export default function TodoList() {
  const { user } = useUserStorage();
  const { setAlert } = useAlert();
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = async (description: string, status: TODO_STATUS) => {
    const apiResponse: ApiResponseType<TodoType> = await addTodoApi(
      user,
      description,
      status
    );

    if (apiResponse.status === API_RESPONSE_STATUS.SUCCESS) {
      let newTodo: TodoType = apiResponse.data;
      if (!newTodo) {
        setAlert(ALERT_TYPE.ERROR, "Nie udalo się dodać nowego zadania!");
        throw new Error("New todo is: " + newTodo);
      }

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setAlert(ALERT_TYPE.SUCCESS, "Dodałeś nowe zadanie!");
      return;
    }

    if (apiResponse.status === API_RESPONSE_STATUS.ERROR) {
      setAlert(ALERT_TYPE.ERROR, "Nie udalo się dodać nowego zadania!");
      throw new Error(apiResponse.errorMessage);
    }
  };

  const updateTodoList = async (todo: TodoType) => {
    if (isTooManyUserRequest(todo.userId)) {
      setAlert(
        ALERT_TYPE.ERROR,
        "Wyslyasz za duzo zapytan do db! (todo in api)"
      );
      return;
    }

    if (todo.status === TODO_STATUS.DONE) {
      const apiResponse: ApiResponseType<TodoType> = await deleteTodoApi(
        todo.id
      );

      if (apiResponse.status === API_RESPONSE_STATUS.ERROR) {
        setAlert(ALERT_TYPE.ERROR, "Nie udało się usunąć zadania!");
        throw new Error(apiResponse.errorMessage);
      }

      setTodos((currentTodos) => {
        return currentTodos.filter((todo) => todo.id !== apiResponse.data.id);
      });

      setAlert(ALERT_TYPE.SUCCESS, "Usunąłeś zadanie!");
      return;
    }

    const { nextStatus } = statusMap[todo.status];
    if (!nextStatus) return;

    const apiResponse: ApiResponseType<TodoType> = await updateTodoApi({
      status: TODO_STATUS.DONE,
      createdAt: todo.createdAt,
      description: todo.description,
      id: todo.id,
      userId: todo.userId,
    });

    if (apiResponse.status === API_RESPONSE_STATUS.ERROR) {
      setAlert(ALERT_TYPE.ERROR, "Nie udało się zaktualizować zadania!");
      throw new Error(apiResponse.errorMessage);
    }

    const updatedTodos = todos.map((todo) =>
      todo.id === apiResponse.data.id ? apiResponse.data : todo
    );

    setTodos(updatedTodos);
    setAlert(ALERT_TYPE.SUCCESS, "Zaktualizowałeś zadanie!");
  };

  const getUserTodo = async () => {
    const apiResponse: ApiResponseType<TodoType[]> = await getUserTodoListApi(
      user
    );

    if (apiResponse.status === API_RESPONSE_STATUS.SUCCESS) {
      setTodos(apiResponse.data);
      return;
    }

    setAlert(ALERT_TYPE.ERROR, "Nie udał się pobrać Twoich zadań (?)");
  };

  useEffect(() => {
    getUserTodo();
  }, []);

  return (
    <>
      <div className="todo-list">
        {todos &&
          todos.map((todo) => (
            <Todo key={todo.id} todo={todo} updateTodoList={updateTodoList} />
          ))}

        <AddTodo addTodo={addTodo} />
      </div>
    </>
  );
}
