import React, { createContext, useReducer, useContext } from "react";

const show_success = "SHOW_SUCCESS";
const show_error = "SHOW_ERROR";
const clear_notification = "CLEAR_NOTIFICATIONS";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case show_success:
      return { ...state, successMessage: action.payload, errorMessage: null };
    case show_error:
      return { ...state, errorMessage: action.payload, successMessage: null };
    case clear_notification:
      return { ...state, errorMessage: null, successMessage: null };
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    successMessage: null,
    errorMessage: null,
  });

  const showSuccess = (message) => {
    dispatch({ type: show_success, payload: message });
    setTimeout(() => {
      dispatch({ type: clear_notification });
    }, 5000);
  };

  const showError = (message) => {
    dispatch({ type: show_error, payload: message });
    setTimeout(() => {
      dispatch({ type: clear_notification });
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ state, showSuccess, showError }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
