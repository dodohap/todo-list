import LoginForm from "./LoginForm";

import "./LoginPageStyle.css";

export default function LoginPage() {
  return (
    <div className="flex-center-container login-container">
      <div className="flex-row login-container-content">
        <div className="login-welcome-message">
          <h1>Zaloguj się, wypełniając</h1>
          <h1>formularz:</h1>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
