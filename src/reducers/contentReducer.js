const contentReducer = (state, action) => {
  switch (action.type) {
    case "home":
      return action.appState;
    case "folderClick":
      return state.folders !== [] ? action.item : "";
    case "addFolder":
      const newFolder = {
        title: action.title,
        links: [],
        folders: [],
        key: 2,
      };
      //I need to know where I am in the app state so I can add the new folder in current location.
      return { ...state, newFolder };
    default:
      return state;
  }
};

export default contentReducer;
