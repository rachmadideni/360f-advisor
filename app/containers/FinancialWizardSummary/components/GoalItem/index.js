import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton, InputAdornment } from '@material-ui/core';
import IconDateRange from '@material-ui/icons/DateRange';
import Typography from 'components/Typography';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { injectIntl } from 'react-intl';
import { dimension, color } from 'styles/constants';
import styled from 'styled-components';
import TextField from 'components/TextField';
import DatePicker from 'react-mobile-datepicker';
import moment from 'moment';
import globalMessages from 'containers/App/messages';
import isEmpty from 'validator/lib/isEmpty';
import NumberInput from 'components/NumberInput';
import messages from '../../messages';
import { DATE_CONFIG } from '../../constants';

const Title = styled(Typography)`
  && {
    font-weight: 600;
    color: ${color.grey[700]};
  }
`;

const StyledTextField = styled(TextField)`
  && {
    padding-right: ${dimension.spacing.m}px;
    height: 54px;
    border-width: 1;
  }
`;

const StyledNumberInput = styled(NumberInput)`
  && {
    border-width: 1;
    padding-right: ${dimension.spacing.m}px;
  }
`;

class GoalItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDatePickerOpen: false,
      data: {
        goal: '',
        allocate: '',
        amount: '',
        year: '',
      },
      error: {
        goal: false,
        allocate: false,
        amount: false,
        year: false,
      },
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { allocate, amount, year } = this.state.data;
    if (prevState.data.allocate !== allocate) {
      this.setState(preState => ({
        ...preState,
        error: {
          ...preState.error,
          allocate: false,
        },
      }));
    }
    if (prevState.data.amount !== amount) {
      this.setState(preState => ({
        ...preState,
        error: {
          ...preState.error,
          amount: false,
        },
      }));
    }
    if (prevState.data.year !== year) {
      this.setState(preState => ({
        ...preState,
        error: {
          ...preState.error,
          year: false,
        },
      }));
    }
  };

  getDateOfBirth() {
    const { year } = this.state.data;

    if (!year) {
      return {
        date: moment().toDate(),
        display: '',
      };
    }

    return {
      date: moment(year).toDate(),
      display: moment(year).format('YYYY'),
    };
  }

  handleInputChange(field, value) {
    return this.setState(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        [field]: value,
      },
    }));
  }

  handleValidate(field, value) {
    const { allocate, amount, year } = this.state.data;

    if (!isEmpty(value) && value.length < 50) {
      if (isEmpty(allocate)) {
        this.setState(prevState => ({
          ...prevState,
          error: {
            ...prevState.error,
            allocate: true,
          },
        }));
      }
      if (isEmpty(amount)) {
        this.setState(prevState => ({
          ...prevState,
          error: {
            ...prevState.error,
            amount: true,
          },
        }));
      }
      if (isEmpty(year)) {
        this.setState(prevState => ({
          ...prevState,
          error: {
            ...prevState.error,
            year: true,
          },
        }));
      }
    }
  }

  renderGoalSection() {
    const {
      intl,
      onDelete,
      goal,
      allocate,
      amount,
      year,
      onGoalChange,
      onAllocateChange,
      onAmountChange,
      onYearChange,
      validate,
    } = this.props;
    const { error } = this.state;
    return (
      <React.Fragment>
        <Grid container>
          <Grid
            item
            xs={12}
            container
            direction="row"
            style={{ padding: `${dimension.spacing.m}px` }}
          >
            <Grid item xs={4}>
              <Title variant="h3" gutterBottom>
                {intl.formatMessage(messages.goal)}
              </Title>
              <StyledTextField
                value={goal}
                fullWidth
                InputProps={{
                  maxLength: 50,
                }}
                variant="outlined"
                onChange={event => {
                  this.handleValidate('goal', event.target.value);
                  this.handleInputChange('goal', event.target.value);
                  return onGoalChange(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs>
              <Title variant="h3" gutterBottom>
                {intl.formatMessage(messages.toAllocate)}
              </Title>
              <StyledNumberInput
                onChange={value => {
                  this.handleValidate('allocate', value);
                  this.handleInputChange('allocate', value);
                  return onAllocateChange(value);
                }}
                error={error.allocate}
                value={allocate}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs>
              <Title variant="h3" gutterBottom>
                {intl.formatMessage(messages.targetAmount)}
              </Title>
              <StyledNumberInput
                value={amount}
                onChange={value => {
                  this.handleValidate('amount', value);
                  this.handleInputChange('amount', value);
                  return onAmountChange(value);
                }}
                fullWidth
                error={error.amount}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2}>
              <Title variant="h3" gutterBottom>
                {intl.formatMessage(messages.targetYear)}
              </Title>
              <StyledTextField
                fullWidth
                error={error.year}
                value={year}
                variant="outlined"
                onFocus={() =>
                  this.setState({
                    isDatePickerOpen: true,
                  })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconDateRange color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <IconButton
              onClick={onDelete}
              style={{ fontSize: 30, marginTop: '33px' }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Grid>
          <DatePicker
            dateConfig={DATE_CONFIG}
            isOpen={this.state.isDatePickerOpen}
            value={this.getDateOfBirth().date}
            min={moment()
              .subtract(1, 'years')
              .toDate()}
            max={moment()
              .add(50, 'years')
              .toDate()}
            confirmText={intl.formatMessage(globalMessages.select)}
            cancelText={intl.formatMessage(globalMessages.cancel)}
            onSelect={value => {
              this.handleInputChange(
                'year',
                moment(value).format('YYYY-MM-DD'),
              );
              this.handleValidate('year', this.getDateOfBirth().display);
              onYearChange(moment(value).format('YYYY'));
              return this.setState({
                isDatePickerOpen: false,
              });
            }}
            onCancel={() =>
              this.setState({
                isDatePickerOpen: false,
              })
            }
          />
        </Grid>
        <hr style={{ borderTop: `1px solid ${color.grey[400]}` }} />
      </React.Fragment>
    );
  }

  render() {
    return this.renderGoalSection();
  }
}

GoalItem.propTypes = {
  intl: PropTypes.object,
  onDelete: PropTypes.func,
  onGoalChange: PropTypes.func,
  onYearChange: PropTypes.func,
  onAllocateChange: PropTypes.func,
  onAmountChange: PropTypes.func,
  goal: PropTypes.string,
  allocate: PropTypes.string,
  amount: PropTypes.string,
  year: PropTypes.string,
  validate: PropTypes.bool,
};

export default injectIntl(GoalItem);
