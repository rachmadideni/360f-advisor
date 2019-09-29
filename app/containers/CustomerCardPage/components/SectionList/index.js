import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { typography, color, themeColor } from 'styles/constants';

const StyledList = styled(List)`
  && {
    max-width: 200px;
  }
`;

const StyledListItem = styled(ListItem).attrs({
  classes: {
    selected: 'selected-list-item',
    ...props => (props.classes ? props.classes : undefined),
  },
})`
  && {
    padding-top: 20px;
    padding-bottom: 20px;
    color: ${color.grey[500]};
  }

  &.selected-list-item {
    color: ${themeColor.textPrimary};
    background-color: transparent !important;
  }
`;

const StyledListItemText = styled(ListItemText).attrs({
  classes: {
    primary: 'primary',
  },
})`
  && {
    .primary {
      font-weight: ${typography.fontWeight.bold};
      text-transform: uppercase;
      color: inherit;
    }
  }
`;

function SectionList(props) {
  const { listItems, onListItemClick } = props;
  return (
    <StyledList component="nav">
      {listItems.map(listItem => (
        <StyledListItem
          key={listItem.title}
          button
          onClick={() => onListItemClick(listItem.value)}
          selected={listItem.selected}
        >
          <StyledListItemText primary={listItem.title} />
        </StyledListItem>
      ))}
    </StyledList>
  );
}

SectionList.propTypes = {
  listItems: PropTypes.array,
  onListItemClick: PropTypes.func,
};

export default SectionList;
