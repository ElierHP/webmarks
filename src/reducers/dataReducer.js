import { v4 as uuidv4 } from "uuid";

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
      const sortedArray = state.sort((a, b) => {
        //Sort by Type
        let typeA = a.type === "folder" ? 1 : -1;
        let typeB = b.type === "folder" ? 1 : -1;
        if (typeA < typeB) return +1;
        if (typeA > typeB) return -1;

        //Sort by Name
        let nameA = a.title.toUpperCase();
        let nameB = b.title.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      return [...sortedArray];
    default:
      return state;
  }
};

export default dataReducer;
