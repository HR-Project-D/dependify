import { Dispatch, createContext, useContext } from "react";

type UIContextAction = { type: "TOGGLE_COMMAND_MENU" };

type UIState = {
  commandMenu: boolean;
};

type UIContext = {
  state: UIState;
  dispatch: Dispatch<UIContextAction>;
};

export const initialUIState: UIState = {
  commandMenu: false,
};

export function UIReducer(state: UIState, action: UIContextAction) {
  switch (action.type) {
    case "TOGGLE_COMMAND_MENU":
      return {
        ...state,
        commandMenu: !state.commandMenu,
      };

    default:
      return state;
  }
}

export const UIContext = createContext<UIContext | undefined>(undefined);

export const useUIContext = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUIContext must be used within a UIProvider");
  }

  return context;
};
