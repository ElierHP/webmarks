import React, { createContext, useReducer } from "react";
import contentReducer from "../reducers/contentReducer";

const initialData = {
  folders: [
    {
      title: "Art",
      links: [],
      folders: [
        {
          title: "Development",
          links: [
            {
              title: "WLOP Art",
              url: "https://www.artstation.com/wlop",
              favicon: "",
              key: 3,
            },
          ],
          folders: [
            {
              type: "folder",
              title: "Reference",
              links: [],
              folders: [
                {
                  type: "folder",
                  title: "Models",
                  links: [],
                  folders: [],
                  key: 2,
                },
              ],
              key: 2,
            },
          ],
          key: 2,
        },
      ],
      key: 1,
    },
    {
      type: "folder",
      title: "Development",
      links: [],
      folders: [],
      key: 2,
    },
  ],
  links: [
    {
      title: "WLOP Art",
      url: "https://www.artstation.com/wlop",
      favicon: "",
      key: 3,
    },
  ],
};

export const ContentData = createContext();
export const ContentMethods = createContext();

export const ContentDataProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(contentReducer, initialData);
  return (
    <ContentData.Provider value={[appState, initialData]}>
      <ContentMethods.Provider value={dispatch}>
        {children}
      </ContentMethods.Provider>
    </ContentData.Provider>
  );
};
