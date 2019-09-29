import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the customerViewContainer state domain
 */

const selectCustomerViewContainerDomain = state =>
  state.get('customerViewContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CustomerViewContainer
 */

const makeSelectCustomerViewContainer = () =>
  createSelector(
    selectCustomerViewContainerDomain,
    substate => substate.toJS(),
  );

export default makeSelectCustomerViewContainer;
export { selectCustomerViewContainerDomain };
