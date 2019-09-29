import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the financialWizardCashflow state domain
 */

const selectFinancialWizardCashflowDomain = state =>
  state.get('financialWizardCashflow', initialState);

/**
 * Other specific selectors
 */

const makeSelectIncome = () =>
  createSelector(
    selectFinancialWizardCashflowDomain,
    substate => substate.getIn(['data', 'income']).toJS(),
  );

const makeSelectLivingExpenses = () =>
  createSelector(
    selectFinancialWizardCashflowDomain,
    substate => substate.getIn(['data', 'livingExpenses']).toJS(),
  );

const makeSelectLoans = () =>
  createSelector(
    selectFinancialWizardCashflowDomain,
    substate => substate.getIn(['data', 'loans']).toJS(),
  );

const makeSelectTaxes = () =>
  createSelector(
    selectFinancialWizardCashflowDomain,
    substate => substate.getIn(['data', 'taxes']).toJS(),
  );

const makeSelectDeletedIds = () =>
  createSelector(
    selectFinancialWizardCashflowDomain,
    substate => substate.get('deletedIds').toJS(),
  );

export {
  selectFinancialWizardCashflowDomain,
  makeSelectIncome,
  makeSelectLivingExpenses,
  makeSelectLoans,
  makeSelectTaxes,
  makeSelectDeletedIds,
};
