import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the customerCardPage state domain
 */

const selectCustomerCardPageDomain = state =>
  state.get('customerCardPage', initialState);

/**
 * Other specific selectors
 */

const makeSelectListItem = () =>
  createSelector(
    selectCustomerCardPageDomain,
    substate => substate.get('listItem').toJS(),
  );

const makeSelectProfileData = () =>
  createSelector(
    selectCustomerCardPageDomain,
    substate => substate.getIn(['data', 'profile']).toJS(),
  );

const makeSelectContactData = () =>
  createSelector(
    selectCustomerCardPageDomain,
    substate => substate.getIn(['data', 'contact']).toJS(),
  );

const makeSelectWorkHealthData = () =>
  createSelector(
    selectCustomerCardPageDomain,
    substate => substate.getIn(['data', 'workHealth']).toJS(),
  );

const makeSelectInvestorTypeData = () =>
  createSelector(
    selectCustomerCardPageDomain,
    substate => substate.getIn(['data', 'investorType']).toJS(),
  );

const makeSelectPoliticallyExposedData = () =>
  createSelector(
    selectCustomerCardPageDomain,
    substate => substate.getIn(['data', 'politicallyExposed']).toJS(),
  );

// dependants Selector
const makeSelectDependantsData = () =>
  createSelector(
    selectCustomerCardPageDomain,
    substate => substate.getIn(['data', 'dependants']).toJS(),
  );

// proficiency selector
const makeSelectProficiencyData = () =>
  createSelector(
    selectCustomerCardPageDomain,
    substate => substate.getIn(['data', 'proficiency']).toJS(),
  );

/* const makeSelectLanguageOptions = () =>
  createSelector(proficiencyDomain, 
    substate => substate.get(['languageOptions']).toJS(),
  ); */

/**
 * Default selector used by CustomerCardPage
 */

const makeSelectCustomerCardPage = () =>
  createSelector(
    selectCustomerCardPageDomain,
    substate => substate.toJS(),
  );

export default makeSelectCustomerCardPage;
export {
  selectCustomerCardPageDomain,
  makeSelectListItem,
  makeSelectProfileData,
  makeSelectContactData,
  makeSelectWorkHealthData,
  makeSelectInvestorTypeData,
  makeSelectPoliticallyExposedData,
  makeSelectDependantsData,
  makeSelectProficiencyData,
};
