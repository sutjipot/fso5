import exp from "constants";
import { createContext, useReducer, useContext } from "react";

const set_user = "SET_USER";
const logout_user = "LOGOUT_USER";

const UserContext = createContext();

const initialState = {
  user: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case set_user:
      return { ...state, user: action.payload };
    case logout_user:
      return { ...state, user: null };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = (user) => {
    dispatch({ type: set_user, payload: user });
  };

  const logoutUser = () => {
    dispatch({ type: logout_user });
  };

  return (
    <UserContext.Provider value={{ state, setUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
