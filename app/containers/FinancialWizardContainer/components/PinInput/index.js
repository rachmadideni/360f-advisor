import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import ReactCodeInput from 'react-code-input';
import Typography from 'components/Typography';

import { color, dimension } from 'styles/constants';

const StyledDialog = styled(Dialog).attrs({
  classes: {
    paper: 'paper',
  },
})`
  && {
    .paper {
      background-color: transparent;
      box-shadow: none;
      max-width: 80%;
      padding-bottom: ${dimension.spacing.xxl}px;
    }
  }
`;

const HeadingWrapper = styled.div`
  && {
    margin-bottom: ${dimension.spacing.xxl}px;
    color: ${color.white};
    text-align: center;
    font-size: 44px;
    font-weight: 300;
  }
`;

function PinInput(props) {
  const { headingText, onClose, onCompleted, ...dialogProps } = props;

  return (
    <StyledDialog {...dialogProps} onClose={() => onClose()}>
      <HeadingWrapper>
        <Typography
          variant="h1"
          align="center"
          color="inherit"
          style={{
            fontSize: 'inherit',
            fontWeight: 'inherit',
          }}
        >
          {headingText}
        </Typography>
      </HeadingWrapper>
      <ReactCodeInput
        type="password"
        fields={4}
        className="pin-input"
        onChange={val => {
          if (val.length === 4) {
            return onCompleted(val);
          }
          return false;
        }}
      />
    </StyledDialog>
  );
}

PinInput.propTypes = {
  headingText: PropTypes.string,
  onClose: PropTypes.func,
  onCompleted: PropTypes.func,
};

export default PinInput;
