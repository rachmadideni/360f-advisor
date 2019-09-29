import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

// import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Switch from 'components/Switch';

import isEmpty from 'validator/lib/isEmpty';
import _ from 'lodash';

import NumberInput from 'components/NumberInput';
import globalMessages from 'containers/App/messages';
import FormCol from 'containers/FinancialWizardContainer/components/FormCol';
import FormRow from 'containers/FinancialWizardContainer/components/FormRow';
import messages from '../messages';

import {
  // CURRENCY_OPTIONS,
  BENEFIT_OPTIONS,
  CUSTOMER_AGE,
  AGE_UPPER_BOUND,
} from '../constants';

class InsuranceSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      insuranceProvider: '',
      selectedCurrency: 'USD',
      annualPremiumAmount: '',
      currentCash: '',
      benefits: [],
      benefitsSelected: [],
      ageUpTo: CUSTOMER_AGE,
      ageBoundaries: _.range(CUSTOMER_AGE, AGE_UPPER_BOUND + 1),
      sumAssured: '',
      error: {
        insuranceProvider: '',
        currency: '',
        annualPremium: '',
        benefit: '',
        upToAge: '',
        sumAssuredPerBenefit: '',
      },
      isFormSubmitted: false,
    };

    this.selectBenefit = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateProvider = this.validateProvider.bind(this);
    this.validateAnnualPremium = this.validateAnnualPremium.bind(this);
  }

  componentDidMount() {
    const { insuranceProvider, annualPremium } = this.props;

    this.validateProvider(insuranceProvider);
    this.validateAnnualPremium(annualPremium);
  }

  componentDidUpdate(prevProps) {
    const { insuranceProvider, annualPremium, validate } = this.props;
    if (prevProps.validate !== validate) {
      this.validateProvider(insuranceProvider);
      this.validateAnnualPremium(annualPremium);
    }
  }

  componentWillUnmount() {
    this.props.onError(false);
  }

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

  // ok
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

  /* validateInsuranceProvider(provider) {
    const { intl } = this.props;
    let isError = false;
    let errorMsg = null;
    if (isEmpty(provider)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.errorProviderIsEmpty);
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        insuranceProvider: errorMsg,
      },
    }));

    return !isError;
  } */

  // local
  handleList = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleInput = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleInputProvider = event => {
    this.setState({ insuranceProvider: event.target.value });
  };

  /* handleAnnualPremium = event => {
    this.setState({ annualPremiumAmount: event.target.value.replace(/,/g, "") });
  }; */

  handlecurrentCash = event => {
    this.setState({ currentCash: event.target.value.replace(/,/g, '') });
  };

  handleSumAssured = event => {
    this.setState({ sumAssured: event.target.value });
  };

  /* validateAnnualPremiumAmount(amount) {
    const { intl } = this.props;
    let isError = false;
    let errorMsg = null;
    if (isEmpty(amount)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.errorAnnualProviderAmount);
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        annualPremium: errorMsg,
      },
    }));

    return !isError;
  } */

  validateBenefitSelection() {
    const { intl } = this.props;
    const { benefits } = this.state;
    let isError = false;
    let errorMsg = null;
    if (benefits.length === 0) {
      isError = true;
      errorMsg = intl.formatMessage(messages.errorAddBenefit);
    } else {
      isError = false;
      errorMsg = null;
    }
    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        benefit: errorMsg,
      },
    }));
    return !isError;
  }

  handleMultipleCheck = event => {
    // these event.target.value or destruct value from param. is a array type because we use select element with multiple props
    const { value } = event.target;
    const { addBenefit } = this.props;

    this.setState(prevState => {
      // convert array to array of object. ex: ['item1'] => [{'ID':index},{'BENEFIT':name}]
      const benefitsSelected = value.map((name, index) => ({
        id: index,
        benefit: name,
        upToAge: CUSTOMER_AGE, // later we'll use real customer age
        sumAssured: 0,
      }));

      return {
        ...prevState,
        benefits: value,
        benefitsSelected,
      };
    });

    return addBenefit({
      benefitType: '',
      sumAssured: 0,
      uptoAge: 0,
    });
  };

  /* handleMultipleCheck = event => {
    
    // console.log(event.target.value);
    const { value } = event.target;
    // const { benefitsSelected } = this.state;
    // value = 1
    // title = death
    // 
    // value = 

    const added = [].push({
      benefit:event.target.value,
      upToAge:CUSTOMER_AGE,
      sumAssured:0
    })

    console.log(benefitsSelected);

    this.setState(prevState => {
      // convert array to array of object. ex: ['item1'] => [{'ID':index},{'BENEFIT':name}]
      const benefitsSelected = value.map((name, index) => ({
        id: index,
        benefit: name,
        upToAge: CUSTOMER_AGE, // later we'll use real customer age
        sumAssured: 0,
      }));

      return {
        ...prevState,
        benefits: value,
        benefitsSelected,
      };
    });
  } */

  handleSubmit(event) {
    event.preventDefault();

    const {
      insuranceProvider,
      selectedCurrency,
      annualPremiumAmount,
      currentCash,
      benefitsSelected,
    } = this.state;

    this.setState(state => ({
      ...state,
      isFormSubmitted: true,
    }));

    if (
      this.validateInsuranceProvider(insuranceProvider) &&
      this.validateAnnualPremiumAmount(annualPremiumAmount) &&
      this.validateBenefitSelection()
    ) {
      // console.log(this.state);
      this.props.addInsurance({
        provider: insuranceProvider,
        currency: selectedCurrency,
        annualPremium: annualPremiumAmount,
        currentCash,
        benefits: benefitsSelected,
        markedForGoals: false,
      });
    }
    return false;
  }

  // handle changes on input array for up to age
  handleChangeUpToAge = idx => evt => {
    const { benefitsSelected } = this.state;
    const dt = benefitsSelected.map((b, bidx) => {
      if (idx !== bidx) return b;
      return {
        ...b,
        upToAge: evt.target.value,
      };
    });
    this.setState({ benefitsSelected: dt });
  };

  // handle changes on input array for sum assured
  handleChangeSumAssured = (evt, idx) => {
    const { benefitsSelected } = this.state;
    const dt = benefitsSelected.map((b, bidx) => {
      if (idx !== bidx) return b;
      return {
        ...b,
        sumAssured: evt.target.value.replace(/,/g, ''),
      };
    });
    this.setState({ benefitsSelected: dt });
  };

  focusOnBenefit = () => {
    this.selectBenefit.current.focus();
    this.validateBenefitSelection();
  };

  render() {
    const {
      intl,
      // insurances,
      insuranceProvider,
      currencyOptions,
      currency,
      annualPremium,
      currentCash,
      // benefitOptions,
      addBenefit,
      markedForGoals,
      onChangeInsuranceProvider,
      onChangeInsuranceCurrency,
      onChangeInsuranceAnnualPremium,
      onChangeInsuranceCurrentCash,
      onChangeMarkedGoals,
      onDelete,
      validate,
    } = this.props;

    const {
      benefits,
      benefitsSelected,
      ageBoundaries,
      error,
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
            <FormLabel>Benefit Type</FormLabel>
            <Select
              fullWidth
              multiple
              value={benefits}
              onChange={() =>
                addBenefit({
                  benefitType: '',
                  sumAssured: 0,
                  uptoAge: 0,
                })
              }
              label="Benefits"
              renderValue={selected => selected.join(', ')}
              inputRef={this.selectBenefit}
              input={<OutlinedInput id="benefit" labelWidth={0} />}
              error={!!this.state.error.benefit}
            >
              {BENEFIT_OPTIONS.map(option => (
                <MenuItem key={option.ID} value={option.BENEFIT}>
                  <Checkbox checked={benefits.indexOf(option.BENEFIT) > -1} />
                  {option.BENEFIT}
                </MenuItem>
              ))}
            </Select>
          </FormCol>
        </FormRow>

        {benefitsSelected.map((item, index) => (
          <React.Fragment key={parseInt(index.toString(), 8)}>
            <FormRow container wrap="nowrap">
              <FormLabel>{item.benefit}</FormLabel>
            </FormRow>
            <FormRow container wrap="nowrap">
              <FormCol item xs={3}>
                <TextField
                  id="up-to-age"
                  label="UP TO AGE"
                  select
                  value={item.upToAge}
                  onChange={this.handleChangeUpToAge(index)}
                  fullWidth
                  variant="outlined"
                >
                  {ageBoundaries.map((option, idx) => (
                    <MenuItem key={parseInt(idx.toString(), 10)} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </FormCol>
              <FormCol item xs={10}>
                <NumberInput
                  autoComplete="off"
                  id="sum-assured"
                  value={item.sumAssured}
                  label="Benefit Amount"
                  onChange={event => this.handleChangeSumAssured(event, index)}
                  fullWidth
                  variant="outlined"
                />
              </FormCol>
            </FormRow>
          </React.Fragment>
        ))}

        <FormRow container wrap="nowrap">
          <FormCol item xs={12}>
            <Button
              fullWidth
              variant="text"
              onClick={this.focusOnBenefit}
              style={{
                width: '30%',
                marginTop: '15px',
                paddingVertical: '20px',
              }}
            >
              <AddIcon />
              {intl.formatMessage(messages.addBenefit)}
            </Button>
          </FormCol>
        </FormRow>

        <FormRow container wrap="nowrap">
          <FormCol item xs={5}>
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
          <FormCol
            item
            xs={7}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            {intl.formatMessage(messages.isAssetsMarkedForGoals)}
          </FormCol>
        </FormRow>

        <div style={{ textAlign: 'right' }}>
          <IconButton onClick={onDelete} style={{ fontSize: 30 }}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>

        {/* <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={this.handleSubmit}
          disabled={
            !!this.state.error.insuranceProvider ||
            !!this.state.error.annualPremium
          }
          style={{
            padding: '15px',
            margin: '12px 0px 0px 0px',
          }}
        >
          {intl.formatMessage(messages.addInsuranceItem)}
        </Button> */}
      </React.Fragment>
    );
  }
}

InsuranceSection.propTypes = {
  intl: PropTypes.object,
  addBenefit: PropTypes.func,
  addInsurance: PropTypes.func,
  // insurances: PropTypes.array,
  insuranceProvider: PropTypes.string,
  currencyOptions: PropTypes.array,
  currency: PropTypes.string,
  annualPremium: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentCash: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // benefitOptions: PropTypes.array,
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
