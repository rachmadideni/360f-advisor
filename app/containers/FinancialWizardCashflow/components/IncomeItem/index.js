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

class IncomeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        incomeType: null,
        annualIncome: null,
      },
    };
    this.validateIncomeType = this.validateIncomeType.bind(this);
    this.validateAnnualIncome = this.validateAnnualIncome.bind(this);
  }

  componentDidMount() {
    const { incomeType, annualIncome } = this.props;
    this.validateIncomeType(incomeType);
    this.validateAnnualIncome(annualIncome);
  }

  componentDidUpdate(prevProps) {
    const { incomeType, annualIncome, validate } = this.props;
    if (prevProps.validate !== validate) {
      this.validateIncomeType(incomeType);
      this.validateAnnualIncome(annualIncome);
    }
  }

  componentWillUnmount() {
    this.props.onError(false);
  }

  validateIncomeType(value) {
    this.props.onError(isEmpty(value) || !!this.state.error.annualIncome);
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        incomeType: isEmpty(value) ? messages.pleaseMakeSelection : null,
      },
    }));
  }

  validateAnnualIncome(value) {
    this.props.onError(!!this.state.error.incomeType || isEmpty(value));
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        annualIncome: isEmpty(value) ? messages.pleaseEnterValue : null,
      },
    }));
  }

  render() {
    const {
      intl,
      incomeType,
      currency,
      annualIncome,
      onIncomeTypeChange,
      onCurrencyChange,
      onAnnualIncomeChange,
      incomeTypeOptions,
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
              value={incomeType}
              onChange={event => {
                this.validateIncomeType(event.target.value);
                return onIncomeTypeChange(event.target.value);
              }}
              variant="outlined"
              label={intl.formatMessage(messages.incomeType)}
              select
              fullWidth
              error={validate && !!error.incomeType}
              helperText={
                validate && error.incomeType
                  ? intl.formatMessage(error.incomeType)
                  : null
              }
            >
              {incomeTypeOptions.map(option => (
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
              value={annualIncome}
              onChange={value => {
                this.validateAnnualIncome(value);
                return onAnnualIncomeChange(value);
              }}
              variant="outlined"
              label={intl.formatMessage(messages.annualIncome)}
              fullWidth
              allowNegative={false}
              error={validate && !!error.annualIncome}
              helperText={
                validate && error.annualIncome
                  ? intl.formatMessage(error.annualIncome)
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

IncomeItem.propTypes = {
  intl: PropTypes.object,
  incomeType: PropTypes.string,
  currency: PropTypes.string,
  annualIncome: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onIncomeTypeChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
  onAnnualIncomeChange: PropTypes.func,
  currencyOptions: PropTypes.array,
  incomeTypeOptions: PropTypes.array,
  onDelete: PropTypes.func,
  validate: PropTypes.bool,
  notDeletable: PropTypes.bool,
  onError: PropTypes.func,
};

IncomeItem.defaultProps = {
  notDeletable: false,
};

export default injectIntl(IncomeItem);
