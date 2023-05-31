import { Dispatch, createContext, useContext } from "react";

type UserContextAction =
  | { type: "LOGIN"; payload?: User }
  | { type: "LOGOUT" }
  | { type: "FETCH" }
  | { type: "REGISTER"; payload: User }
  | { type: "UPDATE"; payload: User };

type User = {
  name: string;
  email: string;
  role: string;
};

type UserState = {
  attemptedFetch: boolean;
  isAuthenticated: boolean;
  user: User | undefined;
};

type UserContext = {
  state: UserState;
  dispatch: Dispatch<UserContextAction>;
};

export const initialUserState: UserState = {
  attemptedFetch: false,
  isAuthenticated: false,
  user: undefined,
};

export function userReducer(state: UserState, action: UserContextAction) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };
    case "FETCH":
      return {
        ...state,
        attemptedFetch: true,
      };
    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "UPDATE":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    default:
      return state;
  }
}

export const UserContext = createContext<UserContext | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
