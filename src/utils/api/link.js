import axios from "axios";
import { baseUrl } from "./index";

export const getLinks = async () => await axios.get(`${baseUrl}/links`);

export const createNewLink = async (title, url, appState, dispatch) => {
  const res = await axios.post(`${baseUrl}/links/new`, {
    title: title,
    parent_id: appState,
    url: url,
  });
  dispatch({
    type: "newLink",
    _id: res.data._id,
    dataType: res.data.type,
    title: res.data.title,
    parent_id: res.data.parent_id,
    url: res.data.url,
  });
};

export const editLink = async (newTitle, newUrl, _id, dispatch) => {
  const res = await axios.patch(`${baseUrl}/links/edit`, {
    _id: _id,
    title: newTitle,
    url: newUrl,
  });
  dispatch({
    type: "edit",
    _id: res.data._id,
    newTitle: res.data.title,
    url: res.data.url,
  });
};
