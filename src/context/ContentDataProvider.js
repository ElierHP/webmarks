import React, { createContext, useReducer, useState, useEffect } from "react";
import dataReducer from "../reducers/dataReducer";
import axios from "axios";

export const ContentData = createContext();
export const ContentMethods = createContext();
export const HeaderContext = createContext();

export const ContentDataProvider = ({ children }) => {
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
    <HeaderContext.Provider value={[directory, setDirectory]}>
      <ContentData.Provider value={[data, appState]}>
        <ContentMethods.Provider value={[dispatch, setAppState]}>
          {children}
        </ContentMethods.Provider>
      </ContentData.Provider>
    </HeaderContext.Provider>
  );
};
