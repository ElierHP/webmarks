import { useState, useContext } from "react";
import { AppData } from "../context/AppDataProvider";
import axios from "axios";

const useEdit = ({ title, _id, url, params }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [urlValue, setUrlValue] = useState(url);
  const [, dispatch] = useContext(AppData);

  const handleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/${params}/delete`, {
        data: { _id },
      });
      dispatch({ type: "delete", _id: res.data._id });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.patch(`http://localhost:5000/${params}/edit`, {
        _id: _id,
        title: titleValue,
        url: urlValue,
      });
      dispatch({
        type: "edit",
        _id: res.data._id,
        newTitle: res.data.title,
        url: res.data.url,
      });
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUrlChange = (e) => {
    setUrlValue(e.target.value);
  };

  const handleCloseIcon = () => {
    setIsEditing(false);
    //Reset values back to default
    setTitleValue(title);
    setUrlValue(url);
  };

  return [
    isEditing,
    setIsEditing,
    handleChange,
    handleDelete,
    handleEdit,
    handleUrlChange,
    urlValue,
    handleCloseIcon,
  ];
};

export default useEdit;
