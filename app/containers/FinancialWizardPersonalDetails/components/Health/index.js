import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import globalMessages from 'containers/App/messages';
import FormRow from 'containers/FinancialWizardContainer/components/FormRow';
import FormCol from 'containers/FinancialWizardContainer/components/FormCol';
import Switch from 'components/Switch';
import Typography from 'components/Typography';
import messages from '../../messages';

/* eslint-disable react/prefer-stateless-function */
class Health extends React.Component {
  render() {
    const { intl, personalDetails, onInputChange } = this.props;
    return (
      <React.Fragment>
        <FormRow container wrap="nowrap" alignItems="center">
          <FormCol item>
            <Switch
              checked={personalDetails.isSmoke}
              value="1"
              color="default"
              labelPositive={intl.formatMessage(globalMessages.yes)}
              labelNegative={intl.formatMessage(globalMessages.no)}
              onChange={e => onInputChange('isSmoke', e.target.checked)}
            />
          </FormCol>
          <FormCol item xs>
            <Typography variant="body1">
              {intl.formatMessage(messages.doesSmokeTobacco)}
            </Typography>
          </FormCol>
        </FormRow>
      </React.Fragment>
    );
  }
}

Health.propTypes = {
  intl: PropTypes.object,
  personalDetails: PropTypes.object,
  onInputChange: PropTypes.func,
};

export default injectIntl(Health);
