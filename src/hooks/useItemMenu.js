import { useState } from "react";

const useItemMenu = ({ setAnchorEl }) => {
  const [isNewItem, setIsNewItem] = useState(false);
  const [itemTitle, setItemTitle] = useState("");
  const [itemUrl, setItemUrl] = useState("");

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

  return [
    isNewItem,
    handleClick,
    handleClose,
    handleChange,
    itemTitle,
    setItemTitle,
    itemUrl,
    handleUrlChange,
  ];
};

export default useItemMenu;
