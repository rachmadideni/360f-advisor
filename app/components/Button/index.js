/**
 *
 * Button
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import BaseButton from '@material-ui/core/Button';

// import { dimension } from 'styles/constants';

const Button = styled(props => (
  <BaseButton
    {...props}
    classes={{
      // contained: 'btn-contained',
      ...props.classes,
    }}
  />
))``;

Button.propTypes = {};

export default Button;
