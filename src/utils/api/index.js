import axios from "axios";

export const baseUrl = "https://webmarks-server.herokuapp.com";

export const deleteItem = async (query, _id, dispatch) => {
  const res = await axios.delete(`${baseUrl}/${query}/delete`, {
    data: { _id },
  });
  dispatch({ type: "delete", _id: res.data._id });
};
