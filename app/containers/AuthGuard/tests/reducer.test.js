import { fromJS } from 'immutable';
import authGuardReducer from '../reducer';

describe('authGuardReducer', () => {
  it('returns the initial state', () => {
    expect(authGuardReducer(undefined, {})).toEqual(fromJS({}));
  });
});
