import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Fab from '@material-ui/core/Fab';
import { dimension, color, themeColor } from 'styles/constants';

const Container = styled.div`
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.75);
  padding-top: ${dimension.spacing.m}px;
  padding-bottom: ${dimension.spacing.m}px;
  position: relative;
  background-color: ${color.white};
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
`;

const ButtonsWrapper = styled.div`
  max-width: 650px;
  width: 100%;
`;

const StyledFab = styled(Fab)`
  && {
    position: absolute;
    box-shadow: 0px -5px 7px -5px rgba(0, 0, 0, 0.75);
    left: ${dimension.spacing.m}px;
    top: -${dimension.spacing.m}px;
    background-color: ${color.white};
    color: ${themeColor.textPrimary};
    font-size: 50px;
  }
`;

function SectionFooterContainer(props) {
  const { open, children, ...buttonProps } = props;
  return (
    <Slide in={open} direction="up" unmountOnExit>
      <Container>
        <ButtonsWrapper>{children}</ButtonsWrapper>
        <Zoom in={open}>
          <StyledFab {...buttonProps}>
            <ArrowDownIcon fontSize="inherit" />
          </StyledFab>
        </Zoom>
      </Container>
    </Slide>
  );
}

SectionFooterContainer.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
};

export default SectionFooterContainer;
