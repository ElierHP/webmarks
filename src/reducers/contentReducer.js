const contentReducer = (state, action) => {
  switch (action.type) {
    case "folderClick":
      return state.folders !== [] ? action.item : "";
    default:
      return state;
  }
};

export default contentReducer;
