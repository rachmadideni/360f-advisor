import { fromJS } from 'immutable';
import financialWizardPersonalDetailsReducer from '../reducer';

describe('financialWizardPersonalDetailsReducer', () => {
  it('returns the initial state', () => {
    expect(financialWizardPersonalDetailsReducer(undefined, {})).toEqual(
      fromJS({}),
    );
  });
});
