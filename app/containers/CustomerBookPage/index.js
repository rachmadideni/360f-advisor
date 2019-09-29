/**
 *
 * CustomerBookPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import globalMessages from 'containers/App/messages';
import { color } from 'styles/constants';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Collapse from '@material-ui/core/Collapse';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Settings from '@material-ui/icons/Settings';

import Slider from '@material-ui/lab/Slider';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectCustomerBookPage from './selectors';

import CustomerTable from './components/CustomerTable';

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const sampleCustomerData = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

/* eslint-disable react/prefer-stateless-function */
export class CustomerBookPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterisOpen: false,
      ageRangeSelections: 21,
      potential: [
        { id: 1, name: 'Good', value: false },
        { id: 2, name: 'Neutral', value: false },
        { id: 3, name: 'Poor', value: false },
      ],
      salesStage: [
        { id: 1, stage: 'Initiate Contact (999)', value: false },
        { id: 2, stage: 'Request Referral (999)', value: false },
        { id: 3, stage: 'Present Offer (999)', value: false },
        { id: 4, stage: 'Close Sale (999)', value: false },
        { id: 5, stage: 'Reject (999)', value: false },
        { id: 6, stage: 'Review (999)', value: false },
      ],
      numberOfDependants: [
        { id: 1, label: '1', value: false },
        { id: 2, label: '2', value: false },
        { id: 3, label: '3', value: false },
        { id: 4, label: 'More than 3 (999)', value: false },
      ],
    };
  }

  switchFilter = () => {
    this.setState(state => ({ filterisOpen: !state.filterisOpen }));
  };

  handleAgeRange = (event, ageRangeSelections) => {
    this.setState({ ageRangeSelections });
  };

  changePotential = (field, value) => {
    const { potential } = this.state;
    const checkedResults = potential.map(item =>
      item.name === field ? Object.assign({}, item, { value }) : item,
    );

    this.setState({
      potential: checkedResults,
    });
  };

  render() {
    const { intl } = this.props;
    const {
      filterisOpen,
      ageRangeSelections,
      potential,
      salesStage,
      numberOfDependants,
    } = this.state;

    return (
      <Grid
        container
        wrap="nowrap"
        direction="column"
        style={
          {
            // flexGrow:1
          }
        }
      >
        <AppBar
          elevation={0}
          position="fixed"
          style={{
            backgroundColor: `${color.grey[100]}`,
            // backgroundColor:'transparent'
          }}
        >
          <Toolbar
            style={{
              borderBottom: `solid 1px ${color.grey[100]}`,
            }}
          >
            <Typography variant="h1">
              {intl.formatMessage(messages.pageTitle)}
            </Typography>
            <Input
              id="input-with-icon-adornment"
              placeholder={intl.formatMessage(globalMessages.search)}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon style={{ color: `${color.grey[500]}` }} />
                </InputAdornment>
              }
            />
            <IconButton color="secondary" onClick={this.switchFilter}>
              <Settings />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Collapse in={filterisOpen}>
          <Grid
            container
            wrap="nowrap"
            justify="flex-start"
            direction="column"
            alignItems="stretch"
            style={{
              height: '50vh',
              marginTop: '60px',
              paddingTop: '20px',
              backgroundColor: `${color.grey[100]}`,
              borderBottom: `solid 1px ${color.grey[300]}`,
            }}
          >
            <Grid item xs={12}>
              <Grid
                container
                justify="flex-start"
                alignItems="flex-start"
                wrap="nowrap"
              >
                <Grid item xs={3} style={{ padding: '35px' }}>
                  <Typography variant="h3">
                    {intl.formatMessage(messages.age)}
                  </Typography>

                  <Slider
                    style={{ padding: '15px' }}
                    value={ageRangeSelections}
                    min={21}
                    max={70}
                    onChange={this.handleAgeRange}
                  />
                </Grid>

                <Grid item xs={2} style={{ padding: '5px' }}>
                  <FormControl>
                    <FormLabel>
                      {intl.formatMessage(messages.potential)}
                    </FormLabel>
                    <FormGroup>
                      {potential.map((p, index) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={potential[index].value}
                              onChange={event =>
                                this.changePotential(
                                  potential[index].name,
                                  event.target.checked,
                                )
                              }
                              value={potential[index].value}
                            />
                          }
                          label={potential[index].name}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={3} style={{ padding: '5px' }}>
                  <FormControl>
                    <FormLabel>
                      {intl.formatMessage(messages.salesStage)}
                    </FormLabel>
                    <FormGroup>
                      {salesStage.map((p, index) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={salesStage[index].value}
                              onChange={event =>
                                this.changePotential(
                                  salesStage[index].stage,
                                  event.target.checked,
                                )
                              }
                              value={salesStage[index].value}
                            />
                          }
                          label={salesStage[index].stage}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={3} style={{ padding: '5px' }}>
                  <FormControl>
                    <FormLabel>
                      {intl.formatMessage(messages.numberOfDependants)}
                    </FormLabel>
                    <FormGroup>
                      {numberOfDependants.map((p, index) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={numberOfDependants[index].value}
                              onChange={event =>
                                this.changePotential(
                                  numberOfDependants[index].label,
                                  event.target.checked,
                                )
                              }
                              value={numberOfDependants[index].value}
                            />
                          }
                          label={numberOfDependants[index].label}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Collapse>

        <Grid
          container
          justify="flex-start"
          direction="row"
          alignItems="stretch"
          style={{
            marginTop: '80px',
            padding: '0 50px 0 50px',
          }}
        >
          <Grid item xs>
            <CustomerTable customer={sampleCustomerData} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

CustomerBookPage.propTypes = {
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  customerBookPage: makeSelectCustomerBookPage(),
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

const withReducer = injectReducer({ key: 'customerBookPage', reducer });
const withSaga = injectSaga({ key: 'customerBookPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
)(CustomerBookPage);
