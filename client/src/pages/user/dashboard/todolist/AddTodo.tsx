import { useState } from "react";
import { useUserStorage } from "../../../../hooks/useUserStorage";
import { TODO_STATUS, statusMap } from "../../../../utils/todoStatusUtil";
import { validateAddTodoForm } from "../../../../utils/validator";
import { TodoType } from "../../../../types/TodoType";
import { addTodoApi } from "../../../../services/api/todoApi";

export default function AddTodo({
  addTodo,
  setAlert,
}: {
  addTodo: (newTodo: TodoType) => void;
  setAlert: (type: "succes" | "error", message: string) => void;
}) {
  const [formState, setFormState] = useState<AddTodoFormType>({
    status: TODO_STATUS.TODO,
    description: "",
    errorMessage: "",
  });

  const [selectStatusOn, setSelectStatusOn] = useState<boolean>(false);

  const { user } = useUserStorage();

  const { statusColor } = statusMap[formState.status];

  const changeFormState = (name: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const setErrorMessage = (errorMessage: string) => {
    setAlert("error", errorMessage);
    setFormState((prevState) => ({
      ...prevState,
      errorMessage: errorMessage,
    }));
  };

  const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let validatorError = validateAddTodoForm(formState);
    if (validatorError) {
      setErrorMessage(validatorError);
      return;
    }

    const res = await addTodoApi(user, formState.description, formState.status);
    if (res.status === "error") {
      setErrorMessage(res.message);
      return;
    } else if (res.status === "succes") {
      let newTodo: TodoType = res.res.data;
      if (!newTodo) {
        console.log("NewTodo is " + newTodo);
        return;
      }

      addTodo(newTodo);
      setAlert("succes", "Dodano nowe zadanie!");
    }
  };

  return (
    <>
      <div className="add-todo-card-body">
        <div className="add-todo-card-description">
          <div className="add-todo-card-description-element">
            <div>
              <div
                className="add-todo--select-status"
                onClick={() => setSelectStatusOn((prev) => !prev)}
              >
                <p style={{ color: statusColor }}>{formState.status} (zmien)</p>
                <div
                  className="add-todo--status-options"
                  defaultValue={TODO_STATUS.TODO}
                >
                  {selectStatusOn && (
                    <>
                      {Object.values(TODO_STATUS).map((value, index) => (
                        <div
                          style={{ color: statusColor }}
                          key={index}
                          onClick={() => changeFormState("status", value)}
                        >
                          {value}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <textarea
                name="description"
                cols={21}
                rows={4}
                maxLength={40}
                onChange={(e) => changeFormState(e.target.name, e.target.value)}
              ></textarea>
            </div>

            <div className="add-todo-card-buttons">
              <button
                className="add-todo--btn--add-todo"
                onClick={(e) => submitForm(e)}
              >
                Dodaj
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
