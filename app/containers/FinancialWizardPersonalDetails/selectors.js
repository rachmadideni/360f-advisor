import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the financialWizardPersonalDetails state domain
 */

const selectFinancialWizardPersonalDetailsDomain = state =>
  state.get('financialWizardPersonalDetails', initialState);

/**
 * Other specific selectors
 */

const makeSelectPersonalDetailsData = () =>
  createSelector(
    selectFinancialWizardPersonalDetailsDomain,
    substate => substate.get('data').toJS(),
  );

const makeSelectDependants = () =>
  createSelector(
    selectFinancialWizardPersonalDetailsDomain,
    substate => substate.getIn(['data', 'dependants']).toJS(),
  );

const makeSelectDeletedDependantIds = () =>
  createSelector(
    selectFinancialWizardPersonalDetailsDomain,
    substate => substate.get('deletedDependantIds').toJS(),
  );

const makeSelectFileToUpload = () =>
  createSelector(
    selectFinancialWizardPersonalDetailsDomain,
    substate => substate.get('fileToUpload').toJS(),
  );

export {
  selectFinancialWizardPersonalDetailsDomain,
  makeSelectPersonalDetailsData,
  makeSelectDependants,
  makeSelectDeletedDependantIds,
  makeSelectFileToUpload,
};
