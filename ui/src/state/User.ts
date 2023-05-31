import { Dispatch, createContext, useContext } from "react";

type UserContextAction =
  | { type: "LOGIN"; payload?: User }
  | { type: "LOGOUT" }
  | { type: "REGISTER"; payload: User }
  | { type: "UPDATE"; payload: User };

type User = {
  name: string;
  email: string;
  role: string;
};

type UserState = {
  isAuthenticated: boolean;
  user: User | undefined;
};

type UserContext = {
  state: UserState;
  dispatch: Dispatch<UserContextAction>;
};

export const initialUserState: UserState = {
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
}