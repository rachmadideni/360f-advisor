/**
 *
 * Switch
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import BaseSwitch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import { dimension, color } from 'styles/constants';

const Wrapper = styled.div`
  && {
    display: inline-flex;
    position: relative;
  }
`;

const TextOptionWrapper = styled(Grid)`
  && {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`;

const TypographyOption = styled(Typography)`
  && {
    text-transform: uppercase;
  }
`;

const StyledSwitch = styled(BaseSwitch).attrs({
  classes: {
    root: 'root-switch',
    bar: 'bar-switch',
    icon: 'icon-switch',
    switchBase: 'switch-base-switch',
    checked: 'checked-switch',
    ...props => (props.classes ? props.classes : undefined),
  },
})`
  &.root-switch {
    width: 160px;

    .switch-base-switch {
      width: auto;
      transform: translateX(2px);
    }
    .switch-base-switch.checked-switch {
      transform: translateX(78px);
    }
    .icon-switch {
      width: 80px;
      height: 40px;
      border-radius: ${dimension.borderRadius.m}px;
      color: ${color.white};
    }
    .bar-switch {
      width: 160px;
      height: 40px;
      left: 0;
      top: 24%;
      margin-left: 0;
      border-radius: ${dimension.borderRadius.m}px;
      background-color: ${color.grey[300]};
    }
  }
`;

function Switch(props) {
  const { labelPositive, labelNegative, ...switchProps } = props;

  return (
    <Wrapper>
      <StyledSwitch {...switchProps} />
      <TextOptionWrapper container wrap="nowrap" alignItems="center">
        <Grid item xs>
          {labelNegative ? (
            <TypographyOption
              variant="h4"
              component="span"
              align="center"
              color={!switchProps.checked ? 'primary' : 'textSecondary'}
            >
              {labelNegative}
            </TypographyOption>
          ) : null}
        </Grid>
        <Grid item xs>
          {labelPositive ? (
            <TypographyOption
              variant="h4"
              component="span"
              align="center"
              color={switchProps.checked ? 'primary' : 'textSecondary'}
            >
              {labelPositive}
            </TypographyOption>
          ) : null}
        </Grid>
      </TextOptionWrapper>
    </Wrapper>
  );
}

Switch.propTypes = {
  labelPositive: PropTypes.string,
  labelNegative: PropTypes.string,
};

export default Switch;
