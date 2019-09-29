/*
 * CustomerBookPage Messages
 *
 * This contains all the text for the CustomerBookPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.CustomerBookPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Customer Book',
  },
  age: {
    id: `${scope}.age`,
    defaultMessage: 'Age',
  },
  potential: {
    id: `${scope}.potential`,
    defaultMessage: 'Potential',
  },
  salesStage: {
    id: `${scope}.salesStage`,
    defaultMessage: 'Sales Stage',
  },
  numberOfDependants: {
    id: `${scope}.numberOfDependants`,
    defaultMessage: 'Number of Dependants',
  },
});
