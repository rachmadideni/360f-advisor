/**
 * Asynchronously loads the component for NotFoundPage
 */
import loadable from 'loadable-components';

export default loadable(() => import('./index'));

// import LoadingIndicator from 'components/LoadingIndicator';

// export default loadable(() => import('./index'), {
//   LoadingComponent: LoadingIndicator,
// });
