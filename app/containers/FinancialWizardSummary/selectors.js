import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the financialWizardSummary state domain
 */

const selectFinancialWizardSummaryDomain = state =>
  state.get('financialWizardSummary', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by FinancialWizardSummary
 */

const makeSelectGoal = () =>
  createSelector(
    selectFinancialWizardSummaryDomain,
    substate => substate.getIn(['data', 'goals']).toJS(),
  );

export { selectFinancialWizardSummaryDomain, makeSelectGoal };
