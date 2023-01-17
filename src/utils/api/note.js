import axios from "axios";
import { baseUrl } from "./index";

// GET /notes
export const getNotes = async () => await axios.get(`${baseUrl}/notes`);

// POST /notes/new
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

// PATCH /notes/edit
export const editNote = async (title, body, app) => {
  const { note, dispatch, setError } = app;

  try {
    const res = await axios.patch(`${baseUrl}/notes/edit`, {
      _id: note._id,
      title,
      body,
    });

    dispatch({
      type: "edit",
      payload: {
        _id: res.data._id,
        title: res.data.title,
        body: res.data.body,
      },
    });
  } catch (error) {
    setError({
      status: 500,
      message:
        "Server is currently offline. Please refresh the page or try again at a later time.",
    });
  }
};
