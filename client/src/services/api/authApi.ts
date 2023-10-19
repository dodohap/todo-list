import {
  API_RESPONSE_STATUS,
  ApiResponseType,
  UserType,
} from "../../typesAndEnums";
import api from "./api";

export const signInApi = async (
  userName: string,
  email: string,
  password: string
): Promise<ApiResponseType<UserType>> => {
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

    return { status: API_RESPONSE_STATUS.SUCCESS, data: res.data };
  } catch (err: any) {
    return {
      status: API_RESPONSE_STATUS.ERROR,
      errorMessage: err.response?.data?.error || "Bład serwera",
    };
  }
};

export const logInApi = async (
  userName: string,
  password: string
): Promise<ApiResponseType<UserType>> => {
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

    return { status: API_RESPONSE_STATUS.SUCCESS, data: res.data.data };
  } catch (err: any) {
    return {
      status: API_RESPONSE_STATUS.ERROR,
      errorMessage: err.response?.data?.error || "Błąd serwera",
    };
  }
};

export const logOutApi = async (
  userId: number
): Promise<ApiResponseType<UserType>> => {
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

    return { status: API_RESPONSE_STATUS.SUCCESS, data: res.data };
  } catch (err: any) {
    return {
      status: API_RESPONSE_STATUS.ERROR,
      errorMessage: err.response?.data?.error || "Błąd serwera",
    };
  }
};

export default { signInApi, logInApi, logOutApi };
