import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import TextField from 'components/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import isEmpty from 'validator/lib/isEmpty';

import NumberInput from 'components/NumberInput';
import FormRow from 'containers/FinancialWizardContainer/components/FormRow';
import FormCol from 'containers/FinancialWizardContainer/components/FormCol';
import messages from '../../messages';

class LoanItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        loanType: null,
        monthlyAmount: null,
        tenureMonths: null,
      },
    };
    this.validateLoanType = this.validateLoanType.bind(this);
    this.validateMonthlyAmount = this.validateMonthlyAmount.bind(this);
    this.validateTenureMonths = this.validateTenureMonths.bind(this);
  }

  componentDidMount() {
    const { loanType, monthlyAmount, tenureMonths } = this.props;
    this.validateLoanType(loanType);
    this.validateMonthlyAmount(monthlyAmount);
    this.validateTenureMonths(tenureMonths);
  }

  componentDidUpdate(prevProps) {
    const { loanType, monthlyAmount, tenureMonths, validate } = this.props;
    if (prevProps.validate !== validate) {
      this.validateLoanType(loanType);
      this.validateMonthlyAmount(monthlyAmount);
      this.validateTenureMonths(tenureMonths);
    }
  }

  componentWillUnmount() {
    this.props.onError(false);
  }

  validateLoanType(value) {
    this.props.onError(
      isEmpty(value) ||
        !!this.state.error.monthlyAmount ||
        !!this.state.error.tenureMonths,
    );
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        loanType: isEmpty(value) ? messages.pleaseMakeSelection : null,
      },
    }));
  }

  validateMonthlyAmount(value) {
    this.props.onError(
      !!this.state.error.loanType ||
        isEmpty(value) ||
        !!this.state.error.tenureMonths,
    );
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        monthlyAmount: isEmpty(value) ? messages.pleaseEnterValue : null,
      },
    }));
  }

  validateTenureMonths(value) {
    this.props.onError(
      !!this.state.error.loanType ||
        isEmpty(value) ||
        !!this.state.error.monthlyAmount,
    );
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        tenureMonths: isEmpty(value) ? messages.pleaseEnterValue : null,
      },
    }));
  }

  render() {
    const {
      intl,
      loanType,
      currency,
      monthlyAmount,
      tenureMonths,
      onLoanTypeChange,
      onCurrencyChange,
      onMonthlyAmountChange,
      onTenureMonthsChange,
      loanTypeOptions,
      currencyOptions,
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
              value={loanType}
              onChange={event => {
                this.validateLoanType(event.target.value);
                return onLoanTypeChange(event.target.value);
              }}
              variant="outlined"
              label={intl.formatMessage(messages.loanType)}
              select
              fullWidth
              error={validate && !!error.loanType}
              helperText={
                validate && error.loanType
                  ? intl.formatMessage(error.loanType)
                  : null
              }
            >
              {loanTypeOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs={4}>
            <TextField
              value={currency}
              onChange={event => onCurrencyChange(event.target.value)}
              variant="outlined"
              label={intl.formatMessage(messages.currency)}
              select
              fullWidth
            >
              {currencyOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
          </FormCol>
          <FormCol item xs={8}>
            <NumberInput
              value={monthlyAmount}
              onChange={value => {
                this.validateMonthlyAmount(value);
                return onMonthlyAmountChange(value);
              }}
              variant="outlined"
              label={intl.formatMessage(messages.monthlyAmount)}
              fullWidth
              error={validate && !!error.monthlyAmount}
              helperText={
                validate && error.monthlyAmount
                  ? intl.formatMessage(error.monthlyAmount)
                  : null
              }
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <NumberInput
              value={tenureMonths}
              onChange={value => {
                this.validateTenureMonths(value);
                return onTenureMonthsChange(value);
              }}
              variant="outlined"
              label={intl.formatMessage(messages.tenureRemaining)}
              fullWidth
              error={validate && !!error.tenureMonths}
              helperText={
                validate && error.tenureMonths
                  ? intl.formatMessage(error.tenureMonths)
                  : null
              }
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

LoanItem.propTypes = {
  intl: PropTypes.object,
  loanType: PropTypes.string,
  currency: PropTypes.string,
  monthlyAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tenureMonths: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLoanTypeChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
  onMonthlyAmountChange: PropTypes.func,
  onTenureMonthsChange: PropTypes.func,
  loanTypeOptions: PropTypes.array,
  currencyOptions: PropTypes.array,
  onDelete: PropTypes.func,
  validate: PropTypes.bool,
  notDeletable: PropTypes.bool,
  onError: PropTypes.func,
};

LoanItem.defaultProps = {
  notDeletable: false,
};

export default injectIntl(LoanItem);
