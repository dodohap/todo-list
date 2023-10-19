import { TODO_STATUS } from "../typesAndEnums";

export const statusMap: Record<
  string,
  { statusColor: string; statusButtonText: string; nextStatus: TODO_STATUS }
> = {
  [TODO_STATUS.DONE]: {
    statusColor: "green",
    statusButtonText: "Usun",
    nextStatus: TODO_STATUS.TODO,
  },
  [TODO_STATUS.INPROGRESS]: {
    statusColor: "darkgoldenrod",
    statusButtonText: "Ustaw na zrobione",
    nextStatus: TODO_STATUS.DONE,
  },
  [TODO_STATUS.TODO]: {
    statusColor: "rgb(8, 105, 185)",
    statusButtonText: "Ustaw na w trakcie",
    nextStatus: TODO_STATUS.INPROGRESS,
  },
};
