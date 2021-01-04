import React, { createContext, useReducer, useState } from "react";
import contentReducer from "../reducers/contentReducer";
import dataReducer from "../reducers/dataReducer";
import { v4 as uuidv4 } from "uuid";

const initialData = {
  id: 0,
  folders: [
    {
      title: "Art",
      id: 1,
      parentId: 0,
      key: uuidv4(),
      links: [],
      folders: [],
    },
    {
      title: "Development",
      id: 2,
      parentId: 0,
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
  const [data, dataDispatch] = useReducer(dataReducer, initialData);
  const [appState, dispatch] = useReducer(contentReducer, data);
  return (
    <ContentData.Provider value={[appState, data]}>
      <ContentMethods.Provider value={[dispatch, dataDispatch]}>
        {children}
      </ContentMethods.Provider>
    </ContentData.Provider>
  );
};
