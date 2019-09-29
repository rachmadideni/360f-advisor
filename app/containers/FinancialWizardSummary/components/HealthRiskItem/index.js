import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TableBody } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import globalMessages from 'containers/App/messages';
import Switch from 'components/Switch';
import FormTable from '../FormTable';
import FormRow from '../FormRow';
import FormCell from '../FormCell';
import messages from '../../messages';

class HealthRiskItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: {
        health: null,
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
                {intl.formatMessage(
                  messages.doesTheIndividualSmokeOrUseTobacco,
                )}
              </FormCell>
              <td>
                <Switch
                  disabled={!isEditMode}
                  checked={personalDetails.isSmoke}
                  value="1"
                  color="default"
                  labelPositive={intl.formatMessage(globalMessages.yes)}
                  labelNegative={intl.formatMessage(globalMessages.no)}
                  onChange={e => onInputChange('isSmoke', e.target.checked)}
                />
              </td>
            </FormRow>
          </TableBody>
        </FormTable>
      </Grid>
    );
  }
}

HealthRiskItem.propTypes = {
  intl: PropTypes.object,
  isEditMode: PropTypes.bool,
  personalDetails: PropTypes.object,
  onInputChange: PropTypes.func,
};

export default injectIntl(HealthRiskItem);
