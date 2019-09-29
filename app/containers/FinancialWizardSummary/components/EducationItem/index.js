import React from 'react';
import PropTypes from 'prop-types';
import { Grid, MenuItem, TableBody } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import FormTable from '../FormTable';
import FormRow from '../FormRow';
import FormCell from '../FormCell';
import messages from '../../messages';
import FormTextField from '../FormTextField';

class EducationItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: {
        education: null,
      },
    };
  }

  render() {
    const {
      intl,
      personalDetails,
      educationLevelOptions,
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
                {intl.formatMessage(messages.highestLevelOfEducationObtained)}
              </FormCell>
              <td>
                <FormTextField
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  variant={isEditMode ? 'outlined' : 'standard'}
                  select
                  value={personalDetails.highestEducation}
                  onChange={e =>
                    onInputChange('highestEducation', e.target.value)
                  }
                >
                  {educationLevelOptions.map(option => (
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

EducationItem.propTypes = {
  intl: PropTypes.object,
  isEditMode: PropTypes.bool,
  educationLevelOptions: PropTypes.array,
  personalDetails: PropTypes.object,
  onInputChange: PropTypes.func,
};

export default injectIntl(EducationItem);
