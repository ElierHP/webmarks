import { useState, useContext } from "react";
import { AppData } from "../context/AppDataProvider";
import { Navigate } from "react-router-dom";
import { deleteItem } from "../utils/api";

const useEdit = ({ _id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [, dispatch] = useContext(AppData);

  const handleDelete = async (query) => {
    try {
      deleteItem(query, _id, dispatch);
    } catch (error) {
      return <Navigate to="/404" />;
    }
  };

  return [isEditing, setIsEditing, handleDelete];
};

export default useEdit;
