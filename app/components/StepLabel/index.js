/**
 *
 * StepIcon
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import BaseStepLabel from '@material-ui/core/StepLabel';
import { typography, color, dimension, themeColor } from 'styles/constants';

function getColor(props) {
  if (props.active) {
    return themeColor.primary;
  }
  if (props.completed) {
    return themeColor.secondary;
  }
  return color.grey[500];
}

const StyledStepLabel = styled(props => (
  <BaseStepLabel
    {...props}
    StepIconProps={{
      active: props.active,
      completed: props.completed,
      error: props.error,
    }}
    classes={{
      iconContainer: 'icon-container',
      labelContainer: 'label-container',
      label: 'label',
      alternativeLabel: 'alternative-label',
    }}
  />
))`
  &.alternative-label {
    .icon-container {
      font-size: 38px;
      color: ${props => getColor(props)};
    }
    .label-container {
      font-size: ${typography.body2.fontSize}px;
    }
    .label {
      margin-top: ${dimension.spacing.xxs}px;
      font-size: ${typography.body1.fontSize}px;
      font-weight: 600;
    }
  }
`;

function StepLabel(props) {
  return <StyledStepLabel {...props} />;
}

StepLabel.propTypes = {};

export default StepLabel;
