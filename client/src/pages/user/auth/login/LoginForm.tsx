import { MouseEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserStorage } from "../../../../hooks/useUserStorage";
import { ApiResponse } from "../../../../types/ApiTypes";
import { logInApi } from "../../../../services/api/authApi";
import { validateLoginForm } from "../../../../utils/validator";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser, user } = useUserStorage();

  const [formState, setFormState] = useState<LoginFormType>({
    userName: "",
    password: "",
    errorMessage: "",
  });

  const setErrorMessage = (errorMessage: string) => {
    setFormState((prevStatus) => ({
      ...prevStatus,
      errorMessage: errorMessage,
    }));
  };

  const submitForm = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let validatorError = validateLoginForm(formState);
    if (validatorError) {
      setErrorMessage(validatorError);
      return;
    }

    const res: ApiResponse = await logInApi(
      formState.userName,
      formState.password
    );

    if (res.status === "succes") {
      setUser(res.res.data);
      navigate("/user/dashboard");
    } else if (res.status === "error") {
      setErrorMessage(res.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      errorMessage: "",
    }));
  };

  if (user) return <Navigate to={"/user/dashboard"} replace />;

  return (
    <form className="flex-center-container login-form">
      <div className="login-form-error">
        <p>{formState.errorMessage}</p>
      </div>

      <div>
        <p>Nazwa uzytkownika</p>
        <input
          type="text"
          name="userName"
          value={formState.userName}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <p>Haslo</p>
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleInputChange}
        />
      </div>

      <button className="login-submit-button" onClick={(e) => submitForm(e)}>
        Zaloguj sie
      </button>
    </form>
  );
}
