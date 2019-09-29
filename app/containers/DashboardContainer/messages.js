/*
 * DashboardContainer Messages
 *
 * This contains all the text for the DashboardContainer container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DashboardContainer';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  notification: {
    id: `${scope}.notification`,
    defaultMessage: 'Notification',
  },
  book: {
    id: `${scope}.book`,
    defaultMessage: 'Book',
  },
  salesTool: {
    id: `${scope}.salesTool`,
    defaultMessage: 'Sales Tool',
  },
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
  choose: {
    id: `${scope}.choose`,
    defaultMessage: 'Choose',
  },
  goalAssessment: {
    id: `${scope}.goalAssessment`,
    defaultMessage: 'Goal Assessment',
  },
  launchFinancialWizard: {
    id: `${scope}.launchFinancialWizard`,
    defaultMessage: 'Launch Financial Wizard',
  },
});
