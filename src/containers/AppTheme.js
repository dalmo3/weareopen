import React from 'react';
import {
  createMuiTheme,
  ThemeProvider,
  fade,
} from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';
import 'typeface-roboto';
require('typeface-source-sans-pro');

const darkBlue = '#363a50';

const darkButtonMixin = {
  MuiIconButton: {
    '&:hover': {
      backgroundColor: fade('#fff', 0.15),
    },
  },
  MuiButton: {
    '&:hover': {
      backgroundColor: fade(darkBlue, 0.85),
    },
  },
};

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Source Sans Pro"',
      'Roboto',
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
      main: darkBlue,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: amber[500],
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontWeight: '600',
      },
      containedPrimary: darkButtonMixin.MuiButton,
    },
    MuiIconButton: {
      colorInherit: darkButtonMixin.MuiIconButton,
      colorPrimary: darkButtonMixin.MuiIconButton,
    },
  },
});

export const AppTheme = React.memo(({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
));
