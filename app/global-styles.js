import { createGlobalStyle } from 'styled-components';

import { dimension, color } from 'styles/constants';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #ffffff;
    height: 100%;
    width: 100%;
    display: flex;
    overflow: hidden;

    svg.custom-icon {
      width: 1em;
      height: 1em;
    }
  }

  .datepicker {
    background-color: transparent !important;
    width: 100%;
    height: 100%;
    max-width: ${dimension.maxWidth.main}px;
    max-height: ${dimension.maxHeight.main}px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;

    .datepicker-header, .datepicker-content, .datepicker-navbar {
      box-sizing: border-box;
      width: 100%;
      background-color: ${color.white};
    }
  }

  .pin-input {
    display: block;
    text-align: center;
    input {
      margin: ${dimension.spacing.xs}px;
      width: 100px;
      border-radius: ${dimension.borderRadius.xxs}px;
      font-size: 100px;
      text-align: center;
      height: 100px;
      background-color: transparent;
      color: ${color.white};
      border: 2px solid ${color.white};
      transition: all 150ms ease-in-out;
      outline: none;
    }

    input:focus {
      width: 120px;
      height: 120px;
      color: ${color.cyan[400]};
      border-color: ${color.cyan[400]};
    }
  }
`;

export default GlobalStyle;
