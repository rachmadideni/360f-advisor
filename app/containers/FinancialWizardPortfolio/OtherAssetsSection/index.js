import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import TextField from 'components/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import isEmpty from 'validator/lib/isEmpty';

import NumberInput from 'components/NumberInput';
import FormCol from 'containers/FinancialWizardContainer/components/FormCol';
import FormRow from 'containers/FinancialWizardContainer/components/FormRow';
import messages from '../messages';

class OtherAssetsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        assetType: null,
        describeAsset: null,
        currentRealisableValue: null,
        rateOfReturn: null,
      },
    };

    this.validateAssetType = this.validateAssetType.bind(this);
    this.validateRealisableValue = this.validateRealisableValue.bind(this);
    this.validateRate = this.validateRate.bind(this);
  }

  componentDidMount() {
    const { assetType, realisableValue } = this.props;
    this.validateAssetType(assetType);
    this.validateRealisableValue(realisableValue);
  }

  componentDidUpdate(prevProps) {
    const { assetType, realisableValue, validate } = this.props;
    if (prevProps.validate !== validate) {
      this.validateAssetType(assetType);
      this.validateRealisableValue(realisableValue);
    }
  }

  componentWillUnmount() {
    this.props.onError(false);
  }

  validateAssetType(value) {
    this.props.onError(isEmpty(value));
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        assetType: isEmpty(value) ? messages.errorAssetType : null,
      },
    }));
  }

  validateRealisableValue(value) {
    this.props.onError(isEmpty(value));
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        currentRealisableValue: isEmpty(value)
          ? messages.errorRealisableValue
          : null,
      },
    }));
  }

  validateRate(value) {
    this.props.onError(isEmpty(value));
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        rateOfReturn: isEmpty(value) ? messages.pleaseEnterValue : null,
      },
    }));
  }

  render() {
    const {
      intl,
      assetType,
      assetDescription,
      currency,
      currencyOptions,
      realisableValue,
      rateOfReturn,
      onChangeOtherAssetType,
      onChangeOtherAssetDescription,
      onChangeOtherAssetCurrency,
      onChangeOtherAssetRealisableValue,
      onChangeOtherAssetRate,
      onDelete,
      validate,
      notDeletable,
    } = this.props;

    const { error } = this.state;

    return (
      <React.Fragment>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              value={assetType}
              onChange={event => {
                this.validateAssetType(event.target.value);
                return onChangeOtherAssetType(event.target.value);
              }}
              variant="outlined"
              label={intl.formatMessage(messages.assetType)}
              fullWidth
              error={validate && !!error.assetType}
              helperText={
                validate && !!error.assetType
                  ? intl.formatMessage(error.assetType)
                  : null
              }
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              value={assetDescription}
              onChange={event =>
                onChangeOtherAssetDescription(event.target.value)
              }
              label={intl.formatMessage(messages.describeAsset)}
              variant="outlined"
              fullWidth
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <TextField
              value={currency}
              onChange={event => onChangeOtherAssetCurrency(event.target.value)}
              label={intl.formatMessage(messages.currency)}
              variant="outlined"
              select
              fullWidth
            >
              {currencyOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <NumberInput
              value={realisableValue}
              onChange={value => {
                this.validateRealisableValue(value);
                return onChangeOtherAssetRealisableValue(value);
              }}
              variant="outlined"
              label={intl.formatMessage(messages.currentRealisableValue)}
              allowNegative={false}
              fullWidth
              error={validate && !!error.currentRealisableValue}
              helperText={
                validate && error.currentRealisableValue
                  ? intl.formatMessage(error.currentRealisableValue)
                  : null
              }
            />
          </FormCol>
        </FormRow>
        <FormRow container wrap="nowrap">
          <FormCol item xs>
            <NumberInput
              thousandSeparator=","
              decimalSeparator="."
              suffix=" %"
              value={rateOfReturn}
              onChange={value => {
                this.validateRate(value);
                return onChangeOtherAssetRate(value);
              }}
              variant="outlined"
              label={intl.formatMessage(messages.rateOfReturn)}
              allowNegative={false}
              fullWidth
            />
          </FormCol>
        </FormRow>
        {!notDeletable && (
          <div style={{ textAlign: 'right' }}>
            <IconButton onClick={onDelete} style={{ fontSize: 30 }}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        )}
      </React.Fragment>
    );
  }
}

OtherAssetsSection.propTypes = {
  intl: PropTypes.object,
  assetType: PropTypes.string,
  // describeAsset: PropTypes.string,
  // currentRealisableValue: PropTypes.string,
  validate: PropTypes.bool,
  onError: PropTypes.func,
  assetDescription: PropTypes.string,
  currency: PropTypes.string,
  currencyOptions: PropTypes.array,
  realisableValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rateOfReturn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeOtherAssetType: PropTypes.func,
  onChangeOtherAssetDescription: PropTypes.func,
  onChangeOtherAssetCurrency: PropTypes.func,
  onChangeOtherAssetRealisableValue: PropTypes.func,
  onChangeOtherAssetRate: PropTypes.func,
  onDelete: PropTypes.func,
  notDeletable: PropTypes.bool,
};

OtherAssetsSection.defaultProps = {
  notDeletable: false,
};

export default injectIntl(OtherAssetsSection);
