/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import styled from 'styled-components';
import { Switch, Redirect, Route } from 'react-router-dom';

import LoginPage from 'containers/LoginPage/Loadable';
import CustomerViewPage from 'containers/CustomerViewContainer/Loadable';
import FinancialWizardContainer from 'containers/FinancialWizardContainer/Loadable';
import DashboardPage from 'containers/DashboardContainer/Loadable';
// import CustomerBookPage from 'containers/CustomerBookPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AuthGuard from 'containers/AuthGuard';
import injectSaga from 'utils/injectSaga';
import saga from './saga';

import GlobalStyle from '../../global-styles';
import { dimension } from '../../styles/constants';

const AppWrapper = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  height: 100%;
  flex-direction: column;
  max-width: ${dimension.maxWidth.main}px;
  max-height: ${dimension.maxHeight.main}px;
`;

function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" component={LoginPage} />
        <Route
          exact
          path="/dashboard"
          render={routeProps => (
            <AuthGuard>
              <DashboardPage {...routeProps} />
            </AuthGuard>
          )}
        />
        <Route
          path="/sales-tool/financial-wizard/:section(personal-details|portfolio|cashflow|summary)"
          render={routeProps => (
            <AuthGuard>
              <FinancialWizardContainer {...routeProps} />
            </AuthGuard>
          )}
        />
        <Route
          path="/customer/:page(card)"
          render={routeProps => (
            <AuthGuard>
              <CustomerViewPage {...routeProps} />
            </AuthGuard>
          )}
        />
        {/* <Route
          path="/customer/book"
          render={routeProps => (
              <CustomerBookPage {...routeProps} />            
          )}
        /> */}
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}

const withSaga = injectSaga({ key: 'app', saga });

export default compose(withSaga)(App);
