import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import TextField from 'components/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import NumberInput from 'components/NumberInput';
import isEmpty from 'validator/lib/isEmpty';

import FormCol from 'containers/FinancialWizardContainer/components/FormCol';
import FormRow from 'containers/FinancialWizardContainer/components/FormRow';
import messages from '../messages';

class PropertyHeldSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        propertyType: null,
        ownershipType: null,
        currentRealisableValue: null,
        rateOfReturn: null,
        percentageOfOwnership: null,
      },
    };

    this.validatePropertyType = this.validatePropertyType.bind(this);
    this.validateOwnershipType = this.validateOwnershipType.bind(this);
    this.validateRate = this.validateRate.bind(this);
    this.validatePercentage = this.validatePercentage.bind(this);
    this.validateRealisable = this.validateRealisable.bind(this);
  }

  componentDidMount() {
    const {
      propertyType,
      ownershipType,
      currentRealisableValue,
      rateOfReturn,
      percentageOfOwnership,
    } = this.props;

    this.validatePropertyType(propertyType);
    this.validateOwnershipType(ownershipType);
    this.validateRate(rateOfReturn);
    this.validatePercentage(percentageOfOwnership);
    this.validateRealisable(currentRealisableValue);
  }

  componentDidUpdate(prevProps) {
    const {
      propertyType,
      ownershipType,
      currentRealisableValue,
      rateOfReturn,
      validate,
      percentageOfOwnership,
    } = this.props;
    if (prevProps.validate !== validate) {
      this.validatePropertyType(propertyType);
      this.validateOwnershipType(ownershipType);
      this.validateRate(rateOfReturn);
      this.validatePercentage(percentageOfOwnership);
      this.validateRealisable(currentRealisableValue);
    }
  }

  componentWillUnmount() {
    this.props.onError(false);
  }

  validatePropertyType(value) {
    this.props.onError(isEmpty(value) || !!this.state.error.propertyType);
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        propertyType: isEmpty(value) ? messages.pleaseMakeSelection : null,
      },
    }));
  }

  validateOwnershipType(value) {
    this.props.onError(isEmpty(value) || !!this.state.error.ownershipType);
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        ownershipType: isEmpty(value) ? messages.pleaseMakeSelection : null,
      },
    }));
  }

  validateRate(value) {
    this.props.onError(isEmpty(value) || !!this.state.error.rateOfReturn);
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        rateOfReturn: isEmpty(value) ? messages.pleaseEnterValue : null,
      },
    }));
  }

  validatePercentage(value) {
    this.props.onError(
      isEmpty(value) || !!this.state.error.percentageOfOwnership,
    );
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        percentageOfOwnership: isEmpty(value)
          ? messages.pleaseEnterValue
          : null,
      },
    }));
  }

  validateRealisable(value) {
    this.props.onError(
      isEmpty(value) || !!this.state.error.currentRealisableValue,
    );
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        currentRealisableValue: isEmpty(value)
          ? messages.pleaseEnterValue
          : null,
      },
    }));
  }

  render() {
    const {
      intl,
      propertyType,
      propertyTypeOptions,
      ownershipType,
      ownershipTypeOptions,
      currency,
      currencyOptions,
      onChangePropertyType,
      onChangeOwnershipType,
      onChangePropertyCurrency,
      currentRealisableValue,
      onChangeRealisable,
      rateOfReturn,
      onChangePropertyRate,
      percentageOfOwnership,
      onChangeOwnershipPercentage,
      countryOfLocation,
      onChangeCountryLocation,
      addressOfProperty,
      onChangePropertyAddress,
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
              value={propertyType}
              label={intl.formatMessage(messages.propertyType)}
              onChange={event => {
                this.validatePropertyType(event.target.value);
                return onChangePropertyType(event.target.value);
              }}
              variant="outlined"
              select
              fullWidth
              error={validate && !!error.propertyType}
              helperText={
                validate && error.propertyType
                  ? intl.formatMessage(error.propertyType)
                  : null
              }
            >
              {propertyTypeOptions.map(option => (
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
              value={ownershipType}
              label={intl.formatMessage(messages.ownershipType)}
              onChange={event => {
                this.validateOwnershipType(event.target.value);
                return onChangeOwnershipType(event.target.value);
              }}
              variant="outlined"
              select
              fullWidth
              error={validate && !!error.ownershipType}
              helperText={
                validate && error.ownershipType
                  ? intl.formatMessage(error.ownershipType)
                  : null
              }
            >
              {ownershipTypeOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            {/* it should enabled if selected ownership type equals tenancy in common */}
            <NumberInput
              suffix=" %"
              format="### %"
              disabled={ownershipType !== 2}
              value={percentageOfOwnership}
              onChange={value => {
                this.validatePercentage(value);
                return onChangeOwnershipPercentage(value);
              }}
              label={intl.formatMessage(messages.percentageOfOwnership)}
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              value={currency}
              label={intl.formatMessage(messages.currency)}
              onChange={event => onChangePropertyCurrency(event.target.value)}
              variant="outlined"
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
              value={currentRealisableValue}
              label={intl.formatMessage(messages.currentRealisableValue)}
              onChange={value => onChangeRealisable(value)}
              allowNegative={false}
              error={validate && !!error.currentRealisableValue}
              helperText={
                validate && error.currentRealisableValue
                  ? intl.formatMessage(error.currentRealisableValue)
                  : null
              }
              fullWidth
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            {/* it should enabled if selected property type equals to investment Property	*/}
            <NumberInput
              suffix=" %"
              format="### %"
              disabled={propertyType !== 1}
              value={propertyType === 1 ? 10 : rateOfReturn}
              onChange={value => {
                this.validateRate(value);
                return onChangePropertyRate(value);
              }}
              variant="outlined"
              allowNegative={false}
              fullWidth
              label={intl.formatMessage(messages.rateOfReturn)}
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              value={countryOfLocation}
              onChange={event => onChangeCountryLocation(event.target.value)}
              label={intl.formatMessage(messages.countryOfLocation)}
              variant="outlined"
              fullWidth
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              value={addressOfProperty}
              onChange={event => onChangePropertyAddress(event.target.value)}
              label={intl.formatMessage(messages.addressOfProperty)}
              variant="outlined"
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

PropertyHeldSection.propTypes = {
  intl: PropTypes.object,
  propertyType: PropTypes.string,
  ownershipType: PropTypes.string,
  propertyTypeOptions: PropTypes.array,
  ownershipTypeOptions: PropTypes.array,
  currentRealisableValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rateOfReturn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  percentageOfOwnership: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  countryOfLocation: PropTypes.string,
  addressOfProperty: PropTypes.string,
  onError: PropTypes.func,
  currency: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currencyOptions: PropTypes.array,
  onChangePropertyType: PropTypes.func,
  onChangeOwnershipType: PropTypes.func,
  onChangePropertyCurrency: PropTypes.func,
  onChangeRealisable: PropTypes.func,
  onChangePropertyRate: PropTypes.func,
  onChangeOwnershipPercentage: PropTypes.func,
  onChangeCountryLocation: PropTypes.func,
  onChangePropertyAddress: PropTypes.func,
  onDelete: PropTypes.func,
  validate: PropTypes.bool,
  notDeletable: PropTypes.bool,
};

PropertyHeldSection.defaultProps = {
  notDeletable: false,
};

export default injectIntl(PropertyHeldSection);
