import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import TextField from '@material-ui/core/TextField';
import Typography from 'components/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

import Switch from 'components/Switch';

import isEmpty from 'validator/lib/isEmpty';
// import _ from 'lodash';

import NumberInput from 'components/NumberInput';
import globalMessages from 'containers/App/messages';
import FormCol from 'containers/FinancialWizardContainer/components/FormCol';
import FormRow from 'containers/FinancialWizardContainer/components/FormRow';
import messages from '../messages';

/* import { 
  CUSTOMER_AGE, 
  AGE_UPPER_BOUND 
} from '../constants'; */

// import BenefitItems from '../components/Benefits';

class InsuranceSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // ageBoundaries: _.range(CUSTOMER_AGE, AGE_UPPER_BOUND + 1),
      error: {
        insuranceProvider: null,
        currency: null,
        annualPremium: null,
        benefit: null,
      },
    };

    this.selectBenefit = React.createRef();
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.validateProvider = this.validateProvider.bind(this);
    this.validateAnnualPremium = this.validateAnnualPremium.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.benefitOptions);
    /* const { insuranceProvider, annualPremium } = this.props;

    this.validateProvider(insuranceProvider);
    this.validateAnnualPremium(annualPremium); */
  }

  /* componentDidUpdate(prevProps) {
    const { insuranceProvider, annualPremium, validate } = this.props;
    if (prevProps.validate !== validate) {
      this.validateProvider(insuranceProvider);
      this.validateAnnualPremium(annualPremium);
    }
  } */

  /* componentWillUnmount() {
    this.props.onError(false);
  } */

  validateProvider(value) {
    this.props.onError(isEmpty(value));
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        insuranceProvider: isEmpty(value)
          ? messages.errorProviderIsEmpty
          : null,
      },
    }));
  }

  validateAnnualPremium(value) {
    this.props.onError(isEmpty(value));
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        annualPremium: isEmpty(value)
          ? messages.errorAnnualProviderAmount
          : null,
      },
    }));
  }

  handleSumAssured = event => {
    this.setState({ sumAssured: event.target.value });
  };

  focusOnBenefit = () => {
    this.selectBenefit.current.focus();
    this.validateBenefitSelection();
  };

  render() {
    const {
      intl,
      insuranceProvider,
      onChangeInsuranceProvider,
      currencyOptions,
      currency,
      onChangeInsuranceCurrency,
      annualPremium,
      onChangeInsuranceAnnualPremium,
      currentCash,
      onChangeInsuranceCurrentCash,
      // benefits,
      benefitOptions,
      addBenefit,
      // changeBenefitInput,
      // deleteBenefitItem,
      // benefitsData,
      markedForGoals,
      onChangeMarkedGoals,
      onDelete,
      validate,
      // onError,
      // index,
    } = this.props;

    const {
      error,
      // benefits,
      // benefitsSelected,
      // ageBoundaries,
      // selectedBenefit,
      // selectedCurrency,
      // insuranceProvider,
      // annualPremiumAmount,
      // currentCash,
      // ageUpTo,
      // sumAssured,
    } = this.state;

    return (
      <React.Fragment>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              value={insuranceProvider}
              label={intl.formatMessage(messages.insuranceProvider)}
              onChange={event => {
                this.validateProvider(event.target.value);
                return onChangeInsuranceProvider(event.target.value);
              }}
              variant="outlined"
              fullWidth
              error={validate && !!error.insuranceProvider}
              helperText={
                validate && !!error.insuranceProvider
                  ? intl.formatMessage(error.insuranceProvider)
                  : null
              }
            />
          </FormCol>
        </FormRow>

        <FormRow container wrap="nowrap">
          <FormCol item xs={3}>
            <TextField
              label={intl.formatMessage(messages.currency)}
              value={currency}
              onChange={event => onChangeInsuranceCurrency(event.target.value)}
              select
              fullWidth
              variant="outlined"
            >
              {currencyOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
          </FormCol>

          <FormCol item xs={10}>
            <NumberInput
              value={annualPremium}
              onChange={value => {
                this.validateAnnualPremium(value);
                return onChangeInsuranceAnnualPremium(value);
              }}
              label={intl.formatMessage(messages.annualPremium)}
              allowNegative={false}
              variant="outlined"
              fullWidth
              error={validate && !!error.annualPremium}
              helperText={
                validate && error.annualPremium
                  ? intl.formatMessage(error.errorAnnualProviderAmount)
                  : null
              }
            />
          </FormCol>
        </FormRow>

        <FormRow container wrap="nowrap">
          <FormCol item xs={12}>
            <NumberInput
              value={currentCash}
              onChange={value => onChangeInsuranceCurrentCash(value)}
              label={intl.formatMessage(messages.currentCashValue)}
              allowNegative={false}
              variant="outlined"
              fullWidth
            />
          </FormCol>
        </FormRow>

        {/* return this.handleMultipleCheck(e); */}
        <FormRow container wrap="nowrap">
          <FormCol item xs={12}>
            <TextField
              select
              fullWidth
              variant="outlined"
              value="Death"
              onChange={
                // event=>changeBenefitInput(indexProps,'benefitType',event.target.value)
                event => addBenefit(event.target.value)
              }
              label={intl.formatMessage(messages.benefit)}
              error={validate && !!error.benefit}
              helperText={
                validate && !!error.benefit
                  ? intl.formatMessage(error.errorAddBenefit)
                  : null
              }
            >
              {benefitOptions.map(option => (
                <MenuItem key={option.value} value={option.title}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
          </FormCol>
        </FormRow>

        {/**
          render benefit item (uptoage & sum assured
            props to be passed : validate={this.props}

            <Benefits 
              ints={intl}
              onInputChange={(key,value)=>onInputChange(index,key,value)}
              onChangeBenefitInput={(index,key,value)=>changeBenefitInput(index,key,value)}
              onDeleteBenefitItem={index=>deleteBenefitItem(index)}
              onError={value=>onError(value)}
            />

        */}

        {/*
          benefitsData.map((benefit,index)=>{
            return (
              <BenefitItems 
                  intl={intl}
                  onInputChange={(key,value)=>onInputChange(index,key,value)}
                  onChangeBenefitInput={(index,key,value)=>changeBenefitInput(index,key,value)}
                  onDeleteBenefitItem={index=>deleteBenefitItem(index)}
                  onError={value=>onError(value)}
                />
            );
          })
          */}

        <FormRow container wrap="nowrap">
          <FormCol item xs={12}>
            <Button fullWidth variant="contained" color="primary">
              <AddIcon />
              {intl.formatMessage(messages.addBenefit)}
            </Button>
          </FormCol>
        </FormRow>

        <FormRow container wrap="nowrap" alignItems="center">
          <FormCol item>
            <Switch
              id="smoker-status"
              checked={markedForGoals}
              onChange={event => onChangeMarkedGoals(event.target.checked)}
              value={markedForGoals}
              color="default"
              labelPositive={intl.formatMessage(globalMessages.yes)}
              labelNegative={intl.formatMessage(globalMessages.no)}
            />
          </FormCol>
          <FormCol item xs>
            <Typography variant="body1">
              {intl.formatMessage(messages.isAssetsMarkedForGoals)}
            </Typography>
          </FormCol>
        </FormRow>

        <div style={{ textAlign: 'right' }}>
          <IconButton onClick={onDelete} style={{ fontSize: 30 }}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      </React.Fragment>
    );
  }
}

InsuranceSection.propTypes = {
  intl: PropTypes.object,
  addBenefit: PropTypes.func,
  // addInsurance: PropTypes.func,
  // insurances: PropTypes.array,
  insuranceProvider: PropTypes.string,
  currencyOptions: PropTypes.array,
  currency: PropTypes.string,
  annualPremium: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentCash: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  benefitOptions: PropTypes.array,
  onChangeInsuranceProvider: PropTypes.func,
  onChangeInsuranceCurrency: PropTypes.func,
  onChangeInsuranceAnnualPremium: PropTypes.func,
  onChangeInsuranceCurrentCash: PropTypes.func,
  onChangeMarkedGoals: PropTypes.func,
  markedForGoals: PropTypes.bool,
  onDelete: PropTypes.func,
  validate: PropTypes.bool,
  onError: PropTypes.func,
};

export default injectIntl(InsuranceSection);
