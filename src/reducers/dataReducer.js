import { v4 as uuidv4 } from "uuid";

const dataReducer = (state, action) => {
  switch (action.type) {
    case "addFolder":
      const newFolder = {
        title: action.title,
        id: uuidv4(),
        parentId: action.id,
        key: uuidv4(),
        links: [],
        folders: [],
      };
      const newFolders = state.folders.filter((item) => {
        if (item.parentId === action.id) {
          return item.folders.push(newFolder);
        } else {
          return item;
        }
      });

      return {
        ...state,
        folders: newFolders,
      };
    default:
      return state;
  }
};

export default dataReducer;
