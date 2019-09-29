/**
 *
 * StepConnector
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import BaseStepConnector from '@material-ui/core/StepConnector';
import { themeColor } from 'styles/constants';

const StyledStepConnector = styled(props => (
  <BaseStepConnector
    {...props}
    classes={{
      alternativeLabel: 'alternative-label',
      completed: 'completed-connector',
      line: 'line-connector',
      lineHorizontal: 'line-horizontal-connector',
    }}
  />
))`
  && {
    .line-connector.line-horizontal-connector {
      border-top-width: 2px;
    }
  }

  &.alternative-label {
    top: 18px;
    left: calc(-50% + 30px);
    right: calc(50% + 30px);
  }

  &.completed-connector {
    .line-connector {
      border-color: ${themeColor.secondary};
    }
  }
`;

function StepConnector(props) {
  return <StyledStepConnector {...props} />;
}

StepConnector.propTypes = {};

export default StepConnector;
