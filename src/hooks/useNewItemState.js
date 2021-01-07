import { useState, useContext } from "react";
import { ContentMethods } from "../context/ContentDataProvider";

export default ({ setAnchorEl, parentId, itemType }) => {
  const [isNewItem, setIsNewItem] = useState(false);
  const [itemTitle, setItemTitle] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [dispatch] = useContext(ContentMethods);

  const handleClick = () => {
    setIsNewItem(!isNewItem);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setIsNewItem(null);
  };
  const handleChange = (e) => {
    setItemTitle(e.target.value);
  };
  const handleUrlChange = (e) => {
    setItemUrl(e.target.value);
  };
  const handleSubmit = () => {
    dispatch({
      type: "addNewItem",
      url: itemUrl,
      itemType: itemType,
      title: itemTitle,
      parentId: parentId,
    });
    handleClose();
    //Reset Values
    setItemTitle("");
    setItemUrl("");
  };

  return [
    isNewItem,
    handleClick,
    handleClose,
    handleChange,
    itemTitle,
    handleSubmit,
    itemUrl,
    handleUrlChange,
  ];
};
