/*
 *
 * DashboardOverviewPage reducer
 *
 */

import { fromJS } from 'immutable';
import { FETCH_UNDERWRITING } from './constants';

export const initialState = fromJS({
  /* news:[
		{
			type:'talking point',
			topic_headline:'Vestager warns against weakening merger rules',
			slug:'Portugal PM warns on EU protectionism over China investment screening'
		},{
			type:'talking point',
			topic_headline:'Vestager warns against weakening merger rules',
			slug:'EU blocks planned Siemens-Alstom rail deal in landmark decision'
		},{
			type:'talking point',
			topic_headline:'Vestager warns against weakening merger rules',
			slug:'France calls for biggest shake-up of EU merger rules in 30 years'
		},{
			type:'company news',
			topic_headline:'Some Company News',
			slug:'Lorem ipsum dolor sit amet, consectetur adipisicing.'
		},{
			type:'company news',
			topic_headline:'Some Company News',
			slug:'Lorem ipsum dolor sit amet.'
		},{
			type:'company news',
			topic_headline:'Some Company News',
			slug:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem?'
		}
	], */
  outstandingTask: [
    {
      id: 1,
      title: 'Underwriting',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      due_date: '2019-03-28',
    },
    {
      id: 2,
      title: 'Underwriting',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      due_date: '2019-03-17',
    },
    {
      id: 3,
      title: 'Underwriting',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      due_date: '2019-03-22',
    },
  ],
  news: {
    talkingPoint: [
      {
        id: 1,
        headline: 'Vestager warns against weakening merger rules',
        description:
          'Portugal PM warns on EU protectionism over China investment screening',
        url: 'http://localhost:3000',
      },
      {
        id: 2,
        headline: 'Vestager warns against weakening merger rules',
        description:
          'EU blocks planned Siemens-Alstom rail deal in landmark decision',
        url: 'http://localhost:3000',
      },
    ],
    companyNews: [
      {
        id: 1,
        headline: 'some company news headline 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        url: 'http://localhost:3000',
      },
      {
        id: 2,
        headline: 'some company news headline 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        url: 'http://localhost:3000',
      },
    ],
  },
  appointmentList: {
    upcoming: [
      {
        id: 1,
        day: '19',
        month: 'MAR',
        time_start: '7.00 pm',
        time_end: '8.00 pm',
        details: 'Appointment with Mr.Rindra for discussing potential',
        chip: 'RSVP',
      },
      {
        id: 2,
        day: '21',
        month: 'MAR',
        time_start: '7.00 pm',
        time_end: '8.00 pm',
        details: 'Appointment with Mr.Rindra for discussing potential',
        chip: 'RSVP',
      },
    ],
    past: [
      {
        id: 1,
        day: '01',
        month: 'MAR',
        time_start: '5.00 pm',
        time_end: '5.30 pm',
        details: 'Closed Deal. Sample description text',
        chip: 'RSVP',
      },
      {
        id: 2,
        day: '05',
        month: 'MAR',
        time_start: '8.00 pm',
        time_end: '8.30 pm',
        details: 'Past Appointment. Sample description text',
        chip: 'RSVP',
      },
    ],
  },
  charts: {
    cpdTitle: ['15/30', 'Total CPD hours'],
    cpdData: {
      labels: ['All Others', 'Ethics', 'Rules & regulation'],
      datasets: [
        {
          data: [70, 20, 10],
          weight: 5,
          backgroundColor: ['#4CE5E6', '#CCCCCC', '#39C6DE'],
        },
      ],
    },
  },
});

function dashboardOverviewPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_UNDERWRITING:
      return state;
    default:
      return state;
  }
}

export default dashboardOverviewPageReducer;
