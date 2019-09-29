/*
 *
 * LoginPage constants
 *
 */

export const LOGIN_ACTION = 'app/LoginPage/LOGIN_ACTION';
export const LOGIN_SUCCESS_ACTION = 'app/LoginPage/LOGIN_SUCCESS_ACTION';
export const LOGIN_ERROR_ACTION = 'app/LoginPage/LOGIN_ERROR_ACTION';
export const CHANGE_EMAIL_ACTION = 'app/LoginPage/CHANGE_EMAIL_ACTION';
export const CHANGE_PASSWORD_ACTION = 'app/LoginPage/CHANGE_PASSWORD_ACTION';

export const RESPONSE_WRONG_EMAIL = 'WRONG_EMAIL';
export const RESPONSE_WRONG_USERNAME = 'WRONG_USERNAME';
export const RESPONSE_WRONG_PASSWORD = 'WRONG_PWD';
export const RESPONSE_USER_EXPIRED = 'USER_EXPIRED';
export const RESPONSE_USER_INACTIVE = 'USER_INACTIVE';

export const ERROR_RESPONSE_MESSAGE = {
  [RESPONSE_WRONG_EMAIL]: 'errorWrongEmail',
  [RESPONSE_WRONG_USERNAME]: 'errorWrongUsername',
  [RESPONSE_WRONG_PASSWORD]: 'errorWrongPassword',
  [RESPONSE_USER_EXPIRED]: 'errorUserExpired',
  [RESPONSE_USER_INACTIVE]: 'errorUserInactive',
};
