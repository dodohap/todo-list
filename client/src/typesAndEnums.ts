//ENUMS
export enum ALERT_TYPE {
  OFF,
  SUCCESS,
  ERROR,
}

export enum TODO_STATUS {
  DONE = "ZROBIONE",
  INPROGRESS = "W TRAKCIE",
  TODO = "DO ZROBIENIA",
}

export enum API_RESPONSE_STATUS {
  SUCCESS,
  ERROR,
}

//TYPES

//alert types
export type AlertType =
  | { type: ALERT_TYPE.ERROR | ALERT_TYPE.SUCCESS; messages: string[] }
  | { type: ALERT_TYPE.OFF; messages?: string[] };

//api types
export type ApiResponseType<T> =
  | { status: API_RESPONSE_STATUS.SUCCESS; data: T }
  | { status: API_RESPONSE_STATUS.ERROR; errorMessage: string };

//todo types
export type TodoType = {
  id: number;
  userId: number;
  description: string;
  status: TODO_STATUS;
  createdAt: string;
};

//user types
export type UserType =
  | {
      id: number;
      userName: string;
      email: string;
      createdAt: string;
      lastLogin: string;
    }
  | undefined;

//form types
export type LogInFormType = {
  userName: string;
  password: string;
  errorMessage: string;
};

export type SignUpFormType = {
  userName: string;
  email: string;
  password: string;
  validPassword: string;
  errorMessage: string;
};

export type AddTodoFormType = {
  status: TODO_STATUS;
  description: string;
  errorMessage: string;
};
