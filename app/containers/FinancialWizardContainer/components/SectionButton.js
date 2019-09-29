import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from 'components/Typography';

import { color, dimension, themeColor } from 'styles/constants';

const StyledButtonBase = styled(props => {
  const { active, size, error, ...buttonProps } = props;
  return <ButtonBase {...buttonProps} />;
})`
  && {
    width: 140px;
    height: ${props => (props.size === 'small' ? '90px' : '160px')};
    border-radius: ${dimension.borderRadius.xxs}px;
    border-style: solid;
    border-color: ${props => (props.error ? color.red : themeColor.secondary)};
    border-width: ${props => (props.size === 'small' ? '0.5px' : '2px')};
    color: ${props => (props.active ? color.white : themeColor.secondary)};
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    text-transform: uppercase;
    padding: 0 ${dimension.spacing.xs}px;
    ${props =>
      props.active
        ? `
      background-color: ${themeColor.secondary};
    `
        : null}
    transition: background-color 200ms ease-in-out;
  }
`;

const IconWrapper = styled.div`
  font-size: ${props => (props.size === 'small' ? '32px' : '56px')};
`;

function SectionButton(props) {
  const { icon, label, ...buttonProps } = props;
  return (
    <StyledButtonBase {...buttonProps}>
      <IconWrapper size={buttonProps.size}>{icon}</IconWrapper>
      <Typography
        variant={buttonProps.size === 'small' ? 'body1' : 'h4'}
        align="center"
        component="span"
        color="inherit"
        style={{
          marginTop:
            buttonProps.size === 'small'
              ? dimension.spacing.xs
              : dimension.spacing.s,
        }}
      >
        {label}
      </Typography>
    </StyledButtonBase>
  );
}

SectionButton.propTypes = {
  icon: PropTypes.node,
  active: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'normal']),
  label: PropTypes.string,
  error: PropTypes.bool,
};

export default SectionButton;
