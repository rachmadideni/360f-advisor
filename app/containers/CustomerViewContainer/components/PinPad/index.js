import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import BackspaceIcon from '@material-ui/icons/BackspaceOutlined';
import { color } from 'styles/constants';

const PadButton = styled(Button).attrs({
  classes: {
    label: 'label-btn',
    outlined: 'outlined-btn',
    outlinedPrimary: 'outlined-btn-primary',
    text: 'text-btn',
  },
})`
  && {
    width: 80px;
    height: 80px;
    margin: 12.5px;
  }

  &.outlined-btn {
    font-size: 48px;
    border-radius: 50%;
    border-width: 2px;

    .label-btn {
      line-height: 1;
    }
  }

  &.outlined-btn-primary {
    border-color: ${color.green};
  }

  &.text-btn {
    font-weight: 600;
  }
`;

const StyledDialog = styled(Dialog).attrs({
  classes: {
    paper: 'paper',
  },
})`
  && {
    .paper {
      background-color: transparent;
      box-shadow: none;
    }
  }
`;

const HeadingWrapper = styled.div`
  && {
    margin-bottom: 50px;
    color: ${color.white};
    text-align: center;
  }
`;

const PinDot = styled.div`
  && {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin: 15px;
    border: 2px solid ${color.grey[100]};
    background-color: ${props =>
      props.isFilled ? color.grey[100] : 'transparent'};
  }
`;

class PinPad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pinCode: '',
    };

    this.handleInputButtonClick = this.handleInputButtonClick.bind(this);
    this.handleBackspaceClick = this.handleBackspaceClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pinCode.length < 4 && this.state.pinCode.length === 4) {
      this.props.onPinComplete(this.state.pinCode);
    }

    if (prevProps.open && !this.props.open) {
      this.setState({
        pinCode: '',
      });
    }
  }

  handleInputButtonClick(value) {
    if (this.state.pinCode.length >= 4) {
      return false;
    }

    return this.setState(prevState => ({
      ...prevState,
      pinCode: prevState.pinCode + value.toString(),
    }));
  }

  handleBackspaceClick() {
    if (this.state.pinCode.length <= 0) {
      return false;
    }

    return this.setState(prevState => ({
      ...prevState,
      pinCode: prevState.pinCode.slice(0, -1),
    }));
  }

  render() {
    const {
      cancelText,
      headingText,
      onClose,
      onPinComplete,
      ...dialogProps
    } = this.props;
    return (
      <StyledDialog
        {...dialogProps}
        onClose={() => onClose()}
        disableBackdropClick
      >
        <HeadingWrapper>
          <Typography variant="h1" align="center" color="inherit">
            {headingText}
          </Typography>
          <PinDot isFilled={this.state.pinCode.length >= 1} />
          <PinDot isFilled={this.state.pinCode.length >= 2} />
          <PinDot isFilled={this.state.pinCode.length >= 3} />
          <PinDot isFilled={this.state.pinCode.length >= 4} />
        </HeadingWrapper>
        <div>
          <PadButton
            color="primary"
            variant="outlined"
            onClick={() => this.handleInputButtonClick(1)}
          >
            1
          </PadButton>
          <PadButton
            color="primary"
            variant="outlined"
            onClick={() => this.handleInputButtonClick(2)}
          >
            2
          </PadButton>
          <PadButton
            color="primary"
            variant="outlined"
            onClick={() => this.handleInputButtonClick(3)}
          >
            3
          </PadButton>
        </div>
        <div>
          <PadButton
            color="primary"
            variant="outlined"
            onClick={() => this.handleInputButtonClick(4)}
          >
            4
          </PadButton>
          <PadButton
            color="primary"
            variant="outlined"
            onClick={() => this.handleInputButtonClick(5)}
          >
            5
          </PadButton>
          <PadButton
            color="primary"
            variant="outlined"
            onClick={() => this.handleInputButtonClick(6)}
          >
            6
          </PadButton>
        </div>
        <div>
          <PadButton
            color="primary"
            variant="outlined"
            onClick={() => this.handleInputButtonClick(7)}
          >
            7
          </PadButton>
          <PadButton
            color="primary"
            variant="outlined"
            onClick={() => this.handleInputButtonClick(8)}
          >
            8
          </PadButton>
          <PadButton
            color="primary"
            variant="outlined"
            onClick={() => this.handleInputButtonClick(9)}
          >
            9
          </PadButton>
        </div>
        <div>
          <PadButton color="primary" variant="text" onClick={() => onClose()}>
            <Typography variant="h4" component="span" color="inherit">
              {cancelText}
            </Typography>
          </PadButton>
          <PadButton
            color="primary"
            variant="outlined"
            onClick={() => this.handleInputButtonClick(0)}
          >
            0
          </PadButton>
          <PadButton
            color="primary"
            variant="text"
            onClick={() => this.handleBackspaceClick()}
          >
            <BackspaceIcon
              style={{
                fontSize: 40,
              }}
            />
          </PadButton>
        </div>
      </StyledDialog>
    );
  }
}

PinPad.propTypes = {
  cancelText: PropTypes.string,
  headingText: PropTypes.string,
  onClose: PropTypes.func,
  onPinComplete: PropTypes.func,
  open: PropTypes.bool,
};

export default PinPad;
