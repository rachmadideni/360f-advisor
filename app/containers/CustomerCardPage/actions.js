/*
 *
 * CustomerCardPage actions
 *
 */

import {
  CHANGE_PROFILE_DATA_ACTION,
  CHANGE_CONTACT_DATA_ACTION,
  CHANGE_WORK_HEALTH_DATA_ACTION,
  CHANGE_INVESTOR_TYPE_DATA_ACTION,
  ADD_DEPENDANT_ACTION,
} from './constants';

export function changeProfileDataAction(payload) {
  return {
    type: CHANGE_PROFILE_DATA_ACTION,
    payload,
  };
}

export function changeContactDataAction(payload) {
  return {
    type: CHANGE_CONTACT_DATA_ACTION,
    payload,
  };
}

export function changeWorkHealthDataAction(payload) {
  return {
    type: CHANGE_WORK_HEALTH_DATA_ACTION,
    payload,
  };
}

export function changeInvestorTypeDataAction(payload) {
  return {
    type: CHANGE_INVESTOR_TYPE_DATA_ACTION,
    payload,
  };
}

export function addDependantAction(payload) {
  return {
    type: ADD_DEPENDANT_ACTION,
    payload,
  };
}
