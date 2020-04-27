import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { orange, blue, amber } from '@material-ui/core/colors';
import 'typeface-roboto';
require('typeface-source-sans-pro')

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Roboto',
      '"Source Sans Pro"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      '"Helvetica Neue"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: blue[900],
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: amber[400]
    }
  },
  status: {
    danger: orange[500],
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
});

export const AppTheme = React.memo(({children}) => (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  ));