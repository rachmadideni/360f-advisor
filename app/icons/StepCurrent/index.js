import React from 'react';
import styled from 'styled-components';
import SvgIcon from '@material-ui/core/SvgIcon';

const CircleA = styled.circle`
  fill: none;
  stroke: currentColor;
  stroke-width: 2px;
`;

const RectB = styled.rect`
  fill: currentColor;
`;

function StepCurrent(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 40 40" fontSize="inherit">
      <g transform="translate(-1229 -688)">
        <CircleA cx="19" cy="19" r="19" transform="translate(1230 689)" />
        <RectB width="20" height="20" rx="10" transform="translate(1239 698)" />
      </g>
    </SvgIcon>
  );
}

export default StepCurrent;
