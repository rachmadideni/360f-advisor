import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import TextField from 'components/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DatePicker from 'react-mobile-datepicker';
import isEmpty from 'validator/lib/isEmpty';
import { isEqual } from 'lodash/lang';
import { forOwn } from 'lodash/object';

import FormRow from 'containers/FinancialWizardContainer/components/FormRow';
import FormCol from 'containers/FinancialWizardContainer/components/FormCol';
import globalMessages from 'containers/App/messages';
import messages from '../../messages';
import FileUpload from '../FileUpload';

class BasicInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerOpen: false,
      error: {
        fullName: null,
        gender: null,
        dateOfBirth: null,
        maritalStatus: null,
        nationality: null,
        idType: null,
        idNumber: null,
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

  getDateOfBirth() {
    const { dateOfBirth } = this.props.personalDetails;

    if (!dateOfBirth) {
      return {
        date: moment().toDate(),
        display: '',
      };
    }

    return {
      date: moment(dateOfBirth).toDate(),
      display: moment(dateOfBirth).format('DD-MM-YYYY'),
    };
  }

  getFileSrc() {
    const { personalDetails, idFiles } = this.props;
    const fileArray = [...personalDetails.idFiles];
    if (fileArray.length < 2) {
      for (let i = 0; i < idFiles.length; i += 1) {
        if (fileArray.length >= 2) {
          break;
        }
        fileArray.push(idFiles[i]);
      }
    }
    return fileArray;
  }

  validateAll() {
    const { personalDetails } = this.props;
    const isFullNameError = this.validateInputEmpty(
      'fullName',
      personalDetails.fullName,
    );
    const isGenderError = this.validateInputEmpty(
      'gender',
      personalDetails.gender,
      true,
    );
    const isDateOfBirthError = this.validateInputEmpty(
      'dateOfBirth',
      personalDetails.dateOfBirth,
    );
    const isMaritalStatusError = this.validateInputEmpty(
      'maritalStatus',
      personalDetails.maritalStatus,
      true,
    );
    const isNationalityError = this.validateInputEmpty(
      'nationality',
      personalDetails.nationality,
      true,
    );
    const isIdTypeError = this.validateInputEmpty(
      'idType',
      personalDetails.idType,
      true,
    );
    const isIdNumberError = this.validateInputEmpty(
      'idNumber',
      personalDetails.idNumber,
    );
    return (
      isFullNameError ||
      isGenderError ||
      isDateOfBirthError ||
      isMaritalStatusError ||
      isNationalityError ||
      isIdTypeError ||
      isIdNumberError
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

  render() {
    const {
      intl,
      genderOptions,
      maritalStatusOptions,
      nationalityOptions,
      idTypeOptions,
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
              label={intl.formatMessage(messages.fullLegalName)}
              fullWidth
              value={personalDetails.fullName}
              onChange={e => {
                this.validateInputEmpty('fullName', e.target.value);
                return onInputChange('fullName', e.target.value);
              }}
              error={validate && !!error.fullName}
              helperText={
                validate && error.fullName
                  ? intl.formatMessage(error.fullName)
                  : null
              }
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              variant="outlined"
              label={intl.formatMessage(messages.preferredName)}
              fullWidth
              value={personalDetails.preferredName}
              onChange={e => onInputChange('preferredName', e.target.value)}
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              variant="outlined"
              label={intl.formatMessage(messages.gender)}
              select
              fullWidth
              value={personalDetails.gender}
              onChange={e => {
                this.validateInputEmpty('gender', e.target.value, true);
                return onInputChange('gender', e.target.value);
              }}
              error={validate && !!error.gender}
              helperText={
                validate && error.gender
                  ? intl.formatMessage(error.gender)
                  : null
              }
            >
              {genderOptions.map(option => (
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
              label={intl.formatMessage(messages.dateOfBirth)}
              fullWidth
              value={this.getDateOfBirth().display}
              inputProps={{
                readOnly: true,
              }}
              onFocus={() =>
                this.setState({
                  isDatePickerOpen: true,
                })
              }
              error={validate && !!error.dateOfBirth}
              helperText={
                validate && error.dateOfBirth
                  ? intl.formatMessage(error.dateOfBirth)
                  : null
              }
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              variant="outlined"
              label={intl.formatMessage(messages.maritalStatus)}
              select
              fullWidth
              value={personalDetails.maritalStatus}
              onChange={e => {
                this.validateInputEmpty('maritalStatus', e.target.value, true);
                return onInputChange('maritalStatus', e.target.value);
              }}
              error={validate && !!error.maritalStatus}
              helperText={
                validate && error.maritalStatus
                  ? intl.formatMessage(error.maritalStatus)
                  : null
              }
            >
              {maritalStatusOptions.map(option => (
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
              label={intl.formatMessage(messages.nationality)}
              select
              fullWidth
              value={personalDetails.nationality}
              onChange={e => {
                this.validateInputEmpty('nationality', e.target.value, true);
                return onInputChange('nationality', e.target.value);
              }}
              error={validate && !!error.nationality}
              helperText={
                validate && error.nationality
                  ? intl.formatMessage(error.nationality)
                  : null
              }
            >
              {nationalityOptions.map(option => (
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
              label={intl.formatMessage(messages.identificationDocumentType)}
              select
              fullWidth
              value={personalDetails.idType}
              onChange={e => {
                this.validateInputEmpty('idType', e.target.value, true);
                return onInputChange('idType', e.target.value);
              }}
              error={validate && !!error.idType}
              helperText={
                validate && error.idType
                  ? intl.formatMessage(error.idType)
                  : null
              }
            >
              {idTypeOptions.map(option => (
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
              label={intl.formatMessage(messages.identificationDocumentNumber)}
              fullWidth
              value={personalDetails.idNumber}
              onChange={e => {
                this.validateInputEmpty('idNumber', e.target.value);
                return onInputChange('idNumber', e.target.value);
              }}
              error={validate && !!error.idNumber}
              helperText={
                validate && error.idNumber
                  ? intl.formatMessage(error.idNumber)
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
          <FormCol item>
            <FileUpload
              onFileChange={file => onFileChange(file)}
              file={this.getFileSrc()[1]}
            />
          </FormCol>
        </FormRow>
        <DatePicker
          isOpen={this.state.isDatePickerOpen}
          value={this.getDateOfBirth().date}
          min={moment()
            .subtract(100, 'years')
            .toDate()}
          max={moment().toDate()}
          confirmText={intl.formatMessage(globalMessages.select)}
          cancelText={intl.formatMessage(globalMessages.cancel)}
          onSelect={value => {
            this.validateInputEmpty(
              'dateOfBirth',
              moment(value).format('YYYY-MM-DD'),
            );
            onInputChange('dateOfBirth', moment(value).format('YYYY-MM-DD'));
            return this.setState({
              isDatePickerOpen: false,
            });
          }}
          onCancel={() =>
            this.setState({
              isDatePickerOpen: false,
            })
          }
        />
      </React.Fragment>
    );
  }
}

BasicInformation.propTypes = {
  intl: PropTypes.object,
  genderOptions: PropTypes.array,
  maritalStatusOptions: PropTypes.array,
  nationalityOptions: PropTypes.array,
  idTypeOptions: PropTypes.array,
  personalDetails: PropTypes.object,
  onInputChange: PropTypes.func,
  onFileChange: PropTypes.func,
  idFiles: PropTypes.array,
  validate: PropTypes.bool,
  onError: PropTypes.func,
};

export default injectIntl(BasicInformation);
