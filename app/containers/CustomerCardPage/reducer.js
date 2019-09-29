/*
 *
 * CustomerCardPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_PROFILE_DATA_ACTION,
  CHANGE_CONTACT_DATA_ACTION,
  CHANGE_WORK_HEALTH_DATA_ACTION,
  CHANGE_INVESTOR_TYPE_DATA_ACTION,
  ADD_DEPENDANT_ACTION,
} from './constants';

export const initialState = fromJS({
  listItem: {
    profile: {
      title: 'profile',
      url: 'profile',
    },
    contact: {
      title: 'contact',
      url: 'contact',
    },
    workHealth: {
      title: 'workHealth',
      url: 'work-health',
    },
    dependants: {
      title: 'dependants',
      url: 'dependants',
    },
    proficiency: {
      title: 'proficiency',
      url: 'proficiency',
    },
    cka: {
      title: 'cka',
      url: 'cka',
    },
    investorType: {
      title: 'investorType',
      url: 'investor-type',
    },
    politicallyExposed: {
      title: 'politicallyExposed',
      url: 'politically-exposed',
    },
  },
  data: {
    profile: {
      preferredName: '',
      dateOfBirth: '',
      gender: '',
      maritalStatus: '',
      fullLegalName: '',
      idNumber: '',
      nationality: '',
      residentialAddress: '',
      residenceStatus: '',
    },
    contact: {
      emailAddresses: [],
      mobilePhones: [],
      meetingAgenda: '',
      meetingDateTime: '',
      meetingLocation: '',
    },
    workHealth: {
      employmentStatus: '',
      isPensionable: false,
      companyName: '',
      industry: '',
      occupation: '',
      jobTitle: '',
      workEmailAddress: '',
      isSmoker: false,
    },
    investorType: {
      isNetAsset: false,
      isIncomeLess: false,
      isOverseasInvestor: false,
    },
    politicallyExposed: {
      isPoliticallyExposedPerson: false,
      name: '',
      relationship: '',
      currentPosition: '',
      currentOrganisation: '',
      country: '',
    },
    dependants: [],
    proficiency: {
      spokenLanguage: [],
      writtenLanguage: [],
      levelEducation: [],
    },
  },
});

function customerCardPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PROFILE_DATA_ACTION:
      return state.mergeIn(['data', 'profile'], action.payload);
    case CHANGE_CONTACT_DATA_ACTION:
      return state.mergeIn(['data', 'contact'], action.payload);
    case CHANGE_WORK_HEALTH_DATA_ACTION:
      return state.mergeIn(['data', 'workHealth'], action.payload);
    case CHANGE_INVESTOR_TYPE_DATA_ACTION:
      return state.mergeIn(['data', 'investorType'], action.payload);
    case ADD_DEPENDANT_ACTION:
      return state.updateIn(['data', 'dependants'], arr =>
        arr.concat(action.payload),
      );
    default:
      return state;
  }
}

export default customerCardPageReducer;
