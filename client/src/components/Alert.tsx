import { ALERT_TYPE, AlertType } from "../typesAndEnums";

import "./AlertStyle.css";

export function Alert({ type, messages }: AlertType) {
  if (type === ALERT_TYPE.OFF) return null;

  const alertClass =
    type === ALERT_TYPE.ERROR ? "alert alert-error" : "alert alert-success";
  const alertTitle = type === ALERT_TYPE.ERROR ? "Błąd!" : "Sukces!";

  return (
    <div className={alertClass}>
      <div className="alert-title">{alertTitle}</div>
      {messages.map((message, key) => (
        <div key={key} className="alert-message">
          {message}
        </div>
      ))}
    </div>
  );
}
