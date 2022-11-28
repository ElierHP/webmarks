import axios from "axios";

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://webmarks-server-production.up.railway.app";

export const deleteItem = async (query, _id, dispatch) => {
  const res = await axios.delete(`${baseUrl}/${query}/delete`, {
    data: { _id },
  });
  dispatch({ type: "delete", _id: res.data._id });
};
