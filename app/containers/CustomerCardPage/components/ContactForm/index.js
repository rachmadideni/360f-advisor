import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import DatePicker from 'react-mobile-datepicker';
import Typography from 'components/Typography';
import Button from 'components/Button';
import TextField from 'components/TextField';

import globalMessages from 'containers/App/messages';
import { dimension } from 'styles/constants';
import messages from '../../messages';
import FormFieldRow from '../FormFieldRow';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerOpen: false,
      isTimePickerOpen: false,
      data: {
        emailAddresses: [],
        mobilePhones: [],
        meetingAgenda: '',
        meetingDateTime: '',
        meetingLocation: '',
      },
    };

    this.matchStateDataToProps = this.matchStateDataToProps.bind(this);
    this.getMeetingDateTime = this.getMeetingDateTime.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddMultipleFields = this.handleAddMultipleFields.bind(this);
    this.handleMultipleFieldsChange = this.handleMultipleFieldsChange.bind(
      this,
    );
  }

  componentDidMount() {
    this.matchStateDataToProps(this.props);
  }

  matchStateDataToProps(props) {
    return this.setState({
      data: props.contact,
    });
  }

  getMeetingDateTime() {
    const { meetingDateTime } = this.state.data;

    if (!meetingDateTime) {
      return {
        date: moment().toDate(),
        displayDate: '',
        displayTime: '',
      };
    }

    return {
      date: moment(meetingDateTime).toDate(),
      displayDate: moment(meetingDateTime).format('DD-MM-YYYY'),
      displayTime: moment(meetingDateTime).format('HH:mm'),
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

  handleAddMultipleFields(field) {
    return this.setState(prevState => {
      const multipleFields = [...prevState.data[field]];
      if (field === 'mobilePhones') {
        multipleFields.push({
          id: prevState.data[field].length,
          value: '',
        });
      } else if (field === 'emailAddresses') {
        multipleFields.push({
          id: prevState.data[field].length,
          value: '',
          prefix: '',
        });
      }
      return {
        ...prevState,
        data: {
          ...prevState.data,
          [field]: [...multipleFields],
        },
      };
    });
  }

  handleMultipleFieldsChange(field, index, value, key) {
    return this.setState(prevState => {
      const multipleFields = [...prevState.data[field]];
      if (field === 'mobilePhones') {
        multipleFields[index][key] = value;
      } else if (field === 'emailAddresses') {
        multipleFields[index].value = value;
      }
      return {
        ...prevState,
        data: {
          ...prevState.data,
          [field]: [...multipleFields],
        },
      };
    });
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
          {intl.formatMessage(messages.contactInformation)}
        </Typography>
        <div>
          {this.state.data.emailAddresses.map((data, index) => (
            <FormFieldRow lastChildNoMargin key={data.id}>
              <TextField
                id={`email-address-${data.id}`}
                fullWidth
                value={data.value}
                onChange={event =>
                  this.handleMultipleFieldsChange(
                    'emailAddresses',
                    index,
                    event.target.value,
                  )
                }
              />
            </FormFieldRow>
          ))}
        </div>
        <div>
          <Button
            variant="text"
            onClick={() => this.handleAddMultipleFields('emailAddresses')}
          >
            <AddIcon />
            {intl.formatMessage(messages.addEmailAddress)}
          </Button>
        </div>
        <div>
          {this.state.data.mobilePhones.map((data, index) => (
            <FormFieldRow lastChildNoMargin key={data.id}>
              <Grid container wrap="nowrap">
                <Grid
                  item
                  xs={4}
                  style={{
                    paddingRight: dimension.spacing.xs,
                  }}
                >
                  <TextField
                    id={`mobile-prefix-${data.id}`}
                    fullWidth
                    value={data.prefix}
                    onChange={event =>
                      this.handleMultipleFieldsChange(
                        'mobilePhones',
                        index,
                        event.target.value,
                        'prefix',
                      )
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={8}
                  style={{
                    paddingLeft: dimension.spacing.xs,
                  }}
                >
                  <TextField
                    id={`mobile-phone-${data.id}`}
                    fullWidth
                    value={data.value}
                    onChange={event =>
                      this.handleMultipleFieldsChange(
                        'mobilePhones',
                        index,
                        event.target.value,
                        'value',
                      )
                    }
                  />
                </Grid>
              </Grid>
            </FormFieldRow>
          ))}
        </div>
        <div>
          <Button
            variant="text"
            onClick={() => this.handleAddMultipleFields('mobilePhones')}
          >
            <AddIcon />
            {intl.formatMessage(messages.addMobilePhone)}
          </Button>
        </div>
        <Typography
          variant="h1"
          gutterBottom
          style={{
            marginTop: dimension.spacing.m,
          }}
        >
          {intl.formatMessage(messages.scheduledMeeting)}
        </Typography>
        <FormFieldRow>
          <TextField
            id="agenda"
            fullWidth
            label={intl.formatMessage(messages.agenda)}
            value={this.state.data.meetingAgenda}
            onChange={event =>
              this.handleInputChange('meetingAgenda', event.target.value)
            }
          />
        </FormFieldRow>
        <FormFieldRow>
          <TextField
            id="date"
            fullWidth
            label={intl.formatMessage(messages.date)}
            inputProps={{
              readOnly: true,
            }}
            value={this.getMeetingDateTime().displayDate}
            onFocus={() =>
              this.setState({
                isDatePickerOpen: true,
              })
            }
          />
        </FormFieldRow>
        <FormFieldRow>
          <TextField
            id="time"
            fullWidth
            label={intl.formatMessage(messages.time)}
            value={this.getMeetingDateTime().displayTime}
            onFocus={() =>
              this.setState({
                isTimePickerOpen: true,
              })
            }
          />
        </FormFieldRow>
        <FormFieldRow>
          <TextField
            id="meeting-location"
            fullWidth
            label={intl.formatMessage(messages.meetingLocation)}
            value={this.state.data.meetingLocation}
            onChange={event =>
              this.handleInputChange('meetingLocation', event.target.value)
            }
          />
        </FormFieldRow>
        <DatePicker
          isOpen={this.state.isDatePickerOpen}
          min={moment()
            .startOf('date')
            .toDate()}
          max={moment()
            .add(1, 'years')
            .toDate()}
          value={this.getMeetingDateTime().date}
          confirmText={intl.formatMessage(globalMessages.select)}
          cancelText={intl.formatMessage(globalMessages.cancel)}
          onSelect={value => {
            this.handleInputChange(
              'meetingDateTime',
              moment(value)
                .startOf('date')
                .format('YYYY-MM-DD HH:mm'),
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
        <DatePicker
          isOpen={this.state.isTimePickerOpen}
          min={moment(this.getMeetingDateTime().date)
            .startOf('date')
            .toDate()}
          max={moment(this.getMeetingDateTime().date)
            .endOf('date')
            .toDate()}
          value={this.getMeetingDateTime().date}
          headerFormat="hh:mm"
          dateConfig={{
            hour: {
              format: 'hh',
              caption: 'Hour',
              step: 1,
            },
            minute: {
              format: 'mm',
              caption: 'Min',
              step: 10,
            },
          }}
          confirmText={intl.formatMessage(globalMessages.select)}
          cancelText={intl.formatMessage(globalMessages.cancel)}
          onSelect={value => {
            this.handleInputChange(
              'meetingDateTime',
              moment(value).format('YYYY-MM-DD HH:mm'),
            );
            return this.setState({
              isTimePickerOpen: false,
            });
          }}
          onCancel={() =>
            this.setState({
              isTimePickerOpen: false,
            })
          }
        />
      </form>
    );
  }
}

ContactForm.propTypes = {
  // contact: PropTypes.object,
  intl: PropTypes.object,
};

export default injectIntl(ContactForm);
