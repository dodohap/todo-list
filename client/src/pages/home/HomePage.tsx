import { Link, Navigate } from "react-router-dom";
import "./HomePageStyle.css";
import { useUserStorage } from "../../hooks/useUserStorage";

export default function HomePage() {
  const { user } = useUserStorage();

  if (user) return <Navigate to={"user/dashboard"} replace />;

  return (
    <div className="flex-center-container home-container">
      <div className="flex-row">
        <h1>Witaj!</h1>
        <div className="home-options">
          <p>
            <Link to={"/auth/login"}>Kliknij, aby sie zalogowac!</Link>
          </p>
          <p>
            <Link to={"/auth/signup"}>Klknij, aby sie zarejestrowac!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
