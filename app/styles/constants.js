export const color = {
  black: '#000000',
  white: '#ffffff',
  scarlet: '#E74C3C',
  blue: '#1942D8',
  mediumBlue: '#0076FF',
  babyBlue: '#E1F5F8',
  blue1: '#4176E5',
  blue2: '#01339C',
  dijonMustard: '#DBB204',
  sunflower: '#FAAD0C',
  green: '#28B384',
  red: '#E74C3C',
  orange: '#FF6107',
  syntheticPurple: '#A03EFF',
  lightRed: '#E73C86',
  solidPurple: '#211058',
  grey: {
    '50': '#fafafa',
    '100': '#f5f5f5',
    '200': '#f0f0f0',
    '300': '#e6e6e6',
    '400': '#cccccc',
    '500': '#b3b3b3',
    '600': '#979797',
    '700': '#646464',
    '800': '#424242',
    '900': '#212121',
    A100: '#d5d5d5',
    A200: '#aaaaaa',
    A400: '#303030',
    A700: '#616161',
  },
  darkGrey: {
    '50': '#EDEDEE',
    '100': '#C9CACE',
    '200': '#A6A7AD',
    '300': '#71727D',
    '400': '#4D4F5C',
  },
  darkBlue: {
    '50': '#E6E9ED',
    '100': '#B6BDCA',
    '200': '#8691A7',
    '300': '#3E4F73',
    '400': '#0E2350',
  },
  purple: {
    '50': '#EAE5EF',
    '100': '#C1B2CF',
    '200': '#9880AF',
    '300': '#5A3480',
    '400': '#310160',
  },
  cyan: {
    '50': '#E9FAFD',
    '100': '#BFF0F8',
    '200': '#95E5F3',
    '300': '#56D6EC',
    '400': '#2CCCE7',
  },
};

export const themeColor = {
  primary: color.cyan[400],
  secondary: color.purple[400],
  textPrimary: color.black,
  loginBg: `linear-gradient(to bottom right, #3892FF, #1A2980)`,
  appBarBg: `linear-gradient(${color.purple[400]}, ${color.darkBlue[400]})`,
};

export const typography = {
  fontSize: 14,
  fontWeight: {
    normal: 400,
    semibold: 600,
    bold: 700,
  },
  button: {
    fontWeight: 400,
  },
  body1: {
    fontSize: 14,
    lineHeight: 1.3,
    color: themeColor.textPrimary,
  },
  body2: {
    fontSize: 12,
    lineHeight: 1.3,
    color: themeColor.textPrimary,
  },
  caption: {
    fontSize: 10,
    lineHeight: 1.3,
    color: themeColor.textPrimary,
  },
  h1: {
    fontSize: 24,
    lineHeight: 1.3,
    fontWeight: 700,
    color: themeColor.textPrimary,
  },
  h2: {
    fontSize: 22,
    lineHeight: 1.3,
    fontWeight: 600,
    color: themeColor.textPrimary,
  },
  h3: {
    fontSize: 20,
    lineHeight: 1.3,
    fontWeight: 400,
    color: themeColor.textPrimary,
  },
  h4: {
    fontSize: 16,
    lineHeight: 1.3,
    fontWeight: 600,
    color: themeColor.textPrimary,
  },
};

export const dimension = {
  maxWidth: {
    main: 1400,
  },
  maxHeight: {
    main: 1200,
  },
  borderRadius: {
    xxs: 5,
    xs: 10,
    s: 20,
    m: 30,
    l: 50,
  },
  spacing: {
    xxs: 5,
    xs: 10,
    s: 20,
    m: 30,
    l: 50,
    xl: 80,
    xxl: 100,
  },
};
