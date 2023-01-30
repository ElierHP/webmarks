import { getFolders } from "./api/folder";
import { getLinks } from "./api/link";
import { getNotes } from "./api/note";
import { serverErrorMsg } from "./serverErrorMsg";

export const sortByTitle = async (sort, dispatch, setIsLoading, setError) => {
  setIsLoading(true);
  try {
    //fetch folder data
    const folders = await getFolders(sort);
    //fetch link data
    const links = await getLinks(sort);
    //fetch note data
    const notes = await getNotes(sort);

    // Load data onto the app
    dispatch({
      type: "load",
      payload: [...folders.data, ...links.data, ...notes.data],
    });
  } catch (error) {
    setError({
      status: 500,
      message: serverErrorMsg,
    });
  }

  setIsLoading(false);
};
