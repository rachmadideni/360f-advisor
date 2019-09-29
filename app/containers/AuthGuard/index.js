/**
 *
 * AuthGuard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import {} from './selectors';
import { makeSelectAuth } from 'containers/App/selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class AuthGuard extends React.Component {
  render() {
    if (!this.props.auth.token) {
      return <Redirect to="/login" />;
    }

    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

AuthGuard.propTypes = {
  auth: PropTypes.object,
  children: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'authGuard', reducer });

export default compose(
  withReducer,
  withConnect,
)(AuthGuard);
