import "./UserDashboardPageStyle.css";
import TodoList from "./todolist/TodoList";
import { useUserStorage } from "../../../hooks/useUserStorage";
import { Navigate, useNavigate } from "react-router-dom";
import { logOutApi } from "../../../services/api/authApi";
import {
  API_RESPONSE_STATUS,
  ApiResponseType,
  UserType,
} from "../../../typesAndEnums";

export default function UserDashboardPage() {
  const navigate = useNavigate();
  const { user, removeUser } = useUserStorage();

  if (!user) return <Navigate to="/auth/login" replace />;

  const logOutUser = async () => {
    const res: ApiResponseType<UserType> = await logOutApi(user.id);
    if (res.status === API_RESPONSE_STATUS.SUCCESS) {
      removeUser();
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className="dashboard-navbar">
        <h1>Witaj, {user.userName}!</h1>

        <button onClick={() => logOutUser()}>Wyloguj się</button>
      </div>

      <TodoList />
    </div>
  );
}
