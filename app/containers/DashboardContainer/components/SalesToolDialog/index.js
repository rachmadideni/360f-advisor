import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { color } from 'styles/constants';
import ActionButton from './ActionButton';

const StyledDialog = styled(Dialog).attrs({
  classes: {
    paper: 'paper',
  },
})`
  && {
    .paper {
      background-color: transparent;
      box-shadow: none;
    }
  }
`;

const HeadingWrapper = styled.div`
  && {
    margin-bottom: 50px;
    color: ${color.white};
    text-align: center;
  }
`;

function SalesToolDialog(props) {
  const { headingText, actions, onActionClick, ...dialogProps } = props;

  return (
    <StyledDialog {...dialogProps}>
      <HeadingWrapper>
        <Typography variant="h1" align="center" color="inherit">
          {headingText}
        </Typography>
      </HeadingWrapper>
      <Grid container wrap="nowrap">
        {actions.map(action => (
          <ActionButton
            key={action.value}
            onClick={() => onActionClick(action.value)}
            label={action.title}
          />
        ))}
      </Grid>
    </StyledDialog>
  );
}

SalesToolDialog.propTypes = {
  actions: PropTypes.array,
  onActionClick: PropTypes.func,
  headingText: PropTypes.string,
};

export default SalesToolDialog;
