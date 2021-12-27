import React, { useState } from "react";
import useNewMenu from "../hooks/useNewMenu";
import NewFolder from "./NewFolder";
import NewLink from "./NewLink";
import { Box, Menu, MenuItem, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function NewMenu() {
  //Material UI Menu handlers
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Folder Menu Handlers
  const [isNewFolder, handleFolderClick, handleFolderClose] = useNewMenu({
    setAnchorEl,
  });

  //Link Menu Handlers
  const [isNewLink, handleLinkClick, handleLinkClose] = useNewMenu({
    setAnchorEl,
  });

  return (
    <Box sx={{ position: "relative", marginRight: "0.5rem" }}>
      <IconButton
        size="small"
        aria-controls="addnew-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          padding: "0.2rem",
          "&:hover": {
            backgroundColor: "secondary.light",
          },
        }}
      >
        <AddCircleOutlineIcon />
      </IconButton>
      <Menu
        id="add-new-simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleFolderClick}>New Folder</MenuItem>
        <MenuItem onClick={handleLinkClick}>New Link</MenuItem>
      </Menu>

      {/* New Folder Menu */}
      {isNewFolder && (
        <NewFolder
          isNewFolder={isNewFolder}
          handleFolderClose={handleFolderClose}
        />
      )}

      {/* New Link Menu */}
      {isNewLink && (
        <NewLink isNewLink={isNewLink} handleLinkClose={handleLinkClose} />
      )}
    </Box>
  );
}

export default NewMenu;
