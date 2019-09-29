import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the financialWizardContainer state domain
 */

const selectFinancialWizardContainerDomain = state =>
  state.get('financialWizardContainer', initialState);

/**
 * Other specific selectors
 */

const makeSelectPersonalDetails = () =>
  createSelector(
    selectFinancialWizardContainerDomain,
    substate => substate.getIn(['data', 'personalDetails']).toJS(),
  );

const makeSelectPortfolios = () =>
  createSelector(
    selectFinancialWizardContainerDomain,
    substate => substate.getIn(['data', 'portfolios']).toJS(),
  );

const makeSelectCahsflows = () =>
  createSelector(
    selectFinancialWizardContainerDomain,
    substate => substate.getIn(['data', 'cashflows']).toJS(),
  );

const makeSelectPartyId = () =>
  createSelector(
    selectFinancialWizardContainerDomain,
    substate => substate.getIn(['data', 'partyId']),
  );

const makeSelectAccountId = () =>
  createSelector(
    selectFinancialWizardContainerDomain,
    substate => substate.getIn(['data', 'accountId']),
  );

const makeSelectOptions = () =>
  createSelector(
    selectFinancialWizardContainerDomain,
    substate => substate.get('options').toJS(),
  );

const makeSelectCompletedStep = () =>
  createSelector(
    selectFinancialWizardContainerDomain,
    substate => substate.get('completedStep').toJS(),
  );

export {
  selectFinancialWizardContainerDomain,
  makeSelectPersonalDetails,
  makeSelectPortfolios,
  makeSelectCahsflows,
  makeSelectPartyId,
  makeSelectAccountId,
  makeSelectOptions,
  makeSelectCompletedStep,
};
