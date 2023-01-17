import { useContext } from "react";
import { AppData } from "../context/AppDataProvider";

export default function useAppState() {
  const { data, appState, setAppState, note } = useContext(AppData);

  // Finds the correct app state to display after user clicks on close buttons & back arrows.
  const findAppState = () => {
    const appView =
      appState.title !== "Note" &&
      appState.title !== "New Note" &&
      appState.title !== "Edit Note";

    if (appView) {
      // Find the parent folder by using parentId
      const parentFolder = data.find(
        (folder) => folder._id === appState.parentId
      );

      // Change app state to the parent folder.
      if (parentFolder) {
        setAppState({ id: parentFolder._id, title: parentFolder.title });
      } else {
        // If there is no parent folder, reset state to 0.
        setAppState({ id: "0", title: "Main" });
      }
    } else {
      // Else, if it is a Note
      // Find current folder based on appState id.
      const folder = data.find((folder) => folder._id === appState.id);

      if (folder) {
        // Change title back to current folders title.
        setAppState({ ...appState, title: folder.title });
      } else {
        // If there is no parent folder, reset state to 0.
        setAppState({ id: "0", title: "Main" });
      }
    }

    // If note is editing, reset it back to false.
    if (note.isEditing) {
      note.isEditing = false;
    }
  };

  return findAppState;
}
