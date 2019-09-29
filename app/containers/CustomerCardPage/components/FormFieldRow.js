import styled from 'styled-components';

import { dimension } from 'styles/constants';

const FormFieldRow = styled.div`
  && {
    margin-bottom: ${dimension.spacing.s}px;
    width: ${props => (props.fullWidth ? '100%' : '60%')};
  }
  &:last-child {
    ${props =>
      props.lastChildNoMargin
        ? `
      margin-bottom: 0;
    `
        : null};
  }
`;

export default FormFieldRow;
