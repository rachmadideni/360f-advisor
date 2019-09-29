import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { dimension } from 'styles/constants';

const FormRow = styled(props => {
  const { fullWidth, ...baseProps } = props;
  return <Grid {...baseProps} />;
})`
  && {
    max-width: ${props => (!props.fullWidth ? '480px' : 'none')};
    margin-bottom: ${dimension.spacing.s}px;
  }
`;

FormRow.propTypes = {
  fullWidth: PropTypes.bool,
};

export default FormRow;
