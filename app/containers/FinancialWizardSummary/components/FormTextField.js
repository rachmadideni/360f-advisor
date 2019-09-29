import React from 'react';
import styled from 'styled-components';
import { color, dimension } from 'styles/constants';
import { TextField } from '@material-ui/core';

const FormTextField = styled(props => {
  const { isEditMode, ...textFieldsProps } = props;
  return <TextField {...textFieldsProps} />;
})`
  && {
    width: 96%;
    margin-bottom: ${dimension.spacing.xs}px;
    margin-top: ${dimension.spacing.xs}px;
    background-color: ${props => (props.isEditMode ? color.white : null)};
  }
`;

export default FormTextField;
