let date = new Date();
export const getFormattedDate = (): string => {
  return `${date.getUTCDate().toString()}.${
    date.getMonth() + 1
  }.${date.getFullYear()}`;
};
