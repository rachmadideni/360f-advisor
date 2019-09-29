/*
 *
 * FinancialWizardContainer actions
 *
 */

import {
  CREATE_UPDATE_PARTY_ACTION,
  CREATE_UPDATE_PARTY_SUCCESS_ACTION,
  CREATE_UPDATE_PARTY_ERROR_ACTION,
  CHANGE_PERSONAL_DETAILS_ACTION,
  CREATE_UPDATE_PORTFOLIOS_ACTION,
  CREATE_UPDATE_PORTFOLIOS_SUCCESS_ACTION,
  CREATE_UPDATE_PORTFOLIOS_ERROR_ACTION,
  GET_PORTFOLIOS_ACTION,
  GET_PORTFOLIOS_SUCCESS_ACTION,
  GET_PORTFOLIOS_ERROR_ACTION,
  CHANGE_PORTFOLIOS_ACTION,
  GET_OPTIONS_ACTION,
  GET_GENDERS_SUCCESS_ACTION,
  GET_OPTIONS_SUCCESS_ACTION,
  GET_OPTIONS_ERROR_ACTION,
  CREATE_UPDATE_CASHFLOWS_ACTION,
  CREATE_UPDATE_CASHFLOWS_SUCCESS_ACTION,
  CREATE_UPDATE_CASHFLOWS_ERROR_ACTION,
  GET_CASHFLOWS_ACTION,
  GET_CASHFLOWS_SUCCESS_ACTION,
  GET_CASHFLOWS_ERROR_ACTION,
  CHANGE_CASHFLOWS_ACTION,
  DELETE_CASHFLOWS_ACTION,
  DELETE_CASHFLOWS_SUCCESS_ACTION,
  DELETE_CASHFLOWS_ERROR_ACTION,
  GET_PARTY_DETAILS_ACTION,
  GET_PARTY_DETAILS_SUCCESS_ACTION,
  GET_PARTY_DETAILS_ERROR_ACTION,
  SET_COMPLETED_STEP_ACTION,
  DELETE_DEPENDANTS_ACTION,
  DELETE_DEPENDANTS_SUCCESS_ACTION,
  DELETE_DEPENDANTS_ERROR_ACTION,
  RESET_DATA_ACTION,
} from './constants';

export function resetDataAction() {
  return {
    type: RESET_DATA_ACTION,
  };
}

export function setCompletedStepAction(step, value) {
  return {
    type: SET_COMPLETED_STEP_ACTION,
    payload: {
      step,
      value,
    },
  };
}

export function getOptionsAction(key) {
  return {
    type: GET_OPTIONS_ACTION,
    payload: key,
  };
}

export function getGendersSuccessAction(genders) {
  return {
    type: GET_GENDERS_SUCCESS_ACTION,
    payload: genders,
  };
}

export function getOptionsSuccessAction(key, options) {
  return {
    type: GET_OPTIONS_SUCCESS_ACTION,
    payload: {
      key,
      options,
    },
  };
}

export function getOptionsErrorAction(error) {
  return {
    type: GET_OPTIONS_ERROR_ACTION,
    payload: error,
  };
}

export function getPartyDetailsAction(partyId) {
  return {
    type: GET_PARTY_DETAILS_ACTION,
    payload: partyId,
  };
}

export function getPartyDetailsSuccessAction(personalDetails) {
  return {
    type: GET_PARTY_DETAILS_SUCCESS_ACTION,
    payload: personalDetails,
  };
}

export function getPartyDetailsErrorAction(error) {
  return {
    type: GET_PARTY_DETAILS_ERROR_ACTION,
    payload: error,
  };
}

export function createUpdatePartyAction(deletedDependantIds, fileToUpload) {
  return {
    type: CREATE_UPDATE_PARTY_ACTION,
    payload: {
      deletedDependantIds,
      fileToUpload,
    },
  };
}

export function createUpdatePartySuccessAction(partyId, accountId) {
  return {
    type: CREATE_UPDATE_PARTY_SUCCESS_ACTION,
    payload: {
      partyId,
      accountId,
    },
  };
}

export function createUpdatePartyErrorAction(error) {
  return {
    type: CREATE_UPDATE_PARTY_ERROR_ACTION,
    payload: error,
  };
}

export function changePersonalDetailsAction(personalDetails) {
  return {
    type: CHANGE_PERSONAL_DETAILS_ACTION,
    payload: personalDetails,
  };
}

export function deleteDependantsAction(deletedIds) {
  return {
    type: DELETE_DEPENDANTS_ACTION,
    payload: deletedIds,
  };
}

export function deleteDependantsSuccessAction() {
  return {
    type: DELETE_DEPENDANTS_SUCCESS_ACTION,
  };
}

export function deleteDependantsErrorAction(error) {
  return {
    type: DELETE_DEPENDANTS_ERROR_ACTION,
    payload: error,
  };
}

export function createUpdatePortfoliosAction(deletedIds) {
  return {
    type: CREATE_UPDATE_PORTFOLIOS_ACTION,
    payload: {
      deletedIds,
    },
  };
}

export function createUpdatePortfoliosSuccessAction() {
  return {
    type: CREATE_UPDATE_PORTFOLIOS_SUCCESS_ACTION,
  };
}

export function createUpdatePortfoliosErrorAction(error) {
  return {
    type: CREATE_UPDATE_PORTFOLIOS_ERROR_ACTION,
    payload: error,
  };
}

export function getPortfoliosAction() {
  return {
    type: GET_PORTFOLIOS_ACTION,
  };
}

export function getPortfoliosSuccessAction(portfolios) {
  return {
    type: GET_PORTFOLIOS_SUCCESS_ACTION,
    payload: portfolios,
  };
}

export function getPortfoliosErrorAction(error) {
  return {
    type: GET_PORTFOLIOS_ERROR_ACTION,
    payload: error,
  };
}

export function changePortfoliosAction(portfolios) {
  return {
    type: CHANGE_PORTFOLIOS_ACTION,
    payload: portfolios,
  };
}

export function createUpdateCashflowsAction(deletedIds) {
  return {
    type: CREATE_UPDATE_CASHFLOWS_ACTION,
    payload: {
      deletedIds,
    },
  };
}

export function createUpdateCashflowsSuccessAction() {
  return {
    type: CREATE_UPDATE_CASHFLOWS_SUCCESS_ACTION,
  };
}

export function createUpdateCashflowsErrorAction(error) {
  return {
    type: CREATE_UPDATE_CASHFLOWS_ERROR_ACTION,
    payload: error,
  };
}

export function getCashflowsAction() {
  return {
    type: GET_CASHFLOWS_ACTION,
  };
}

export function getCashflowsSuccessAction(cashflows) {
  return {
    type: GET_CASHFLOWS_SUCCESS_ACTION,
    payload: cashflows,
  };
}

export function getCashflowsErrorAction(error) {
  return {
    type: GET_CASHFLOWS_ERROR_ACTION,
    payload: error,
  };
}

export function changeCashflowsAction(cashflows) {
  return {
    type: CHANGE_CASHFLOWS_ACTION,
    payload: cashflows,
  };
}

export function deleteCashflowsAction(deletedIds) {
  return {
    type: DELETE_CASHFLOWS_ACTION,
    payload: deletedIds,
  };
}

export function deleteCashflowsSuccessAction() {
  return {
    type: DELETE_CASHFLOWS_SUCCESS_ACTION,
  };
}

export function deleteCashflowsErrorAction(error) {
  return {
    type: DELETE_CASHFLOWS_ERROR_ACTION,
    payload: error,
  };
}
