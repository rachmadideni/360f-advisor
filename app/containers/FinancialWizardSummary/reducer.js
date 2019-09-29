/*
 *
 * FinancialWizardSummary reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_GOAL_ACTION,
  DELETE_GOAL_ACTION,
  CHANGE_GOAL_ACTION,
  CHANGE_ALLOCATE_ACTION,
  CHANGE_YEAR_ACTION,
  CHANGE_AMOUNT_ACTION,
} from './constants';

export const initialState = fromJS({
  data: {
    goals: [],
  },
});

function financialWizardSummaryReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_GOAL_ACTION:
      return state.setIn(
        ['data', 'goals'],
        state.getIn(['data', 'goals']).push({
          goal: '',
          allocate: '',
          amount: '',
          year: '',
        }),
      );
    case DELETE_GOAL_ACTION:
      return state.deleteIn(['data', 'goals', action.payload]);
    case CHANGE_GOAL_ACTION:
      return state.setIn(
        ['data', 'goals', action.payload.index, 'goal'],
        action.payload.value,
      );
    case CHANGE_ALLOCATE_ACTION:
      return state.setIn(
        ['data', 'goals', action.payload.index, 'allocate'],
        action.payload.value,
      );
    case CHANGE_YEAR_ACTION:
      return state.setIn(
        ['data', 'goals', action.payload.index, 'year'],
        action.payload.value,
      );
    case CHANGE_AMOUNT_ACTION:
      return state.setIn(
        ['data', 'goals', action.payload.index, 'amount'],
        action.payload.value,
      );
    default:
      return state;
  }
}

export default financialWizardSummaryReducer;
