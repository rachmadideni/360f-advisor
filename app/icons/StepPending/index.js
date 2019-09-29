import React from 'react';
import styled from 'styled-components';
import SvgIcon from '@material-ui/core/SvgIcon';

const CircleA = styled.circle`
  fill: none;
  stroke: currentColor;
  stroke-width: 2px;
`;

function StepPending(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 40 40" fontSize="inherit">
      <CircleA cx="19" cy="19" r="19" transform="translate(1 1)" />
    </SvgIcon>
  );
}

export default StepPending;
