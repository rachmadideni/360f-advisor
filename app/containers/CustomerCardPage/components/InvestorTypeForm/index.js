import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Typography from 'components/Typography';
import Switch from 'components/Switch';

import { dimension } from 'styles/constants';
import globalMessages from 'containers/App/messages';
import messages from '../../messages';
import FormFieldRow from '../FormFieldRow';

class InvestorTypeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        isNetAsset: false,
        isIncomeLess: false,
        isOverseasInvestor: false,
      },
    };

    this.matchStateDataToProps = this.matchStateDataToProps.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.matchStateDataToProps(this.props);
  }

  matchStateDataToProps(props) {
    return this.setState({
      data: props.investorType,
    });
  }

  handleInputChange(field, value) {
    return this.setState(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        [field]: value,
      },
    }));
  }

  render() {
    const { intl } = this.props;
    return (
      <form
        noValidate
        autoComplete="off"
        style={{
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h1" gutterBottom>
          {intl.formatMessage(messages.accreditedInvestor)}
        </Typography>
        <div>
          <FormFieldRow fullWidth>
            <Typography variant="body1" component="label">
              {intl.formatMessage(messages.netAssetExceed2Mil)}
            </Typography>
            <Switch
              id="net-asset"
              checked={this.state.data.isNetAsset}
              onChange={event =>
                this.handleInputChange('isNetAsset', event.target.checked)
              }
              value="1"
              color="default"
              labelPositive={intl.formatMessage(globalMessages.yes)}
              labelNegative={intl.formatMessage(globalMessages.no)}
            />
          </FormFieldRow>
          <FormFieldRow fullWidth lastChildNoMargin>
            <Typography variant="body1" component="label">
              {intl.formatMessage(messages.incomePre12MonthsLess300k)}
            </Typography>
            <Switch
              id="income-less"
              checked={this.state.data.isIncomeLess}
              onChange={event =>
                this.handleInputChange('isIncomeLess', event.target.checked)
              }
              value="1"
              color="default"
              labelPositive={intl.formatMessage(globalMessages.yes)}
              labelNegative={intl.formatMessage(globalMessages.no)}
            />
          </FormFieldRow>
        </div>
        <Typography
          variant="h1"
          gutterBottom
          style={{
            marginTop: dimension.spacing.m,
          }}
        >
          {intl.formatMessage(messages.overseasInvestor)}
        </Typography>
        <div>
          <Typography variant="body1" component="label">
            {intl.formatMessage(messages.overseasInvestorDesc)}
          </Typography>
          <Switch
            id="overseas-investor"
            checked={this.state.data.isOverseasInvestor}
            onChange={event =>
              this.handleInputChange('isOverseasInvestor', event.target.checked)
            }
            value="1"
            color="default"
            labelPositive={intl.formatMessage(globalMessages.yes)}
            labelNegative={intl.formatMessage(globalMessages.no)}
          />
        </div>
      </form>
    );
  }
}

InvestorTypeForm.propTypes = {
  intl: PropTypes.object,
  // investorType: PropTypes.object,
};

export default injectIntl(InvestorTypeForm);
