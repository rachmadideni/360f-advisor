/* import React from 'react';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import Typography from 'components/Typography';
import SectionButton from 'containers/FinancialWizardContainer/components/SectionButton';

import { dimension } from 'styles/constants';
import { PORTFOLIO_SECTIONS } from '../constants';
import messages from '../messages';

class SectionOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

	  };
	}

	 componentDidMount(){
		console.log(this.props);
	} 

  handleSectionButtonClick(section) {
    this.props.handleSectionButtonClick(section);
  }

  getSectionButtonActiveState(section) {
    this.props.getSectionButtonActiveState(section);
  }

  render() {
    const { intl } = this.props;
    return (
      <React.Fragment>
        <Typography
          variant="h1"
          align="center"
          color="secondary"
          style={{
            marginTop: dimension.spacing.xl,
            marginBottom: dimension.spacing.xl,
          }}
        >
          {intl.formatMessage(messages.selectSection)}
        </Typography>
        <Grid
          container
          justify="space-between"
          style={{
            maxWidth: 650,
            width: '100%',
          }}
        >
          {PORTFOLIO_SECTIONS.map(section => (
            <SectionButton
              size="normal"
              active={this.getSectionButtonActiveState(section.value)}
              key={section.value}
              label={intl.formatMessage(section.title)}
              onClick={() => this.handleSectionButtonClick(section.value)}
              icon={<section.icon />}
            />
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default compose(injectIntl)(SectionOptions);

/*
active={this.getSectionButtonActiveState(section.value)}

onClick={() => this.handleSectionButtonClick(section.value)}
 */
