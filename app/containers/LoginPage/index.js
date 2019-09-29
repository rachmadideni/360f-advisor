/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from 'components/Typography';
import Button from 'components/Button';
import TextField from 'components/TextField';
import LoadingDialog from 'components/LoadingDialog';
import Logo from 'images/360f_logo_white.png';
import SgNightView from 'images/Sg nightview.png';

import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAuth } from 'containers/App/selectors';
import { color, dimension, themeColor } from 'styles/constants';
import globalMessages from 'containers/App/messages';
import {
  makeSelectCredential,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import {
  changeEmailAction,
  changePasswordAction,
  loginAction,
  loginErrorAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const LeftSection = styled(Grid)`
  flex: 0.75;
  position: relative;
  background-image: url(${SgNightView});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  opacity: 0.9;
  &:before {
    z-index: -2;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(to right, #000000 100%, #000000 10%);
    opacity: 0.7;
  }
`;

const RightSection = styled(Grid)`
  flex: 1;
  justify-content: center;
  background-image: ${themeColor.loginBg};
  height: 100%;
  z-index: 1;
`;

const ButtonTextWrap = styled.div`
  text-align: right;
`;
const ButtonText = styled(Button)`
  && {
    font-size: 15px;
    font-weight: thin;
    color: white;
    &:hover: {
      background-color: none;
      color: white;
    }
  }
`;
const IconButtonWrap = styled(IconButton)`
  && {
    color: white;
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      error: {
        email: null,
        password: null,
      },
      isSubmitTriggered: false,
      isSnackbarOpen: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!!this.props.error.message && prevProps.error.message === null) {
      this.setState(state => ({
        ...state,
        isSnackbarOpen: true,
      }));
    } else if (!!prevProps.error.message && this.props.error.message === null) {
      this.setState(state => ({
        ...state,
        isSnackbarOpen: false,
      }));
    }
  }

  getErrorMessage() {
    const { error, intl } = this.props;
    if (!error.message) {
      return null;
    }

    if (error.messageScope === 'global') {
      return intl.formatMessage(globalMessages[error.message]);
    }
    return intl.formatMessage(messages[error.message]);
  }

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value,
    });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  validateEmail(email) {
    const { intl } = this.props;

    let isError = false;
    let errorMsg = null;

    if (isEmpty(email)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.errorEmailIsEmpty);
    } else if (!isEmail(email)) {
      // TODO: check valid email format once the API is ready to accept email
      // isError = true;
      // errorMsg = intl.formatMessage(messages.errorEmailWrongFormat);
      isError = false;
      errorMsg = null;
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        email: errorMsg,
      },
    }));

    return !isError;
  }

  validatePassword(password) {
    const { intl } = this.props;

    let isError = false;
    let errorMsg = null;
    if (isEmpty(password)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.errorPasswordIsEmpty);
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        password: errorMsg,
      },
    }));

    return !isError;
  }

  handleSubmit(event) {
    event.preventDefault();

    const { credential } = this.props;
    this.setState(state => ({
      ...state,
      isSubmitTriggered: true,
    }));

    if (
      this.validateEmail(credential.email) &&
      this.validatePassword(credential.password)
    ) {
      return this.props.login();
    }

    return false;
  }

  render() {
    const {
      credential,
      changeEmail,
      changePassword,
      isLoading,
      auth,
      intl,
      setLoginError,
    } = this.props;

    if (auth.token) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Grid
        container
        wrap="nowrap"
        style={{
          height: '100%',
        }}
      >
        <LoadingDialog isLoading={isLoading} />
        <LeftSection container alignItems="center" justify="center">
          <img
            alt="logo"
            src={Logo}
            style={{
              paddingTop: '50px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </LeftSection>

        <RightSection container alignItems="center">
          <form
            onSubmit={this.handleSubmit}
            noValidate
            autoComplete="off"
            style={{
              color: color.white,
              width: '100%',
              padding: `0 ${dimension.spacing.xl}px`,
            }}
          >
            <Typography
              variant="h1"
              color="inherit"
              align="left"
              style={{
                fontSize: 46,
                fontWeight: 300,
              }}
              gutterBottom
            >
              {intl.formatMessage(messages.login)}
            </Typography>
            <TextField
              id="email"
              name="email"
              margin="normal"
              fullWidth
              label={intl.formatMessage(globalMessages.emailAddress)}
              type="email"
              value={credential.email}
              color="inherit"
              underlineColor={color.white}
              onChange={event => {
                if (this.state.isSubmitTriggered) {
                  this.validateEmail(event.target.value);
                }
                return changeEmail(event.target.value);
              }}
              error={!!this.state.error.email}
              helperText={this.state.error.email}
            />
            <TextField
              id="password"
              name="password"
              margin="normal"
              fullWidth
              label={intl.formatMessage(globalMessages.password)}
              type={this.state.showPassword ? 'text' : 'password'}
              color="inherit"
              underlineColor={color.white}
              value={credential.password}
              onChange={event => {
                if (this.state.isSubmitTriggered) {
                  this.validatePassword(event.target.value);
                }
                return changePassword(event.target.value);
              }}
              error={!!this.state.error.password}
              helperText={this.state.error.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButtonWrap
                      color="primary"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? (
                        <Visibility style={{ color: `${color.white}` }} />
                      ) : (
                        <VisibilityOff style={{ color: `${color.white}` }} />
                      )}
                    </IconButtonWrap>
                  </InputAdornment>
                ),
              }}
            />
            <ButtonTextWrap>
              <ButtonText variant="text">
                {intl.formatMessage(messages.forgottenPassword)}
              </ButtonText>
            </ButtonTextWrap>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              color="primary"
              onClick={this.handleSubmit}
              disabled={!!this.state.error.email || !!this.state.error.password}
              style={{
                marginTop: dimension.spacing.m,
              }}
            >
              {intl.formatMessage(messages.login)}
            </Button>
          </form>
        </RightSection>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.isSnackbarOpen}
          onClose={() =>
            setLoginError({
              messageScope: null,
              message: null,
            })
          }
          autoHideDuration={2000}
          message={<span>{this.getErrorMessage()}</span>}
        />
      </Grid>
    );
  }
}

LoginPage.propTypes = {
  changeEmail: PropTypes.func,
  changePassword: PropTypes.func,
  login: PropTypes.func,
  credential: PropTypes.object,
  auth: PropTypes.object,
  isLoading: PropTypes.bool,
  intl: PropTypes.object,
  error: PropTypes.object,
  setLoginError: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  credential: makeSelectCredential(),
  auth: makeSelectAuth(),
  isLoading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeEmail: value => dispatch(changeEmailAction(value)),
    changePassword: value => dispatch(changePasswordAction(value)),
    login: () => dispatch(loginAction()),
    setLoginError: ({ messageScope, message }) =>
      dispatch(loginErrorAction({ messageScope, message })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
)(LoginPage);
