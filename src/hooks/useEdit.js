import { useState, useContext } from "react";
import { AppData } from "../context/AppDataProvider";
import { deleteFolder } from "../utils/api/folder";
import { Navigate } from "react-router-dom";

const useEdit = ({ _id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [, dispatch] = useContext(AppData);

  const handleDelete = async (query) => {
    try {
      deleteFolder(query, _id, dispatch);
    } catch (error) {
      return <Navigate to="/404" />;
    }
  };

  return [isEditing, setIsEditing, handleDelete];
};

export default useEdit;
