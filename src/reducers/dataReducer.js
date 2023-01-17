import { sortByName } from "../utils/sort";

const dataReducer = (state, action) => {
  switch (action.type) {
    case "load":
      return [...action.payload];

    case "newFolder":
      const folder = {
        _id: action._id,
        type: action.dataType,
        title: action.title,
        parent_id: action.parent_id,
        key: action._id,
      };
      return [...state, folder];
    case "newLink":
      const link = {
        _id: action._id,
        type: action.dataType,
        title: action.title,
        parent_id: action.parent_id,
        url: action.url,
        key: action._id,
      };
      return [...state, link];
    case "newNote":
      const note = action.payload;
      return [...state, note];
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
    case "editNote":
      const { _id, title, body } = action.payload;

      return state.map((item) =>
        item._id === _id ? { ...item, title, body } : item
      );
    case "sort":
      const ascArray = sortByName(state, action.order);
      return [...ascArray];
    default:
      return state;
  }
};

export default dataReducer;
