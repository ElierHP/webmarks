import { createMuiTheme } from "@material-ui/core/styles";
import { blue, green } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: green[600],
    },
  },
});

export default theme;
