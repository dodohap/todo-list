import { MouseEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserStorage } from "../../../../hooks/useUserStorage";
import { logInApi } from "../../../../services/api/authApi";
import { validateLoginForm } from "../../../../utils/validator";
import { useAlert } from "../../../AlertContext";
import {
  ALERT_TYPE,
  API_RESPONSE_STATUS,
  ApiResponseType,
  LogInFormType,
  UserType,
} from "../../../../typesAndEnums";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const { setUser, user } = useUserStorage();

  const [formState, setFormState] = useState<LogInFormType>({
    userName: "",
    password: "",
    errorMessage: "",
  });

  const setErrorMessage = (errorMessage: string) => {
    setFormState((prevState) => ({
      ...prevState,
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

    const apiResponse: ApiResponseType<UserType> = await logInApi(
      formState.userName,
      formState.password
    );

    if (apiResponse.status === API_RESPONSE_STATUS.SUCCESS) {
      setUser(apiResponse.data);
      setAlert(ALERT_TYPE.SUCCESS, [
        "Zalogowałeś się!",
        "Ostatnie logowanie: " + apiResponse.data?.lastLogin,
      ]);
      navigate("/user/dashboard");
      return;
    }

    setErrorMessage(apiResponse.errorMessage);
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
