import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import TextField from 'components/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import isEmpty from 'validator/lib/isEmpty';
import { isEqual } from 'lodash/lang';
import { forOwn } from 'lodash/object';

import globalMessages from 'containers/App/messages';
import FormRow from 'containers/FinancialWizardContainer/components/FormRow';
import FormCol from 'containers/FinancialWizardContainer/components/FormCol';
import messages from '../../messages';

/* eslint-disable react/prefer-stateless-function */
class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        highestEducation: null,
      },
    };
  }

  componentDidMount() {
    this.validateAll();
  }

  componentDidUpdate(prevProps, prevState) {
    const { validate } = this.props;
    if (prevProps.validate !== validate) {
      this.validateAll();
    }
    if (!isEqual(this.state.error, prevState.error)) {
      let isError = false;
      forOwn(this.state.error, value => {
        isError = isError || !!value;
      });
      this.props.onError(isError);
    }
  }

  componentWillUnmount() {
    this.props.onError(false);
  }

  validateAll() {
    const { personalDetails } = this.props;
    const isHighestEduError = this.validateInputEmpty(
      'highestEducation',
      personalDetails.highestEducation,
      true,
    );
    return isHighestEduError;
  }

  validateInputEmpty(name, value, isSelect = false) {
    // this.props.onError(isEmpty(value) || !!this.state.error[name]);
    const errMsg = isSelect
      ? globalMessages.pleaseMakeSelection
      : globalMessages.pleaseEnterValue;
    this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        [name]: isEmpty(value) ? errMsg : null,
      },
    }));
    return isEmpty(value);
  }

  render() {
    const {
      intl,
      educationLevelOptions,
      personalDetails,
      onInputChange,
      validate,
    } = this.props;
    const { error } = this.state;
    return (
      <React.Fragment>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              variant="outlined"
              label={intl.formatMessage(messages.highestLevelEducation)}
              select
              fullWidth
              value={personalDetails.highestEducation}
              onChange={e => {
                this.validateInputEmpty(
                  'highestEducation',
                  e.target.value,
                  true,
                );
                return onInputChange('highestEducation', e.target.value);
              }}
              error={validate && !!error.highestEducation}
              helperText={
                validate && error.highestEducation
                  ? intl.formatMessage(error.highestEducation)
                  : null
              }
            >
              {educationLevelOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
          </FormCol>
        </FormRow>
      </React.Fragment>
    );
  }
}

Education.propTypes = {
  intl: PropTypes.object,
  educationLevelOptions: PropTypes.array,
  personalDetails: PropTypes.object,
  onInputChange: PropTypes.func,
  validate: PropTypes.bool,
  onError: PropTypes.func,
};

export default injectIntl(Education);
