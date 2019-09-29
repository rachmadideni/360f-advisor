/**
 *
 * StepIcon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import BaseStepIcon from '@material-ui/core/StepIcon';
import StepPendingIcon from 'icons/StepPending';
import StepCurrentIcon from 'icons/StepCurrent';
import StepCompletedIcon from 'icons/StepCompleted';

function StepIcon(props) {
  const { active, completed, error } = props;
  // console.log(props);
  let icon;
  if (active) {
    icon = <StepCurrentIcon />;
  } else if (completed) {
    icon = <StepCompletedIcon />;
  } else if (error) {
    icon = '';
  } else {
    icon = <StepPendingIcon />;
  }
  return <BaseStepIcon {...props} icon={icon} />;
}

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  error: PropTypes.bool,
};

export default StepIcon;
