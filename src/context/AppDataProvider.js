import React, { createContext, useReducer, useState } from "react";
import dataReducer from "../reducers/dataReducer";

export const AppData = createContext();
export const AppState = createContext();

export const AppDataProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, []);
  const [appState, setAppState] = useState("0");
  const [directory, setDirectory] = useState("Main");

  return (
    <AppData.Provider value={[data, dispatch]}>
      <AppState.Provider
        value={[appState, setAppState, directory, setDirectory]}
      >
        {children}
      </AppState.Provider>
    </AppData.Provider>
  );
};
