import { v4 as uuidv4 } from "uuid";

const dataReducer = (state, action) => {
  switch (action.type) {
    case "addNewItem":
      const addNewItem = {
        type: action.itemType,
        title: action.title,
        url: action.url,
        id: uuidv4(),
        parentId: action.parentId,
        key: uuidv4(),
      };
      return [...state, addNewItem];
    case "delete":
      //Filter out the deleted item and all of it's children
      return state.filter(
        (item) => item.id !== action.id && item.parentId !== action.id
      );
    case "edit":
      return state.map((item) =>
        item.id === action.id
          ? { ...item, title: action.newTitle, url: action.url }
          : item
      );
    default:
      return state;
  }
};

export default dataReducer;
