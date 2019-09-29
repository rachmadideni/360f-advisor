/*
 *
 * FinancialWizardSummary actions
 *
 */

import {
  ADD_GOAL_ACTION,
  DELETE_GOAL_ACTION,
  CHANGE_GOAL_ACTION,
  CHANGE_ALLOCATE_ACTION,
  CHANGE_YEAR_ACTION,
  CHANGE_AMOUNT_ACTION,
  CHANGE_GENDER_ACTION,
} from './constants';

export function addGoalAction() {
  return {
    type: ADD_GOAL_ACTION,
  };
}

export function deleteGoalAction(payload) {
  return {
    type: DELETE_GOAL_ACTION,
    payload,
  };
}

export function changeGoalAction(index, value) {
  return {
    type: CHANGE_GOAL_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeAllocateAction(index, value) {
  return {
    type: CHANGE_ALLOCATE_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeGenderAction(value) {
  return {
    type: CHANGE_GENDER_ACTION,
    payload: value,
  };
}

export function changeAmountAction(index, value) {
  return {
    type: CHANGE_AMOUNT_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeYearAction(index, value) {
  return {
    type: CHANGE_YEAR_ACTION,
    payload: {
      index,
      value,
    },
  };
}
