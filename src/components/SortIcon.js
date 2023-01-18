import React, { useState, useContext } from "react";
import { AppData } from "../context/AppDataProvider";
import { IconButton } from "@mui/material";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { sortByTitle } from "../utils/sort";

function SortIcon() {
  const { dispatch, setIsLoading, setError } = useContext(AppData);
  const [sort, setSort] = useState("desc");

  // Sort the folders and links
  const handleClick = async () => {
    sort === "asc" ? setSort("desc") : setSort("asc");
    sortByTitle(sort, dispatch, setIsLoading, setError);
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
