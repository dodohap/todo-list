export enum TODO_STATUS {
  DONE = "ZROBIONE",
  INPROGRESS = "W TRAKCIE",
  TODO = "DO ZROBIENIA",
}

export const statusMap: Record<
  string,
  { statusColor: string; statusButtonText: string; nextStatus: string }
> = {
  [TODO_STATUS.DONE]: {
    statusColor: "green",
    statusButtonText: "Usun",
    nextStatus: "",
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
