import {
  ADD_INCOME_ACTION,
  ADD_LIVING_EXPENSE_ACTION,
  ADD_LOAN_ACTION,
  ADD_TAX_ACTION,
  CLEAR_LOANS_ACTION,
  CLEAR_TAXES_ACTION,
  CLEAR_INCOME_ACTION,
  CLEAR_LIVING_EXPENSES_ACTION,
  CHANGE_INCOME_TYPE_ACTION,
  CHANGE_INCOME_CURRENCY_ACTION,
  CHANGE_ANNUAL_INCOME_ACTION,
  DELETE_INCOME_ITEM_ACTION,
  CHANGE_LIVING_EXPENSE_TYPE_ACTION,
  CHANGE_LIVING_EXPENSE_CURRENCY_ACTION,
  CHANGE_LIVING_EXPENSE_ANNUAL_AMOUNT_ACTION,
  DELETE_LIVING_EXPENSE_ITEM_ACTION,
  CHANGE_LOAN_TYPE_ACTION,
  CHANGE_LOAN_CURRENCY_ACTION,
  CHANGE_LOAN_MONTHLY_AMOUNT_ACTION,
  CHANGE_LOAN_TENURE_MONTHS_ACTION,
  DELETE_LOAN_ITEM_ACTION,
  CHANGE_TAX_TYPE_ACTION,
  CHANGE_TAX_CURRENCY_ACTION,
  CHANGE_TAX_ANNUAL_AMOUNT_ACTION,
  DELETE_TAX_ITEM_ACTION,
  SET_DATA_STATE_ACTION,
} from './constants';

export function setDataStateAction(cashflows) {
  return {
    type: SET_DATA_STATE_ACTION,
    payload: cashflows,
  };
}

export function addIncomeAction() {
  return {
    type: ADD_INCOME_ACTION,
  };
}

export function addLivingExpenseAction() {
  return {
    type: ADD_LIVING_EXPENSE_ACTION,
  };
}

export function addLoanAction() {
  return {
    type: ADD_LOAN_ACTION,
  };
}

export function addTaxAction() {
  return {
    type: ADD_TAX_ACTION,
  };
}

export function clearIncomeAction() {
  return {
    type: CLEAR_INCOME_ACTION,
  };
}

export function clearLivingExpensesAction() {
  return {
    type: CLEAR_LIVING_EXPENSES_ACTION,
  };
}

export function clearLoansAction() {
  return {
    type: CLEAR_LOANS_ACTION,
  };
}

export function clearTaxesAction() {
  return {
    type: CLEAR_TAXES_ACTION,
  };
}

export function changeIncomeTypeAction(index, value) {
  return {
    type: CHANGE_INCOME_TYPE_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeIncomeCurrencyAction(index, value) {
  return {
    type: CHANGE_INCOME_CURRENCY_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeAnnualIncomeAction(index, value) {
  return {
    type: CHANGE_ANNUAL_INCOME_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function deleteIncomeItemAction(index) {
  return {
    type: DELETE_INCOME_ITEM_ACTION,
    payload: index,
  };
}

export function changeLivingExpenseTypeAction(index, value) {
  return {
    type: CHANGE_LIVING_EXPENSE_TYPE_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeLivingExpenseCurrencyAction(index, value) {
  return {
    type: CHANGE_LIVING_EXPENSE_CURRENCY_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeLivingExpenseAnnualAmountAction(index, value) {
  return {
    type: CHANGE_LIVING_EXPENSE_ANNUAL_AMOUNT_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function deleteLivingExpenseItemAction(index) {
  return {
    type: DELETE_LIVING_EXPENSE_ITEM_ACTION,
    payload: index,
  };
}

export function changeLoanTypeAction(index, value) {
  return {
    type: CHANGE_LOAN_TYPE_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeLoanCurrencyAction(index, value) {
  return {
    type: CHANGE_LOAN_CURRENCY_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeLoanMonthlyAmountAction(index, value) {
  return {
    type: CHANGE_LOAN_MONTHLY_AMOUNT_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeLoanTenureMonthsAction(index, value) {
  return {
    type: CHANGE_LOAN_TENURE_MONTHS_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function deleteLoanItemAction(index) {
  return {
    type: DELETE_LOAN_ITEM_ACTION,
    payload: index,
  };
}

export function changeTaxTypeAction(index, value) {
  return {
    type: CHANGE_TAX_TYPE_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeTaxCurrencyAction(index, value) {
  return {
    type: CHANGE_TAX_CURRENCY_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeTaxAnnualAmountAction(index, value) {
  return {
    type: CHANGE_TAX_ANNUAL_AMOUNT_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function deleteTaxItemAction(index) {
  return {
    type: DELETE_TAX_ITEM_ACTION,
    payload: index,
  };
}
