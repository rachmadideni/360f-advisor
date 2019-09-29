import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Typography from 'components/Typography';
import Button from 'components/Button';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from 'components/TextField';
import moment from 'moment';
import DatePicker from 'react-mobile-datepicker';

import globalMessages from 'containers/App/messages';
import { DEPENDANT_RELATIONSHIP_OPTIONS } from '../../constants';
import messages from '../../messages';
import FormFieldRow from '../FormFieldRow';

class DependantsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerOpen: false,
      dependantName: '',
      dateOfBirth: '',
      relationship: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveDependant = this.saveDependant.bind(this);
  }

  handleInputChange(field, value) {
    this.setState({
      [field]: value,
    });
  }

  saveDependant() {
    const { dependantName, dateOfBirth, relationship } = this.state;

    this.props.addDependant({
      dependantName,
      dateOfBirth,
      relationship,
    });

    this.setState({
      dependantName: '',
      dateOfBirth: '',
      relationship: '',
    });
  }

  getDateOfBirth() {
    const { dateOfBirth } = this.state;

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

  render() {
    const { intl, dependants } = this.props;

    return (
      <form
        noValidate
        autoComplete="off"
        style={{
          width: '100%',
          height: '80%',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h1" gutterBottom>
          {intl.formatMessage(messages.dependants)}
        </Typography>

        <Button variant="text" onClick={this.saveDependant}>
          <AddIcon />
          {intl.formatMessage(messages.addDependant)}
        </Button>

        <FormFieldRow fullWidth>
          <TextField
            id="dependant-name"
            label={intl.formatMessage(messages.dependantName)}
            margin="normal"
            value={this.state.dependantName}
            onChange={e =>
              this.handleInputChange('dependantName', e.target.value)
            }
          />
        </FormFieldRow>

        <FormFieldRow fullWidth>
          <TextField
            id="date-of-birth"
            label={intl.formatMessage(messages.dateOfBirth)}
            margin="normal"
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
            id="relationship"
            label={intl.formatMessage(messages.relationship)}
            margin="normal"
            select
            fullWidth
            value={this.state.relationship}
            onChange={e =>
              this.handleInputChange('relationship', e.target.value)
            }
          >
            {DEPENDANT_RELATIONSHIP_OPTIONS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {intl.formatMessage(globalMessages[option.title])}
              </MenuItem>
            ))}
          </TextField>
        </FormFieldRow>

        <Divider />

        {/* LOOP EXISTING DEPENDANTS */}

        {dependants.map((item, index) => (
          <React.Fragment>
            <FormFieldRow fullWidth>
              <TextField
                id="dependant-name"
                label={intl.formatMessage(messages.dependantName)}
                margin="normal"
                inputProps={{
                  readOnly: true,
                }}
                value={dependants[index].dependantName}
              />
            </FormFieldRow>

            <FormFieldRow fullWidth>
              <TextField
                id="date-of-birth"
                label={intl.formatMessage(messages.dateOfBirth)}
                margin="normal"
                inputProps={{
                  readOnly: true,
                }}
                value={moment(dependants[index].dateOfBirth).format(
                  'DD-MM-YYYY',
                )}
                onFocus={() =>
                  this.setState({
                    isDatePickerOpen: true,
                  })
                }
              />
            </FormFieldRow>
            <FormFieldRow fullWidth>
              <TextField
                id="relationship"
                label={intl.formatMessage(messages.relationship)}
                margin="normal"
                inputProps={{
                  readOnly: true,
                }}
                value={dependants[index].relationship}
              >
                {DEPENDANT_RELATIONSHIP_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {intl.formatMessage(globalMessages[option.title])}
                  </MenuItem>
                ))}
              </TextField>
            </FormFieldRow>
            <Divider />
          </React.Fragment>
        ))}
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
      </form>
    );
  }
}

DependantsForm.propTypes = {
  intl: PropTypes.object,
  dependants: PropTypes.array,
  addDependant: PropTypes.func,
};
export default injectIntl(DependantsForm);
