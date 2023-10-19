import {
  AddTodoFormType,
  LogInFormType,
  SignUpFormType,
} from "../typesAndEnums";

export const isMinLenght = (string: string, min: number): boolean => {
  return string.length > min;
};

export const isMaxLenght = (string: string, max: number): boolean => {
  return string.length < max;
};

export const minAndMaxLenght = (
  string: string,
  min: number,
  max: number
): boolean => {
  return isMinLenght(string, min) && isMaxLenght(string, max);
};

export const isEmail = (email: string): boolean => {
  let emailCheck = String(email).toLowerCase();
  if (!emailCheck) return false;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(emailCheck);
};

export const isEmpty = (string: string) => {
  return string.length === 0;
};

export const isAnyStringEmpty = (strings: string[]) => {
  return strings.some((el) => el.length === 0);
};

export const validateLoginForm = (
  loginForm: LogInFormType
): string | undefined => {
  if (isAnyStringEmpty([loginForm.userName, loginForm.password]))
    return "Usupelnij formularz, aby sie zalogowac!";
};

export const validateSignUpForm = (
  signUpForm: SignUpFormType
): string | undefined => {
  if (
    isAnyStringEmpty([
      signUpForm.userName,
      signUpForm.email,
      signUpForm.password,
      signUpForm.validPassword,
    ])
  ) {
    return "Wypelnij formularz, aby sie zarejestrowac!";
  }

  if (!isEmail(signUpForm.email)) return "Podaj prawidlowy email!";

  if (signUpForm.password !== signUpForm.validPassword)
    return "Hasla do siebie nie pasuja!";

  if (!minAndMaxLenght(signUpForm.userName, 3, 16))
    return "Nazwa uzytkownika musi byc wieksza od 3 i mniejsza od 16!";
};

export const validateAddTodoForm = (
  addTodoForm: AddTodoFormType
): string | undefined => {
  if (isAnyStringEmpty([addTodoForm.status, addTodoForm.description]))
    return "Uzupelnij formularz, aby dodac zadanie!";

  if (!isMaxLenght(addTodoForm.description, 40))
    return "Opis zadania jest za dlugi! (maksymalnie 40 znaków)";
};
