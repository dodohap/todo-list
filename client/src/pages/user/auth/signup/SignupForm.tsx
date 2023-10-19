import { useState } from "react";
import { validateSignUpForm } from "../../../../utils/validator";
import { useNavigate } from "react-router-dom";
import { signInApi } from "../../../../services/api/authApi";
import { useAlert } from "../../../AlertContext";
import {
  ALERT_TYPE,
  API_RESPONSE_STATUS,
  ApiResponseType,
  SignUpFormType,
  UserType,
} from "../../../../typesAndEnums";

export default function SignupForm() {
  const { setAlert } = useAlert();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<SignUpFormType>({
    userName: "",
    email: "",
    password: "",
    validPassword: "",
    errorMessage: "",
  });

  const setErrorMessage = (message: string) => {
    setFormState((prevState) => ({
      ...prevState,
      errorMessage: message,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      errorMessage: "",
    }));
  };

  const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let validatorError = validateSignUpForm(formState);
    if (validatorError) {
      setErrorMessage(validatorError);
      return;
    }

    const apiResponse: ApiResponseType<UserType> = await signInApi(
      formState.userName,
      formState.email,
      formState.password
    );

    if (apiResponse.status === API_RESPONSE_STATUS.SUCCESS) {
      navigate("/auth/login");
      setAlert(ALERT_TYPE.SUCCESS, "Utworzyłeś konto, teraz się zaloguj!");
      return;
    }

    if (apiResponse.status === API_RESPONSE_STATUS.ERROR)
      setErrorMessage(apiResponse.errorMessage);
  };

  return (
    <form className="flex-center-container signup-form">
      <div className="signup-form-error">
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
        <p>E-mail</p>
        <input
          type="email"
          name="email"
          value={formState.email}
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

      <div>
        <p>Powtorz haslo</p>
        <input
          type="password"
          name="validPassword"
          value={formState.validPassword}
          onChange={handleInputChange}
        />
      </div>

      <button onClick={(e) => submitForm(e)} className="signup-submit-button">
        Zarejestruj sie
      </button>
    </form>
  );
}
