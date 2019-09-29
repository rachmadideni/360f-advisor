import {
  call,
  put,
  select,
  takeLatest,
  all,
  takeEvery,
} from 'redux-saga/effects';
import { omitBy } from 'lodash/object';
import { isUndefined, isNull } from 'lodash/lang';

import { uploadFiles } from 'containers/App/saga';
import { api, tenant } from 'environments';
import request from 'utils/request';
import { makeSelectAuth } from 'containers/App/selectors';
import {
  CREATE_UPDATE_PARTY_ACTION,
  CREATE_UPDATE_PORTFOLIOS_ACTION,
  GET_OPTIONS_ACTION,
  CREATE_UPDATE_CASHFLOWS_ACTION,
  GET_PORTFOLIOS_ACTION,
  GET_CASHFLOWS_ACTION,
  DELETE_CASHFLOWS_ACTION,
  GET_PARTY_DETAILS_ACTION,
  DELETE_DEPENDANTS_ACTION,
} from './constants';
import {
  makeSelectPersonalDetails,
  makeSelectPartyId,
  makeSelectAccountId,
  makeSelectPortfolios,
  makeSelectCahsflows,
} from './selectors';
import {
  createUpdatePartySuccessAction,
  createUpdatePartyErrorAction,
  createUpdatePortfoliosSuccessAction,
  getPortfoliosAction,
  getPortfoliosSuccessAction,
  createUpdatePortfoliosErrorAction,
  getPortfoliosErrorAction,
  getOptionsSuccessAction,
  createUpdateCashflowsSuccessAction,
  getCashflowsAction,
  createUpdateCashflowsErrorAction,
  getCashflowsSuccessAction,
  getCashflowsErrorAction,
  deleteCashflowsAction,
  getPartyDetailsSuccessAction,
  getPartyDetailsAction,
  setCompletedStepAction,
  deleteDependantsAction,
} from './actions';
import { getOptionApiKey, mapOptionsResponseToDisplay } from './helpers';

export function* getOptions(action) {
  const { token } = yield select(makeSelectAuth());
  const optionKey = action.payload;
  const optionApiKey = getOptionApiKey(optionKey);
  const endpoint = `${api.host}/api/v${
    api.version
  }/av/tenant/optional-resource/by-group?group=${optionApiKey}`;

  const requestOpt = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-TENANT-ID': tenant['360f'].id,
    },
  };

  try {
    const response = yield call(request, endpoint, requestOpt);
    if (response.data) {
      const options = mapOptionsResponseToDisplay(optionKey, response.data);
      yield put(getOptionsSuccessAction(optionKey, options));
    }
  } catch (error) {
    // TODO: handle getting options error
  }
}

export function* getPartyDetails(action) {
  const { token } = yield select(makeSelectAuth());
  const partyId = action.payload;

  const endpoint = `${api.host}/api/v1/av/party?id=${partyId}`;

  const requestOpt = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-TENANT-ID': tenant['360f'].id,
    },
  };

  try {
    const response = yield call(request, endpoint, requestOpt);
    if (response.data) {
      // remove id and party ID from details
      const personalDetails = { ...response.data.details };
      delete personalDetails.id;
      delete personalDetails.partyId;
      const personalDetailsData = {
        ...personalDetails,
        email: response.data.email,
        dateOfBirth: response.data.dateOfBirth,
        gender: response.data.gender === 1 ? 'M' : 'F',
        preferredName: response.data.preferredName,
        fullName: `${response.data.firstName} ${response.data.lastName}`,
        idFiles: personalDetails.idFiles ? personalDetails.idFiles : [],
        companyFiles: personalDetails.companyFiles
          ? personalDetails.companyFiles
          : [],
        dependants: [...response.data.dependants],
      };
      yield put(getPartyDetailsSuccessAction(personalDetailsData));
    } else {
      const error = new Error('noResponseData');
      throw error;
    }
  } catch (error) {
    // console.log(error);
    yield put(getCashflowsErrorAction(error.message));
  }
}

