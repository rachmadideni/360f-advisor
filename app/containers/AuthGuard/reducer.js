/*
 *
 * AuthGuard reducer
 *
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({});

function authGuardReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default authGuardReducer;
