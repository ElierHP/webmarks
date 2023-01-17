import { useContext } from "react";
import { AppData } from "../context/AppDataProvider";

export default function useDirectory() {
  const { data, setDirectory, appState, setAppState } = useContext(AppData);

  const findDirectory = () => {
    //Find parent folder & setAppState to it's parents ID
    const parentFolder = data.find((folder) => folder._id === appState);
    parentFolder ? setAppState(parentFolder.parent_id) : setAppState(0);

    //Find the title of current folder based on parentFolder
    const folder = data.find((folder) => parentFolder.parent_id === folder._id);

    // Set the directory to the current folder title
    folder ? setDirectory(folder.title) : setDirectory("Main");
  };

  return findDirectory;
}
