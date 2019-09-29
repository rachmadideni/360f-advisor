/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LoginPage';

export default defineMessages({
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  forgottenPassword: {
    id: `${scope}.forgottenPassword`,
    defaultMessage: 'Forgotten password?',
  },
  errorEmailIsEmpty: {
    id: `${scope}.errorEmailiSEmpty`,
    defaultMessage: 'Error: Email is Required',
  },
  errorPasswordIsEmpty: {
    id: `${scope}.errorPasswordIsEmpty`,
    defaultMessage: 'Error: Password is Required',
  },
  errorEmailWrongFormat: {
    id: `${scope}.errorEmailWrongFormat`,
    defaultMessage: 'Error: You Must provide a valid email address',
  },
  errorWrongEmail: {
    id: `${scope}.errorWrongEmail`,
    defaultMessage: `Error: The email address that you entered is not registered.`,
  },
  errorWrongUsername: {
    id: `${scope}.errorWrongUsername`,
    defaultMessage: `Error: The username that you entered is not registered.`,
  },
  errorWrongPassword: {
    id: `${scope}.errorWrongPassword`,
    defaultMessage: `Error: You entered incorrect password.`,
  },
  errorUserExpired: {
    id: `${scope}.errorUserExpired`,
    defaultMessage: `Error: Your account is expired.`,
  },
  errorUserInactive: {
    id: `${scope}.errorUserInactive`,
    defaultMessage: `Error: Your account is inactive.`,
  },
});

/*
login
email address
password
forgotten password
login
*/
