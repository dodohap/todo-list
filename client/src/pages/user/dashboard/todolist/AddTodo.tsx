import { useState } from "react";
import { statusMap } from "../../../../utils/todoStatusUtil";
import { validateAddTodoForm } from "../../../../utils/validator";
import {
  ALERT_TYPE,
  AddTodoFormType,
  TODO_STATUS,
} from "../../../../typesAndEnums";
import { useAlert } from "../../../AlertContext";

export default function AddTodo({
  addTodo,
}: {
  addTodo: (description: string, status: TODO_STATUS) => void;
}) {
  const [formState, setFormState] = useState<AddTodoFormType>({
    status: TODO_STATUS.TODO,
    description: "",
    errorMessage: "",
  });

  const { setAlert } = useAlert();
  const [selectStatusOn, setSelectStatusOn] = useState<boolean>(false);

  const { statusColor } = statusMap[formState.status];

  const changeFormState = (name: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const setErrorMessage = (errorMessage: string) => {
    setAlert(ALERT_TYPE.ERROR, errorMessage);
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

    addTodo(formState.description, formState.status);
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
