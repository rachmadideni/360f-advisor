import React from 'react';
import styled from 'styled-components';

const PathA = styled.path`
  fill: currentColor;
`;

function BarChart() {
  return (
    <svg className="custom-icon" viewBox="0 0 26 26">
      <PathA
        d="M14.9,5.029V26.984h4.007V5.029H14.9Zm6,7.309V26.956h4.035V12.338Zm-11.991,0V26.956h3.978V12.338ZM4.9,5.029V31H30.814V28.978H6.918V5H4.9ZM26.893,26.956H30.9V19.7H26.893Z"
        transform="translate(-4.9 -5)"
      />
    </svg>
  );
}

export default BarChart;
