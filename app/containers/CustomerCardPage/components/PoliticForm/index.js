import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Typography from 'components/Typography';
import Switch from 'components/Switch';
import TextField from 'components/TextField';
import globalMessages from 'containers/App/messages';
import FormFieldRow from '../FormFieldRow';
import messages from '../../messages';

class PoliticForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        isPoliticallyExposedPerson: false,
        name: '',
        relationship: '',
        currentPosition: '',
        currentOrganisation: '',
        country: '',
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
      data: props.politicallyExposed,
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

  renderDetailFields() {
    if (!this.state.data.isPoliticallyExposedPerson) {
      return null;
    }

    const { intl } = this.props;

    return (
      <React.Fragment>
        <FormFieldRow>
          <TextField
            id="name"
            fullWidth
            label={intl.formatMessage(messages.name)}
            value={this.state.data.name}
            onChange={event =>
              this.handleInputChange('name', event.target.value)
            }
          />
        </FormFieldRow>
        <FormFieldRow>
          <TextField
            id="relationship"
            fullWidth
            label={intl.formatMessage(messages.relationship)}
            value={this.state.data.relationship}
            onChange={event =>
              this.handleInputChange('relationship', event.target.value)
            }
          />
        </FormFieldRow>
        <FormFieldRow>
          <TextField
            id="current-position"
            fullWidth
            label={intl.formatMessage(messages.currentPosition)}
            value={this.state.data.currentPosition}
            onChange={event =>
              this.handleInputChange('currentPosition', event.target.value)
            }
          />
        </FormFieldRow>
        <FormFieldRow>
          <TextField
            id="current-organisation"
            fullWidth
            label={intl.formatMessage(messages.currentOrganisation)}
            value={this.state.data.currentOrganisation}
            onChange={event =>
              this.handleInputChange('currentOrganisation', event.target.value)
            }
          />
        </FormFieldRow>
        <FormFieldRow>
          <TextField
            id="country"
            fullWidth
            label={intl.formatMessage(messages.country)}
            value={this.state.data.country}
            onChange={event =>
              this.handleInputChange('country', event.target.value)
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
        <Typography variant="h1" gutterBottom>
          {intl.formatMessage(messages.politicallyExposedPerson)}
        </Typography>
        <FormFieldRow fullWidth>
          <Typography variant="body1" component="label">
            {intl.formatMessage(messages.pepDescription)}
          </Typography>
          <Switch
            id="net-asset"
            checked={this.state.data.isPoliticallyExposedPerson}
            onChange={event =>
              this.handleInputChange(
                'isPoliticallyExposedPerson',
                event.target.checked,
              )
            }
            value="1"
            color="default"
            labelPositive={intl.formatMessage(globalMessages.yes)}
            labelNegative={intl.formatMessage(globalMessages.no)}
          />
        </FormFieldRow>
        {this.renderDetailFields()}
      </form>
    );
  }
}

PoliticForm.propTypes = {
  intl: PropTypes.object,
  // politicallyExposed: PropTypes.object,
};

export default injectIntl(PoliticForm);
