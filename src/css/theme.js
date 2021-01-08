import { createMuiTheme } from "@material-ui/core/styles";
import { blue, green } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: blue[600],
    },
    secondary: {
      main: green[600],
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#2b3034",
    },
    secondary: {
      main: green[600],
    },
  },
});

export { theme, darkTheme };
