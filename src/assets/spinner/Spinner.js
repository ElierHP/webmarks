import React, { useContext } from "react";
import "./spinner.css";
import { DarkModeContext } from "../../context/DarkModeProvider";
import { Box } from "@mui/material";

export default function Spinner() {
  const [isDarkMode] = useContext(DarkModeContext);
  return (
    <Box sx={{ margin: "auto", marginTop: "2rem" }}>
      <div
        className={`${
          isDarkMode
            ? "ld-spinner ld-spinner-light"
            : "ld-spinner ld-spinner-dark"
        }`}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Box>
  );
}
