/*
 *
 * FinancialWizardContainer reducer
 *
 */

import { fromJS, Map, List } from 'immutable';
import {
  CREATE_UPDATE_PARTY_ACTION,
  CREATE_UPDATE_PARTY_SUCCESS_ACTION,
  CREATE_UPDATE_PARTY_ERROR_ACTION,
  CHANGE_PERSONAL_DETAILS_ACTION,
  GET_PORTFOLIOS_ACTION,
  GET_PORTFOLIOS_SUCCESS_ACTION,
  GET_PORTFOLIOS_ERROR_ACTION,
  CHANGE_PORTFOLIOS_ACTION,
  GET_OPTIONS_SUCCESS_ACTION,
  GET_GENDERS_SUCCESS_ACTION,
  CHANGE_CASHFLOWS_ACTION,
  GET_CASHFLOWS_ACTION,
  GET_CASHFLOWS_SUCCESS_ACTION,
  GET_CASHFLOWS_ERROR_ACTION,
  GET_PARTY_DETAILS_ACTION,
  GET_PARTY_DETAILS_SUCCESS_ACTION,
  GET_PARTY_DETAILS_ERROR_ACTION,
  SET_COMPLETED_STEP_ACTION,
  RESET_DATA_ACTION,
} from './constants';

const emptyData = {
  // partyId: '',
  // accountId: '',
  partyId: 'e07b63f0-5794-11e9-9a6d-1b7e47a3abae',
  accountId: 'e07c0030-5794-11e9-9a6d-1b7e47a3abae',
  personalDetails: {
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
  portfolios: [],
  cashflows: [],
};

export const initialState = fromJS({
  isLoading: false,
  error: {
    message: null,
  },
  options: {
    currency: [],
    cashflowType: [],
    incomeType: [],
    livingExpenseType: [],
    loanType: [],
    taxType: [],
    gender: [],
    nationality: [],
    idType: [],
    maritalStatus: [],
    employmentStatus: [],
    industry: [],
    occupation: [],
    educationLevel: [],
    pepRelationship: [],
    dependantRelationship: [],
    countryPrefix: [
      {
        value: '+1',
        title: '+1 (USA)',
      },
      {
        value: '+65',
        title: '+65 (Singapore)',
      },
      {
        value: '+971',
        title: '+971 (Dubai)',
      },
    ],
    country: [],
    instrumentType: [],
    rateOfReturn: [],
    propertyType: [],
    ownershipType: [],
    portfolioType: [],
    benefitsType: [],
  },
  completedStep: {
    0: false,
    1: false,
    2: false,
    3: false,
  },
  data: {
    // partyId: '',
    // accountId: '',
    partyId: 'e07b63f0-5794-11e9-9a6d-1b7e47a3abae',
    accountId: 'e07c0030-5794-11e9-9a6d-1b7e47a3abae',
    

    personalDetails: {
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
    portfolios: [],
    cashflows: [],
  },
});

function financialWizardContainerReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_DATA_ACTION:
      return state.set('data', fromJS(emptyData));
    case SET_COMPLETED_STEP_ACTION:
      return state.setIn(
        ['completedStep', action.payload.step],
        action.payload.value,
      );
    case GET_OPTIONS_SUCCESS_ACTION:
      return state.setIn(
        ['options', action.payload.key],
        action.payload.options,
      );
    case GET_GENDERS_SUCCESS_ACTION:
      return state.setIn(['genders'], action.payload);
    case CREATE_UPDATE_PARTY_ACTION:
      return state.set('isLoading', true).setIn(['error', 'message'], null);
    case CREATE_UPDATE_PARTY_SUCCESS_ACTION:
      return state
        .set('isLoading', false)
        .setIn(['data', 'accountId'], action.payload.accountId)
        .setIn(['data', 'partyId'], action.payload.partyId)
        .setIn(['error', 'message'], null);
    case CREATE_UPDATE_PARTY_ERROR_ACTION:
      return state
        .set('isLoading', false)
        .setIn(['error', 'message'], action.payload);
    case GET_PARTY_DETAILS_ACTION:
      return state.set('isLoading', true).setIn(['error', 'message'], null);
    case GET_PARTY_DETAILS_SUCCESS_ACTION:
      return state
        .set('isLoading', false)
        .setIn(['data', 'personalDetails'], new Map(action.payload))
        .setIn(['error', 'message'], null);
    case GET_PARTY_DETAILS_ERROR_ACTION:
      return state
        .set('isLoading', false)
        .setIn(['error', 'message'], action.payload);
    case CHANGE_PERSONAL_DETAILS_ACTION:
      return state.setIn(['data', 'personalDetails'], new Map(action.payload));

    case CHANGE_PORTFOLIOS_ACTION:
      return state.setIn(['data', 'portfolios'], new List(action.payload));
    case GET_PORTFOLIOS_ACTION:
      return state.set('isLoading', true).setIn(['error', 'message'], null);
    case GET_PORTFOLIOS_SUCCESS_ACTION:
      return state
        .set('isLoading', false)
        .setIn(['data', 'portfolios'], new List(action.payload))
        .setIn(['error', 'message'], null);
    case GET_PORTFOLIOS_ERROR_ACTION:
      return state
        .set('isLoading', false)
        .setIn(['error', 'message'], action.payload);

    case CHANGE_CASHFLOWS_ACTION:
      return state.setIn(['data', 'cashflows'], new List(action.payload));
    case GET_CASHFLOWS_ACTION:
      return state.set('isLoading', true).setIn(['error', 'message'], null);
    case GET_CASHFLOWS_SUCCESS_ACTION:
      return state
        .set('isLoading', false)
        .setIn(['data', 'cashflows'], new List(action.payload))
        .setIn(['error', 'message'], null);
    case GET_CASHFLOWS_ERROR_ACTION:
      return state
        .set('isLoading', false)
        .setIn(['error', 'message'], action.payload);

    default:
      return state;
  }
}

export default financialWizardContainerReducer;
