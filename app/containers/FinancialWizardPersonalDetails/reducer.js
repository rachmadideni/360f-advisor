/*
 *
 * FinancialWizardPersonalDetails reducer
 *
 */

import { fromJS, List, Map } from 'immutable';
import {
  CHANGE_INPUT_ACTION,
  ADD_DEPENDANT_ITEM_ACTION,
  DELETE_DEPENDANT_ITEM_ACTION,
  CHANGE_DEPENDANT_INPUT_ACTION,
  SET_DATA_STATE_ACTION,
  ADD_COMPRESSED_FILE_ACTION,
  REMOVE_FILE_ACTION,
} from './constants';

export const initialState = fromJS({
  deletedDependantIds: [],
  fileToUpload: {
    idFiles: [],
    companyFiles: [],
  },
  data: {
    fullName: '',
    preferredName: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    maritalStatus: '',
    nationality: '',
    idType: '',
    idNumber: '',
    idFiles: [],
    employmentStatus: '',
    jobTitle: '',
    industry: '',
    occupation: '',
    companyName: '',
    companyAddress: '',
    companyCountryDialingCode: '',
    companyPhoneNumber: '',
    companyEmail: '',
    companyFiles: [],
    permanentPostOfficeBox: '',
    residentialAddress: '',
    isPrimaryAddress: true,
    residentialPostOfficeBox: '',
    permanentAddress: '',
    countryDialingCode: '',
    phoneNumber: '',
    highestEducation: '',
    isSmoke: false,
    isPep: false,
    pepName: '',
    pepRelationship: '',
    pepPosition: '',
    pepOrganization: '',
    pepCountry: '',
    dependants: [],
  },
});

function financialWizardPersonalDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA_STATE_ACTION:
      return state
        .set('data', new Map(action.payload))
        .setIn(['data', 'dependants'], new List(action.payload.dependants))
        .set('deletedDependantIds', new List())
        .setIn(['fileToUpload', 'idFiles'], new List())
        .setIn(['fileToUpload', 'companyFiles'], new List());
    case CHANGE_INPUT_ACTION:
      return state.setIn(['data', action.payload.key], action.payload.value);
    case ADD_DEPENDANT_ITEM_ACTION:
      return state.setIn(
        ['data', 'dependants'],
        state.getIn(['data', 'dependants']).push({
          name: '',
          email: '',
          relationship: '',
          isEmergencyContact: false,
          countryDialingCode: '',
          phoneNumber: '',
        }),
      );
    case DELETE_DEPENDANT_ITEM_ACTION: {
      const item = state.getIn(['data', 'dependants', action.payload]);
      const deletedDependantIds = state.get('deletedDependantIds').toJS();
      if (!!item.id && deletedDependantIds.indexOf(item.id) < 0) {
        deletedDependantIds.push(item.id);
      }
      return state
        .set('deletedDependantIds', new List(deletedDependantIds))
        .deleteIn(['data', 'dependants', action.payload]);
    }
    case CHANGE_DEPENDANT_INPUT_ACTION:
      return state.setIn(
        ['data', 'dependants', action.payload.index, action.payload.key],
        action.payload.value,
      );
    case ADD_COMPRESSED_FILE_ACTION: {
      const files = state.getIn(['fileToUpload', action.payload.key]).toJS();
      files.push(action.payload.file);
      return state.setIn(['fileToUpload', action.payload.key], new List(files));
    }
    case REMOVE_FILE_ACTION: {
      const { source, key, index } = action.payload;
      return state.deleteIn([source, key, index]);
    }
    default:
      return state;
  }
}

export default financialWizardPersonalDetailsReducer;
