/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  // const mergeWithRouterState = connectRouter(history);
  // return mergeWithRouterState(rootReducer);

  return rootReducer;
}
