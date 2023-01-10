import React, { createContext, useReducer, useState } from "react";
import dataReducer from "../reducers/dataReducer";

export const AppData = createContext();

export const AppDataProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, []);
  const [appState, setAppState] = useState("0");
  const [directory, setDirectory] = useState("Main");

  return (
    <AppData.Provider
      value={{ data, dispatch, appState, setAppState, directory, setDirectory }}
    >
      {children}
    </AppData.Provider>
  );
};
