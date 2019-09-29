import { fromJS } from 'immutable';
import dashboardOverviewPageReducer from '../reducer';

describe('dashboardOverviewPageReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardOverviewPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
