import api from "./api";
import { ApiResponse } from "../../types/ApiTypes";
import { UserType } from "../../types/UserType";
import { TodoType } from "../../types/TodoType";

export const addTodoApi = async (
  user: UserType,
  description: string,
  status: string
): Promise<ApiResponse> => {
  if (user === null) return { status: "error", message: "User is null!" };

  try {
    const res = await api.post(
      "todo/create",
      JSON.stringify({
        userId: user.id,
        description: description,
        status: status,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { status: "succes", res: res.data };
  } catch (err: any) {
    return {
      status: "error",
      message: err.response?.data?.error || "Błąd serwera",
    };
  }
};

export const deleteTodoApi = async (todoId: number): Promise<ApiResponse> => {
  try {
    const res = await api.delete("todo/delete/" + todoId, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { status: "succes", res: res.data };
  } catch (err: any) {
    return {
      status: "error",
      message: err.response?.data?.error || "Błąd serwera",
    };
  }
};

export const updateTodoApi = async (
  todoData: TodoType
): Promise<ApiResponse> => {
  try {
    const res = await api.put(
      "todo/update",
      JSON.stringify({
        ...todoData,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { status: "succes", res: res.data };
  } catch (err: any) {
    return {
      status: "error",
      message: err.response?.data?.error || "Błąd serwera",
    };
  }
};

export const getUserTodoListApi = async (
  user: UserType
): Promise<ApiResponse> => {
  if (user === null) return { status: "error", message: "User is null!" };

  try {
    const res = await api.post(
      "user/todolist/" + user.id,
      JSON.stringify({
        id: user.id,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { status: "succes", res: res.data };
  } catch (err: any) {
    return {
      status: "error",
      message: err.response?.data?.error || "Błąd serwera",
    };
  }
};

export default { addTodoApi, deleteTodoApi, updateTodoApi, getUserTodoListApi };
