/**
 *
 * CustomerViewContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import CustomerCardIcon from 'icons/CustomerCard';
import TaskLogIcon from 'icons/TaskLog';
import FinancialPlannerIcon from 'icons/FinancialPlanner';
import RelationshipNetIcon from 'icons/RelationshipNet';
import EyeCrossIcon from 'icons/EyeCross';
import CustomerCardPage from 'containers/CustomerCardPage/Loadable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { color } from 'styles/constants';
import globalMessages from 'containers/App/messages';
import NavbarTabs from 'components/NavbarTabs';
import PinPad from './components/PinPad';

import makeSelectCustomerViewContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class CustomerViewContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
      isPinPadOpen: false,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handlePinComplete = this.handlePinComplete.bind(this);
  }

  getTabs() {
    return [
      {
        icon: CustomerCardIcon,
      },
      {
        icon: TaskLogIcon,
      },
      {
        icon: FinancialPlannerIcon,
      },
      {
        icon: RelationshipNetIcon,
      },
    ];
  }

  handleTabChange(event, value) {
    this.setState({
      activeTab: value,
    });
  }

  handlePinComplete() {
    // TODO: validate PIN here
    const { history } = this.props;

    return history.replace('/dashboard');
  }

  render() {
    const { intl } = this.props;

    return (
      <Grid
        container
        wrap="nowrap"
        style={{
          height: '100vh',
        }}
      >
        <Grid
          item
          style={{
            height: '100%',
            backgroundImage: `linear-gradient(${color.blue}, ${
              color.purple[400]
            })`,
            color: `${color.white}`,
            padding: `15px 0 70px`,
          }}
        >
          <Grid
            container
            direction="column"
            style={{
              height: '100%',
            }}
          >
            <Grid item container justify="center">
              <IconButton
                color="inherit"
                onClick={() =>
                  this.setState({
                    isPinPadOpen: true,
                  })
                }
              >
                <ArrowBackIosIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              <NavbarTabs
                value={this.state.activeTab}
                onChange={this.handleTabChange}
                tabs={this.getTabs()}
              />
            </Grid>
            <Grid item container justify="center">
              <IconButton color="inherit">
                <EyeCrossIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs
          style={{
            backgroundColor: `${color.grey[100]}`,
          }}
        >
          <Switch>
            <Route
              path="/customer/card/:section(profile|contact|work-health|dependants|proficiency|cka|investor-type|politically-exposed)"
              render={routeProps => <CustomerCardPage {...routeProps} />}
            />
          </Switch>
        </Grid>
        <PinPad
          open={this.state.isPinPadOpen}
          onClose={() =>
            this.setState({
              isPinPadOpen: false,
            })
          }
          cancelText={intl.formatMessage(globalMessages.cancel)}
          headingText={intl.formatMessage(messages.enterPinCode)}
          onPinComplete={this.handlePinComplete}
        />
      </Grid>
    );
  }
}

CustomerViewContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  customerViewContainer: makeSelectCustomerViewContainer(),
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

const withReducer = injectReducer({ key: 'customerViewContainer', reducer });
const withSaga = injectSaga({ key: 'customerViewContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
)(CustomerViewContainer);
