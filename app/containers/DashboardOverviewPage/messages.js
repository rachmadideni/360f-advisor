/*
 * DashboardOverviewPage Messages
 *
 * This contains all the text for the DashboardOverviewPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DashboardOverviewPage';

export default defineMessages({
  welcomeAdvisor: {
    id: `${scope}.welcomeAdvisor`,
    defaultMessage: 'Hi, advisor!',
  },
  personalProgressSectionHeader: {
    id: `${scope}.personalProgressSectionHeader`,
    defaultMessage: 'Personal Progress',
  },
  personalProgressTitle: {
    id: `${scope}.personalProgressTitle`,
    defaultMessage: 'Professional Development Progress',
  },
  personalProgressTabTitle1: {
    id: `${scope}.personalProgressTabTitle1`,
    defaultMessage: 'Upcoming',
  },
  personalProgressTabTitle2: {
    id: `${scope}.personalProgressTabTitle2`,
    defaultMessage: 'Past',
  },
  newsSectionHeader: {
    id: `${scope}.newsSectionHeader`,
    defaultMessage: 'News & Announcement',
  },
  newsTabTitle1: {
    id: `${scope}.newsTabTitle1`,
    defaultMessage: 'Talking Point',
  },
  newsTabTitle1Headline: {
    id: `${scope}.newsTabTitle1Headline`,
    defaultMessage: 'Vestager warns against weakening merger rules',
  },
  newsTabTitle2: {
    id: `${scope}.newsTabTitle2`,
    defaultMessage: 'Company News',
  },
  newsTabTitle2Headline: {
    id: `${scope}.newsTabTitle2Headline`,
    defaultMessage: 'Some Company News',
  },
  taskSectionHeader: {
    id: `${scope}.taskSectionHeader`,
    defaultMessage: 'Outstanding Task',
  },
  chartText1: {
    id: `${scope}.chartText1`,
    defaultMessage: '15/30',
  },
  chartText2: {
    id: `${scope}.chartText2`,
    defaultMessage: 'Total CPD hours',
  },
});
