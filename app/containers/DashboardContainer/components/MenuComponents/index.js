import styled from 'styled-components';
// import { typography, color, dimension } from 'styles/constants';

import Grid from '@material-ui/core/Grid';

const Sidebar = styled(Grid)`
  && {
    background: linear-gradient(to bottom, #3e5afb, #9426fe);
    flex: 0.1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 100vh;
    opacity: 0.9;
  }
`;

export { Sidebar };
