import React, { useContext } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { DarkModeContext } from "../context/DarkModeProvider";

export default function SwitchLabels() {
  const [isDarkMode, setIsDarkMode] = useContext(DarkModeContext);
  const [state, setState] = React.useState({
    checkedA: false,
  });

  const handleChange = (event) => {
    setIsDarkMode(!isDarkMode);
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={state.checkedA}
          onChange={handleChange}
          name="checkedA"
        />
      }
      label="Dark Mode"
    />
  );
}
