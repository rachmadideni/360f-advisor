import React from 'react';
import styled, { css } from 'styled-components';

const stylesB = css`
  fill: none;
  stroke: currentColor;
  stroke-width: 2px;
`;

const stylesC = css`
  fill: currentColor;
`;

const RectB = styled.rect`
  ${stylesB};
`;

const RectC = styled.rect`
  ${stylesC};
`;

const PathC = styled.path`
  ${stylesC};
`;

function RelationshipNet() {
  return (
    <svg className="custom-icon" viewBox="0 0 28 26.375">
      <g transform="translate(1 1)">
        <RectB
          width="6.293"
          height="6.293"
          transform="translate(19.707 18.082)"
        />
        <RectB
          width="6.293"
          height="6.293"
          transform="translate(9.854 18.082)"
        />
        <RectB width="13.11" height="7.342" transform="translate(6.725 0)" />
        <RectB width="6.293" height="6.293" transform="translate(0 18.082)" />
        <RectC
          width="2.098"
          height="11.012"
          transform="translate(11.951 7.238)"
        />
        <PathC
          d="M26.8,31.061h-2.18v-3c0-1.192-1.265-1.965-2.989-1.965H10.467c-1.762,0-3.287.831-3.287,1.965v3H5v-3C5,25.714,7.421,24,10.467,24H21.635c2.968,0,5.17,1.674,5.17,4.063Z"
          transform="translate(-2.902 -12.21)"
        />
      </g>
    </svg>
  );
}

export default RelationshipNet;
