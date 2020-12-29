const contentReducer = (state, action) => {
  switch (action.type) {
    case "home":
      return action.appState;
    case "folderClick":
      return state.folders !== [] ? action.item : "";
    default:
      return state;
  }
};

export default contentReducer;
