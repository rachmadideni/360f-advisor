/*
 *
 * CustomerViewContainer reducer
 *
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({});

function customerViewContainerReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default customerViewContainerReducer;
