import { initialState } from './reducer';

/**
 * Direct selector to the authGuard state domain
 */

const selectAuthGuardDomain = state => state.get('authGuard', initialState);

/**
 * Other specific selectors
 */

export { selectAuthGuardDomain };
