import { fromJS } from 'immutable';
import financialWizardPortfolioReducer from '../reducer';

describe('financialWizardPortfolioReducer', () => {
  it('returns the initial state', () => {
    expect(financialWizardPortfolioReducer(undefined, {})).toEqual(fromJS({}));
  });
});
