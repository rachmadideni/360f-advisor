import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboardOverviewPageDomain = state =>
  state.get('dashboardOverviewPage', initialState);

const makeSelectOutstandingTask = () =>
  createSelector(
    selectDashboardOverviewPageDomain,
    substate => substate.get('outstandingTask').toJS(),
  );

const makeSelectChartCPD = () =>
  createSelector(
    selectDashboardOverviewPageDomain,
    substate => substate.get('charts').toJS(),
  );

const makeSelectAppointMentList = () =>
  createSelector(
    selectDashboardOverviewPageDomain,
    substate => substate.get('appointmentList').toJS(),
  );

const makeSelectNews = () =>
  createSelector(
    selectDashboardOverviewPageDomain,
    substate => substate.get('news').toJS(),
  );

export {
  selectDashboardOverviewPageDomain,
  makeSelectOutstandingTask,
  makeSelectChartCPD,
  makeSelectAppointMentList,
  makeSelectNews,
};
