import React from 'react';
import styled from 'styled-components';
import SvgIcon from '@material-ui/core/SvgIcon';

const CircleA = styled.circle`
  fill: currentColor;
  stroke: currentColor;
  stroke-width: 2px;
`;

const PathB = styled.path`
  fill: none;
  stroke: #fff;
  stroke-width: 2px;
`;

function StepCompleted(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 40 40" fontSize="inherit">
      <g transform="translate(-1229 -688)">
        <CircleA cx="19" cy="19" r="19" transform="translate(1230 689)" />
        <PathB
          d="M1187.471,717.879l4.9,4.833,8.407-8.4"
          transform="translate(55 -11)"
        />
      </g>
    </SvgIcon>
  );
}

export default StepCompleted;
