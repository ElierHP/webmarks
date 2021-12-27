import { useState } from "react";

const useNewMenu = ({ setAnchorEl }) => {
  const [isNewItem, setIsNewItem] = useState(false);

  const handleClick = () => {
    setIsNewItem(!isNewItem);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setIsNewItem(null);
  };

  return [isNewItem, handleClick, handleClose];
};

export default useNewMenu;
