/**
 *
 * AppointmentList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { color, typography, dimension } from 'styles/constants';

const ListItemWrap = styled(ListItem)`
  max-height: 43.5px;
  border-left: solid 4px #3b95b7;
`;
const ListItemTextWrap = styled(ListItemText)`
  font-size: 16px;
  flex-wrap: wrap;
  flex-direction: column;
`;

const ItemDetails = styled.p`
  font-color: ${color.black};
  font-weight: ${typography.fontWeight.semibold};
  padding: 0;
  margin: 0;
`;
const ItemDuration = styled.p`
  font-size: ${typography.fontSize}px;
  padding: 0;
  margin: 0;
`;
const DurationIconWrap = styled(AccessTimeIcon)`
  && {
    font-size: ${typography.fontSize}px;
    margin-right: 4px;
  }
`;
const DateWrapper = styled.div`
  width: 25px;
  height: 40px;
  text-align: center;
  font-weight: ${typography.fontWeight.semibold};
  margin: 0;
  padding: 0;
`;
const DayItem = styled.p`
  font-size: ${typography.h3.fontSize}; //18
  margin: 0px;
  padding: 0px;
`;

const MonthItem = styled.p`
  font-size: ${typography.fontSize - 3}px;
  font-weight: normal;
  margin: 0px;
  padding: 0px;
`;

const ChipRSVP = styled(Chip)`
  && {
    font-size: 10px;
    padding: 0px;
    color: white;
    border-radius: 4px;
    background-color: ${color.green};
  }
`;
const LastListItemWrap = styled(ListItem)`
  && {
    max-height: ${dimension.spacing.s + 2}px;
    align-items: center;
    justify-content: center;
  }
`;

function AppointmentList(props) {
  return (
    <React.Fragment>
      <div
        style={{
          flexWrap: 'nowrap',
          width: '100%',
          backgroundColor: `${color.grey[100]}`,
        }}
      >
        <List key={props.index}>
          <ListItemWrap>
            <DateWrapper>
              <DayItem>{props.day}</DayItem>
              <MonthItem>{props.month}</MonthItem>
            </DateWrapper>
            <ListItemTextWrap>
              <ItemDetails>{`${props.details}`}</ItemDetails>
              <ItemDuration>
                <DurationIconWrap />
                {`${props.time_start} - ${props.time_end}`}
              </ItemDuration>
            </ListItemTextWrap>
            <ChipRSVP label="RSVP" />
          </ListItemWrap>
        </List>
        <Divider />
        {props.index === props.length - 1 && (
          <React.Fragment>
            <div
              style={{
                borderBottomLeftRadius: `${dimension.spacing.xs + 2}px`,
                borderBottomRightRadius: `${dimension.spacing.xs + 2}px`,
              }}
            >
              <List>
                <LastListItemWrap>
                  <Button align="center" fontSize="small" color="default">
                    See All
                  </Button>
                </LastListItemWrap>
              </List>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

AppointmentList.propTypes = {
  index: PropTypes.number,
  day: PropTypes.string,
  month: PropTypes.string,
  details: PropTypes.string,
  time_start: PropTypes.string,
  time_end: PropTypes.string,
  length: PropTypes.number,
};

export default AppointmentList;
