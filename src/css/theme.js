import { createMuiTheme } from "@material-ui/core/styles";

import { blue, lightGreen } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: lightGreen[500],
    },
  },
});

export default theme;
