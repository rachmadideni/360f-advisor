import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import TextField from 'components/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import isEmpty from 'validator/lib/isEmpty';
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
        pepName: null,
        pepRelationship: null,
        pepPosition: null,
        pepOrganization: null,
        pepCountry: null,
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
      personalDetails.isPep !== prevProps.personalDetails.isPep
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
    const isPepNameError =
      !!personalDetails.isPep &&
      this.validateInputEmpty('pepName', personalDetails.pepName);
    const isPepRelError =
      !!personalDetails.isPep &&
      this.validateInputEmpty(
        'pepRelationship',
        personalDetails.pepRelationship,
        true,
      );
    const isPepPosError =
      !!personalDetails.isPep &&
      this.validateInputEmpty('pepPosition', personalDetails.pepPosition);
    const isPepOrgError =
      !!personalDetails.isPep &&
      this.validateInputEmpty(
        'pepOrganization',
        personalDetails.pepOrganization,
      );
    const isPepCountryError =
      !!personalDetails.isPep &&
      this.validateInputEmpty('pepCountry', personalDetails.pepCountry, true);
    return (
      isPepNameError ||
      isPepRelError ||
      isPepPosError ||
      isPepOrgError ||
      isPepCountryError
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

  renderPepDetails() {
    const {
      intl,
      pepRelationshipOptions,
      countryOptions,
      personalDetails,
      onInputChange,
      validate,
    } = this.props;
    const { error } = this.state;
    if (personalDetails.isPep) {
      return (
        <React.Fragment>
          <FormRow container wrap="nowrap">
            <FormCol item xs>
              <TextField
                variant="outlined"
                label={intl.formatMessage(messages.nameOfPerson)}
                fullWidth
                value={personalDetails.pepName}
                onChange={e => {
                  this.validateInputEmpty('pepName', e.target.value);
                  return onInputChange('pepName', e.target.value);
                }}
                error={validate && !!error.pepName}
                helperText={
                  validate && error.pepName
                    ? intl.formatMessage(error.pepName)
                    : null
                }
              />
            </FormCol>
          </FormRow>
          <FormRow container wrap="nowrap">
            <FormCol item xs>
              <TextField
                variant="outlined"
                label={intl.formatMessage(messages.relationshipToIndividual)}
                select
                fullWidth
                value={personalDetails.pepRelationship}
                onChange={e => {
                  this.validateInputEmpty(
                    'pepRelationship',
                    e.target.value,
                    true,
                  );
                  return onInputChange('pepRelationship', e.target.value);
                }}
                error={validate && !!error.pepRelationship}
                helperText={
                  validate && error.pepRelationship
                    ? intl.formatMessage(error.pepRelationship)
                    : null
                }
              >
                {pepRelationshipOptions.map(option => (
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
                variant="outlined"
                label={intl.formatMessage(messages.currentPosition)}
                fullWidth
                value={personalDetails.pepPosition}
                onChange={e => {
                  this.validateInputEmpty('pepPosition', e.target.value);
                  return onInputChange('pepPosition', e.target.value);
                }}
                error={validate && !!error.pepPosition}
                helperText={
                  validate && error.pepPosition
                    ? intl.formatMessage(error.pepPosition)
                    : null
                }
              />
            </FormCol>
          </FormRow>
          <FormRow container wrap="nowrap">
            <FormCol item xs>
              <TextField
                variant="outlined"
                label={intl.formatMessage(messages.currentOrganization)}
                fullWidth
                value={personalDetails.pepOrganization}
                onChange={e => {
                  this.validateInputEmpty('pepOrganization', e.target.value);
                  return onInputChange('pepOrganization', e.target.value);
                }}
                error={validate && !!error.pepOrganization}
                helperText={
                  validate && error.pepOrganization
                    ? intl.formatMessage(error.pepOrganization)
                    : null
                }
              />
            </FormCol>
          </FormRow>
          <FormRow container wrap="nowrap">
            <FormCol item xs>
              <TextField
                variant="outlined"
                label={intl.formatMessage(messages.country)}
                select
                fullWidth
                value={personalDetails.pepCountry}
                onChange={e => {
                  this.validateInputEmpty('pepCountry', e.target.value);
                  return onInputChange('pepCountry', e.target.value);
                }}
                error={validate && !!error.pepCountry}
                helperText={
                  validate && error.pepCountry
                    ? intl.formatMessage(error.pepCountry)
                    : null
                }
              >
                {countryOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.title}
                  </MenuItem>
                ))}
              </TextField>
            </FormCol>
          </FormRow>
        </React.Fragment>
      );
    }
    return null;
  }

  render() {
    const { intl, personalDetails, onInputChange } = this.props;
    return (
      <React.Fragment>
        <FormRow container wrap="nowrap" alignItems="center">
          <FormCol item>
            <Switch
              checked={personalDetails.isPep}
              value="1"
              color="default"
              labelPositive={intl.formatMessage(globalMessages.yes)}
              labelNegative={intl.formatMessage(globalMessages.no)}
              onChange={e => {
                if (!e.target.checked) {
                  // disable validation for all inputs if isPep
                  this.setState(prevState => ({
                    ...prevState,
                    error: {
                      pepName: null,
                      pepRelationship: null,
                      pepPosition: null,
                      pepOrganization: null,
                      pepCountry: null,
                    },
                  }));
                }
                return onInputChange('isPep', e.target.checked);
              }}
            />
          </FormCol>
          <FormCol item xs>
            <Typography variant="body1">
              {intl.formatMessage(messages.isPep)}
            </Typography>
          </FormCol>
        </FormRow>
        {this.renderPepDetails()}
      </React.Fragment>
    );
  }
}

ContactDetails.propTypes = {
  intl: PropTypes.object,
  pepRelationshipOptions: PropTypes.array,
  countryOptions: PropTypes.array,
  personalDetails: PropTypes.object,
  onInputChange: PropTypes.func,
  validate: PropTypes.bool,
  onError: PropTypes.func,
};

export default injectIntl(ContactDetails);
