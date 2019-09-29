import { fromJS } from 'immutable';
import customerViewContainerReducer from '../reducer';

describe('customerViewContainerReducer', () => {
  it('returns the initial state', () => {
    expect(customerViewContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
