/*
 * FinancialWizardCashflow Messages
 *
 * This contains all the text for the FinancialWizardCashflow container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FinancialWizardCashflow';

export default defineMessages({
  selectSection: {
    id: `${scope}.selectSection`,
    defaultMessage: 'Select Section',
  },
  incomeType: {
    id: `${scope}.incomeType`,
    defaultMessage: 'Income Type',
  },
  currency: {
    id: `${scope}.currency`,
    defaultMessage: 'Currency',
  },
  annualIncome: {
    id: `${scope}.annualIncome`,
    defaultMessage: 'Annual Income',
  },
  livingExpenseType: {
    id: `${scope}.livingExpenseType`,
    defaultMessage: 'Living Expense Type',
  },
  annualAmount: {
    id: `${scope}.annualAmount`,
    defaultMessage: 'Annual Amount',
  },
  loanType: {
    id: `${scope}.loanType`,
    defaultMessage: 'Loan Type',
  },
  monthlyAmount: {
    id: `${scope}.monthlyAmount`,
    defaultMessage: 'Monthly Amount',
  },
  tenureRemaining: {
    id: `${scope}.tenureRemaining`,
    defaultMessage: 'Tenure Remaining (months)',
  },
  taxType: {
    id: `${scope}.taxType`,
    defaultMessage: 'Tax Type',
  },
  addItem: {
    id: `${scope}.addItem`,
    defaultMessage: 'Add Item',
  },
  continue: {
    id: `${scope}.continue`,
    defaultMessage: 'Continue',
  },
  pleaseMakeSelection: {
    id: `${scope}.pleaseMakeSelection`,
    defaultMessage: 'Please make a selection',
  },
  pleaseEnterValue: {
    id: `${scope}.pleaseEnterValue`,
    defaultMessage: 'Please enter a value',
  },
  pleaseEnterIncomeSection: {
    id: `${scope}.pleaseEnterIncomeSection`,
    defaultMessage: 'Please enter "INCOME" section',
  },
  pleaseEnterLivingExpenseSection: {
    id: `${scope}.pleaseEnterLivingExpenseSection`,
    defaultMessage: 'Please enter "LIVING EXPENSES" section',
  },
});
