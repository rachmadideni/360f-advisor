import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from 'components/Typography';

import { dimension, color } from 'styles/constants';

const Wrapper = styled(ButtonBase)`
  && {
    width: 220px;
    height: 220px;
    margin-left: ${dimension.spacing.l}px;
    margin-right: ${dimension.spacing.l}px;
    padding: ${dimension.spacing.m}px;
    border: 2px solid ${color.green};
    background-color: ${color.white};
    border-radius: ${dimension.borderRadius.xxs}px;
    text-transform: uppercase;
    color: ${color.green};
  }

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

function ActionButton(props) {
  const { label, ...buttonProps } = props;
  return (
    <Wrapper {...buttonProps}>
      <Typography variant="h4" component="span" align="center" color="inherit">
        {label}
      </Typography>
    </Wrapper>
  );
}

ActionButton.propTypes = {
  label: PropTypes.string,
};

export default ActionButton;
