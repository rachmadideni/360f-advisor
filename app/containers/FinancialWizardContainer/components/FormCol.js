import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { dimension } from 'styles/constants';

const FormCol = styled(Grid)`
  && {
    padding-left: ${dimension.spacing.xs}px;
    padding-right: ${dimension.spacing.xs}px;
  }
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
`;

export default FormCol;
