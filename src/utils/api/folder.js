import axios from "axios";
import { baseUrl } from "./index";

export const editFolder = async (newTitle, _id, dispatch) => {
  const res = await axios.patch(`${baseUrl}/folders/edit`, {
    _id: _id,
    title: newTitle,
  });
  dispatch({
    type: "edit",
    _id: res.data._id,
    newTitle: res.data.title,
  });
};

export const deleteFolder = async (query, _id, dispatch) => {
  const res = await axios.delete(`${baseUrl}/${query}/delete`, {
    data: { _id },
  });
  dispatch({ type: "delete", _id: res.data._id });
};

export const createNewFolder = async (title, appState, dispatch) => {
  const res = await axios.post(`${baseUrl}/folders/new`, {
    title: title,
    parent_id: appState,
  });
  dispatch({
    type: "newFolder",
    _id: res.data._id,
    dataType: res.data.type,
    title: res.data.title,
    parent_id: res.data.parent_id,
  });
};
