import axios from "axios";
import { baseUrl } from "./index";
import { serverErrorMsg } from "../serverErrorMsg";

// GET /notes
export const getNotes = async (sort = "asc") =>
  await axios.get(`${baseUrl}/notes?sort=${sort}`);

// POST /notes/new
export const createNewNote = async (title, body, app) => {
  app.setIsLoading(true);
  try {
    const res = await axios.post(`${baseUrl}/notes/new`, {
      title,
      body,
      parent_id: app.appState.id,
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
  } catch (error) {
    app.setError({
      status: 500,
      message: serverErrorMsg,
    });
  }
  app.setIsLoading(false);
};

// PATCH /notes/edit
export const editNote = async (title, body, app) => {
  const { note, dispatch, setError, setIsLoading } = app;

  setIsLoading(true);
  try {
    const res = await axios.patch(`${baseUrl}/notes/edit`, {
      _id: note._id,
      title,
      body,
    });

    dispatch({
      type: "editNote",
      payload: {
        _id: res.data._id,
        title: res.data.title,
        body: res.data.body,
      },
    });
  } catch (error) {
    setError({
      status: 500,
      message: serverErrorMsg,
    });
  }
  setIsLoading(false);
};
