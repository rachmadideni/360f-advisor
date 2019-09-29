import React from 'react';
import PropTypes from 'prop-types';
import { Grid, MenuItem, InputAdornment } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import IconDateRange from '@material-ui/icons/DateRange';
import { injectIntl } from 'react-intl';
import DatePicker from 'react-mobile-datepicker';
import moment from 'moment';
import globalMessages from 'containers/App/messages';
import isEmpty from 'validator/lib/isEmpty';
import messages from '../../messages';
import FormTextField from '../FormTextField';
import FormCell from '../FormCell';
import FormRow from '../FormRow';
import FormTable from '../FormTable';

class BasicInformationItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDatePickerOpen: false,
      data: {
        dateOfBirth: '',
      },
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
    const {
      fullName,
      gender,
      idNumber,
      dateOfBirth,
      maritalStatus,
      nationality,
      idType,
    } = this.props.data;
    this.validateFullName(fullName);
    this.validateGender(gender);
    this.validateDateOfBirth(dateOfBirth);
    this.validateMaritalStatus(maritalStatus);
    this.validateNationality(nationality);
    this.validateIdNumber(idNumber);
    this.validateIdType(idType);
  }

  componentDidUpdate(prevProps) {
    const { validate, data } = this.props;
    if (prevProps.validate !== validate) {
      this.validateFullName(data.fullName);
      this.validateGender(data.gender);
      this.validateDateOfBirth(data.dateOfBirth);
      this.validateMaritalStatus(data.maritalStatus);
      this.validateNationality(data.nationality);
      this.validateIdNumber(data.idNumber);
      this.validateIdType(data.idType);
    }
  }

  componentWillUnmount() {
    this.props.onError(false);
  }

  validateFullName(value) {
    this.props.onError(isEmpty(value) || !!this.state.error.fullName);

    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        fullName: isEmpty(value) ? messages.pleaseEnterAProviderName : null,
      },
    }));
  }

  validateGender(value) {
    this.props.onError(isEmpty(value) || !!this.state.error.gender);
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        gender: isEmpty(value) ? messages.pleaseMakeASelection : null,
      },
    }));
  }

  validateDateOfBirth(value) {
    this.props.onError(isEmpty(value) || !!this.state.error.dateOfBirth);
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        dateOfBirth: isEmpty(value) ? messages.pleaseMakeASelection : null,
      },
    }));
  }

  validateNationality(value) {
    this.props.onError(isEmpty(value) || !!this.state.error.nationality);
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        nationality: isEmpty(value) ? messages.pleaseMakeASelection : null,
      },
    }));
  }

  validateMaritalStatus(value) {
    this.props.onError(isEmpty(value) || !!this.state.error.maritalStatus);
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        maritalStatus: isEmpty(value) ? messages.pleaseMakeASelection : null,
      },
    }));
  }

  validateIdNumber(value) {
    this.props.onError(isEmpty(value) || !!this.state.error.idNumber);
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        idNumber: isEmpty(value) ? messages.pleaseEnterAValue : null,
      },
    }));
  }

  validateIdType(value) {
    this.props.onError(isEmpty(value) || !!this.state.error.idType);
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        idType: isEmpty(value) ? messages.pleaseEnterAValue : null,
      },
    }));
  }

  getDateOfBirth() {
    const { dateOfBirth } = this.state.data;

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

  handleInputChange(field, value) {
    return this.setState(prevState => ({
      ...prevState,
      data: {
        [field]: value,
      },
    }));
  }

  render() {
    const {
      intl,
      validate,
      data,
      genderOptions,
      isEditMode,
      onInputChange,
      maritalStatusOptions,
      nationalityOptions,
      idTypeOptions,
    } = this.props;
    const { error } = this.state;
    return (
      <Grid container wrap="nowrap">
        <FormTable>
          <TableBody>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.fullLegalName)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  onChange={e => {
                    this.validateFullName(e.target.value);
                    return onInputChange('fullName', e.target.value);
                  }}
                  value={data.fullName}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  error={validate && !!error.fullName}
                  helperText={
                    validate && error.fullName
                      ? intl.formatMessage(error.fullName)
                      : null
                  }
                />
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.preferredName)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  value={data.preferredName}
                  onChange={e => onInputChange('gender', e.target.value)}
                  variant={isEditMode ? 'outlined' : 'standard'}
                />
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.gender)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  onChange={e => {
                    this.validateGender(e.target.value);
                    return onInputChange('gender', e.target.value);
                  }}
                  value={data.gender}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  error={validate && !!error.gender}
                  select
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
                </FormTextField>
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.dateOfBirth)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  value={moment(data.dateOfBirth).format('YYYY-MM-DD')}
                  error={validate && !!error.dateOfBirth}
                  onFocus={() =>
                    this.setState({
                      isDatePickerOpen: true,
                    })
                  }
                  helperText={
                    validate && error.dateOfBirth
                      ? intl.formatMessage(error.dateOfBirth)
                      : null
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconDateRange color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.maritalStatus)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  onChange={e => {
                    this.validateMaritalStatus(e.target.value);
                    return onInputChange('maritalStatus', e.target.value);
                  }}
                  value={data.maritalStatus}
                  error={validate && !!error.maritalStatus}
                  select
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
                </FormTextField>
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.nationality)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  onChange={e => {
                    this.validateNationality(e.target.value);
                    return onInputChange('nationality', e.target.value);
                  }}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  value={data.nationality}
                  error={validate && !!error.nationality}
                  select
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
                </FormTextField>
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.identificationDocument)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  value={data.idType}
                  select
                  onChange={e => {
                    this.validateIdType(e.target.value);
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
                </FormTextField>
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.documentNumber)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  value={data.idNumber}
                  onChange={e => {
                    this.validateIdNumber(e.target.value);
                    return onInputChange('idNumber', e.target.value);
                  }}
                  error={validate && !!error.idNumber}
                  helperText={
                    validate && error.idNumber
                      ? intl.formatMessage(error.idNumber)
                      : null
                  }
                />
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.documentUploaded)}
              </FormCell>
            </FormRow>
          </TableBody>
        </FormTable>
        <DatePicker
          isOpen={this.state.isDatePickerOpen}
          value={this.getDateOfBirth().date}
          max={moment().toDate()}
          min={moment()
            .subtract(100, 'years')
            .toDate()}
          confirmText={intl.formatMessage(globalMessages.select)}
          cancelText={intl.formatMessage(globalMessages.cancel)}
          onSelect={value => {
            this.validateDateOfBirth(moment(value).format('YYYY-MM-DD'));
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
      </Grid>
    );
  }
}

BasicInformationItem.propTypes = {
  intl: PropTypes.object,
  validate: PropTypes.bool,
  isEditMode: PropTypes.bool,
  data: PropTypes.object,
  genderOptions: PropTypes.array,
  maritalStatusOptions: PropTypes.array,
  nationalityOptions: PropTypes.array,
  idTypeOptions: PropTypes.array,
  onInputChange: PropTypes.func,
  onError: PropTypes.func,
};

export default injectIntl(BasicInformationItem);
