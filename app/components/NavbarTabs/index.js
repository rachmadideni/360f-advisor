import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { color, typography, dimension } from 'styles/constants';

const VerticalTabs = styled(Tabs).attrs({
  classes: {
    flexContainer: 'flex-container',
    indicator: 'indicator',
  },
})`
  && {
    margin-top: 30px;

    .flex-container {
      flex-direction: column;
    }
    .indicator {
      display: none;
    }
  }
`;

const IconTab = styled(Tab).attrs({
  classes: {
    selected: 'selected',
    labelContainer: 'label-container',
  },
})`
  && {
    min-width: 80px;
    font-size: ${typography.h1.fontSize}px;
    min-height: 72px;
    opacity: 0.5;
    transition: background-color 200ms ease-in-out;

    .label-container {
      margin-top: ${dimension.spacing.xxs}px;
      font-size: ${typography.caption.fontSize}px;
      padding: 0;
      line-height: 1;
    }
  }

  &.selected {
    background-color: ${color.cyan[400]};
    color: ${color.white};
    opacity: 1;
  }
`;

function NavbarTabs(props) {
  const { tabs, ...tabsProps } = props;
  return (
    <VerticalTabs {...tabsProps}>
      {tabs.map((tab, index) => {
        const key = `navTab-${tab.label}-${index}`;
        return <IconTab key={key} icon={<tab.icon />} label={tab.label} />;
      })}
    </VerticalTabs>
  );
}

// note : use temporary parseInt func to disable error lint (Do not use Array index in keys  react/no-array-index-key)
//

NavbarTabs.propTypes = {
  tabs: PropTypes.array,
};

export default NavbarTabs;
