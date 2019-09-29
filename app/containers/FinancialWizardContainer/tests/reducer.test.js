import { fromJS } from 'immutable';
import financialWizardContainerReducer from '../reducer';

describe('financialWizardContainerReducer', () => {
  it('returns the initial state', () => {
    expect(financialWizardContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
