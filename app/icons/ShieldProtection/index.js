import React from 'react';
import styled, { css } from 'styled-components';
import SvgIcon from '@material-ui/core/SvgIcon';

const styleA = css`
  fill: currentColor;
`;

const PathA = styled.path`
  ${styleA}
  stroke-color: currentColor;
`;

const EllipseA = styled.ellipse`
  ${styleA}
`;

function ShieldProtection(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 45.237 56" fontSize="inherit">
      <g transform="translate(0)">
        <PathA
          d="M44.459,6.534,22.938.043a1.1,1.1,0,0,0-.639,0L.786,6.534A1.1,1.1,0,0,0,0,7.591V29.222C0,46.667,11.939,52.571,20.911,55.493l1.366.448a1.1,1.1,0,0,0,.683,0l1.366-.448c8.98-2.937,20.911-8.811,20.911-26.271V7.591A1.1,1.1,0,0,0,44.459,6.534ZM43.034,29.222c0,7.673-2.012,18.518-19.391,24.179l-1.028.33-1.028-.33C13.268,50.662,2.2,45.236,2.2,29.222V8.406L22.622,2.253,43.041,8.406Z"
          transform="translate(0 0.005)"
        />
        <PathA
          d="M15.952,45.893c-4.99-3.253-7.316-7.646-7.316-13.9v-16.8a1.132,1.132,0,0,0-1.2-1.043,1.132,1.132,0,0,0-1.2,1.043V31.978c0,6.951,2.631,11.906,8.27,15.583a1.329,1.329,0,0,0,1.685-.209.954.954,0,0,0-.241-1.46Z"
          transform="translate(-1.232 -2.796)"
        />
        <PathA
          d="M29.294,7.162a1.067,1.067,0,0,0,.8,1.347l18.21,4.929V30.465c0,6.593-2.038,14.757-17.881,19.455a1.2,1.2,0,0,0-1.416.847,1.074,1.074,0,0,0,.814,1.242l.249.072a1.327,1.327,0,0,0,.746,0l.249-.072C40.228,49.3,50.72,44.437,50.72,30.465V12.639a1.1,1.1,0,0,0-.866-1.03L30.794,6.442A1.232,1.232,0,0,0,29.294,7.162Z"
          transform="translate(-9.919 -1.261)"
        />
        <EllipseA
          cx="1.749"
          cy="1.749"
          rx="1.749"
          ry="1.749"
          transform="translate(20.801 10.5)"
        />
        <EllipseA
          cx="1.749"
          cy="1.749"
          rx="1.749"
          ry="1.749"
          transform="translate(20.801 42.002)"
        />
        <EllipseA
          cx="1.749"
          cy="1.749"
          rx="1.749"
          ry="1.749"
          transform="translate(10.301 33.251)"
        />
        <EllipseA
          cx="1.749"
          cy="1.749"
          rx="1.749"
          ry="1.749"
          transform="translate(31.302 33.251)"
        />
        <EllipseA
          cx="1.749"
          cy="1.749"
          rx="1.749"
          ry="1.749"
          transform="translate(10.301 17.501)"
        />
        <EllipseA
          cx="1.749"
          cy="1.749"
          rx="1.749"
          ry="1.749"
          transform="translate(31.302 17.501)"
        />
      </g>
    </SvgIcon>
  );
}

export default ShieldProtection;
