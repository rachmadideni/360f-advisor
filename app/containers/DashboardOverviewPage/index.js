/**
 *
 * DashboardOverviewPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MediaImage from 'images/Sg nightview.png';
import { Doughnut } from 'react-chartjs-2';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { color, dimension } from 'styles/constants';
import OutstandingTask from './components/OutstandingTask';
import AppointmentList from './components/AppointmentList';
import NewsList from './components/NewsList';

import {
  makeSelectOutstandingTask,
  makeSelectChartCPD,
  makeSelectAppointMentList,
  makeSelectNews,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const AppointmentTab = styled(Tab).attrs({
  classes: {
    root: 'tabRoot',
    selected: 'tabSelected',
  },
})`
  &.tabRoot {
    color: #979797;
    background-color: #e6e6e6;
  }

  &.tabSelected {
    font-size: 14px;
    color: #2abd7e;
    background-color: #f4f4f4;
  }
`;

const NewsTab = styled(Tab).attrs({
  classes: {
    root: 'tabRoot',
    selected: 'tabSelected',
  },
})`
  &.tabRoot {
    font-size: 16px;
    color: #0076ff;
    background-color: #f4f4f4;
    border: solid 1px #0076ff;
  }
  &.tabSelected {
    font-size: 16px;
    color: #ffffff;
    background-color: #0076ff;
    border: solid 1px #0076ff;
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class DashboardOverviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentTabValue: 0,
      newsTabValue: 0,
    };

    this.renderOutsandingTask = this.renderOutsandingTask.bind(this);
  }

  handleTabChange = (event, value) => {
    this.setState({ appointmentTabValue: value });
  };

  handleTabNews = (event, value) => {
    this.setState({ newsTabValue: value });
  };

  renderOutsandingTask() {
    const { outstandingTask } = this.props;

    const task = outstandingTask.map(taskItem => (
      <OutstandingTask
        key={taskItem.id}
        title={taskItem.title}
        text={taskItem.text}
        due_date={taskItem.due_date}
      />
    ));

    return task;
  }

  renderUpcomingAppointments() {
    const { upcoming } = this.props.appointment;
    const upcomingLength = upcoming.length;

    const upcomingList = upcoming.map((appo, index) => (
      <AppointmentList
        key={appo.id}
        index={index}
        length={upcomingLength}
        day={appo.day}
        month={appo.month}
        details={appo.details}
        time_start={appo.time_start}
        time_end={appo.time_end}
      />
    ));

    return upcomingList;
  }

  renderPastAppointments() {
    const { past } = this.props.appointment;

    const pastList = past.map((appo, index) => (
      <AppointmentList
        key={appo.id}
        index={index}
        length={2}
        day={appo.day}
        month={appo.month}
        details={appo.details}
        time_start={appo.time_start}
        time_end={appo.time_end}
      />
    ));

    return pastList;
  }

  renderNews(type) {
    const { talkingPoint, companyNews } = this.props.news;

    const targetArray = type === 0 ? talkingPoint : companyNews;
    const results = targetArray.map((news, index) => (
      <NewsList key={news.id} length={index} content={news.description} />
    ));

    return results;
  }

  render() {
    const { intl } = this.props;
    const { appointmentTabValue, newsTabValue } = this.state;
    const { cpdData } = this.props.cpdChartData;

    const chartText1 = intl.formatMessage(messages.chartText1);
    const chartText2 = intl.formatMessage(messages.chartText2);

    return (
      <Grid container justify="flex-start" alignItems="center" wrap="nowrap">
        <Grid item style={{ width: '100%' }}>
          <Grid
            container
            direction="column"
            justify="flex-end"
            alignItems="stretch"
            wrap="nowrap"
          >
            <Grid item style={{ padding: `${dimension.spacing.s}px` }}>
              <Typography align="center" variant="h2">
                {intl.formatMessage(messages.welcomeAdvisor)}
              </Typography>
            </Grid>

            <Grid item>
              <Grid wrap="nowrap" container direction="row">
                <Grid item>
                  <Grid
                    container
                    spacing={16}
                    wrap="nowrap"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography
                            variant="h2"
                            style={{ paddingLeft: `${dimension.spacing.xs}px` }}
                          >
                            {intl.formatMessage(
                              messages.personalProgressSectionHeader,
                            )}
                          </Typography>

                          <Paper
                            style={{
                              margin: `${dimension.spacing.xs}px`,
                              padding: `${dimension.spacing.xs}px`,
                            }}
                          >
                            <Typography
                              variant="h3"
                              style={{ padding: `${dimension.spacing.xs}px` }}
                            >
                              {intl.formatMessage(
                                messages.personalProgressTitle,
                              )}
                            </Typography>

                            <Grid container direction="row" alignItems="center">
                              <Grid
                                item
                                lg={8}
                                md={8}
                                style={{
                                  height: '80%',
                                }}
                              >
                                <Tabs
                                  value={appointmentTabValue}
                                  onChange={this.handleTabChange}
                                  TabIndicatorProps={{
                                    style: {
                                      backgroundColor: `${color.grey[100]}`,
                                    },
                                  }}
                                  variant="fullWidth"
                                >
                                  <AppointmentTab
                                    disableRipple
                                    label={intl.formatMessage(
                                      messages.personalProgressTabTitle1,
                                    )}
                                  />
                                  <AppointmentTab
                                    disableRipple
                                    label={intl.formatMessage(
                                      messages.personalProgressTabTitle2,
                                    )}
                                  />
                                </Tabs>
                                {appointmentTabValue === 0 && (
                                  <div>{this.renderUpcomingAppointments()}</div>
                                )}
                                {appointmentTabValue === 1 && (
                                  <div>{this.renderPastAppointments()}</div>
                                )}
                              </Grid>
                              <Grid
                                item
                                lg={4}
                                md={4}
                                style={{
                                  padding: `${dimension.spacing.s}px`,
                                }}
                              >
                                <Doughnut
                                  data={cpdData}
                                  width={200}
                                  height={300}
                                  options={{
                                    maintainAspectRatio: false,
                                    responsive: true,
                                    legend: {
                                      position: 'bottom',
                                      labels: {
                                        boxWidth: 10,
                                      },
                                    },
                                    cutoutPercentage: 60,
                                    title: {
                                      display: true,
                                      text: [chartText1, chartText2],
                                      fontSize: 14,
                                      padding: 10,
                                    },
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>

                        <Grid
                          item
                          style={{
                            height: '40%',
                            padding: `${dimension.spacing.xs}px`,
                          }}
                        >
                          <Typography
                            variant="h2"
                            style={{ padding: `${dimension.spacing.xs}px` }}
                          >
                            {intl.formatMessage(messages.newsSectionHeader)}
                          </Typography>

                          <Paper>
                            <Tabs
                              value={newsTabValue}
                              onChange={this.handleTabNews}
                              TabIndicatorProps={{
                                style: {
                                  backgroundColor: `${color.grey[100]}`,
                                  border: `solid 1px ${color.blue}`,
                                },
                              }}
                              variant="fullWidth"
                            >
                              <NewsTab
                                disableRipple
                                label={intl.formatMessage(
                                  messages.newsTabTitle1,
                                )}
                              />
                              <NewsTab
                                disableRipple
                                label={intl.formatMessage(
                                  messages.newsTabTitle2,
                                )}
                              />
                            </Tabs>

                            <Card
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                backgroundColor: 'transparent',
                                border: 0,
                                boxShadow: 'none',
                                elevation: 0,
                              }}
                            >
                              <img
                                alt="mediaImage"
                                src={MediaImage}
                                style={{
                                  padding: 10,
                                  width: `${dimension.spacing.xl * 2}px`,
                                  height: `${dimension.spacing.xl * 2}px`,
                                  borderRadius: `${dimension.borderRadius.m /
                                    2}px`,
                                }}
                              />
                              <CardContent
                                style={{
                                  overflowY: 'auto',
                                  // maxHeight: '100px'
                                }}
                              >
                                {newsTabValue === 0 && (
                                  <Typography
                                    component="h5"
                                    variant="h5"
                                    style={{
                                      fontSize: '16px',
                                      fontWeight: '900',
                                    }}
                                  >
                                    {intl.formatMessage(
                                      messages.newsTabTitle1Headline,
                                    )}
                                  </Typography>
                                )}
                                {newsTabValue === 1 && (
                                  <Typography
                                    component="h5"
                                    variant="h5"
                                    style={{
                                      fontSize: '16px',
                                      fontWeight: '900',
                                    }}
                                  >
                                    {intl.formatMessage(
                                      messages.newsTabTitle2Headline,
                                    )}
                                  </Typography>
                                )}

                                <div style={{ overflowY: 'auto' }}>
                                  <ul style={{ margin: 5, padding: 0 }}>
                                    {this.renderNews(newsTabValue)}
                                  </ul>
                                </div>
                              </CardContent>
                            </Card>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={4} md={3}>
                      <Typography
                        variant="h2"
                        style={{ padding: `${dimension.spacing.xs}px` }}
                      >
                        {intl.formatMessage(messages.taskSectionHeader)}
                      </Typography>
                      {this.renderOutsandingTask()}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

DashboardOverviewPage.propTypes = {
  // renderOutsandingTask: PropTypes.func,
  // renderUpcomingAppointments: PropTypes.func,
  outstandingTask: PropTypes.array,
  appointment: PropTypes.object,
  news: PropTypes.object,
  cpdChartData: PropTypes.object,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  outstandingTask: makeSelectOutstandingTask(),
  cpdChartData: makeSelectChartCPD(),
  appointment: makeSelectAppointMentList(),
  news: makeSelectNews(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboardOverviewPage', reducer });
const withSaga = injectSaga({ key: 'dashboardOverviewPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
)(DashboardOverviewPage);
