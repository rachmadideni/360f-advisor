import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { dimension } from 'styles/constants';

const StyledCard = styled(Card)`
  && {
    margin-right: 35px;
    height: 100%;
  }
`;

const StyledCardContent = styled(CardContent)`
  && {
    height: 100%;
    padding: ${dimension.spacing.m}px;
  }
`;

function SectionCard(props) {
  const { children } = props;
  return (
    <StyledCard>
      <StyledCardContent>{children}</StyledCardContent>
    </StyledCard>
  );
}

SectionCard.propTypes = {
  children: PropTypes.node,
};

export default SectionCard;