export function* createUpdateParty(action) {
  const { token } = yield select(makeSelectAuth());
  const { deletedDependantIds, fileToUpload } = action.payload;
  const endpoint = `${api.host}/api/v${api.version}/av/party`;

  const personalDetails = yield select(makeSelectPersonalDetails());
  const storedPartyId = yield select(makeSelectPartyId());

  let processedPersonalDetails = omitBy(personalDetails, isUndefined);
  processedPersonalDetails = omitBy(personalDetails, isNull);
  // delete idFiles and companyFiles to avoid update error
  delete processedPersonalDetails.idFiles;
  delete processedPersonalDetails.companyFiles;
  // ========== START :: Check deleted dependants ========== //
  if (deletedDependantIds.length) {
    yield call(
      bulkDeleteDependants,
      deleteDependantsAction(deletedDependantIds),
    );
  }
  // ========== END   :: Check deleted dependants ========== //
  // ========== START :: Check uploaded files ========== //
  if (fileToUpload.idFiles.length > 0) {
    const idFileFds = yield uploadFiles(token, fileToUpload.idFiles);
    if (idFileFds.length > 0) {
      processedPersonalDetails.idFiles = idFileFds.map(res => res.fd);
    }
  }

  if (fileToUpload.companyFiles.length > 0) {
    const companyFileFds = yield uploadFiles(token, fileToUpload.companyFiles);
    if (companyFileFds.length > 0) {
      processedPersonalDetails.companyFiles = companyFileFds.map(res => res.fd);
    }
  }
  // ========== END   :: Check uploaded files ========== //

  const requestOpt = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-TENANT-ID': tenant['360f'].id,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: storedPartyId || undefined,
      ...processedPersonalDetails,
      gender: personalDetails.gender === 'M' ? 1 : 0,
    }),
  };

  try {
    const response = yield call(request, endpoint, requestOpt);
    if (response.data && response.data.accountId && response.data.partyId) {
      const { accountId, partyId } = response.data;
      yield put(createUpdatePartySuccessAction(partyId, accountId));
      yield put(setCompletedStepAction(0, true));
      yield put(getPartyDetailsAction(partyId));
    } else {
      const error = new Error('noResponseData');
      throw error;
    }
  } catch (error) {
    // console.log(error);
    yield put(createUpdatePartyErrorAction(error.message));
  }
}

export function* deleteDependant(dependantId) {
  const { token } = yield select(makeSelectAuth());
  const partyId = yield select(makeSelectPartyId());
  const endpoint = `${api.host}/api/v${api.version}/av/party/delete-dependant`;

  const requestOpt = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-TENANT-ID': tenant['360f'].id,
    },
    body: JSON.stringify({
      partyId,
      dependantId,
    }),
  };

  try {
    yield call(request, endpoint, requestOpt);
  } catch (error) {
    // console.log(error);
    // yield put(createUpdateCashflowsErrorAction(error.message));
  }
}

export function* bulkDeleteDependants(action) {
  const deletedIds = action.payload;
  yield all(deletedIds.map(dependantId => call(deleteDependant, dependantId)));
}

export function* getPortfolios() {
  const { token } = yield select(makeSelectAuth());
  const partyId = yield select(makeSelectPartyId());
  const accountId = yield select(makeSelectAccountId());

  const endpoint = `${api.host}/api/v${
    api.version
  }/av/parties/${partyId}/accounts/${accountId}/portfolios`;

  const requestOpt = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-TENANT-ID': tenant['360f'].id,
    },
  };

  try {
    const response = yield call(request, endpoint, requestOpt);
    if (response.data) {
      yield put(getPortfoliosSuccessAction(response.data));
    } else {
      const error = new Error('noResponseData');
      throw error;
    }
  } catch (error) {
    // console.log(error);
    yield put(getPortfoliosErrorAction(error.message));
  }
}

