/* import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { color, typography, dimension } from 'styles/constants';

const StyledTabs = styled(Tabs).attrs({
  classes: {
    indicator: 'indicator',
  },
})`
  && {
    margin-top: 20px;
    .indicator: {
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
		border-radiusL8px;
		background-color:${color.grey[300]};
		color:${color.black};
	}
	&.selected {
    	background-color: ${color.green};
    	color: ${color.white};
    	opacity: 1;
  }
`;

function SectionTabs(props) {
  const { tabs, ...tabsProps } = props;
  return (
    <StyledTabs {...tabsProps}>
      {tabs.map((tab, index) => (
        <IconTab key={index} icon={<tab.icon />} label={tab.title} />
      ))}
    </StyledTabs>
  );
}

export default SectionTabs;
*/
