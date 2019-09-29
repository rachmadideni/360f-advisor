/**
 *
 * NumberInputField
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import TextField from 'components/TextField';

function CustomInput(props) {
  return <TextField {...props} />;
}

function NumberInput(props) {
  const { onChange, ...otherProps } = props;
  return (
    <NumberFormat
      thousandSeparator
      {...otherProps}
      decimalSeparator="."
      decimalScale={2}
      customInput={CustomInput}
      onValueChange={values => {
        const { value } = values;
        onChange(value);
      }}
    />
  );
}

NumberInput.propTypes = {
  onChange: PropTypes.func,
};

export default NumberInput;
