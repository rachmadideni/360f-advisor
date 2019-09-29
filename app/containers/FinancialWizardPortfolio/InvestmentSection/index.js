import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import TextField from 'components/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import isEmpty from 'validator/lib/isEmpty';

import NumberInput from 'components/NumberInput';
import FormCol from 'containers/FinancialWizardContainer/components/FormCol';
import FormRow from 'containers/FinancialWizardContainer/components/FormRow';
import messages from '../messages';

class InvestmentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        instrumentType: null,
        instrumentProvider: null,
        currentValue: null,
        annualContributions: null,
        rateOfReturn: null,
      },
    };

    this.validateInstrumentType = this.validateInstrumentType.bind(this);
    this.validateInstrumentProviderLength = this.validateInstrumentProviderLength.bind(
      this,
    );
    this.validateCurrentValue = this.validateCurrentValue.bind(this);
    this.validateRate = this.validateRate.bind(this);
  }

  componentDidMount() {
    const { instrumentType,instrumentProvider,currentValue,rateOfReturn } = this.props;
    this.validateInstrumentType(instrumentType);
    this.validateInstrumentProviderLength(instrumentProvider);
    this.validateCurrentValue(currentValue);
    this.validateRate(rateOfReturn);
  }

  componentDidUpdate(prevProps) {
    const { instrumentType, instrumentProvider, currentValue, rateOfReturn, validate } = this.props;
    if (prevProps.validate !== validate) {
      this.validateInstrumentType(instrumentType);
      this.validateInstrumentProviderLength(instrumentProvider);
      this.validateCurrentValue(currentValue);
      this.validateRate(rateOfReturn);
    }
  }

  componentWillUnmount() {
    this.props.onError(false);
  }

  validateInstrumentType(value) {
    this.props.onError(isEmpty(value) || !!this.state.error.instrumentType);
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        instrumentType: isEmpty(value) ? messages.pleaseMakeSelection : null,
      },
    }));
  }

  validateInstrumentProviderLength(value) {
    this.props.onError(value.length > 200);
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        instrumentProvider:
          value > 200 ? messages.instrumentProviderMaxExcessLength : null,
      },
    }));
  }

  validateCurrentValue(value) {
    this.props.onError(isEmpty(value));
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        currentValue: isEmpty(value) ? messages.pleaseEnterValue : null,
      },
    }));
  }

  validateRate(value) {
    this.props.onError(isEmpty(value));
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        rateOfReturn: isEmpty(value) ? messages.pleaseEnterValue : null,
      },
    }));
  }

  render() {
    const {
      intl,
      instrumentType,
      instrumentTypeOptions,
      instrumentProvider,
      annualContributions,
      rateOfReturn,
      currentValue,
      currency,
      currencyOptions,
      onInstrumentTypeChange,
      onInstrumentProviderChange,
      onInstrumentCurrentValueChange,
      onInvestmentCurrencyChange,
      onInvestmentAnnualChange,
      onInvestmentRateChange,
      onDelete,
      validate,
      notDeletable,
    } = this.props;

    const { error } = this.state;

    return (
      <React.Fragment>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              value={instrumentType}
              onChange={event => {
                this.validateInstrumentType(event.target.value);
                return onInstrumentTypeChange(event.target.value);
              }}
              variant="outlined"
              label={intl.formatMessage(messages.instrumentType)}
              select
              fullWidth
            >
              {instrumentTypeOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
          </FormCol>
        </FormRow>

        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              value={instrumentProvider}
              onChange={event => {
                this.validateInstrumentProviderLength(event.target.value);
                return onInstrumentProviderChange(event.target.value);
              }}
              variant="outlined"
              label={intl.formatMessage(messages.instrumentProvider)}
              fullWidth
              error={validate && !!error.instrumentProvider}
              helperText={
                validate && !!error.instrumentProvider
                  ? intl.formatMessage(error.instrumentProvider)
                  : null
              }
            />
          </FormCol>
        </FormRow>

        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              value={currency}
              onChange={event => onInvestmentCurrencyChange(event.target.value)}
              variant="outlined"
              label={intl.formatMessage(messages.currency)}
              select
              fullWidth
            >
              {currencyOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </FormCol>
        </FormRow>

        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <NumberInput
              value={currentValue}
              onChange={value => {
                this.validateCurrentValue(value);
                return onInstrumentCurrentValueChange(value);
              }}
              variant="outlined"
              label={intl.formatMessage(messages.currentValue)}
              allowNegative={false}
              error={validate && !!error.currentValue}
              helperText={
                validate && error.currentValue
                  ? intl.formatMessage(error.currentValue)
                  : null
              }
              fullWidth
            />
          </FormCol>
        </FormRow>

        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <NumberInput
              value={annualContributions}
              onChange={value => onInvestmentAnnualChange(value)}
              variant="outlined"
              label={intl.formatMessage(messages.annualContributions)}
              allowNegative={false}
              fullWidth
            />
          </FormCol>
        </FormRow>

        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <NumberInput
              thousandSeparator=","
              decimalSeparator="."
              suffix=" %"
              value={rateOfReturn}
              onChange={value => {
                this.validateRate(value);
                return onInvestmentRateChange(value);
              }}
              variant="outlined"
              label={intl.formatMessage(messages.rateOfReturn)}
              allowNegative={false}
              fullWidth
            />
          </FormCol>
        </FormRow>
        {!notDeletable && (
          <div style={{ textAlign: 'right' }}>
            <IconButton onClick={onDelete} style={{ fontSize: 30 }}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        )}
      </React.Fragment>
    );
  }
}

InvestmentSection.propTypes = {
  intl: PropTypes.object,
  onError: PropTypes.func,
  instrumentType: PropTypes.string,
  instrumentTypeOptions: PropTypes.array,
  instrumentProvider: PropTypes.string,
  annualContributions: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rateOfReturn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currency: PropTypes.string,
  currencyOptions: PropTypes.array,
  onInstrumentTypeChange: PropTypes.func,
  onInstrumentProviderChange: PropTypes.func,
  onInstrumentCurrentValueChange: PropTypes.func,
  onInvestmentCurrencyChange: PropTypes.func,
  onInvestmentAnnualChange: PropTypes.func,
  onInvestmentRateChange: PropTypes.func,
  onDelete: PropTypes.func,
  validate: PropTypes.bool,
  notDeletable: PropTypes.bool,
};

InvestmentSection.defaultProps = {
  notDeletable: false,
};

export default injectIntl(InvestmentSection);
