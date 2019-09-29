import styled from 'styled-components';
import { color, typography, dimension } from 'styles/constants';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const FormInput = styled(Input).attrs({
  classes: {
    root: 'underline',
  },
})`
  && {
    lineheight: ${typography.h1.lineHeight};
    padding: ${dimension.spacing.s}px;
    marginleft: ${dimension.spacing.xs}px;
    color: ${color.white};
    fontsize: ${typography.h4.fontSize}px;
    fontweight: ${typography.fontWeight.normal};

    border-bottom: solid 1px ${color.white};
    &:before {
      border-bottom: solid 1px ${color.white};
    }
    &:after {
      border-bottom: solid 1px ${color.white};
    }
  }
`;

const ButtonPill = styled(Button)`
  && {
    background-color: ${color.green};
    margin-top: 24px;
    margin-left: 5px;
    &:hover {
      pointer: cursor;
      color: ${color.grey[100]};
      background-color: ${color.green};
      //#23a376;
    }
  }
`;

const ButtonTextWrap = styled.div`
  margin-top: ${dimension.spacing.s}px;
  // margin-left: 190px;
`;
const ButtonText = styled(Button)`
  && {
    font-size: ${typography.fontSize}px;
    font-weight: ${typography.fontWeight.normal};
    color: ${color.white};
    &:hover: {
      background-color: none;
      color: ${color.white};
    }
  }
`;
const IconButtonWrap = styled(IconButton)`
  && {
    color: ${color.white};
  }
`;

export { FormInput, ButtonPill, ButtonTextWrap, ButtonText, IconButtonWrap };
