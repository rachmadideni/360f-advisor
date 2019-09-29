import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import _ from 'lodash';
import isEmpty from 'validator/lib/isEmpty';

import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import TextField from '@material-ui/core/TextField';
import NumberInput from 'components/NumberInput';
import FormCol from 'containers/FinancialWizardContainer/components/FormCol';
import FormRow from 'containers/FinancialWizardContainer/components/FormRow';

import messages from '../../messages';

import { CUSTOMER_AGE, AGE_UPPER_BOUND } from '../../constants';

class BenefitItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upToAgeOptions: _.range(CUSTOMER_AGE, AGE_UPPER_BOUND + 1),
      error: {
        upToAge: null,
        sumAssured: null,
      },
    };

    this.validateUpToAge = this.validateUpToAge.bind(this);
    this.validateSumAssured = this.validateSumAssured.bind(this);
  }

  validateUpToAge(value) {
    this.props.onError(isEmpty(value));
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        upToAge: isEmpty(value) ? messages.errorUpToAge : null,
      },
    }));
  }

  validateSumAssured(value) {
    this.props.onError(isEmpty(value));
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        sumAssured: isEmpty(value) ? messages.errorSumAssured : null,
      },
    }));
  }

  render() {
    const {
      intl,
      onChangeBenefitInput,
      benefitsData,
      validate,
      benefitOptions,
      onDeleteBenefitItem,
      // benefits,PropTypes.func
    } = this.props;

    const { error, upToAgeOptions } = this.state;
    return (
      <React.Fragment>
        {benefitsData.map((item, index) => {
          const selectedBenefitTypes = benefitsData.map(ben => ben.benefitType); // already selected benefit list
          const thisType = item.benefitType;

          let availableBenefitTypes = [...benefitOptions];
          availableBenefitTypes = availableBenefitTypes.filter(
            type =>
              selectedBenefitTypes.indexOf(type.value) < 0 ||
              type.value === thisType,
          );
          const benefitKey = `benefit-${index}`;
          return (
            <div key={benefitKey}>
              <FormRow container wrap="nowrap">
                <FormCol item xs={12}>
                  <TextField
                    select
                    fullWidth
                    variant="outlined"
                    value={item.benefitType}
                    onChange={event =>
                      onChangeBenefitInput(
                        index,
                        'benefitType',
                        event.target.value,
                      )
                    }
                    label={intl.formatMessage(messages.benefit)}
                    error={validate && !!error.benefit}
                    helperText={
                      validate && !!error.benefit
                        ? intl.formatMessage(error.errorAddBenefit)
                        : null
                    }
                  >
                    {availableBenefitTypes.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormCol>
              </FormRow>
              <FormRow container wrap="nowrap">
                <FormCol item xs={3}>
                  <TextField
                    label={intl.formatMessage(messages.uptoage)}
                    select
                    value={item.upToAge}
                    onChange={event =>
                      // this.validateUpToAge(event.target.value);
                      onChangeBenefitInput(index, 'upToAge', event.target.value)
                    }
                    fullWidth
                    variant="outlined"
                    error={validate && !!error.upToAge}
                    helperText={
                      validate && !!error.upToAge
                        ? intl.formatMessage(error.errorUpToAge)
                        : null
                    }
                  >
                    {upToAgeOptions.map((option, idx) => {
                      const key = `ageKey-${idx}`;
                      return (
                        <MenuItem key={key} value={option}>
                          {option}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </FormCol>
                <FormCol item xs={10}>
                  <NumberInput
                    value={item.sumAssured}
                    onChange={value =>
                      // this.validateSumAssured(event.target.value);
                      onChangeBenefitInput(index, 'sumAssured', value)
                    }
                    autoComplete="off"
                    label={intl.formatMessage(messages.sumAssured)}
                    fullWidth
                    variant="outlined"
                  />
                </FormCol>
              </FormRow>
              <div style={{ textAlign: 'right' }}>
                <IconButton
                  style={{ fontSize: 30 }}
                  onClick={() => onDeleteBenefitItem(index)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

BenefitItems.propTypes = {
  intl: PropTypes.object,
  onError: PropTypes.func,
  onChangeBenefitInput: PropTypes.func,
  benefitsData: PropTypes.array,
  benefitOptions: PropTypes.array,
  onDeleteBenefitItem: PropTypes.func,
  validate: PropTypes.func,
};

export default injectIntl(BenefitItems);
