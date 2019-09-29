import { fromJS } from 'immutable';
import customerBookPageReducer from '../reducer';

describe('customerBookPageReducer', () => {
  it('returns the initial state', () => {
    expect(customerBookPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
