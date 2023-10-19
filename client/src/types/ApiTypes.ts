import { AxiosResponse } from "axios";

export type ApiResponse =
  | { status: "succes"; res: AxiosResponse }
  | { status: "error"; message: string };
