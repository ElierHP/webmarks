import React, { createContext, useReducer, useState } from "react";
import dataReducer from "../reducers/dataReducer";
import { v4 as uuidv4 } from "uuid";

const initialData = [
  {
    type: "folder",
    title: "Folder Example",
    id: 1,
    parentId: 0,
    key: uuidv4(),
  },
  {
    type: "folder",
    title: "Second Folder",
    id: 2,
    parentId: 0,
    key: uuidv4(),
  },
  {
    type: "link",
    title: "Example Link",
    url: "https://www.netlify.com/",
    id: 3,
    parentId: 0,
    key: uuidv4(),
  },
  {
    type: "link",
    title: "WLOP",
    url: "https://www.artstation.com/",
    id: 5,
    parentId: 0,
    key: uuidv4(),
  },
  {
    type: "folder",
    title: "Sub Folder",
    id: 4,
    parentId: 1,
    key: uuidv4(),
  },
];

export const ContentData = createContext();
export const ContentMethods = createContext();

export const ContentDataProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, initialData);
  const [appState, setAppState] = useState(0);
  return (
    <ContentData.Provider value={[data, appState]}>
      <ContentMethods.Provider value={[dispatch, setAppState]}>
        {children}
      </ContentMethods.Provider>
    </ContentData.Provider>
  );
};
