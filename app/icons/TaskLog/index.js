import React from 'react';
import styled, { css } from 'styled-components';

const styles = css`
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2px;
`;

const PathB = styled.path`
  ${styles};
`;

const LineB = styled.line`
  ${styles};
`;

const CircleB = styled.circle`
  ${styles};
`;

function TaskLog() {
  return (
    <svg className="custom-icon" viewBox="0 0 25.192 29.861">
      <g transform="translate(-10.75 -6.38)">
        <PathB
          d="M29,7.38v4.5a1.585,1.585,0,0,0,1.585,1.585h4.542l-6.1-6.087Z"
          transform="translate(-3.577)"
        />
        <LineB x2="11.113" transform="translate(16.006 19.975)" />
        <LineB x2="11.113" transform="translate(16.006 23.542)" />
        <LineB x2="7.46" transform="translate(16.006 27.108)" />
        <PathB
          d="M31.566,27.164v-13.7H27.008a1.585,1.585,0,0,1-1.585-1.585V7.38H13.335A1.585,1.585,0,0,0,11.75,8.965V31.951a1.585,1.585,0,0,0,1.585,1.585H27.6"
          transform="translate(0 0)"
        />
        <CircleB
          cx="4.066"
          cy="4.066"
          r="4.066"
          transform="translate(26.81 27.108)"
        />
        <LineB y2="1.971" transform="translate(30.757 29.536)" />
        <LineB x1="1.112" y1="1.085" transform="translate(30.757 31.507)" />
      </g>
    </svg>
  );
}

export default TaskLog;
