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
import { getNotes } from "../utils/api/note";
import { serverErrorMsg } from "../utils/serverErrorMsg";
import { User } from "./UserProvider";

export const AppData = createContext();

export const AppDataProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, []);
  const [appState, setAppState] = useState({
    id: "0",
    title: "Main",
    parentId: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    status: 200,
    message: "ok",
  });
  const [note, setNote] = useState({ isEditing: false });

  // User Context
  const { user } = useContext(User);

  // Load folders & links data.
  useEffect(() => {
    const getData = async () => {
      if (user) {
        try {
          setIsLoading(true);
          //fetch folder data
          const folders = await getFolders();
          //fetch link data
          const links = await getLinks();
          //fetch note data
          const notes = await getNotes();

          //load data onto the app
          dispatch({
            type: "load",
            payload: [...folders.data, ...links.data, ...notes.data],
          });
        } catch (error) {
          setError({
            status: 500,
            message: serverErrorMsg,
          });
        }
      }
    };

    getData();
    setIsLoading(false);
  }, [user]);

  return (
    <AppData.Provider
      value={{
        data,
        dispatch,
        appState,
        setAppState,
        isLoading,
        setIsLoading,
        error,
        setError,
        note,
        setNote,
      }}
    >
      {children}
    </AppData.Provider>
  );
};
