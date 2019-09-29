import { createMuiTheme } from '@material-ui/core';

import { color, typography, themeColor } from './constants';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: themeColor.primary,
      contrastText: color.white,
    },
    secondary: {
      main: themeColor.secondary,
      contrastText: color.white,
    },
    common: {
      black: color.black,
      white: color.white,
    },
    error: {
      main: color.red,
      contrastText: color.white,
    },
    text: {
      secondary: color.grey[500],
      primary: themeColor.textPrimary,
    },
    grey: {
      ...color.grey,
    },
  },
  typography: {
    useNextVariants: true,
    fontWeightMedium: 600,
    fontSize: typography.fontSize,
    fontFamily: [
      '"Open Sans"',
      '"Helvetica Neue"',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    button: {
      ...typography.button,
    },
    body1: {
      ...typography.body1,
    },
    body2: {
      ...typography.body2,
    },
    caption: {
      ...typography.caption,
    },
    h1: {
      ...typography.h1,
    },
    h2: {
      ...typography.h2,
    },
    h3: {
      ...typography.h3,
    },
    h4: {
      ...typography.h4,
    },
  },
});
