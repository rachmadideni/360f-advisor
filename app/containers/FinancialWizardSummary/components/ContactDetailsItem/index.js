import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TableBody } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import FormTable from '../FormTable';
import FormRow from '../FormRow';
import FormCell from '../FormCell';
import messages from '../../messages';
import FormTextField from '../FormTextField';

class ContactDetailsItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: {
        emailAddress: null,
        contactNumber: null,
        residentialAddress: null,
        permanentAddress: null,
      },
    };
  }

  render() {
    const { intl, personalDetails, onInputChange, isEditMode } = this.props;
    // const { error } = this.state;
    return (
      <Grid container wrap="nowrap">
        <FormTable>
          <TableBody>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.emailAddress)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  value={personalDetails.email}
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
                  value={personalDetails.phoneNumber}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  onChange={e => onInputChange('phoneNumber', e.target.value)}
                />
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.residentialAddress)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  value={personalDetails.residentialAddress}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  onChange={e =>
                    onInputChange('residentialAddress', e.target.value)
                  }
                />
              </td>
            </FormRow>
            <FormRow>
              <FormCell component="th" scope="row" align="left">
                {intl.formatMessage(messages.permanentAddress)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  value={personalDetails.permanentAddress}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  onChange={e =>
                    onInputChange('permanentAddress', e.target.value)
                  }
                />
              </td>
            </FormRow>
          </TableBody>
        </FormTable>
      </Grid>
    );
  }
}

ContactDetailsItem.propTypes = {
  intl: PropTypes.object,
  isEditMode: PropTypes.bool,
  personalDetails: PropTypes.object,
  onInputChange: PropTypes.func,
};

export default injectIntl(ContactDetailsItem);
