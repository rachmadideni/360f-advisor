/**
 *
 * Typography
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BaseTypography from '@material-ui/core/Typography';

const Typography = styled(props => {
  const { weight, ...baseProps } = props;
  return (
    <BaseTypography
      {...baseProps}
      classes={{
        gutterBottom: 'gutter-bottom',
        ...(props.classes ? props.classes : undefined),
      }}
    />
  );
})`
  && {
    ${props =>
      props.weight
        ? `
      font-weight: ${props.weight}
    `
        : null}
  }

  &.gutter-bottom {
    margin-bottom: 0.75em;
  }
`;

Typography.propTypes = {
  weight: PropTypes.oneOf([300, 400, 600, 700]),
};

export default Typography;
