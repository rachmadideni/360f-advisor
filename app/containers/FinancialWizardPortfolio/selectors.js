import { createSelector } from 'reselect';
import { initialState } from './reducer';

// FinancialWizardPortfolio Domain
const selectFinancialWizardPortfolioDomain = state =>
  state.get('financialWizardPortfolio', initialState);

const makeSelectLifeHealthInsurance = () =>
  createSelector(
    selectFinancialWizardPortfolioDomain,
    substate => substate.getIn(['data', 'insurance']).toJS(),
  );

const makeSelectSavingsInvestments = () =>
  createSelector(
    selectFinancialWizardPortfolioDomain,
    substate => substate.getIn(['data', 'savingInvestments']).toJS(),
  );

const makeSelectPropertyHeldAssets = () =>
  createSelector(
    selectFinancialWizardPortfolioDomain,
    substate => substate.getIn(['data', 'propertyHeld']).toJS(),
  );

const makeSelectOtherHeldAssets = () =>
  createSelector(
    selectFinancialWizardPortfolioDomain,
    substate => substate.getIn(['data', 'otherHeldAssets']).toJS(),
  );

const makeSelectPortfoliosData = () =>
  createSelector(
    selectFinancialWizardPortfolioDomain,
    substate => substate.get('data').toJS(),
  );

const makeSelectDeletedIds = () =>
  createSelector(
    selectFinancialWizardPortfolioDomain,
    substate => substate.get('deletedIds').toJS(),
  );

export {
  selectFinancialWizardPortfolioDomain,
  makeSelectLifeHealthInsurance,
  makeSelectSavingsInvestments,
  makeSelectPropertyHeldAssets,
  makeSelectOtherHeldAssets,
  makeSelectPortfoliosData,
  makeSelectDeletedIds,
};
