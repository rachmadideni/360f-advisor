import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import TextField from 'components/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { isEqual } from 'lodash/lang';
import { forOwn } from 'lodash/object';

import FormRow from 'containers/FinancialWizardContainer/components/FormRow';
import FormCol from 'containers/FinancialWizardContainer/components/FormCol';
import globalMessages from 'containers/App/messages';
import FileUpload from '../FileUpload';
import messages from '../../messages';

/* eslint-disable react/prefer-stateless-function */
class WorkDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        employmentStatus: null,
        jobTitle: null,
        industry: null,
        occupation: null,
        companyEmail: null,
      },
    };
  }

  componentDidMount() {
    this.validateAll();
  }

  componentDidUpdate(prevProps, prevState) {
    const { validate } = this.props;
    if (prevProps.validate !== validate) {
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

  getFileSrc() {
    const { personalDetails, companyFiles } = this.props;
    const fileArray = [...personalDetails.companyFiles];
    if (fileArray.length < 1) {
      for (let i = 0; i < companyFiles.length; i += 1) {
        if (fileArray.length >= 1) {
          break;
        }
        fileArray.push(companyFiles[i]);
      }
    }
    return fileArray;
  }

  validateAll() {
    const { personalDetails } = this.props;
    const isEmpStatusError = this.validateInputEmpty(
      'employmentStatus',
      personalDetails.employmentStatus,
      true,
    );
    const isJobTitleErr = this.validateInputEmpty(
      'jobTitle',
      personalDetails.jobTitle,
    );
    const isIndustryErr = this.validateInputEmpty(
      'industry',
      personalDetails.industry,
      true,
    );
    const isOccupationErr = this.validateInputEmpty(
      'occupation',
      personalDetails.occupation,
      true,
    );
    const isCompEmailErr = this.validateInputEmail(
      'companyEmail',
      personalDetails.companyEmail,
    );
    return (
      isEmpStatusError ||
      isJobTitleErr ||
      isIndustryErr ||
      isOccupationErr ||
      isCompEmailErr
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
        [name]:
          !!value && !isEmail(value)
            ? globalMessages.pleaseEnterValidEmail
            : null,
      },
    }));
    return !!value && !isEmail(value);
  }

  render() {
    const {
      intl,
      employmentStatusOptions,
      industryOptions,
      occupationOptions,
      countryPrefixOptions,
      personalDetails,
      onInputChange,
      onFileChange,
      validate,
    } = this.props;
    const { error } = this.state;
    return (
      <React.Fragment>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              variant="outlined"
              label={intl.formatMessage(messages.employmentStatus)}
              select
              fullWidth
              value={personalDetails.employmentStatus}
              onChange={e => {
                this.validateInputEmpty('employmentStatus', e.target.value);
                return onInputChange('employmentStatus', e.target.value);
              }}
              error={validate && !!error.employmentStatus}
              helperText={
                validate && error.employmentStatus
                  ? intl.formatMessage(error.employmentStatus)
                  : null
              }
            >
              {employmentStatusOptions.map(option => (
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
              label={intl.formatMessage(messages.jobTitle)}
              fullWidth
              value={personalDetails.jobTitle}
              onChange={e => {
                this.validateInputEmpty('jobTitle', e.target.value);
                return onInputChange('jobTitle', e.target.value);
              }}
              error={validate && !!error.jobTitle}
              helperText={
                validate && error.jobTitle
                  ? intl.formatMessage(error.jobTitle)
                  : null
              }
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              variant="outlined"
              label={intl.formatMessage(messages.industry)}
              select
              fullWidth
              value={personalDetails.industry}
              onChange={e => {
                this.validateInputEmpty('industry', e.target.value);
                return onInputChange('industry', e.target.value);
              }}
              error={validate && !!error.industry}
              helperText={
                validate && error.industry
                  ? intl.formatMessage(error.industry)
                  : null
              }
            >
              {industryOptions.map(option => (
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
              label={intl.formatMessage(messages.occupation)}
              select
              fullWidth
              value={personalDetails.occupation}
              onChange={e => {
                this.validateInputEmpty('occupation', e.target.value);
                return onInputChange('occupation', e.target.value);
              }}
              error={validate && !!error.occupation}
              helperText={
                validate && error.occupation
                  ? intl.formatMessage(error.occupation)
                  : null
              }
            >
              {occupationOptions.map(option => (
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
              label={intl.formatMessage(messages.companyName)}
              fullWidth
              value={personalDetails.companyName}
              onChange={e => onInputChange('companyName', e.target.value)}
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              variant="outlined"
              label={intl.formatMessage(messages.companyAddress)}
              fullWidth
              value={personalDetails.companyAddress}
              onChange={e => onInputChange('companyAddress', e.target.value)}
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
              value={personalDetails.companyCountryDialingCode}
              onChange={e =>
                onInputChange('companyCountryDialingCode', e.target.value)
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
            <TextField
              variant="outlined"
              label={intl.formatMessage(messages.contactNumber)}
              fullWidth
              value={personalDetails.companyPhoneNumber}
              onChange={e =>
                onInputChange('companyPhoneNumber', e.target.value)
              }
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              variant="outlined"
              label={intl.formatMessage(messages.companyContactEmail)}
              fullWidth
              value={personalDetails.companyEmail}
              onChange={e => {
                this.validateInputEmail('companyEmail', e.target.value);
                return onInputChange('companyEmail', e.target.value);
              }}
              error={validate && !!error.companyEmail}
              helperText={
                validate && error.companyEmail
                  ? intl.formatMessage(error.companyEmail)
                  : null
              }
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item>
            <FileUpload
              onFileChange={file => onFileChange(file)}
              file={this.getFileSrc()[0]}
            />
          </FormCol>
        </FormRow>
      </React.Fragment>
    );
  }
}

WorkDetails.propTypes = {
  intl: PropTypes.object,
  employmentStatusOptions: PropTypes.array,
  industryOptions: PropTypes.array,
  occupationOptions: PropTypes.array,
  countryPrefixOptions: PropTypes.array,
  personalDetails: PropTypes.object,
  onInputChange: PropTypes.func,
  onFileChange: PropTypes.func,
  companyFiles: PropTypes.array,
  validate: PropTypes.bool,
  onError: PropTypes.func,
};

export default injectIntl(WorkDetails);
