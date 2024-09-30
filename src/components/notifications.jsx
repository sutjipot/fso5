import { useNotification } from "../NotificationContext";

export const ErrorNotification = () => {
  const {
    state: { errorMessage },
  } = useNotification();
  if (!errorMessage) return null;
  return <div className="error">{errorMessage}</div>;
};

export const SuccessNotification = () => {
  const {
    state: { successMessage },
  } = useNotification();
  if (!successMessage) return null;
  return <div className="success">{successMessage}</div>;
};
