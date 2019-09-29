/*
 *
 * FinancialWizardPersonalDetails actions
 *
 */

import {
  CHANGE_INPUT_ACTION,
  ADD_DEPENDANT_ITEM_ACTION,
  DELETE_DEPENDANT_ITEM_ACTION,
  CHANGE_DEPENDANT_INPUT_ACTION,
  SET_DATA_STATE_ACTION,
  ADD_FILE_ACTION,
  ADD_COMPRESSED_FILE_ACTION,
} from './constants';

export function setDataStateAction(personalDetails) {
  return {
    type: SET_DATA_STATE_ACTION,
    payload: personalDetails,
  };
}

export function changeInputAction(key, value) {
  return {
    type: CHANGE_INPUT_ACTION,
    payload: {
      key,
      value,
    },
  };
}

export function addDependantItemAction() {
  return {
    type: ADD_DEPENDANT_ITEM_ACTION,
  };
}

export function deleteDependantItemAction(index) {
  return {
    type: DELETE_DEPENDANT_ITEM_ACTION,
    payload: index,
  };
}

export function changeDependantInputAction(index, key, value) {
  return {
    type: CHANGE_DEPENDANT_INPUT_ACTION,
    payload: {
      index,
      key,
      value,
    },
  };
}

export function addFileAction(key, file) {
  return {
    type: ADD_FILE_ACTION,
    payload: {
      key,
      file,
    },
  };
}

export function addCompressedFileAction(key, file) {
  return {
    type: ADD_COMPRESSED_FILE_ACTION,
    payload: {
      key,
      file,
    },
  };
}

export function removeFileAction(source, key, index) {
  return {
    type: ADD_COMPRESSED_FILE_ACTION,
    payload: {
      source,
      key,
      index,
    },
  };
}
