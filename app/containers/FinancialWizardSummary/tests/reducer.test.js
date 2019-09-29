import { fromJS } from 'immutable';
import financialWizardSummaryReducer from '../reducer';

describe('financialWizardSummaryReducer', () => {
  it('returns the initial state', () => {
    expect(financialWizardSummaryReducer(undefined, {})).toEqual(fromJS({}));
  });
});
