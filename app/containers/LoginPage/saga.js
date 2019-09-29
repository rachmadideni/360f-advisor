import { put, takeLatest, select, call } from 'redux-saga/effects';
import request from 'utils/request';
import { setAuthTokenAction } from 'containers/App/actions';
import { api, tenant } from 'environments';
import { GLOBAL_ERROR_MESSAGE } from 'containers/App/constants';
import { LOGIN_ACTION, ERROR_RESPONSE_MESSAGE } from './constants';
import { loginSuccessAction, loginErrorAction } from './actions';
import { makeSelectCredential } from './selectors';

export function* login() {
  const { email, password } = yield select(makeSelectCredential());
  const metadata = JSON.stringify({
    userAgent: navigator.userAgent,
  });
  const endpoint = `${api.host}/api/v${api.version}/av/auth/token`;
  const requestOpt = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-TENANT-ID': tenant['360f'].id,
    },
    body: JSON.stringify({
      username: email,
      password,
      metadata,
    }),
  };
  try {
    const response = yield call(request, endpoint, requestOpt);
    yield put(setAuthTokenAction(response.data));
    yield put(loginSuccessAction());
  } catch (err) {
    let response = null;
    let errorMsg = null;
    let msgScope = 'local';
    if (err.response) {
      response = yield err.response.json();
      if (response.error) {
        errorMsg = ERROR_RESPONSE_MESSAGE[response.message];
        msgScope = 'local';
      }
    } else {
      errorMsg = GLOBAL_ERROR_MESSAGE.somethingWrong;
      msgScope = 'global';
    }
    yield put(
      loginErrorAction({
        messageScope: msgScope,
        message: errorMsg,
      }),
    );
  }
}

export default function* loginPageSaga() {
  yield takeLatest(LOGIN_ACTION, login);
}
