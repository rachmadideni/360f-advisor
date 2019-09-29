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
import NumberInput from 'components/NumberInput';
import globalMessages from 'containers/App/messages';
import FormCol from 'containers/FinancialWizardContainer/components/FormCol';
import FormRow from 'containers/FinancialWizardContainer/components/FormRow';
import messages from '../messages';

import BenefitItems from '../components/Benefits';

class InsuranceSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        insuranceProvider: null,
        currency: null,
        annualPremium: null,
        benefit: null,
        currentCash: null,
      },
    };

    this.selectBenefit = React.createRef();
    this.validateProvider = this.validateProvider.bind(this);
    this.validateAnnualPremium = this.validateAnnualPremium.bind(this);
    this.validateCurrentCash = this.validateCurrentCash.bind(this);
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

  validateCurrentCash(value) {
    this.props.onError(isEmpty(value));
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        currentCash: isEmpty(value) ? messages.errorAnnualProviderAmount : null,
      },
    }));
  }

  focusOnBenefit = () => {
    this.selectBenefit.current.focus();
    this.validateBenefitSelection();
  };

  render() {
    const {
      intl,
      insuranceProvider,
      currencyOptions,
      currency,
      annualPremium,
      currentCash,
      benefitOptions,
      markedForGoals,

      onChangeInsuranceProvider,
      onChangeInsuranceCurrency,
      onChangeInsuranceAnnualPremium,
      onChangeInsuranceCurrentCash,
      onChangeMarkedGoals,
      changeBenefitInput,

      addBenefit,
      deleteBenefitItem,
      onDelete,
      validate,
      notDeletable,
      benefitsData,
      onInputChange,
      onError,
    } = this.props;

    const { error } = this.state;

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
              onChange={value => {
                this.validateCurrentCash(value);
                return onChangeInsuranceCurrentCash(value);
              }}
              label={intl.formatMessage(messages.currentCashValue)}
              allowNegative={false}
              variant="outlined"
              fullWidth
              error={validate && !!error.currentCash}
              helperText={
                validate && error.currentCash
                  ? intl.formatMessage(error.errorAnnualProviderAmount)
                  : null
              }
            />
          </FormCol>
        </FormRow>

        <BenefitItems
          ints={intl}
          benefitsData={benefitsData}
          benefitOptions={benefitOptions}
          onInputChange={(key, value) => onInputChange(index, key, value)}
          onChangeBenefitInput={(index, key, value) =>
            changeBenefitInput(index, key, value)
          }
          onDeleteBenefitItem={benefitIndex => deleteBenefitItem(benefitIndex)}
          onError={value => onError(value)}
        />

        {benefitsData.length < benefitOptions.length ? (
          <FormRow container wrap="nowrap">
            <FormCol item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => addBenefit()}
              >
                <AddIcon />
                {intl.formatMessage(messages.addBenefit)}
              </Button>
            </FormCol>
          </FormRow>
        ) : null}

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

InsuranceSection.propTypes = {
  intl: PropTypes.object,
  addBenefit: PropTypes.func,
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
  changeBenefitInput: PropTypes.func,
  deleteBenefitItem: PropTypes.func,
  onInputChange: PropTypes.func,
  benefitsData: PropTypes.array,
  notDeletable: PropTypes.bool,
};

InsuranceSection.defaultProps = {
  notDeletable: false,
};

export default injectIntl(InsuranceSection);
