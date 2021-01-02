import React, { createContext, useReducer, useState } from "react";
import contentReducer from "../reducers/contentReducer";
import { v4 as uuidv4 } from "uuid";

const initialData = {
  id: uuidv4(),
  folders: [
    {
      title: "Art",
      id: uuidv4(),
      key: uuidv4(),
      links: [],
      folders: [],
    },
    {
      title: "Development",
      id: uuidv4(),
      key: uuidv4(),
      links: [],
      folders: [],
    },
  ],
  links: [
    {
      title: "WLOP Art",
      url: "https://www.artstation.com/wlop",
      id: uuidv4(),
      key: uuidv4(),
    },
  ],
};

export const ContentData = createContext();
export const ContentMethods = createContext();

export const ContentDataProvider = ({ children }) => {
  //Make a new reducer function for [data, dataDispatch] that has all the Crud operations that deal with modifying data.
  const [data] = useState(initialData);
  const [appState, dispatch] = useReducer(contentReducer, data);
  return (
    <ContentData.Provider value={[appState, data]}>
      <ContentMethods.Provider value={dispatch}>
        {children}
      </ContentMethods.Provider>
    </ContentData.Provider>
  );
};
