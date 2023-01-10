import React, {
  createContext,
  useReducer,
  useState,
  useEffect,
  useContext,
} from "react";
import dataReducer from "../reducers/dataReducer";
import { getFolders } from "../utils/api/folder";
import { getLinks } from "../utils/api/link";
import { User } from "./UserProvider";

export const AppData = createContext();

export const AppDataProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, []);
  const [appState, setAppState] = useState("0");
  const [directory, setDirectory] = useState("Main");

  const { user } = useContext(User);

  // Load folders & links data.
  useEffect(() => {
    const getData = async () => {
      if (user) {
        //fetch folder data
        const folders = await getFolders();
        //fetch link data
        const links = await getLinks();
        //load data onto the app
        dispatch({ type: "load", data: [...folders.data, ...links.data] });
      }
    };

    getData();
  }, [user]);

  return (
    <AppData.Provider
      value={{ data, dispatch, appState, setAppState, directory, setDirectory }}
    >
      {children}
    </AppData.Provider>
  );
};
