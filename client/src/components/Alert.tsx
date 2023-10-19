import "./AlertStyle.css";

type alertType =
  | { type: "succes" | "off"; message: string; show: boolean }
  | { type: "error"; message: string; show: boolean };

export function Alert({ type, message, show }: alertType) {
  if (type === "error") {
    return (
      show && (
        <div className="alert alert-error">
          <div className="alert-title">Blad!</div>
          <div className="alert-message">{message}</div>
        </div>
      )
    );
  }

  if (type === "succes") {
    return (
      show && (
        <div className="alert alert-succes">
          <div className="alert-title">Sukces!</div>
          <div className="alert-message">{message}</div>
        </div>
      )
    );
  }
}
