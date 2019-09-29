import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import TextField from 'components/TextField';
import NumberInput from 'components/NumberInput';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
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
        name: null,
        relationship: null,
        email: null,
        countryDialingCode: null,
        phoneNumber: null,
      },
    };
  }

  componentDidMount() {
    this.validateAll();
  }

  componentDidUpdate(prevProps, prevState) {
    const { validate, dependant } = this.props;
    if (
      prevProps.validate !== validate ||
      dependant.isEmergencyContact !== prevProps.dependant.isEmergencyContact
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
    const { dependant } = this.props;
    const isNameError = this.validateInputEmpty('name', dependant.name);
    const isRelError = this.validateInputEmpty(
      'relationship',
      dependant.relationship,
    );
    const isEmailError =
      !!dependant.isEmergencyContact &&
      this.validateInputEmail('email', dependant.email);
    const isCountryCodeError =
      !!dependant.isEmergencyContact &&
      this.validateInputEmpty(
        'countryDialingCode',
        dependant.countryDialingCode,
      );
    const isPhoneError =
      !!dependant.isEmergencyContact &&
      this.validateInputEmpty('phoneNumber', dependant.phoneNumber);
    return (
      isNameError ||
      isRelError ||
      isEmailError ||
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

  renderContact() {
    const {
      intl,
      dependant,
      countryPrefixOptions,
      onInputChange,
      validate,
    } = this.props;
    const { error } = this.state;
    if (dependant.isEmergencyContact) {
      return (
        <React.Fragment>
          <FormRow container wrap="nowrap">
            <FormCol item xs>
              <TextField
                variant="outlined"
                label={intl.formatMessage(messages.emailAddress)}
                fullWidth
                value={dependant.email}
                onChange={e => {
                  this.validateInputEmail('email', e.target.value);
                  return onInputChange('email', e.target.value);
                }}
                error={validate && !!error.email}
                helperText={
                  validate && error.email
                    ? intl.formatMessage(error.email)
                    : null
                }
              />
            </FormCol>
          </FormRow>
          <FormRow container wrap="nowrap">
            <FormCol item xs={4}>
              <TextField
                variant="outlined"
                label={intl.formatMessage(messages.country)}
                select
                fullWidth
                value={dependant.countryDialingCode}
                onChange={e => {
                  this.validateInputEmpty('countryDialingCode', e.target.value);
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
                value={dependant.phoneNumber}
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
    return null;
  }

  render() {
    const {
      intl,
      dependantRelationshipOptions,
      dependant,
      onInputChange,
      onDelete,
      validate,
    } = this.props;
    const { error } = this.state;
    return (
      <React.Fragment>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              variant="outlined"
              label={intl.formatMessage(messages.nameOfDependant)}
              fullWidth
              value={dependant.name}
              onChange={e => {
                this.validateInputEmpty('name', e.target.value);
                return onInputChange('name', e.target.value);
              }}
              error={validate && !!error.name}
              helperText={
                validate && error.name ? intl.formatMessage(error.name) : null
              }
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              variant="outlined"
              label={intl.formatMessage(messages.relationship)}
              select
              fullWidth
              value={dependant.relationship}
              onChange={e => {
                this.validateInputEmpty('relationship', e.target.value);
                return onInputChange('relationship', e.target.value);
              }}
              error={validate && !!error.relationship}
              helperText={
                validate && error.relationship
                  ? intl.formatMessage(error.relationship)
                  : null
              }
            >
              {dependantRelationshipOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap" alignItems="center">
          <FormCol item>
            <Switch
              checked={dependant.isEmergencyContact}
              value="1"
              color="default"
              labelPositive={intl.formatMessage(globalMessages.yes)}
              labelNegative={intl.formatMessage(globalMessages.no)}
              onChange={e => {
                if (!e.target.checked) {
                  // disable validation for permanent address if not isEmergencyContact
                  this.setState(prevState => ({
                    ...prevState,
                    error: {
                      ...prevState.error,
                      email: null,
                      countryDialingCode: null,
                      phoneNumber: null,
                    },
                  }));
                }
                return onInputChange('isEmergencyContact', e.target.checked);
              }}
            />
          </FormCol>
          <FormCol item xs>
            <Typography variant="body1">
              {intl.formatMessage(messages.isEmergencyContact)}
            </Typography>
          </FormCol>
        </FormRow>
        {this.renderContact()}
        <div style={{ textAlign: 'right' }}>
          <IconButton onClick={onDelete} style={{ fontSize: 30 }}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      </React.Fragment>
    );
  }
}

ContactDetails.propTypes = {
  intl: PropTypes.object,
  dependantRelationshipOptions: PropTypes.array,
  countryPrefixOptions: PropTypes.array,
  dependant: PropTypes.object,
  onDelete: PropTypes.func,
  onInputChange: PropTypes.func,
  validate: PropTypes.bool,
  onError: PropTypes.func,
};

export default injectIntl(ContactDetails);
