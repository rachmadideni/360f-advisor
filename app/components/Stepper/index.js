/**
 *
 * Stepper
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import BaseStepper from '@material-ui/core/Stepper';
import { color } from 'styles/constants';

const StyledStepper = styled(props => <BaseStepper {...props} />)`
  && {
    background-color: ${color.grey[100]};
  }
`;

function Stepper(props) {
  return <StyledStepper {...props} />;
}

Stepper.propTypes = {};

export default Stepper;
