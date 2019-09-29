import { fromJS } from 'immutable';
import customerCardPageReducer from '../reducer';

describe('customerCardPageReducer', () => {
  it('returns the initial state', () => {
    expect(customerCardPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
