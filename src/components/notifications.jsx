import { useNotification } from "../NotificationContext";

export const ErrorNotification = () => {
  const {
    state: { errorMessage },
  } = useNotification();
  if (!errorMessage) return null;
  return <div className="error">{errorMessage}</div>;
};

export const SuccessNotification = ({ message }) => {
  const {
    state: { successMessage },
  } = useNotification();
  if (!successMessage) return null;
  return <div className="success">{successMessage}</div>;
};

export const showMessages = (setSuccess, setError) => {
  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => {
      setSuccess(null);
    }, 5000);
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return { showSuccess, showError };
};

export default showMessages;
