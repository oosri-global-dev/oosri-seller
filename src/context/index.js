import { createContext, useContext, useReducer, useMemo } from "react";
import { Reducer } from "./reducer";

const defaultInitialState = {
  user: {},
  showNoBusinessModal: false,
};

export const MainContext = createContext(defaultInitialState);

export const MainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, defaultInitialState);

  // Memoize the context value to prevent unnecessary re-renders of all consumers
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <MainContext.Provider value={contextValue}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};
