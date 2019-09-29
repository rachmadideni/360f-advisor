/**
 *
 * CustomerCardPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from 'components/Avatar';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectListItem,
  makeSelectContactData,
  makeSelectProfileData,
  makeSelectWorkHealthData,
  makeSelectInvestorTypeData,
  makeSelectPoliticallyExposedData,
  makeSelectDependantsData,
  makeSelectProficiencyData,
} from './selectors';

import { addDependantAction } from './actions';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import SectionList from './components/SectionList';
import SectionCard from './components/SectionCard';
import ProfileForm from './components/ProfileForm';
import ContactForm from './components/ContactForm';
import WorkHealthForm from './components/WorkHealthForm';
import DependantsForm from './components/DependantsForm';
import ProficiencyForm from './components/ProficiencyForm';
import CkaForm from './components/CkaForm';
import InvestorTypeForm from './components/InvestorTypeForm';
import PoliticForm from './components/PoliticForm';

/* eslint-disable react/prefer-stateless-function */
export class CustomerCardPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  getListItems() {
    const { listItem, intl, match } = this.props;

    const listItemArray = [
      listItem.profile,
      listItem.contact,
      listItem.workHealth,
      listItem.dependants,
      listItem.proficiency,
      listItem.cka,
      listItem.investorType,
      listItem.politicallyExposed,
    ];

    return listItemArray.map(item => ({
      title: intl.formatMessage(messages[item.title]),
      value: item.url,
      selected: match.params.section === item.url,
    }));
  }

  handleListItemClick(url) {
    const { location, history } = this.props;

    return history.replace(`/customer/card/${url}${location.search}`);
  }

  render() {
    const {
      intl,
      profile,
      contact,
      workHealth,
      investorType,
      politicallyExposed,
      dependants,
      addDependant,
      proficiency,
    } = this.props;

    return (
      <Grid
        container
        direction="column"
        wrap="nowrap"
        style={{
          height: '100%',
        }}
      >
        <Grid item>
          <Typography
            variant="h2"
            align="center"
            style={{
              marginTop: 30,
              marginBottom: 30,
            }}
          >
            {intl.formatMessage(messages.customerCard)}
          </Typography>
        </Grid>
        <Grid item xs container wrap="nowrap">
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Grid
                item
                style={{
                  marginBottom: 30,
                }}
              >
                <Avatar size="l" />
              </Grid>
              <Grid item xs>
                <SectionList
                  listItems={this.getListItems()}
                  onListItemClick={url => {
                    this.handleListItemClick(url);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs
            style={{
              paddingBottom: 50,
            }}
          >
            <SectionCard>
              <Switch>
                <Route
                  path="/customer/card/profile"
                  render={routeProps => (
                    <ProfileForm {...routeProps} profile={profile} />
                  )}
                />
                <Route
                  path="/customer/card/contact"
                  render={routeProps => (
                    <ContactForm {...routeProps} contact={contact} />
                  )}
                />
                <Route
                  path="/customer/card/work-health"
                  render={routeProps => (
                    <WorkHealthForm {...routeProps} workHealth={workHealth} />
                  )}
                />
                <Route
                  path="/customer/card/dependants"
                  render={routeProps => (
                    <DependantsForm
                      {...routeProps}
                      dependants={dependants}
                      addDependant={addDependant}
                    />
                  )}
                />
                <Route
                  path="/customer/card/proficiency"
                  render={routeProps => (
                    <ProficiencyForm
                      {...routeProps}
                      proficiency={proficiency}
                    />
                  )}
                />
                <Route
                  path="/customer/card/cka"
                  render={routeProps => <CkaForm {...routeProps} />}
                />
                <Route
                  path="/customer/card/investor-type"
                  render={routeProps => (
                    <InvestorTypeForm
                      {...routeProps}
                      investorType={investorType}
                    />
                  )}
                />
                <Route
                  path="/customer/card/politically-exposed"
                  render={routeProps => (
                    <PoliticForm
                      {...routeProps}
                      politicallyExposed={politicallyExposed}
                    />
                  )}
                />
              </Switch>
            </SectionCard>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

CustomerCardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  profile: PropTypes.object,
  contact: PropTypes.object,
  workHealth: PropTypes.object,
  investorType: PropTypes.object,
  politicallyExposed: PropTypes.object,
  dependants: PropTypes.array,
  listItem: PropTypes.object,
  intl: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  addDependant: PropTypes.func,
  proficiency: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  listItem: makeSelectListItem(),
  profile: makeSelectProfileData(),
  contact: makeSelectContactData(),
  workHealth: makeSelectWorkHealthData(),
  investorType: makeSelectInvestorTypeData(),
  politicallyExposed: makeSelectPoliticallyExposedData(),
  dependants: makeSelectDependantsData(),
  proficiency: makeSelectProficiencyData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addDependant: value => dispatch(addDependantAction(value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'customerCardPage', reducer });
const withSaga = injectSaga({ key: 'customerCardPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
)(CustomerCardPage);
