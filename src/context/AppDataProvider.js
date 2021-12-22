import React, { createContext, useReducer, useState, useEffect } from "react";
import dataReducer from "../reducers/dataReducer";
import axios from "axios";

export const AppData = createContext();
export const AppState = createContext();

export const AppDataProvider = ({ children }) => {
  //Fetch server data
  useEffect(() => {
    async function fetchData() {
      //fetch folder data
      const folders = await axios.get("http://localhost:5000/folders");
      //fetch link data
      const links = await axios.get("http://localhost:5000/links");
      //load them onto the state
      dispatch({ type: "load", data: [...folders.data, ...links.data] });
    }
    fetchData().catch((err) => console.log(err));
  }, []);

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
