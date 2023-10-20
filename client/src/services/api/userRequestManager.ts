const lastRequestTimeMap = new Map<number, number>();

export const isTooManyUserRequest = (userId: number): boolean => {
  const currentTimeInMilliseconds = new Date().getTime();
  let lastUserTime = lastRequestTimeMap.get(userId);

  if (lastUserTime) {
    if (new Date().getTime() - lastRequestTimeMap.get(userId)! < 1000) {
      console.log("userID: " + userId, "za duzo zapytan!");
      return true;
    }
  }

  console.log("dodanie do mapy userId: " + userId);
  lastRequestTimeMap.set(userId, currentTimeInMilliseconds);
  return false;
};
