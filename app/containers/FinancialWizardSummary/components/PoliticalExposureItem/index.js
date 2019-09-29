import React from 'react';
import PropTypes from 'prop-types';
import { Grid, MenuItem, TableBody } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import FormTable from '../FormTable';
import FormRow from '../FormRow';
import FormCell from '../FormCell';
import messages from '../../messages';
import FormTextField from '../FormTextField';

class PoliticalExposureItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: {
        nameOfPerson: null,
        relationshipToIndividual: null,
        currentPosition: null,
        currentOrganization: null,
        countryValue: null,
      },
    };
  }

  render() {
    const {
      intl,
      pepRelationshipOptions,
      countryOptions,
      personalDetails,
      onInputChange,
      isEditMode,
    } = this.props;
    const { error } = this.state;
    return (
      <Grid container wrap="nowrap">
        <FormTable>
          <TableBody>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.nameOfPerson)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  value={personalDetails.pepName}
                  onChange={e => onInputChange('pepName', e.target.value)}
                />
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.relationshipToIndividual)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  value={personalDetails.pepRelationship}
                  onChange={e =>
                    onInputChange('pepRelationship', e.target.value)
                  }
                  variant={isEditMode ? 'outlined' : 'standard'}
                >
                  {pepRelationshipOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </FormTextField>
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.currentPosition)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  value={personalDetails.pepPosition}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  onChange={e => onInputChange('pepPosition', e.target.value)}
                />
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.currentOrganization)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  value={personalDetails.pepOrganization}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  onChange={e =>
                    onInputChange('pepOrganization', e.target.value)
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
                  value={personalDetails.pepCountry}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  onChange={e => onInputChange('pepCountry', e.target.value)}
                >
                  {countryOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </FormTextField>
              </td>
            </FormRow>
          </TableBody>
        </FormTable>
      </Grid>
    );
  }
}

PoliticalExposureItem.propTypes = {
  intl: PropTypes.object,
  isEditMode: PropTypes.bool,
  pepRelationshipOptions: PropTypes.array,
  countryOptions: PropTypes.array,
  personalDetails: PropTypes.object,
  onInputChange: PropTypes.func,
};

export default injectIntl(PoliticalExposureItem);
