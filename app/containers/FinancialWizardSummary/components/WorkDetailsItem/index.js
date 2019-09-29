import React from 'react';
import PropTypes from 'prop-types';
import { Grid, MenuItem, TableBody } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import FormTable from '../FormTable';
import FormRow from '../FormRow';
import FormCell from '../FormCell';
import messages from '../../messages';
import FormTextField from '../FormTextField';

class WorkDetailsItem extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   error: {
    //     employmentStatus: null,
    //     jobTitle: null,
    //     industry: null,
    //     occupation: null,
    //     companyName: null,
    //     companyAddress: null,
    //     country: null,
    //     contactNumber: null,
    //     companyContactEmail: null,
    //   },
    // };
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
      isEditMode,
    } = this.props;
    // const { error } = this.state;
    return (
      <Grid container wrap="nowrap">
        <FormTable>
          <TableBody>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.employmentStatus)}
              </FormCell>
              <td>
                <FormTextField
                  value={personalDetails.employmentStatus}
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  select
                  variant={isEditMode ? 'outlined' : 'standard'}
                  onChange={e =>
                    onInputChange('employmentStatus', e.target.value)
                  }
                >
                  {employmentStatusOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </FormTextField>
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.jobTitle)}
              </FormCell>
              <td>
                <FormTextField
                  value={personalDetails.jobTitle}
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  onChange={e => onInputChange('jobTitle', e.target.value)}
                />
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.industry)}
              </FormCell>
              <td>
                <FormTextField
                  value={personalDetails.industry}
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  select
                  variant={isEditMode ? 'outlined' : 'standard'}
                  onChange={e => onInputChange('industry', e.target.value)}
                >
                  {industryOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </FormTextField>
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.occupation)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  value={personalDetails.occupation}
                  select
                  onChange={e => onInputChange('occupation', e.target.value)}
                >
                  {occupationOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </FormTextField>
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.companyNameOptional)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  value={personalDetails.companyName}
                  onChange={e => onInputChange('companyName', e.target.value)}
                />
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.companyAddressOptional)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  value={personalDetails.companyAddress}
                  onChange={e =>
                    onInputChange('companyAddress', e.target.value)
                  }
                />
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.country)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  value={personalDetails.companyCountryDialingCode}
                  select
                  onChange={e =>
                    onInputChange('companyCountryDialingCode', e.target.value)
                  }
                >
                  {countryPrefixOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </FormTextField>
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.contactNumber)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  value={personalDetails.companyPhoneNumber}
                  onChange={e =>
                    onInputChange('companyPhoneNumber', e.target.value)
                  }
                />
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.companyContactEmailOptional)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  value={personalDetails.companyEmail}
                  onChange={e => onInputChange('companyEmail', e.target.value)}
                />
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.verificationDocument)}
              </FormCell>
            </FormRow>
          </TableBody>
        </FormTable>
      </Grid>
    );
  }
}

WorkDetailsItem.propTypes = {
  intl: PropTypes.object,
  isEditMode: PropTypes.bool,
  employmentStatusOptions: PropTypes.array,
  industryOptions: PropTypes.array,
  occupationOptions: PropTypes.array,
  countryPrefixOptions: PropTypes.array,
  personalDetails: PropTypes.object,
  onInputChange: PropTypes.func,
};

export default injectIntl(WorkDetailsItem);
