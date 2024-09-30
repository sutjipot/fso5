import React, { createContext, useReducer, useContext } from "react";

const show_success = "show_success";
const show_error = "show_error";
const clear_notification = "clear_notification";

const NotificationContext = createContext();

const initialState = {
  successMessage: null,
  errorMessage: null,
};

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
  const [state, dispatch] = useReducer(notificationReducer, initialState);

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
