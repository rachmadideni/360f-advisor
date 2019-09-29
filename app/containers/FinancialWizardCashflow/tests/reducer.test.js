import { fromJS } from 'immutable';
import financialWizardCashflowReducer from '../reducer';

describe('financialWizardCashflowReducer', () => {
  it('returns the initial state', () => {
    expect(financialWizardCashflowReducer(undefined, {})).toEqual(fromJS({}));
  });
});
