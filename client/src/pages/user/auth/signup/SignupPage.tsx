import SignupForm from "./SignupForm";

import "./SignupPageStyle.css";

export default function SignupPage() {
  return (
    <div className="flex-center-container signup-container">
      <div className="flex-row signup-container-content">
        <div className="signup-welcome-message">
          <h1>Zarejestruj się, wypełniając</h1>
          <h1>formularz:</h1>
        </div>

        <SignupForm />
      </div>
    </div>
  );
}
