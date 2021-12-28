import { useState, useContext } from "react";
import { AppData } from "../context/AppDataProvider";
import axios from "axios";

const useEdit = ({ _id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [, dispatch] = useContext(AppData);

  const handleDelete = async (query) => {
    try {
      const res = await axios.delete(`http://localhost:5000/${query}/delete`, {
        data: { _id },
      });
      dispatch({ type: "delete", _id: res.data._id });
    } catch (error) {
      console.log(error);
    }
  };

  return [isEditing, setIsEditing, handleDelete];
};

export default useEdit;
