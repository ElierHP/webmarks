import { useState, useContext } from "react";
import { ContentMethods } from "../context/ContentDataProvider";

const useContentState = ({ title, _id, url }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [urlValue, setUrlValue] = useState(url);
  const [dispatch] = useContext(ContentMethods);

  const handleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "edit", _id: _id, newTitle: titleValue, url: urlValue });
    setIsEditing(false);
  };

  const handleCheckIcon = () => {
    dispatch({ type: "edit", _id: _id, newTitle: titleValue, url: urlValue });
    setIsEditing(false);
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
    handleSubmit,
    handleCheckIcon,
    handleUrlChange,
    urlValue,
    handleCloseIcon,
  ];
};

export default useContentState;
