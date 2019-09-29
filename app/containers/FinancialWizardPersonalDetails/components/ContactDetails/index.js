import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import TextField from 'components/TextField';
import NumberInput from 'components/NumberInput';
import MenuItem from '@material-ui/core/MenuItem';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import { isEqual } from 'lodash/lang';
import { forOwn } from 'lodash/object';

import globalMessages from 'containers/App/messages';
import FormRow from 'containers/FinancialWizardContainer/components/FormRow';
import FormCol from 'containers/FinancialWizardContainer/components/FormCol';
import Switch from 'components/Switch';
import Typography from 'components/Typography';
import messages from '../../messages';

class ContactDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        email: null,
        residentialPostOfficeBox: null,
        residentialAddress: null,
        permanentPostOfficeBox: null,
        permanentAddress: null,
        countryDialingCode: null,
        phoneNumber: null,
      },
    };
  }

  componentDidMount() {
    this.validateAll();
  }

  componentDidUpdate(prevProps, prevState) {
    const { validate, personalDetails } = this.props;
    if (
      prevProps.validate !== validate ||
      personalDetails.isPrimaryAddress !==
        prevProps.personalDetails.isPrimaryAddress
    ) {
      this.validateAll();
    }
    if (!isEqual(this.state.error, prevState.error)) {
      // this.props.onError(this.validateAll());
      let isError = false;
      forOwn(this.state.error, value => {
        isError = isError || !!value;
      });
      this.props.onError(isError);
    }
  }

  componentWillUnmount() {
    this.props.onError(false);
  }

  validateAll() {
    const { personalDetails } = this.props;
    const isEmailError = this.validateInputEmail(
      'email',
      personalDetails.email,
    );
    const isResPoBoxError = this.validatePoBoxNumber(
      'residentialPostOfficeBox',
      personalDetails.residentialPostOfficeBox,
    );
    const isResAddressError = this.validateInputEmpty(
      'residentialAddress',
      personalDetails.residentialAddress,
    );
    const isPermPoBoxError =
      !personalDetails.isPrimaryAddress &&
      this.validatePoBoxNumber(
        'permanentPostOfficeBox',
        personalDetails.permanentPostOfficeBox,
      );
    const isPermAddressError =
      !personalDetails.isPrimaryAddress &&
      this.validateInputEmpty(
        'permanentAddress',
        personalDetails.permanentAddress,
      );
    const isCountryCodeError = this.validateInputEmpty(
      'countryDialingCode',
      personalDetails.countryDialingCode,
      true,
    );
    const isPhoneError = this.validateInputEmpty(
      'phoneNumber',
      personalDetails.phoneNumber,
    );
    return (
      isEmailError ||
      isResPoBoxError ||
      isResAddressError ||
      isPermPoBoxError ||
      isPermAddressError ||
      isCountryCodeError ||
      isPhoneError
    );
  }

  validateInputEmpty(name, value, isSelect = false) {
    // this.props.onError(isEmpty(value) || !!this.state.error[name]);
    const errMsg = isSelect
      ? globalMessages.pleaseMakeSelection
      : globalMessages.pleaseEnterValue;
    this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        [name]: isEmpty(value) ? errMsg : null,
      },
    }));
    return isEmpty(value);
  }

  validatePoBoxNumber(name, value) {
    this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        [name]: !isLength(value, { min: 5, max: 5 })
          ? globalMessages.pleaseEnterValidPoBox
          : null,
      },
    }));
    return !isLength(value, { min: 5, max: 5 });
  }

  validateInputEmail(name, value) {
    this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        [name]: !isEmail(value) ? globalMessages.pleaseEnterValidEmail : null,
      },
    }));
    return !isEmail(value);
  }

  renderPermanentAddress() {
    const { intl, personalDetails, onInputChange, validate } = this.props;
    const { error } = this.state;
    if (!personalDetails.isPrimaryAddress) {
      return (
        <React.Fragment>
          <FormRow container wrap="nowrap">
            <FormCol item xs>
              <NumberInput
                variant="outlined"
                thousandSeparator=""
                label={intl.formatMessage(messages.poBox)}
                fullWidth
                value={personalDetails.permanentPostOfficeBox}
                onChange={value => {
                  this.validatePoBoxNumber('permanentPostOfficeBox', value);
                  return onInputChange('permanentPostOfficeBox', value);
                }}
                error={validate && !!error.permanentPostOfficeBox}
                helperText={
                  validate && error.permanentPostOfficeBox
                    ? intl.formatMessage(error.permanentPostOfficeBox)
                    : null
                }
              />
            </FormCol>
          </FormRow>
          <FormRow container wrap="nowrap">
            <FormCol item xs>
              <TextField
                variant="outlined"
                label={intl.formatMessage(messages.permanentAddress)}
                fullWidth
                value={personalDetails.permanentAddress}
                onChange={e => {
                  this.validateInputEmpty('permanentAddress', e.target.value);
                  return onInputChange('permanentAddress', e.target.value);
                }}
                error={validate && !!error.permanentAddress}
                helperText={
                  validate && error.permanentAddress
                    ? intl.formatMessage(error.permanentAddress)
                    : null
                }
              />
            </FormCol>
          </FormRow>
        </React.Fragment>
      );
    }
    return null;
  }

  render() {
    const {
      intl,
      countryPrefixOptions,
      personalDetails,
      onInputChange,
      validate,
    } = this.props;
    const { error } = this.state;
    return (
      <React.Fragment>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              variant="outlined"
              label={intl.formatMessage(messages.emailAddress)}
              fullWidth
              value={personalDetails.email}
              onChange={e => {
                this.validateInputEmail('email', e.target.value);
                return onInputChange('email', e.target.value);
              }}
              error={validate && !!error.email}
              helperText={
                validate && error.email ? intl.formatMessage(error.email) : null
              }
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <NumberInput
              variant="outlined"
              thousandSeparator=""
              label={intl.formatMessage(messages.poBox)}
              fullWidth
              value={personalDetails.residentialPostOfficeBox}
              onChange={value => {
                this.validatePoBoxNumber('residentialPostOfficeBox', value);
                return onInputChange('residentialPostOfficeBox', value);
              }}
              error={validate && !!error.residentialPostOfficeBox}
              helperText={
                validate && error.residentialPostOfficeBox
                  ? intl.formatMessage(error.residentialPostOfficeBox)
                  : null
              }
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              variant="outlined"
              label={intl.formatMessage(messages.residentialAddress)}
              fullWidth
              value={personalDetails.residentialAddress}
              onChange={e => {
                this.validateInputEmpty('residentialAddress', e.target.value);
                return onInputChange('residentialAddress', e.target.value);
              }}
              error={validate && !!error.residentialAddress}
              helperText={
                validate && error.residentialAddress
                  ? intl.formatMessage(error.residentialAddress)
                  : null
              }
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap" alignItems="center">
          <FormCol item>
            <Switch
              checked={personalDetails.isPrimaryAddress}
              value="1"
              color="default"
              labelPositive={intl.formatMessage(globalMessages.yes)}
              labelNegative={intl.formatMessage(globalMessages.no)}
              onChange={e => {
                if (e.target.checked) {
                  // disable validation for permanent address if isPrimaryAddress
                  this.setState(prevState => ({
                    ...prevState,
                    error: {
                      ...prevState.error,
                      permanentPostOfficeBox: null,
                      permanentAddress: null,
                    },
                  }));
                }
                return onInputChange('isPrimaryAddress', e.target.checked);
              }}
            />
          </FormCol>
          <FormCol item xs>
            <Typography variant="body1">
              {intl.formatMessage(messages.isResidentialAddressPrimary)}
            </Typography>
          </FormCol>
        </FormRow>
        {this.renderPermanentAddress()}
        <FormRow container wrap="nowrap">
          <FormCol item xs={4}>
            <TextField
              variant="outlined"
              label={intl.formatMessage(messages.country)}
              select
              fullWidth
              value={personalDetails.countryDialingCode}
              onChange={e => {
                this.validateInputEmpty(
                  'countryDialingCode',
                  e.target.value,
                  true,
                );
                return onInputChange('countryDialingCode', e.target.value);
              }}
              error={validate && !!error.countryDialingCode}
              helperText={
                validate && error.countryDialingCode
                  ? intl.formatMessage(error.countryDialingCode)
                  : null
              }
            >
              {countryPrefixOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
          </FormCol>
          <FormCol item xs={8}>
            <NumberInput
              variant="outlined"
              thousandSeparator=""
              label={intl.formatMessage(messages.contactNumber)}
              fullWidth
              value={personalDetails.phoneNumber}
              onChange={value => {
                this.validateInputEmpty('phoneNumber', value);
                return onInputChange('phoneNumber', value);
              }}
              error={validate && !!error.phoneNumber}
              helperText={
                validate && error.phoneNumber
                  ? intl.formatMessage(error.phoneNumber)
                  : null
              }
            />
          </FormCol>
        </FormRow>
      </React.Fragment>
    );
  }
}

ContactDetails.propTypes = {
  intl: PropTypes.object,
  countryPrefixOptions: PropTypes.array,
  personalDetails: PropTypes.object,
  onInputChange: PropTypes.func,
  validate: PropTypes.bool,
  onError: PropTypes.func,
};

export default injectIntl(ContactDetails);
