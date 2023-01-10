import React, { useState, useContext } from "react";
import { AppData } from "../context/AppDataProvider";
import { IconButton } from "@mui/material";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

function SortIcon() {
  const { dispatch } = useContext(AppData);
  const [sort, setSort] = useState("asc");

  // Sort the folders and links
  const handleClick = () => {
    if (sort === "asc") {
      dispatch({ type: "sort", order: "asc" });
      setSort("desc");
    } else if (sort === "desc") {
      dispatch({ type: "sort", order: "desc" });
      setSort("asc");
    }
  };
  return (
    <IconButton
      aria-label="a-z-sort-icon"
      sx={{
        padding: "0.2rem",
        marginRight: "0.5rem",
        "&:hover": {
          backgroundColor: "secondary.light",
        },
      }}
      onClick={handleClick}
    >
      <SortByAlphaIcon />
    </IconButton>
  );
}

export default SortIcon;
