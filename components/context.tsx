import React, { FC, useMemo, useReducer } from "react";
import { ThemeProvider } from "next-themes";

export interface State {
  startAddress: string;
  endAddressList: Array<EndAddress>;
  directions: Array<DirectionsResult>;
}

const initialState = {
  startAddress: "",
  endAddressList: [{ directions: "" }],
  directions: [],
};

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = "UIContext";

type Action =
  | {
      type: "SET_START_ADDRESS";
      value: string;
    }
  | {
      type: "ADD_END_ADDRESS";
      value: EndAddress;
    }
  | {
      type: "DELETE_END_ADDRESS";
      value: EndAddress;
    }
  | {
      type: "SET_DIRECTIONS";
    };

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_START_ADDRESS": {
      return {
        ...state,
        startAddress: action.value,
      };
    }
    case "ADD_END_ADDRESS": {
      return {
        ...state,
        endAddressList: [...state.endAddressList, action.value],
      };
    }
    // case "DELETE_END_ADDRESS": {
    //   return {
    //     ...state,
    //     displayDropdown: true,
    //   };
    // }
  }
}

export const UIProvider: FC = (props) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const setStartAddress = (value: string) =>
    dispatch({ type: "SET_START_ADDRESS", value });

  const addEndAddress = (value: EndAddress) =>
    dispatch({ type: "ADD_END_ADDRESS", value });

  // const deleteEndAddress = (value: string) =>
  //   dispatch({ type: "DELETE_END_ADDRESS", value });

  // const setDirections = (value: string) =>
  //   dispatch({ type: "SET_DIRECTIONS", value });

  const value = useMemo(
    () => ({
      ...state,
      setStartAddress,
      addEndAddress,
      // deleteEndAddress,
      // setDirections,
    }),
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext: FC = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);
