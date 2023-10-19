import { useState } from "react";
import { UserType } from "../types/UserType";

const STORAGE_USER_KEY = "user";

export const useUserStorage = () => {
  const [user, setUserState] = useState<UserType | null>(() => {
    const item = window.localStorage.getItem(STORAGE_USER_KEY);
    return item ? JSON.parse(item) : null;
  });

  const setUser = (user: UserType) => {
    try {
      window.localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      setUserState(user);
    } catch (error) {
      console.error("Error setting user data in localStorage:", error);
    }
  };

  const removeUser = () => {
    try {
      window.localStorage.removeItem(STORAGE_USER_KEY);
      setUserState(null);
    } catch (error) {
      console.error("Error removing user data from localStorage:", error);
    }
  };

  return { setUser, user, removeUser };
};
