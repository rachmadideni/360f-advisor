/**
 *
 * Avatar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import BaseAvatar from '@material-ui/core/Avatar';

function getSizeCss(size) {
  switch (size) {
    case 'xs':
      return css`
        width: 28px;
        height: 28px;
      `;
    case 's':
      return css`
        width: 50px;
        height: 50px;
      `;
    case 'l':
      return css`
        width: 100px;
        height: 100px;
      `;
    case 'xl':
      return css`
        width: 165px;
        height: 165px;
      `;
    default:
      return css`
        width: 80px;
        height: 80px;
      `;
  }
}

const StyledAvatar = styled(props => {
  const { size, ...avatarProps } = props;
  return <BaseAvatar {...avatarProps} />;
})`
  && {
    ${props => getSizeCss(props.size)};
  }
`;

function Avatar(props) {
  return <StyledAvatar {...props} />;
}

Avatar.propTypes = {
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
};

export default Avatar;
