import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the customerBookPage state domain
 */

const selectCustomerBookPageDomain = state =>
  state.get('customerBookPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CustomerBookPage
 */

const makeSelectCustomerBookPage = () =>
  createSelector(
    selectCustomerBookPageDomain,
    substate => substate.toJS(),
  );

export default makeSelectCustomerBookPage;
export { selectCustomerBookPageDomain };
