import { TableCell } from '@material-ui/core';
import styled from 'styled-components';
import { color, dimension } from 'styles/constants';

const FormCell = styled(TableCell)`
  && {
    padding-left: ${dimension.spacing.xl}px;
    border-bottom: none;
    font-size: 16px;
    font-weight: 600;
    color: ${color.grey[800]};
    width: 50%;
  }
`;

export default FormCell;
