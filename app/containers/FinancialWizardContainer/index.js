/**
 *
 * FinancialWizardContainer
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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Step from '@material-ui/core/Step';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import Stepper from 'components/Stepper';
import StepIcon from 'components/StepIcon';
import StepLabel from 'components/StepLabel';
import Typography from 'components/Typography';
import FinancialWizardPersonalDetails from 'containers/FinancialWizardPersonalDetails/Loadable';
import FinancialWizardPortfolio from 'containers/FinancialWizardPortfolio/Loadable';
import FinancialWizardCashflow from 'containers/FinancialWizardCashflow/Loadable';
import FinancialWizardSummary from 'containers/FinancialWizardSummary/Loadable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import StepConnector from 'components/StepConnector';

import { color } from 'styles/constants';
import {
  makeSelectOptions,
  makeSelectCahsflows,
  makeSelectPersonalDetails,
  makeSelectPartyId,
  makeSelectCompletedStep,
  makeSelectPortfolios,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { FINANCIAL_WIZARD_STEPS } from './constants';
import {
  getOptionsAction,
  getCashflowsAction,
  createUpdateCashflowsAction,
  changeCashflowsAction,
  changePersonalDetailsAction,
  createUpdatePartyAction,
  getPartyDetailsAction,
  getPortfoliosAction,
  changePortfoliosAction,
  createUpdatePortfoliosAction,
  resetDataAction,
} from './actions';
import PinInput from './components/PinInput';

/* eslint-disable react/prefer-stateless-function */
export class FinancialWizardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      openPinInput: false,
    };
    const { getOptions } = props;
    getOptions('currency');
    getOptions('cashflowType');
    getOptions('incomeType');
    getOptions('livingExpenseType');
    getOptions('loanType');
    getOptions('taxType');
    getOptions('gender');
    getOptions('nationality');
    getOptions('idType');
    getOptions('maritalStatus');
    getOptions('employmentStatus');
    getOptions('industry');
    getOptions('occupation');
    getOptions('educationLevel');
    getOptions('pepRelationship');
    getOptions('dependantRelationship');
    // getOptions('countryPrefix');
    getOptions('country');
    getOptions('portfolioType');
    getOptions('instrumentType');
    getOptions('propertyType');
    getOptions('ownershipType');
    getOptions('rateOfReturn');
    getOptions('benefitsType');
    this.handlePinCompleted = this.handlePinCompleted.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    let activeStep;
    switch (match.params.section) {
      case 'personal-details':
        activeStep = 0;
        break;
      case 'portfolio':
        activeStep = 1;
        break;
      case 'cashflow':
        activeStep = 2;
        break;
      case 'summary':
        activeStep = 3;
        break;
      default:
        activeStep = 0;
        break;
    }
    this.setState({
      activeStep,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.section !== this.props.match.params.section) {
      let activeStep;
      switch (this.props.match.params.section) {
        case 'personal-details':
          activeStep = 0;
          break;
        case 'portfolio':
          activeStep = 1;
          break;
        case 'cashflow':
          activeStep = 2;
          break;
        case 'summary':
          activeStep = 3;
          break;
        default:
          activeStep = 0;
          break;
      }
      this.setState({
        activeStep,
      });
    }
  }

  componentWillUnmount() {
    const { resetData } = this.props;
    resetData();
  }

  handleStepClick(step) {
    const { history } = this.props;
    return () => {
      this.setState({
        activeStep: step.value,
      });
      return history.replace(`/sales-tool/financial-wizard/${step.url}`);
    };
  }

  handlePinCompleted(pinCode) {
    // TODO: Handle pin completion
    const { history } = this.props;
    return history.replace(`/dashboard`);
  }

  render() {
    const {
      intl,
      history,
      options,
      getCashflows,
      cashflows,
      changeCashflows,
      createUpdateCashflows,
      personalDetails,
      changePersonalDetails,
      createUpdateParty,
      partyId,
      getPartyDetails,
      portfolios,
      getPortfolios,
      changePortfolios,
      createUpdatePortfolios,
    } = this.props;
    return (
      <Grid
        container
        direction="column"
        wrap="nowrap"
        style={{
          height: '100%',
          backgroundColor: `${color.grey[200]}`,
        }}
      >
        <Grid item>
          <AppBar position="static" color="default">
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={() =>
                  this.setState({
                    openPinInput: true,
                  })
                }
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h1" color="inherit">
                {intl.formatMessage(messages.financialWizard)}
              </Typography>
            </Toolbar>
          </AppBar>
          <Stepper
            nonLinear
            alternativeLabel
            activeStep={this.state.activeStep}
            connector={<StepConnector />}
          >
            {FINANCIAL_WIZARD_STEPS.map(step => (
              <Step
                key={step.value}
                completed={this.props.completedStep[step.value]}
              >
                <StepLabel
                  onClick={this.handleStepClick(step)}
                  StepIconComponent={StepIcon}
                >
                  {intl.formatMessage(step.title)}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs>
          <Switch>
            {/* TODO: Put the sections route here */}
            <Route
              path="/sales-tool/financial-wizard/personal-details"
              render={routeProps => (
                <FinancialWizardPersonalDetails
                  {...routeProps}
                  options={options}
                  personalDetails={personalDetails}
                  onMounted={() => {
                    if (partyId) {
                      return getPartyDetails(partyId);
                    }
                    return false;
                  }}
                  onSubmit={(
                    updatedPersonalDetails,
                    deletedDependantIds,
                    fileToUpload,
                  ) => {
                    changePersonalDetails(updatedPersonalDetails);
                    createUpdateParty(deletedDependantIds, fileToUpload);
                    return history.replace(
                      `/sales-tool/financial-wizard/portfolio`,
                    );
                  }}
                />
              )}
            />
            <Route
              path="/sales-tool/financial-wizard/cashflow"
              render={routeProps => (
                <FinancialWizardCashflow
                  {...routeProps}
                  options={options}
                  onMounted={() => {
                    if (partyId) {
                      return getCashflows();
                    }
                    return false;
                  }}
                  cashflows={cashflows}
                  onSubmit={(updatedCashflows, deletedIds) => {
                    changeCashflows(updatedCashflows);
                    createUpdateCashflows(deletedIds);
                    return history.replace(
                      `/sales-tool/financial-wizard/summary`,
                    );
                  }}
                />
              )}
            />
            <Route
              path="/sales-tool/financial-wizard/summary"
              render={routeProps => (
                <FinancialWizardSummary
                  {...routeProps}
                  options={options}
                  onSubmit={(updatedPersonalDetails, updatedCashflows, updatedPortfolios) => {
                    changePersonalDetails(updatedPersonalDetails);
                    changeCashflows(updatedCashflows);
                    changePortfolios(updatedPortfolios);
                  }}
                />
              )}
            />
            <Route
              path="/sales-tool/financial-wizard/portfolio"
              render={routeProps => (
                <FinancialWizardPortfolio
                  {...routeProps}
                  options={options}
                  onMounted={() => {
                    if (partyId) {
                      return getPortfolios();
                    }
                    return false;
                  }}
                  portfolios={portfolios}
                  onSubmit={(updatedPortfolios, deletedIds) => {
                    changePortfolios(updatedPortfolios);
                    createUpdatePortfolios(deletedIds);
                    return history.replace(
                      `/sales-tool/financial-wizard/cashflow`,
                    );
                  }}
                />
              )}
            />
          </Switch>
        </Grid>
        <PinInput
          headingText={intl.formatMessage(messages.enterPin)}
          open={this.state.openPinInput}
          onClose={() =>
            this.setState({
              openPinInput: false,
            })
          }
          onCompleted={this.handlePinCompleted}
        />
      </Grid>
    );
  }
}

FinancialWizardContainer.propTypes = {
  history: PropTypes.object,
  intl: PropTypes.object,
  match: PropTypes.object,
  options: PropTypes.object,
  getOptions: PropTypes.func,
  getCashflows: PropTypes.func,
  createUpdateCashflows: PropTypes.func,
  changeCashflows: PropTypes.func,
  cashflows: PropTypes.array,
  personalDetails: PropTypes.object,
  changePersonalDetails: PropTypes.func,
  createUpdateParty: PropTypes.func,
  partyId: PropTypes.string,
  getPartyDetails: PropTypes.func,
  portfolios: PropTypes.array,
  getPortfolios: PropTypes.func,
  changePortfolios: PropTypes.func,
  createUpdatePortfolios: PropTypes.func,
  completedStep: PropTypes.object,
  resetData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  options: makeSelectOptions(),
  genders: makeSelectOptions(),
  cashflows: makeSelectCahsflows(),
  portfolios: makeSelectPortfolios(),
  personalDetails: makeSelectPersonalDetails(),
  partyId: makeSelectPartyId(),
  completedStep: makeSelectCompletedStep(),
});

function mapDispatchToProps(dispatch) {
  return {
    getOptions: key => dispatch(getOptionsAction(key)),
    getCashflows: () => dispatch(getCashflowsAction()),
    changeCashflows: cashflows => dispatch(changeCashflowsAction(cashflows)),
    createUpdateCashflows: deletedIds => dispatch(createUpdateCashflowsAction(deletedIds)),
    changePersonalDetails: personalDetails =>dispatch(changePersonalDetailsAction(personalDetails)),
    createUpdateParty: (deletedDependantIds, fileToUpload) =>dispatch(createUpdatePartyAction(deletedDependantIds, fileToUpload)),
    getPartyDetails: partyId => dispatch(getPartyDetailsAction(partyId)),
    getPortfolios: () => dispatch(getPortfoliosAction()),
    changePortfolios: portfolios =>dispatch(changePortfoliosAction(portfolios)),
    createUpdatePortfolios: deletedIds =>dispatch(createUpdatePortfoliosAction(deletedIds)),
    resetData: () => dispatch(resetDataAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'financialWizardContainer', reducer });
const withSaga = injectSaga({ key: 'financialWizardContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
)(FinancialWizardContainer);
