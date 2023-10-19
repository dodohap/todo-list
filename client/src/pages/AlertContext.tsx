import { ReactNode, createContext, useContext, useState } from "react";
import { ALERT_TYPE, AlertType } from "../typesAndEnums";

const AlertContext = createContext<
  | {
      setAlert: (type: ALERT_TYPE, messages: string | string[]) => void;
      getAlert: () => AlertType;
    }
  | undefined
>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlertState] = useState<AlertType>({
    type: ALERT_TYPE.OFF,
  });

  const setAlert = (type: ALERT_TYPE, messages: string | string[]): void => {
    if (alert.type === type) return;

    if (typeof messages === "string") {
      setAlertState({ type, messages: [messages] });
    } else {
      setAlertState({ type, messages: [...messages] });
    }

    setTimeout(() => {
      setAlertState({ type: ALERT_TYPE.OFF });
    }, 4000);
  };

  const getAlert = (): AlertType => {
    return alert;
  };

  const getAlertMessages = (): string[] => {
    if (alert.type === ALERT_TYPE.OFF) return [];
    return alert.messages;
  };

  return (
    <AlertContext.Provider value={{ setAlert, getAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("kupa");
  }
  return context;
}
