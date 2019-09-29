import React from 'react';
import styled from 'styled-components';
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Fab from '@material-ui/core/Fab';
import { dimension, color, themeColor } from 'styles/constants';

const StyledFab = styled(Fab)`
  && {
    position: absolute;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.75);
    left: ${dimension.spacing.m}px;
    bottom: ${dimension.spacing.m}px;
    background-color: ${color.white};
    color: ${themeColor.textPrimary};
    font-size: 50px;
  }
`;

function FooterToggleButton(props) {
  return (
    <StyledFab {...props}>
      <ArrowUpIcon fontSize="inherit" />
    </StyledFab>
  );
}

export default FooterToggleButton;
