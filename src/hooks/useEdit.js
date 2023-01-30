import { useState, useContext } from "react";
import { AppData } from "../context/AppDataProvider";
import { deleteItem } from "../utils/api";
import { serverErrorMsg } from "../utils/serverErrorMsg";

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
        message: serverErrorMsg,
      });
    }
    setIsLoading(false);
  };

  return { isEditing, setIsEditing, handleDelete };
};

export default useEdit;
