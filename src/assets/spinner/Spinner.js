import React, { useContext } from "react";
import "./spinner.css";
import { DarkModeContext } from "../../context/DarkModeProvider";

export default function Spinner() {
  const [isDarkMode] = useContext(DarkModeContext);
  return (
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
  );
}
