import React from 'react';
import PropTypes from 'prop-types';
import { Grid, MenuItem, TableBody } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import globalMessages from 'containers/App/messages';
import Switch from 'components/Switch';
import { dimension } from 'styles/constants';
import FormTable from '../FormTable';
import FormRow from '../FormRow';
import FormCell from '../FormCell';
import messages from '../../messages';
import FormTextField from '../FormTextField';

class DependantsItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: {
        nameOfPerson: null,
        relationshipToIndividual: null,
        emergencyContact: null,
        emailAddress: null,
        contactNumber: null,
      },
    };
  }

  render() {
    const {
      intl,
      dependantRelationshipOptions,
      dependant,
      onInputChange,
      isEditMode,
    } = this.props;
    const { error } = this.state;
    return (
      <Grid
        container
        wrap="nowrap"
        style={{ marginTop: `${dimension.spacing.m}px` }}
      >
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
                  value={dependant.name}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  onChange={e => onInputChange('name', e.target.value)}
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
                  value={dependant.relationship}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  onChange={e => onInputChange('relationship', e.target.value)}
                >
                  {dependantRelationshipOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </FormTextField>
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.emergencyContact)}
              </FormCell>
              <td>
                <Switch
                  disabled={!isEditMode}
                  checked={dependant.isEmergencyContact}
                  value="1"
                  color="default"
                  labelPositive={intl.formatMessage(globalMessages.yes)}
                  labelNegative={intl.formatMessage(globalMessages.no)}
                  onChange={e =>
                    onInputChange('isEmergencyContact', e.target.checked)
                  }
                />
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.emailAddress)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  value={dependant.email}
                  onChange={e => onInputChange('email', e.target.value)}
                />
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
                  value={dependant.phoneNumber}
                  onChange={e => onInputChange('phoneNumber', e.target.value)}
                />
              </td>
            </FormRow>
          </TableBody>
        </FormTable>
      </Grid>
    );
  }
}

DependantsItem.propTypes = {
  intl: PropTypes.object,
  isEditMode: PropTypes.bool,
  dependantRelationshipOptions: PropTypes.array,
  countryPrefixOptions: PropTypes.array,
  dependant: PropTypes.object,
  onInputChange: PropTypes.func,
};

export default injectIntl(DependantsItem);