export function* createUpdatePortfolios() {
  const { token } = yield select(makeSelectAuth());
  const partyId = yield select(makeSelectPartyId());
  const accountId = yield select(makeSelectAccountId());

  const endpoint = `${api.host}/api/v${
    api.version
  }/av/parties/${partyId}/accounts/${accountId}/portfolios`;

  const portfolios = yield select(makeSelectPortfolios());

  const requestOpt = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-TENANT-ID': tenant['360f'].id,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(portfolios),
  };

  try {
    yield call(request, endpoint, requestOpt);
    yield put(createUpdatePortfoliosSuccessAction(partyId, accountId));
    yield put(setCompletedStepAction(1, true));
    yield put(getPortfoliosAction());
  } catch (error) {
    yield put(createUpdatePortfoliosErrorAction(error.message));
  }
}

export function* getCashflows() {
  const { token } = yield select(makeSelectAuth());
  const partyId = yield select(makeSelectPartyId());
  const accountId = yield select(makeSelectAccountId());

  const endpoint = `${api.host}/api/v${
    api.version
  }/av/parties/${partyId}/accounts/${accountId}/cash-flows`;

  const requestOpt = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-TENANT-ID': tenant['360f'].id,
    },
  };

  try {
    const response = yield call(request, endpoint, requestOpt);
    if (response.data) {
      yield put(getCashflowsSuccessAction(response.data));
    } else {
      const error = new Error('noResponseData');
      throw error;
    }
  } catch (error) {
    // console.log(error);
    yield put(getCashflowsErrorAction(error.message));
  }
}

export function* createUpdateCashflows(action) {
  const { token } = yield select(makeSelectAuth());
  const partyId = yield select(makeSelectPartyId());
  const accountId = yield select(makeSelectAccountId());
  const { deletedIds } = action.payload;

  if (deletedIds.length) {
    yield call(bulkDeleteCashflows, deleteCashflowsAction(deletedIds));
  }

  const endpoint = `${api.host}/api/v${
    api.version
  }/av/parties/${partyId}/accounts/${accountId}/cash-flows`;

  const cashflows = yield select(makeSelectCahsflows());

  const requestOpt = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-TENANT-ID': tenant['360f'].id,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cashflows),
  };

  try {
    yield call(request, endpoint, requestOpt);
    yield put(createUpdateCashflowsSuccessAction());
    yield put(setCompletedStepAction(2, true));
    yield put(getCashflowsAction());
  } catch (error) {
    // console.log(error);
    yield put(createUpdateCashflowsErrorAction(error.message));
  }
}

export function* deleteCashflow(cashflowId) {
  const { token } = yield select(makeSelectAuth());
  const partyId = yield select(makeSelectPartyId());
  const accountId = yield select(makeSelectAccountId());
  const endpoint = `${api.host}/api/v${
    api.version
  }/av/parties/${partyId}/accounts/${accountId}/cash-flows/${cashflowId}`;

  const requestOpt = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-TENANT-ID': tenant['360f'].id,
    },
  };

  try {
    yield call(request, endpoint, requestOpt);
  } catch (error) {
    // console.log(error);
    // yield put(createUpdateCashflowsErrorAction(error.message));
  }
}

export function* bulkDeleteCashflows(action) {
  const deletedIds = action.payload;
  yield all(deletedIds.map(cashflowId => call(deleteCashflow, cashflowId)));
}

// Individual exports for testing
export default function* financialWizardContainerSaga() {
  yield all([
    takeEvery(GET_OPTIONS_ACTION, getOptions),
    takeLatest(GET_PARTY_DETAILS_ACTION, getPartyDetails),
    takeLatest(CREATE_UPDATE_PARTY_ACTION, createUpdateParty),
    takeLatest(DELETE_DEPENDANTS_ACTION, bulkDeleteDependants),
    takeLatest(GET_PORTFOLIOS_ACTION, getPortfolios),
    takeLatest(CREATE_UPDATE_PORTFOLIOS_ACTION, createUpdatePortfolios),
    takeLatest(GET_CASHFLOWS_ACTION, getCashflows),
    takeLatest(CREATE_UPDATE_CASHFLOWS_ACTION, createUpdateCashflows),
    takeLatest(DELETE_CASHFLOWS_ACTION, bulkDeleteCashflows),
  ]);
}
