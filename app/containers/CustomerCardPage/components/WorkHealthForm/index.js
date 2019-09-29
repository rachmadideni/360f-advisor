import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Typography from 'components/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from 'components/TextField';
import Switch from 'components/Switch';

import globalMessages from 'containers/App/messages';
import { dimension } from 'styles/constants';
import FormFieldRow from '../FormFieldRow';
import messages from '../../messages';
import { EMPLOYMENT_STATUS_OPTIONS } from '../../constants';

class WorkHealthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        employmentStatus: '',
        isPensionable: false,
        companyName: '',
        industry: '',
        occupation: '',
        jobTitle: '',
        workEmailAddress: '',
        isSmoker: false,
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
      data: props.workHealth,
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

  renderWorkFields() {
    if (
      !this.state.data.employmentStatus ||
      this.state.data.employmentStatus === 'UNEMPLOYED'
    ) {
      return null;
    }

    const { intl } = this.props;

    return (
      <React.Fragment>
        <FormFieldRow fullWidth>
          <Typography variant="body1" component="label">
            {intl.formatMessage(messages.pensionable)}
          </Typography>
          <Switch
            id="pensionable"
            checked={this.state.data.isPensionable}
            onChange={event =>
              this.handleInputChange('isPensionable', event.target.checked)
            }
            value="1"
            color="default"
            labelPositive={intl.formatMessage(globalMessages.yes)}
            labelNegative={intl.formatMessage(globalMessages.no)}
          />
        </FormFieldRow>
        <FormFieldRow fullWidth>
          <TextField
            id="company-name"
            fullWidth
            label={intl.formatMessage(messages.companyName)}
            value={this.state.data.companyName}
            onChange={event =>
              this.handleInputChange('companyName', event.target.value)
            }
          />
        </FormFieldRow>
        <FormFieldRow fullWidth>
          <TextField
            id="industry"
            fullWidth
            label={intl.formatMessage(messages.industry)}
            value={this.state.data.industry}
            onChange={event =>
              this.handleInputChange('industry', event.target.value)
            }
          />
        </FormFieldRow>
        <FormFieldRow fullWidth>
          <TextField
            id="occupation"
            fullWidth
            label={intl.formatMessage(messages.occupation)}
            value={this.state.data.occupation}
            onChange={event =>
              this.handleInputChange('occupation', event.target.value)
            }
          />
        </FormFieldRow>
        <FormFieldRow fullWidth>
          <TextField
            id="job-title"
            fullWidth
            label={intl.formatMessage(messages.jobTitle)}
            value={this.state.data.jobTitle}
            onChange={event =>
              this.handleInputChange('jobTitle', event.target.value)
            }
          />
        </FormFieldRow>
        <FormFieldRow fullWidth>
          <TextField
            id="work-email"
            fullWidth
            label={intl.formatMessage(messages.workEmailAddress)}
            value={this.state.data.workEmailAddress}
            onChange={event =>
              this.handleInputChange('workEmailAddress', event.target.value)
            }
          />
        </FormFieldRow>
      </React.Fragment>
    );
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
        <Grid container wrap="nowrap">
          <Grid
            item
            xs={7}
            style={{
              paddingRight: dimension.spacing.m,
            }}
          >
            <Typography variant="h1" gutterBottom>
              {intl.formatMessage(messages.work)}
            </Typography>
            <FormFieldRow fullWidth>
              <TextField
                id="employment-status"
                fullWidth
                select
                label={intl.formatMessage(messages.employmentStatus)}
                onChange={event =>
                  this.handleInputChange('employmentStatus', event.target.value)
                }
                value={this.state.data.employmentStatus}
              >
                {EMPLOYMENT_STATUS_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {intl.formatMessage(messages[option.title])}
                  </MenuItem>
                ))}
              </TextField>
            </FormFieldRow>
            {this.renderWorkFields()}
          </Grid>
          <Grid
            item
            xs={5}
            style={{
              paddingLeft: dimension.spacing.m,
            }}
          >
            <Typography variant="h1" gutterBottom>
              {intl.formatMessage(messages.health)}
            </Typography>
            <div>
              <Typography variant="body1" component="label">
                {intl.formatMessage(messages.smokerStatus)}
              </Typography>
              <Switch
                id="smoker-status"
                checked={this.state.data.isSmoker}
                onChange={event =>
                  this.handleInputChange('isSmoker', event.target.checked)
                }
                value="1"
                color="default"
                labelPositive={intl.formatMessage(globalMessages.yes)}
                labelNegative={intl.formatMessage(globalMessages.no)}
              />
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }
}

WorkHealthForm.propTypes = {
  intl: PropTypes.object,
  // workHealth: PropTypes.object,
};

export default injectIntl(WorkHealthForm);
