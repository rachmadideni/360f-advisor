import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboardContainer state domain
 */

const selectDashboardContainerDomain = state =>
  state.get('dashboardContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by DashboardContainer
 */

const makeSelectDashboardContainer = () =>
  createSelector(
    selectDashboardContainerDomain,
    substate => substate.toJS(),
  );

export default makeSelectDashboardContainer;
export { selectDashboardContainerDomain };
