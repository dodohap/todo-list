type LoginFormType = {
  userName: string;
  password: string;
  errorMessage: string;
};

type SignUpFormType = {
  userName: string;
  email: string;
  password: string;
  validPassword: string;
  errorMessage: string;
};

type AddTodoFormType = {
  status: string;
  description: string;
  errorMessage: string;
};
