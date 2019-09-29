/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { SET_AUTH_TOKEN_ACTION } from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  auth: {
    token:null      
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_TOKEN_ACTION:
      return state.setIn(['auth', 'token'], action.payload);
    default:
      return state;
  }
}

export default appReducer;
