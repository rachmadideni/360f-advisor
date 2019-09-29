/**
 *
 * DashboardContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import NotificationNoneIcon from '@material-ui/icons/NotificationsNone';
import SettingsIcon from '@material-ui/icons/Settings';
import CustomerBookIcon from 'icons/CustomerBook';
import BarChartIcon from 'icons/BarChart';
import DashboardOverviewPage from 'containers/DashboardOverviewPage/Loadable';
// import CustomerBookPage from 'containers/CustomerBookPage/Loadable';
import FinancialWizardContainer from 'containers/FinancialWizardContainer/Loadable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCustomerViewContainer from 'containers/CustomerViewContainer/selectors';
import { dimension, color, themeColor } from 'styles/constants';
import NavbarTabs from 'components/NavbarTabs';
import Avatar from 'components/Avatar';
import makeSelectDashboardContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import SalesToolDialog from './components/SalesToolDialog';
import { SALES_TOOL_ACTIONS } from './constants';

/* eslint-disable react/prefer-stateless-function */
class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      isSalesToolDialogOpen: false,
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleSalesToolActionClick = this.handleSalesToolActionClick.bind(
      this,
    );
  }

  handleTabChange(event, value) {
    this.setState({
      activeTab: value,
    });
    // TODO: handle navbar navigation
    const { history } = this.props;
    if (value === 2) {
      return history.replace('/customer/card/profile');
    }
    if (value === 3) {
      return this.setState({
        isSalesToolDialogOpen: true,
      });
    }
    return null;
  }

  handleSalesToolActionClick(value) {
    const { history } = this.props;
    switch (value) {
      case 'FINANCIAL_WIZARD':
        return history.replace('/sales-tool/financial-wizard/personal-details');
      default:
        return false;
    }
  }

  getNavAvatar() {
    return () => <Avatar size="xs" />;
  }

  getTabs() {
    const { intl } = this.props;
    return [
      {
        icon: this.getNavAvatar(),
        label: intl.formatMessage(messages.home),
      },
      {
        icon: NotificationNoneIcon,
        label: intl.formatMessage(messages.notification),
      },
      {
        icon: CustomerBookIcon,
        label: intl.formatMessage(messages.book),
      },
      {
        icon: BarChartIcon,
        label: intl.formatMessage(messages.salesTool),
      },
      {
        icon: SettingsIcon,
        label: intl.formatMessage(messages.settings),
      },
    ];
  }

  getSalesToolActions() {
    const { intl } = this.props;
    return SALES_TOOL_ACTIONS.map(action => ({
      title: intl.formatMessage(action.title),
      value: action.value,
    }));
  }

  render() {
    const { history, intl } = this.props;
    return (
      <Grid
        container
        wrap="nowrap"
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        style={{
          height: '100%',
        }}
      >
        <Grid
          item
          style={{
            height: '100%',
            position: 'fixed',
            zIndex: '1000',
            maxHeight: `${dimension.maxHeight.main}px`,
            backgroundImage: themeColor.appBarBg,
            color: `${color.white}`,
            paddingTop: dimension.spacing.l,
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="stretch"
            style={{
              height: '100%',
            }}
          >
            <Grid item xs>
              <NavbarTabs
                value={this.state.activeTab}
                onChange={this.handleTabChange}
                tabs={this.getTabs()}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          ls={12}
          md={12}
          style={{
            paddingLeft: '90px',
            paddingRight: '10px',
          }}
        >
          <Switch>
            <Route
              exact
              path="/dashboard"
              render={() => <DashboardOverviewPage history={history} />}
            />
            <Route
              exact
              path="/sales-tool/financial-wizard/:section(personal-details|portfolio)"
              render={() => <FinancialWizardContainer history={history} />}
            />
          </Switch>
        </Grid>
        <SalesToolDialog
          headingText={intl.formatMessage(messages.choose)}
          open={this.state.isSalesToolDialogOpen}
          onClose={() =>
            this.setState({
              isSalesToolDialogOpen: false,
            })
          }
          actions={this.getSalesToolActions()}
          onActionClick={this.handleSalesToolActionClick}
        />
      </Grid>
    );
  }
}

DashboardContainer.propTypes = {
  history: PropTypes.object,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  dashboardContainer: makeSelectDashboardContainer(),
  customerView: makeSelectCustomerViewContainer(),
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

const withReducer = injectReducer({ key: 'dashboardContainer', reducer });
const withSaga = injectSaga({ key: 'dashboardContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
)(DashboardContainer);
