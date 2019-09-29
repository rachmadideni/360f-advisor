/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_EMAIL_ACTION,
  CHANGE_PASSWORD_ACTION,
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_ERROR_ACTION,
} from './constants';

export const initialState = fromJS({
  credential: {
    email: '',
    password: '',
  },
  loading: false,
  error: {
    messageScope: null,
    message: null,
  },
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EMAIL_ACTION:
      return state.updateIn(['credential', 'email'], () => action.payload);
    case CHANGE_PASSWORD_ACTION:
      return state.updateIn(['credential', 'password'], () => action.payload);
    case LOGIN_ACTION:
      return state
        .set('loading', true)
        .setIn(['error', 'messageScope'], null)
        .setIn(['error', 'message'], null);
    case LOGIN_SUCCESS_ACTION:
      return state.set('loading', false);
    case LOGIN_ERROR_ACTION:
      return state
        .set('loading', false)
        .setIn(['error', 'messageScope'], action.payload.messageScope)
        .setIn(['error', 'message'], action.payload.message);
    default:
      return state;
  }
}

export default loginPageReducer;
