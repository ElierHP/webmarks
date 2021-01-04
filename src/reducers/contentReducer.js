import { v4 as uuidv4 } from "uuid";

const contentReducer = (state, action) => {
  switch (action.type) {
    case "home":
      return action.appState;
    case "folderClick":
      return state.folders !== [] ? action.item : "";
    case "addFolder":
      const newFolder = {
        title: action.title,
        id: uuidv4(),
        key: uuidv4(),
        links: [],
        folders: [],
      };
      return {
        ...state,
        folders: [...state.folders, newFolder],
      };
    default:
      return state;
  }
};

export default contentReducer;
