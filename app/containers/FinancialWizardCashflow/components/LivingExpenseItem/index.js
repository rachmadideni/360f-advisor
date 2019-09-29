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

class LivingExpenseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        livingExpenseType: null,
        annualAmount: null,
      },
    };
    this.validateLivingExpenseType = this.validateLivingExpenseType.bind(this);
    this.validateAnnualAmount = this.validateAnnualAmount.bind(this);
  }

  componentDidMount() {
    const { livingExpenseType, annualAmount } = this.props;
    this.validateLivingExpenseType(livingExpenseType);
    this.validateAnnualAmount(annualAmount);
  }

  componentDidUpdate(prevProps) {
    const { livingExpenseType, annualAmount, validate } = this.props;
    if (prevProps.validate !== validate) {
      this.validateLivingExpenseType(livingExpenseType);
      this.validateAnnualAmount(annualAmount);
    }
  }

  componentWillUnmount() {
    this.props.onError(false);
  }

  validateLivingExpenseType(value) {
    this.props.onError(isEmpty(value) || !!this.state.error.annualAmount);
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        livingExpenseType: isEmpty(value) ? messages.pleaseMakeSelection : null,
      },
    }));
  }

  validateAnnualAmount(value) {
    this.props.onError(!!this.state.error.livingExpenseType || isEmpty(value));
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        annualAmount: isEmpty(value) ? messages.pleaseEnterValue : null,
      },
    }));
  }

  render() {
    const {
      intl,
      livingExpenseType,
      currency,
      annualAmount,
      onLivingExpenseTypeChange,
      onCurrencyChange,
      onAnnualAmountChange,
      livingExpenseTypeOptions,
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
              value={livingExpenseType}
              onChange={event => {
                this.validateLivingExpenseType(event.target.value);
                return onLivingExpenseTypeChange(event.target.value);
              }}
              variant="outlined"
              label={intl.formatMessage(messages.livingExpenseType)}
              select
              fullWidth
              error={validate && !!error.livingExpenseType}
              helperText={
                validate && error.livingExpenseType
                  ? intl.formatMessage(error.livingExpenseType)
                  : null
              }
            >
              {livingExpenseTypeOptions.map(option => (
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
              value={annualAmount}
              onChange={value => {
                this.validateAnnualAmount(value);
                return onAnnualAmountChange(value);
              }}
              variant="outlined"
              label={intl.formatMessage(messages.annualAmount)}
              fullWidth
              error={validate && !!error.annualAmount}
              helperText={
                validate && error.annualAmount
                  ? intl.formatMessage(error.annualAmount)
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

LivingExpenseItem.propTypes = {
  intl: PropTypes.object,
  livingExpenseType: PropTypes.string,
  currency: PropTypes.string,
  annualAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLivingExpenseTypeChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
  onAnnualAmountChange: PropTypes.func,
  livingExpenseTypeOptions: PropTypes.array,
  currencyOptions: PropTypes.array,
  onDelete: PropTypes.func,
  validate: PropTypes.bool,
  notDeletable: PropTypes.bool,
  onError: PropTypes.func,
};

LivingExpenseItem.defaultProps = {
  notDeletable: false,
};

export default injectIntl(LivingExpenseItem);
