import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import PhotoIcon from '@material-ui/icons/PhotoCameraOutlined';
import moment from 'moment';
import DatePicker from 'react-mobile-datepicker';
import Button from 'components/Button';
import Typography from 'components/Typography';
import TextField from 'components/TextField';
import globalMessages from 'containers/App/messages';
import { dimension } from 'styles/constants';
import messages from '../../messages';
import {
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  RESIDENCE_STATUS_OPTIONS,
} from '../../constants';

import FormFieldRow from '../FormFieldRow';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerOpen: false,
      data: {
        preferredName: '',
        dateOfBirth: '',
        gender: '',
        maritalStatus: '',
        fullLegalName: '',
        idNumber: '',
        nationality: '',
        residentialAddress: '',
        residenceStatus: '',
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
      data: props.profile,
    });
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
        ...prevState.data,
        [field]: value,
      },
    }));
  }

  render() {
    const { intl } = this.props;

    return (
      <Grid
        container
        wrap="nowrap"
        direction="column"
        style={{
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <Grid item>
          <Typography variant="h1" gutterBottom>
            {intl.formatMessage(messages.basicInformation)}
          </Typography>
        </Grid>
        <Grid
          item
          xs
          style={{
            overflow: 'hidden',
          }}
        >
          <Grid
            container
            wrap="nowrap"
            style={{
              height: '100%',
            }}
          >
            <Grid
              item
              xs={4}
              style={{
                paddingRight: dimension.spacing.m,
              }}
            >
              <Typography variant="body1" color="textSecondary">
                {intl.formatMessage(messages.uploadingId)}
              </Typography>

              <Grid
                container
                justify="center"
                style={{
                  marginTop: dimension.spacing.s,
                }}
              >
                <Button variant="contained" color="primary">
                  {intl.formatMessage(messages.retrieveMyInfo)}
                </Button>
              </Grid>
              <Typography
                variant="body1"
                color="textSecondary"
                align="center"
                style={{
                  margin: `${dimension.spacing.xs}px 0`,
                }}
              >
                {intl.formatMessage(globalMessages.or)}
              </Typography>
              <Grid container justify="center">
                <Button variant="contained" color="primary">
                  <PhotoIcon
                    style={{
                      marginRight: 7.5,
                    }}
                  />
                  {intl.formatMessage(messages.takePhoto)}
                </Button>
              </Grid>
            </Grid>
            <Grid
              item
              xs={8}
              style={{
                overflowY: 'auto',
                paddingLeft: dimension.spacing.m,
              }}
            >
              <form noValidate autoComplete="off">
                <FormFieldRow>
                  <TextField
                    id="preferred-name"
                    fullWidth
                    label={intl.formatMessage(messages.preferredName)}
                    value={this.state.data.preferredName}
                    onChange={event =>
                      this.handleInputChange(
                        'preferredName',
                        event.target.value,
                      )
                    }
                  />
                </FormFieldRow>
                <FormFieldRow>
                  <TextField
                    id="date-of-birth"
                    fullWidth
                    label={intl.formatMessage(messages.dateOfBirth)}
                    inputProps={{
                      readOnly: true,
                    }}
                    value={this.getDateOfBirth().display}
                    onFocus={() =>
                      this.setState({
                        isDatePickerOpen: true,
                      })
                    }
                  />
                </FormFieldRow>
                <FormFieldRow>
                  <TextField
                    id="gender"
                    fullWidth
                    label={intl.formatMessage(messages.gender)}
                    select
                    value={this.state.data.gender}
                    onChange={event =>
                      this.handleInputChange('gender', event.target.value)
                    }
                  >
                    {GENDER_OPTIONS.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {intl.formatMessage(globalMessages[option.title])}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormFieldRow>
                <FormFieldRow>
                  <TextField
                    id="marital-status"
                    fullWidth
                    label={intl.formatMessage(messages.maritalStatus)}
                    select
                    value={this.state.data.maritalStatus}
                    onChange={event =>
                      this.handleInputChange(
                        'maritalStatus',
                        event.target.value,
                      )
                    }
                  >
                    {MARITAL_STATUS_OPTIONS.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {intl.formatMessage(globalMessages[option.title])}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormFieldRow>
                <FormFieldRow fullWidth>
                  <TextField
                    id="full-legal-name"
                    fullWidth
                    label={intl.formatMessage(messages.fullLegalName)}
                    value={this.state.data.fullLegalName}
                    onChange={event =>
                      this.handleInputChange(
                        'fullLegalName',
                        event.target.value,
                      )
                    }
                  />
                </FormFieldRow>
                <FormFieldRow fullWidth>
                  <TextField
                    id="id-number"
                    fullWidth
                    label={intl.formatMessage(messages.idNumber)}
                    value={this.state.data.idNumber}
                    onChange={event =>
                      this.handleInputChange('idNumber', event.target.value)
                    }
                  />
                </FormFieldRow>
                <FormFieldRow fullWidth>
                  <TextField
                    id="nationality"
                    fullWidth
                    label={intl.formatMessage(messages.nationality)}
                    value={this.state.data.nationality}
                    onChange={event =>
                      this.handleInputChange('nationality', event.target.value)
                    }
                  />
                </FormFieldRow>
                <FormFieldRow fullWidth>
                  <TextField
                    id="residential-address"
                    fullWidth
                    label={intl.formatMessage(messages.residentialAddress)}
                    value={this.state.data.residentialAddress}
                    onChange={event =>
                      this.handleInputChange(
                        'residentialAddress',
                        event.target.value,
                      )
                    }
                  />
                </FormFieldRow>
                <FormFieldRow fullWidth>
                  <TextField
                    id="residence-status"
                    fullWidth
                    label={intl.formatMessage(messages.residenceStatus)}
                    select
                    value={this.state.data.residenceStatus}
                    onChange={event =>
                      this.handleInputChange(
                        'residenceStatus',
                        event.target.value,
                      )
                    }
                  >
                    {RESIDENCE_STATUS_OPTIONS.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {intl.formatMessage(globalMessages[option.title])}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormFieldRow>
              </form>
            </Grid>
          </Grid>
        </Grid>
        <DatePicker
          isOpen={this.state.isDatePickerOpen}
          value={this.getDateOfBirth().date}
          min={moment()
            .subtract(100, 'years')
            .toDate()}
          max={moment().toDate()}
          confirmText={intl.formatMessage(globalMessages.select)}
          cancelText={intl.formatMessage(globalMessages.cancel)}
          onSelect={value => {
            this.handleInputChange(
              'dateOfBirth',
              moment(value).format('YYYY-MM-DD'),
            );
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

ProfileForm.propTypes = {
  // profile: PropTypes.object,
  intl: PropTypes.object,
};

export default injectIntl(ProfileForm);
