import { useState, useContext } from "react";
import { AppData } from "../context/AppDataProvider";
import { Navigate } from "react-router-dom";
import { deleteItem } from "../utils/api";

const useEdit = ({ _id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { dispatch, setError, setIsLoading } = useContext(AppData);

  const handleDelete = async (query) => {
    setIsLoading(true);
    try {
      await deleteItem(query, _id, dispatch);
    } catch (error) {
      setError({
        status: 500,
        message:
          "Server is currently offline. Please refresh the page or try again at a later time.",
      });
    }
    setIsLoading(false);
  };

  return { isEditing, setIsEditing, handleDelete };
};

export default useEdit;
