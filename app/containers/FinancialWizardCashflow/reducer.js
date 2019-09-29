/*
 *
 * FinancialWizardCashflow reducer
 *
 */

import { fromJS, List } from 'immutable';
import { forEach } from 'lodash/collection';
import {
  ADD_INCOME_ACTION,
  ADD_LIVING_EXPENSE_ACTION,
  ADD_LOAN_ACTION,
  ADD_TAX_ACTION,
  CLEAR_INCOME_ACTION,
  CLEAR_LIVING_EXPENSES_ACTION,
  CLEAR_LOANS_ACTION,
  CLEAR_TAXES_ACTION,
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
import { mapCashflowsToSections } from './helpers';

export const initialState = fromJS({
  deletedIds: [],
  data: {
    income: [],
    livingExpenses: [],
    loans: [],
    taxes: [],
  },
});

function financialWizardCashflowReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA_STATE_ACTION: {
      const groupedCashflow = mapCashflowsToSections(action.payload);
      return state
        .setIn(['data', 'income'], new List(groupedCashflow.income))
        .setIn(
          ['data', 'livingExpenses'],
          new List(groupedCashflow.livingExpenses),
        )
        .setIn(['data', 'loans'], new List(groupedCashflow.loans))
        .setIn(['data', 'taxes'], new List(groupedCashflow.taxes));
    }
    case ADD_INCOME_ACTION:
      return state.setIn(
        ['data', 'income'],
        state.getIn(['data', 'income']).push({
          type: '',
          currency: 'USD',
          annualAmount: '',
          cashFlowType: '1',
        }),
      );
    case ADD_LIVING_EXPENSE_ACTION:
      return state.setIn(
        ['data', 'livingExpenses'],
        state.getIn(['data', 'livingExpenses']).push({
          type: '',
          currency: 'USD',
          annualAmount: '',
          cashFlowType: '2',
        }),
      );
    case ADD_LOAN_ACTION:
      return state.setIn(
        ['data', 'loans'],
        state.getIn(['data', 'loans']).push({
          type: '',
          currency: 'USD',
          monthlyAmount: '',
          tenureRemainingInMonths: '',
          cashFlowType: '3',
        }),
      );
    case ADD_TAX_ACTION:
      return state.setIn(
        ['data', 'taxes'],
        state.getIn(['data', 'taxes']).push({
          type: '',
          currency: 'USD',
          annualAmount: '',
          cashFlowType: '4',
        }),
      );
    case CLEAR_INCOME_ACTION: {
      const income = state.getIn(['data', 'income']).toJS();
      const deletedIds = state.get('deletedIds').toJS();
      forEach(income, item => {
        if (!!item.id && deletedIds.indexOf(item.id) < 0) {
          deletedIds.push(item.id);
        }
      });
      return state
        .set('deletedIds', new List(deletedIds))
        .setIn(['data', 'income'], new List());
    }
    case CLEAR_LIVING_EXPENSES_ACTION: {
      const livingExpenses = state.getIn(['data', 'livingExpenses']).toJS();
      const deletedIds = state.get('deletedIds').toJS();
      forEach(livingExpenses, item => {
        if (!!item.id && deletedIds.indexOf(item.id) < 0) {
          deletedIds.push(item.id);
        }
      });
      return state
        .set('deletedIds', new List(deletedIds))
        .setIn(['data', 'livingExpenses'], new List());
    }
    case CLEAR_LOANS_ACTION: {
      const loans = state.getIn(['data', 'loans']).toJS();
      const deletedIds = state.get('deletedIds').toJS();
      forEach(loans, item => {
        if (!!item.id && deletedIds.indexOf(item.id) < 0) {
          deletedIds.push(item.id);
        }
      });
      return state
        .set('deletedIds', new List(deletedIds))
        .setIn(['data', 'loans'], new List());
    }
    case CLEAR_TAXES_ACTION: {
      const taxes = state.getIn(['data', 'taxes']).toJS();
      const deletedIds = state.get('deletedIds').toJS();
      forEach(taxes, item => {
        if (!!item.id && deletedIds.indexOf(item.id) < 0) {
          deletedIds.push(item.id);
        }
      });
      return state
        .set('deletedIds', new List(deletedIds))
        .setIn(['data', 'taxes'], new List());
    }
    case CHANGE_INCOME_TYPE_ACTION:
      return state.setIn(
        ['data', 'income', action.payload.index, 'type'],
        action.payload.value,
      );
    case CHANGE_INCOME_CURRENCY_ACTION:
      return state.setIn(
        ['data', 'income', action.payload.index, 'currency'],
        action.payload.value,
      );
    case CHANGE_ANNUAL_INCOME_ACTION:
      return state.setIn(
        ['data', 'income', action.payload.index, 'annualAmount'],
        action.payload.value,
      );
    case DELETE_INCOME_ITEM_ACTION: {
      const item = state.getIn(['data', 'income', action.payload]);
      const deletedIds = state.get('deletedIds').toJS();
      if (!!item.id && deletedIds.indexOf(item.id) < 0) {
        deletedIds.push(item.id);
      }
      return state
        .set('deletedIds', new List(deletedIds))
        .deleteIn(['data', 'income', action.payload]);
    }
    case CHANGE_LIVING_EXPENSE_TYPE_ACTION:
      return state.setIn(
        ['data', 'livingExpenses', action.payload.index, 'type'],
        action.payload.value,
      );
    case CHANGE_LIVING_EXPENSE_CURRENCY_ACTION:
      return state.setIn(
        ['data', 'livingExpenses', action.payload.index, 'currency'],
        action.payload.value,
      );
    case CHANGE_LIVING_EXPENSE_ANNUAL_AMOUNT_ACTION:
      return state.setIn(
        ['data', 'livingExpenses', action.payload.index, 'annualAmount'],
        action.payload.value,
      );
    case DELETE_LIVING_EXPENSE_ITEM_ACTION: {
      const item = state.getIn(['data', 'livingExpenses', action.payload]);
      const deletedIds = state.get('deletedIds').toJS();
      if (!!item.id && deletedIds.indexOf(item.id) < 0) {
        deletedIds.push(item.id);
      }
      return state
        .set('deletedIds', new List(deletedIds))
        .deleteIn(['data', 'livingExpenses', action.payload]);
    }
    case CHANGE_LOAN_TYPE_ACTION:
      return state.setIn(
        ['data', 'loans', action.payload.index, 'type'],
        action.payload.value,
      );
    case CHANGE_LOAN_CURRENCY_ACTION:
      return state.setIn(
        ['data', 'loans', action.payload.index, 'currency'],
        action.payload.value,
      );
    case CHANGE_LOAN_MONTHLY_AMOUNT_ACTION:
      return state.setIn(
        ['data', 'loans', action.payload.index, 'monthlyAmount'],
        action.payload.value,
      );
    case CHANGE_LOAN_TENURE_MONTHS_ACTION:
      return state.setIn(
        ['data', 'loans', action.payload.index, 'tenureRemainingInMonths'],
        action.payload.value,
      );
    case DELETE_LOAN_ITEM_ACTION: {
      const item = state.getIn(['data', 'loans', action.payload]);
      const deletedIds = state.get('deletedIds').toJS();
      if (!!item.id && deletedIds.indexOf(item.id) < 0) {
        deletedIds.push(item.id);
      }
      return state
        .set('deletedIds', new List(deletedIds))
        .deleteIn(['data', 'loans', action.payload]);
    }

    case CHANGE_TAX_TYPE_ACTION:
      return state.setIn(
        ['data', 'taxes', action.payload.index, 'type'],
        action.payload.value,
      );
    case CHANGE_TAX_CURRENCY_ACTION:
      return state.setIn(
        ['data', 'taxes', action.payload.index, 'currency'],
        action.payload.value,
      );
    case CHANGE_TAX_ANNUAL_AMOUNT_ACTION:
      return state.setIn(
        ['data', 'taxes', action.payload.index, 'annualAmount'],
        action.payload.value,
      );
    case DELETE_TAX_ITEM_ACTION: {
      const item = state.getIn(['data', 'taxes', action.payload]);
      const deletedIds = state.get('deletedIds').toJS();
      if (!!item.id && deletedIds.indexOf(item.id) < 0) {
        deletedIds.push(item.id);
      }
      return state
        .set('deletedIds', new List(deletedIds))
        .deleteIn(['data', 'taxes', action.payload]);
    }
    default:
      return state;
  }
}

export default financialWizardCashflowReducer;
