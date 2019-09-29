/**
 *
 * OutstandingTask
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Typography from '@material-ui/core/Typography';
import { color, dimension, typography } from 'styles/constants';

const CardContainer = styled(Card).attrs({
  classes: { root: 'root' },
})`
  margin-bottom: 20px;
  && {
    .root {
      border-radius: ${typography.fontSize - 4}px;
      padding: 0px 0px 0px 0px;
    }
  }
`;
const Content = styled(CardContent).attrs({
  classes: { root: 'root' },
})`
  padding: 0px;
  && {
    .root {
      padding-top: ${dimension.spacing.xs - 5}px;
    }
    font-size: ${typography.fontSize}px;
    text-align: center;
    padding: 0px 0px 0px 0px;
  }
`;
const InnerWrapper = styled.div`
  background-color: ${color.blue};
  margin-bottom: ${dimension.spacing.xs}px;
`;
const Title = styled(Typography)`
  && {
    color: ${color.white};
    padding: ${dimension.spacing.xs}px;
    margin: 0px;
  }
`;

const ChipTag = styled(Chip)`
  && {
    text-transform: uppercase;
    color: white;
    border-radius: ${dimension.borderRadius.m - 25}px;
    background-color: ${color.red};
  }
`;

function OutstandingTask(props) {
  return (
    <CardContainer>
      <Content>
        <InnerWrapper>
          <Title variant="h4">{props.title}</Title>
        </InnerWrapper>
        <div
          style={{
            padding: `${dimension.borderRadius.m - 10}px`,
          }}
        >
          {props.text}
        </div>
      </Content>
      <CardActions
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <AccessTimeIcon
            size="small"
            style={{ paddingRight: `${dimension.spacing.xs - 5}px` }}
          />
          <small>{props.due_date}</small>
        </div>
        <ChipTag label="Overdue" />
      </CardActions>
    </CardContainer>
  );
}

OutstandingTask.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  due_date: PropTypes.string,
};

export default OutstandingTask;
