import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/user/auth/login/LoginPage";
import SignupPage from "./pages/user/auth/signup/SignupPage";
import UserDashboardPage from "./pages/user/dashboard/UserDashboardPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
      <Route path="user/dashboard" element={<UserDashboardPage />} />
    </Routes>
  );
}

export default App;
