import axios from "axios";
import { baseUrl } from "./index";

export const getNotes = async () => await axios.get(`${baseUrl}/notes`);

export const createNewNote = async (title, body, app) => {
  app.setIsLoading(true);
  try {
    const res = await axios.post(`${baseUrl}/notes/new`, {
      title,
      body,
      parent_id: app.appState,
    });

    app.dispatch({
      type: "newNote",
      payload: {
        _id: res.data._id,
        dataType: res.data.type,
        title: res.data.title,
        body: res.data.body,
        parent_id: res.data.parent_id,
      },
    });

    app.setDirectory("Main");
  } catch (error) {
    app.setError({
      status: 500,
      message:
        "Server is currently offline. Please refresh the page or try again at a later time.",
    });
  }
  app.setIsLoading(false);
};
