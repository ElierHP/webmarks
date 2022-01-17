import { v4 as uuidv4 } from "uuid";
import { sortByName } from "../utils/sort";

const dataReducer = (state, action) => {
  switch (action.type) {
    case "load":
      return [...action.data];
    case "newFolder":
      const folder = {
        _id: action._id,
        type: action.dataType,
        title: action.title,
        parent_id: action.parent_id,
        key: uuidv4(),
      };
      return [...state, folder];
    case "newLink":
      const link = {
        _id: action._id,
        type: action.dataType,
        title: action.title,
        parent_id: action.parent_id,
        url: action.url,
        key: uuidv4(),
      };
      return [...state, link];
    case "delete":
      //Filter out the deleted item and all of it's children
      return state.filter(
        (item) => item._id !== action._id && item.parent_id !== action._id
      );
    case "edit":
      return state.map((item) =>
        item._id === action._id
          ? { ...item, title: action.newTitle, url: action.url }
          : item
      );
    case "sort":
      const ascArray = sortByName(state, action.order);
      return [...ascArray];
    default:
      return state;
  }
};

export default dataReducer;
