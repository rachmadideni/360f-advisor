import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.get('loginPage', initialState);

const makeSelectCredential = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.get('credential').toJS(),
  );

const makeSelectLoading = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.get('loading'),
  );

const makeSelectError = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.get('error').toJS(),
  );

export {
  selectLoginPageDomain,
  makeSelectCredential,
  makeSelectLoading,
  makeSelectError,
};
