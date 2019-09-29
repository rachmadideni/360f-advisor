import React from 'react';
import styled from 'styled-components';

const PathA = styled.path`
  fill: currentColor;
  stroke: rgba(0, 0, 0, 0);
`;

const PathB = styled.path`
  fill: currentColor;
`;

function EyeCross() {
  return (
    <svg className="custom-icon" viewBox="0 0 27.141 21.059">
      <g transform="translate(-238.326 -313.02)">
        <PathA
          d="M13,13.176A14.458,14.458,0,0,1,9.371,12.7l1.535-1.43A5.757,5.757,0,0,0,13,11.66a5.274,5.274,0,0,0,5.445-5.071,4.744,4.744,0,0,0-.417-1.95l2.7-2.511A21.443,21.443,0,0,1,25.768,5.97a.94.94,0,0,1,0,1.237,20.727,20.727,0,0,1-3.624,2.985A19.553,19.553,0,0,1,18.1,12.244,14.943,14.943,0,0,1,13,13.176Zm-6.326-1.43h0A21.588,21.588,0,0,1,.233,7.209a.945.945,0,0,1,0-1.24A20.7,20.7,0,0,1,3.855,2.985,19.556,19.556,0,0,1,7.9.933,14.942,14.942,0,0,1,13,0a14.99,14.99,0,0,1,5.231.981l-1.8,1.673A5.708,5.708,0,0,0,13,1.516,5.274,5.274,0,0,0,7.555,6.589a4.871,4.871,0,0,0,1.22,3.2l-2.1,1.957ZM13,9.524c-.07,0-.141,0-.211-.007l3.355-3.125c.005.078.007.14.007.2A3.052,3.052,0,0,1,13,9.524ZM10.413,8.263h0a2.779,2.779,0,0,1-.564-1.675A3.053,3.053,0,0,1,13,3.653a3.615,3.615,0,0,1,.371.019,1.6,1.6,0,0,0-.641,1.27,1.555,1.555,0,0,0,.286.9l-2.6,2.424Z"
          transform="translate(238.896 317.343)"
        />
        <PathB
          d="M.868.169,26.784-.242a.832.832,0,0,1,.85.85.9.9,0,0,1-.878.878L.841,1.9a.832.832,0,0,1-.85-.85A.9.9,0,0,1,.868.169Z"
          transform="translate(240.855 332.732) rotate(-45)"
        />
      </g>
    </svg>
  );
}

export default EyeCross;