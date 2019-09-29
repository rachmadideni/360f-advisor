/**
 *
 * TextField
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import BaseTextField from '@material-ui/core/TextField';

import { typography, dimension } from 'styles/constants';

function getClasses(variant) {
  switch (variant) {
    case 'outlined':
      return {
        InputLabelClasses: {},
        InputClasses: {},
      };
    default:
      return {
        InputLabelClasses: {
          formControl: 'form-control-label',
          focused: 'focused-label',
          shrink: 'shrink-label',
        },
        InputClasses: {
          root: 'root-input',
          formControl: 'form-control-input',
          input: 'input-input',
          underline: 'underline-input',
          disabled: 'disabled-input',
        },
      };
  }
}

const TextField = styled(({ underlineColor, ...textFieldProps }) => (
  <BaseTextField
    {...textFieldProps}
    InputLabelProps={{
      ...textFieldProps.InputLabelProps,
      classes: {
        ...getClasses(textFieldProps.variant).InputLabelClasses,
        ...(textFieldProps.InputLabelProps &&
        textFieldProps.InputLabelProps.classes
          ? textFieldProps.InputLabelProps.classes
          : undefined),
      },
    }}
    InputProps={{
      classes: {
        ...getClasses(textFieldProps.variant).InputClasses,
        ...(textFieldProps.InputProps && textFieldProps.InputProps.classes
          ? textFieldProps.InputProps.classes
          : undefined),
      },
      ...textFieldProps.InputProps,
    }}
  />
))`
  && {
    .form-control-label {
      font-size: ${typography.body1.fontSize}px;
      top: ${dimension.spacing.xs}px;
      ${props =>
        props.color
          ? `
        color: ${props.color};
      `
          : null}
    }
    .focused-label {
      font-size: ${typography.body1.fontSize}px;
    }
    .shrink-label {
      transform: translate(0, 3px) scale(1);
      top: 0;
    }

    .root-input {
      ${props =>
        props.color
          ? `
        color: ${props.color};
      `
          : null}
    }
    .underline-input:before {
      ${props =>
        props.underlineColor
          ? `
        border-color: ${props.underlineColor} !important;
      `
          : null}
    }
    .underline-input:after {
      ${props =>
        props.underlineColor
          ? `
        border-color: ${props.underlineColor} !important;
      `
          : null}
    }
    label + .form-control-input {
      margin-top: ${dimension.spacing.s}px;
    }
    .input-input {
      padding: ${dimension.spacing.xs}px;
      font-weight: 600;
      ${props =>
        props.color
          ? `
        color: ${props.color};
      `
          : null}
    }
  }
`;

TextField.propTypes = {};

export default TextField;
