import api from "./api";
import { ApiResponse } from "../../types/ApiTypes";

export const signInApi = async (
  userName: string,
  email: string,
  password: string
): Promise<ApiResponse> => {
  try {
    const res = await api.post(
      "auth/signup",
      JSON.stringify({
        userName: userName,
        email: email,
        password: password,
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
      message: err.response?.data?.error || "Bład serwera",
    };
  }
};

export const logInApi = async (
  userName: string,
  password: string
): Promise<ApiResponse> => {
  try {
    const res = await api.post(
      "auth/login",
      JSON.stringify({
        userName: userName,
        password: password,
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

export const logOutApi = async (userId: number): Promise<ApiResponse> => {
  try {
    const res = await api.post(
      "auth/logout",
      JSON.stringify({
        userId: userId,
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

export default { signInApi, logInApi, logOutApi };
