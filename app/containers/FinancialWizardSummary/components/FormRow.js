import { TableRow } from '@material-ui/core';
import styled from 'styled-components';
import { color } from 'styles/constants';

const FormRow = styled(TableRow)`
  && {
    &:nth-of-type(odd) {
      background-color: ${color.white};
    }
  }
`;

export default FormRow;
