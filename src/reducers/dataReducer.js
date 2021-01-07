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
      const newState = state.filter((item) =>
        item.id === action.id || item.parentId === action.id ? null : item
      );
      return [...newState];
    default:
      return state;
  }
};

export default dataReducer;
