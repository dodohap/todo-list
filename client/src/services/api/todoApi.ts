import {
  API_RESPONSE_STATUS,
  ApiResponseType,
  TodoType,
  UserType,
} from "../../typesAndEnums";
import api from "./api";

export const addTodoApi = async (
  user: UserType,
  description: string,
  status: string
): Promise<ApiResponseType<TodoType>> => {
  if (!user)
    return { status: API_RESPONSE_STATUS.ERROR, errorMessage: "User is null!" };

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

    return { status: API_RESPONSE_STATUS.SUCCESS, data: res.data.data };
  } catch (err: any) {
    return {
      status: API_RESPONSE_STATUS.ERROR,
      errorMessage: err.response?.data?.error || "Błąd serwera",
    };
  }
};

export const deleteTodoApi = async (
  todoId: number
): Promise<ApiResponseType<TodoType>> => {
  try {
    const res = await api.delete("todo/delete/" + todoId, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { status: API_RESPONSE_STATUS.SUCCESS, data: res.data.data };
  } catch (err: any) {
    return {
      status: API_RESPONSE_STATUS.ERROR,
      errorMessage: err.response?.data?.error || "Błąd serwera",
    };
  }
};

export const updateTodoApi = async (
  todoData: TodoType
): Promise<ApiResponseType<TodoType>> => {
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
    return { status: API_RESPONSE_STATUS.SUCCESS, data: res.data.data };
  } catch (err: any) {
    return {
      status: API_RESPONSE_STATUS.ERROR,
      errorMessage: err.response?.data?.error || "Błąd serwera",
    };
  }
};

export const getUserTodoListApi = async (
  user: UserType
): Promise<ApiResponseType<TodoType[]>> => {
  if (!user)
    return { status: API_RESPONSE_STATUS.ERROR, errorMessage: "User is null!" };

  try {
    const res = await api.post(
      "todo/list/user",
      JSON.stringify({
        id: user.id,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { status: API_RESPONSE_STATUS.SUCCESS, data: res.data.data };
  } catch (err: any) {
    return {
      status: API_RESPONSE_STATUS.ERROR,
      errorMessage: err.response?.data?.error || "Błąd serwera",
    };
  }
};

export default { addTodoApi, deleteTodoApi, updateTodoApi, getUserTodoListApi };
