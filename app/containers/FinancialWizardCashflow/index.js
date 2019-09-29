/**
 *
 * FinancialWizardCashflow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { isEqual } from 'lodash/lang';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import Fade from '@material-ui/core/Fade';
import Typography from 'components/Typography';
import Button from 'components/Button';
import SectionButton from 'containers/FinancialWizardContainer/components/SectionButton';
import SectionFooterContainer from 'containers/FinancialWizardContainer/components/SectionFooterContainer';
import FooterToggleButton from 'containers/FinancialWizardContainer/components/FooterToggleButton';
import SectionContainer from 'containers/FinancialWizardContainer/components/SectionContainer';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dimension, color } from 'styles/constants';
import financialWizardMessages from 'containers/FinancialWizardContainer/messages';
import {
  makeSelectIncome,
  makeSelectLivingExpenses,
  makeSelectLoans,
  makeSelectTaxes,
  makeSelectDeletedIds,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {} from './constants';
import {
  addIncomeAction,
  addLivingExpenseAction,
  addLoanAction,
  addTaxAction,
  clearIncomeAction,
  clearLivingExpensesAction,
  clearLoansAction,
  clearTaxesAction,
  changeIncomeTypeAction,
  changeIncomeCurrencyAction,
  changeAnnualIncomeAction,
  deleteIncomeItemAction,
  changeLivingExpenseTypeAction,
  changeLivingExpenseCurrencyAction,
  changeLivingExpenseAnnualAmountAction,
  deleteLivingExpenseItemAction,
  changeLoanTypeAction,
  changeLoanCurrencyAction,
  changeLoanMonthlyAmountAction,
  changeLoanTenureMonthsAction,
  deleteLoanItemAction,
  changeTaxTypeAction,
  changeTaxCurrencyAction,
  changeTaxAnnualAmountAction,
  deleteTaxItemAction,
  setDataStateAction,
} from './actions';
import IncomeItem from './components/IncomeItem';
import LivingExpenseItem from './components/LivingExpenseItem';
import TaxItem from './components/TaxItem';
import LoanItem from './components/LoanItem';
import { getSectionIcon, mapSectionsToCashflows } from './helpers';

/* eslint-disable react/prefer-stateless-function */
export class FinancialWizardCashflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFooterOpen: false,
      isFooterAvailable: false,
      openSection: {
        income: false,
        livingExpenses: false,
        loans: false,
        taxes: false,
      },
      error: {
        income: {},
        livingExpenses: {},
        loans: {},
        taxes: {},
      },
      isSubmitting: false,
    };
  }

  setDataReduxState(props) {
    const { cashflows, setDataState } = props;
    return setDataState(cashflows);
  }

  componentDidMount() {
    const { income, livingExpenses, loans, taxes, onMounted } = this.props;
    this.setDataReduxState(this.props);
    onMounted();
    if (
      (income.length ||
        livingExpenses.length ||
        loans.length ||
        taxes.length) &&
      !this.state.isFooterAvailable
    ) {
      this.setState({
        isFooterAvailable: true,
        isFooterOpen: true,
      });
    }

    if (
      !income.length &&
      !livingExpenses.length &&
      !loans.length &&
      !taxes.length &&
      this.state.isFooterAvailable
    ) {
      this.setState({
        isFooterAvailable: false,
        isFooterOpen: false,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { income, livingExpenses, loans, taxes, cashflows } = this.props;
    // ========== START :: check original cashflows state ========== //
    if (!isEqual(prevProps.cashflows, cashflows)) {
      this.setDataReduxState(this.props);
    }
    // ========== END   :: check original cashflows state ========== //
    // ========== START :: set footer state ========== //
    if (
      (income.length ||
        livingExpenses.length ||
        loans.length ||
        taxes.length) &&
      !this.state.isFooterAvailable
    ) {
      this.setState({
        isFooterAvailable: true,
        isFooterOpen: true,
      });
    }

    if (
      !income.length &&
      !livingExpenses.length &&
      !loans.length &&
      !taxes.length &&
      this.state.isFooterAvailable
    ) {
      this.setState({
        isFooterAvailable: false,
        isFooterOpen: false,
        isSubmitting: false,
      });
    }
    // ========== END   :: set footer state ========== //

    // ========== START :: set income section state ========== //
    if (!prevProps.income.length && this.props.income.length) {
      this.setState(pState => ({
        ...pState,
        openSection: {
          ...pState.openSection,
          income: true,
        },
      }));
    }

    if (!this.props.income.length && prevProps.income.length) {
      this.setState(pState => ({
        ...pState,
        openSection: {
          ...pState.openSection,
          income: false,
        },
      }));
    }
    // ========== END   :: set income section state ========== //

    // ========== START :: set living expenses section state ========== //
    if (!prevProps.livingExpenses.length && this.props.livingExpenses.length) {
      this.setState(pState => ({
        ...pState,
        openSection: {
          ...pState.openSection,
          livingExpenses: true,
        },
      }));
    }

    if (!this.props.livingExpenses.length && prevProps.livingExpenses.length) {
      this.setState(pState => ({
        ...pState,
        openSection: {
          ...pState.openSection,
          livingExpenses: false,
        },
      }));
    }
    // ========== END   :: set living expenses section state ========== //

    // ========== START :: set loans section state ========== //
    if (!prevProps.loans.length && this.props.loans.length) {
      this.setState(pState => ({
        ...pState,
        openSection: {
          ...pState.openSection,
          loans: true,
        },
      }));
    }

    if (!this.props.loans.length && prevProps.loans.length) {
      this.setState(pState => ({
        ...pState,
        openSection: {
          ...pState.openSection,
          loans: false,
        },
      }));
    }
    // ========== END   :: set loans section state ========== //

    // ========== START :: set taxes section state ========== //
    if (!prevProps.taxes.length && this.props.taxes.length) {
      this.setState(pState => ({
        ...pState,
        openSection: {
          ...pState.openSection,
          taxes: true,
        },
      }));
    }

    if (!this.props.taxes.length && prevProps.taxes.length) {
      this.setState(pState => ({
        ...pState,
        openSection: {
          ...pState.openSection,
          taxes: false,
        },
      }));
    }
    // ========== END   :: set taxes section state ========== //
  }

  getSectionOptions() {
    const { options } = this.props;
    const sectionOptions = options.cashflowType.map(opt => ({
      value: opt.value,
      title: opt.title,
      icon: getSectionIcon(opt.value),
    }));
    return sectionOptions;
  }

  getSectionButtonActiveState(section) {
    const { income, livingExpenses, loans, taxes } = this.props;

    switch (section) {
      case '1':
        if (income.length > 0) {
          return true;
        }
        break;
      case '2':
        if (livingExpenses.length > 0) {
          return true;
        }
        break;
      case '3':
        if (loans.length > 0) {
          return true;
        }
        break;
      case '4':
        if (taxes.length > 0) {
          return true;
        }
        break;
      default:
        return false;
    }
    return false;
  }

  getMainErrorMessage() {
    const { intl, income, livingExpenses } = this.props;
    const { isSubmitting } = this.state;
    if (isSubmitting && !income.length) {
      return intl.formatMessage(messages.pleaseEnterIncomeSection);
    }
    if (isSubmitting && !livingExpenses.length) {
      return intl.formatMessage(messages.pleaseEnterLivingExpenseSection);
    }
    return false;
  }

  handleSectionButtonClick(section) {
    const {
      addIncome,
      addLivingExpense,
      addLoan,
      addTax,
      clearIncome,
      clearLivingExpenses,
      clearLoans,
      clearTaxes,
      income,
      livingExpenses,
      loans,
      taxes,
    } = this.props;
    switch (section) {
      case '1':
        if (income.length > 0) {
          return clearIncome();
        }
        return addIncome();
      case '2':
        if (livingExpenses.length > 0) {
          return clearLivingExpenses();
        }
        return addLivingExpense();
      case '3':
        if (loans.length > 0) {
          return clearLoans();
        }
        return addLoan();
      case '4':
        if (taxes.length > 0) {
          return clearTaxes();
        }
        return addTax();
      default:
        return false;
    }
  }

  handleItemValidation(section, index, isError) {
    this.setState(prevState => {
      const sectionErr = { ...prevState.error[section] };
      if (!isError) {
        delete sectionErr[index];
      } else {
        sectionErr[index] = isError;
      }
      return {
        ...prevState,
        error: {
          ...prevState.error,
          [section]: { ...sectionErr },
        },
      };
    });
  }

  handleSubmit() {
    this.setState({
      isSubmitting: true,
    });
    const { income, livingExpenses, loans, taxes, deletedIds } = this.props;
    if (!income.length || !livingExpenses.length) {
      return false;
    }
    if (!this.validateForm()) {
      return false;
    }
    const sections = {
      income,
      livingExpenses,
      loans,
      taxes,
    };
    const updatedCashflows = mapSectionsToCashflows(sections);
    return this.props.onSubmit(updatedCashflows, deletedIds);
  }

  validateForm() {
    const { income, livingExpenses, loans, taxes } = this.state.error;
    return (
      (!income || !Object.keys(income).length) &&
      (!livingExpenses || !Object.keys(livingExpenses).length) &&
      (!loans || !Object.keys(loans).length) &&
      (!taxes || !Object.keys(taxes).length)
    );
  }

  renderMainSectionOptions() {
    const { intl, income, livingExpenses, loans, taxes } = this.props;
    if (
      income.length ||
      livingExpenses.length ||
      loans.length ||
      taxes.length
    ) {
      return null;
    }
    return (
      <React.Fragment>
        <Typography
          variant="h1"
          align="center"
          color="secondary"
          style={{
            marginTop: dimension.spacing.xl,
            marginBottom: dimension.spacing.xl,
          }}
        >
          {intl.formatMessage(messages.selectSection)}
        </Typography>
        <Grid
          container
          justify="space-between"
          style={{
            maxWidth: 650,
            width: '100%',
          }}
        >
          {this.getSectionOptions().map(section => {
            let error = false;
            if (section.value === '1') {
              error = this.state.isSubmitting && !income.length;
            } else if (section.value === '2') {
              error = this.state.isSubmitting && !livingExpenses.length;
            }
            return (
              <SectionButton
                active={this.getSectionButtonActiveState(section.value)}
                key={section.value}
                label={section.title}
                icon={<section.icon />}
                onClick={() => this.handleSectionButtonClick(section.value)}
                error={error}
              />
            );
          })}
        </Grid>
      </React.Fragment>
    );
  }

  renderSectionOptionsFooter() {
    const { income, livingExpenses } = this.props;
    return (
      <SectionFooterContainer
        open={this.state.isFooterOpen && this.state.isFooterAvailable}
        onClick={() =>
          this.setState({
            isFooterOpen: false,
          })
        }
      >
        <Grid
          item
          container
          justify="space-between"
          style={{
            maxWidth: 650,
          }}
        >
          {this.getSectionOptions().map(section => {
            let error = false;
            if (section.value === '1') {
              error = this.state.isSubmitting && !income.length;
            } else if (section.value === '2') {
              error = this.state.isSubmitting && !livingExpenses.length;
            }
            return (
              <SectionButton
                active={this.getSectionButtonActiveState(section.value)}
                key={section.value}
                label={section.title}
                icon={<section.icon />}
                size="small"
                onClick={() => this.handleSectionButtonClick(section.value)}
                error={error}
              />
            );
          })}
        </Grid>
      </SectionFooterContainer>
    );
  }

  renderIncomeSection() {
    const {
      intl,
      income,
      clearIncome,
      changeIncomeType,
      changeIncomeCurrency,
      changeAnnualIncome,
      deleteIncomeItem,
      addIncome,
      options,
    } = this.props;
    return (
      <Fade in={!!income.length} unmountOnExit>
        <SectionContainer
          open={this.state.openSection.income}
          title={intl.formatMessage(financialWizardMessages.income)}
          onHeadClick={() =>
            this.setState(prevState => ({
              ...prevState,
              openSection: {
                ...prevState.openSection,
                income: !prevState.openSection.income,
              },
            }))
          }
          onSectionDelete={() => clearIncome()}
        >
          {income.map((data, index) => {
            const selectedTypes = income.map(inc => inc.type);
            const thisType = data.type;
            let incomeTypes = [...options.incomeType];
            incomeTypes = incomeTypes.filter(
              type =>
                selectedTypes.indexOf(type.value) < 0 ||
                type.value === thisType,
            );
            const key = `income-item-${index}`;
            return (
              <IncomeItem
                key={key}
                incomeType={data.type}
                currency={data.currency}
                annualIncome={data.annualAmount}
                onIncomeTypeChange={value => changeIncomeType(index, value)}
                onCurrencyChange={value => changeIncomeCurrency(index, value)}
                onAnnualIncomeChange={value => changeAnnualIncome(index, value)}
                incomeTypeOptions={incomeTypes}
                currencyOptions={options.currency}
                onDelete={() => deleteIncomeItem(index)}
                validate={this.state.isSubmitting}
                onError={isError =>
                  this.handleItemValidation('income', index, isError)
                }
              />
            );
          })}
          {income.length < options.incomeType.length ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                if (income.length < options.incomeType.length) {
                  return addIncome();
                }
                return true;
              }}
            >
              {intl.formatMessage(messages.addItem)}
            </Button>
          ) : null}
        </SectionContainer>
      </Fade>
    );
  }

  renderLivingExpenseSection() {
    const {
      intl,
      livingExpenses,
      clearLivingExpenses,
      changeLivingExpenseType,
      changeLivingExpenseCurrency,
      changeLivingExpenseAnnualAmount,
      deleteLivingExpenseItem,
      addLivingExpense,
      options,
    } = this.props;
    return (
      <Fade in={!!livingExpenses.length} unmountOnExit>
        <SectionContainer
          open={this.state.openSection.livingExpenses}
          title={intl.formatMessage(financialWizardMessages.livingExpenses)}
          onHeadClick={() =>
            this.setState(prevState => ({
              ...prevState,
              openSection: {
                ...prevState.openSection,
                livingExpenses: !prevState.openSection.livingExpenses,
              },
            }))
          }
          onSectionDelete={() => clearLivingExpenses()}
        >
          {livingExpenses.map((data, index) => {
            const selectedTypes = livingExpenses.map(livExp => livExp.type);
            const thisType = data.type;
            let livExpTypes = [...options.livingExpenseType];
            livExpTypes = livExpTypes.filter(
              type =>
                selectedTypes.indexOf(type.value) < 0 ||
                type.value === thisType,
            );
            const key = `living-expense-item-${index}`;
            return (
              <LivingExpenseItem
                key={key}
                livingExpenseType={data.type}
                currency={data.currency}
                annualAmount={data.annualAmount}
                onLivingExpenseTypeChange={value =>
                  changeLivingExpenseType(index, value)
                }
                onCurrencyChange={value =>
                  changeLivingExpenseCurrency(index, value)
                }
                onAnnualAmountChange={value =>
                  changeLivingExpenseAnnualAmount(index, value)
                }
                livingExpenseTypeOptions={livExpTypes}
                currencyOptions={options.currency}
                onDelete={() => deleteLivingExpenseItem(index)}
                validate={this.state.isSubmitting}
                onError={isError =>
                  this.handleItemValidation('livingExpenses', index, isError)
                }
              />
            );
          })}
          {livingExpenses.length < options.livingExpenseType.length ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                if (livingExpenses.length < options.livingExpenseType.length) {
                  return addLivingExpense();
                }
                return true;
              }}
            >
              {intl.formatMessage(messages.addItem)}
            </Button>
          ) : null}
        </SectionContainer>
      </Fade>
    );
  }

  renderLoanSection() {
    const {
      intl,
      loans,
      clearLoans,
      changeLoanType,
      changeLoanCurrency,
      changeLoanMonthlyAmount,
      changeLoanTenureMonths,
      deleteLoanItem,
      addLoan,
      options,
    } = this.props;
    return (
      <Fade in={!!loans.length} unmountOnExit>
        <SectionContainer
          open={this.state.openSection.loans}
          title={intl.formatMessage(financialWizardMessages.loans)}
          onHeadClick={() =>
            this.setState(prevState => ({
              ...prevState,
              openSection: {
                ...prevState.openSection,
                loans: !prevState.openSection.loans,
              },
            }))
          }
          onSectionDelete={() => clearLoans()}
        >
          {loans.map((data, index) => {
            const key = `loan-item-${index}`;
            return (
              <LoanItem
                key={key}
                loanType={data.type}
                currency={data.currency}
                monthlyAmount={data.monthlyAmount}
                tenureMonths={data.tenureRemainingInMonths}
                onLoanTypeChange={value => changeLoanType(index, value)}
                onCurrencyChange={value => changeLoanCurrency(index, value)}
                onMonthlyAmountChange={value =>
                  changeLoanMonthlyAmount(index, value)
                }
                onTenureMonthsChange={value =>
                  changeLoanTenureMonths(index, value)
                }
                loanTypeOptions={options.loanType}
                currencyOptions={options.currency}
                onDelete={() => deleteLoanItem(index)}
                validate={this.state.isSubmitting}
                onError={isError =>
                  this.handleItemValidation('loans', index, isError)
                }
              />
            );
          })}
          {loans.length < 5 ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                if (loans.length < 5) {
                  return addLoan();
                }
                return true;
              }}
            >
              {intl.formatMessage(messages.addItem)}
            </Button>
          ) : null}
        </SectionContainer>
      </Fade>
    );
  }

  renderTaxSection() {
    const {
      intl,
      taxes,
      clearTaxes,
      changeTaxType,
      changeTaxCurrency,
      changeTaxAnnualAmount,
      deleteTaxItem,
      addTax,
      options,
    } = this.props;
    return (
      <Fade in={!!taxes.length} unmountOnExit>
        <SectionContainer
          open={this.state.openSection.taxes}
          title={intl.formatMessage(financialWizardMessages.taxes)}
          onHeadClick={() =>
            this.setState(prevState => ({
              ...prevState,
              openSection: {
                ...prevState.openSection,
                taxes: !prevState.openSection.taxes,
              },
            }))
          }
          onSectionDelete={() => clearTaxes()}
        >
          {taxes.map((data, index) => {
            const key = `tax-item-${index}`;
            return (
              <TaxItem
                key={key}
                taxType={data.type}
                currency={data.currency}
                annualAmount={data.annualAmount}
                onTaxTypeChange={value => changeTaxType(index, value)}
                onCurrencyChange={value => changeTaxCurrency(index, value)}
                onAnnualAmountChange={value =>
                  changeTaxAnnualAmount(index, value)
                }
                taxTypeOptions={options.taxType}
                currencyOptions={options.currency}
                onDelete={() => deleteTaxItem(index)}
                validate={this.state.isSubmitting}
                onError={isError =>
                  this.handleItemValidation('taxes', index, isError)
                }
              />
            );
          })}
          {taxes.length < 5 ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                if (taxes.length < 5) {
                  return addTax();
                }
                return true;
              }}
            >
              {intl.formatMessage(messages.addItem)}
            </Button>
          ) : null}
        </SectionContainer>
      </Fade>
    );
  }

  renderMainContent() {
    const { income, livingExpenses, loans, taxes, intl } = this.props;
    if (
      income.length ||
      livingExpenses.length ||
      loans.length ||
      taxes.length
    ) {
      return (
        <div
          style={{
            height: '100%',
            width: '100%',
            overflow: 'auto',
            padding: `0 ${dimension.spacing.m}px`,
          }}
        >
          {this.renderIncomeSection()}
          {this.renderLivingExpenseSection()}
          {this.renderLoanSection()}
          {this.renderTaxSection()}
          {this.getMainErrorMessage() ? (
            <div
              style={{
                margin: `${dimension.spacing.m}px 0`,
                color: color.red,
              }}
            >
              <Typography variant="h3" color="inherit" align="center">
                {this.getMainErrorMessage()}
              </Typography>
            </div>
          ) : null}
          <div
            style={{
              textAlign: 'right',
              margin: `${dimension.spacing.m}px 0`,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleSubmit()}
            >
              {intl.formatMessage(messages.continue)}
            </Button>
          </div>
        </div>
      );
    }
    return this.renderMainSectionOptions();
  }

  render() {
    return (
      <Grid
        container
        wrap="nowrap"
        direction="column"
        alignItems="center"
        style={{
          height: '100%',
          position: 'relative',
        }}
      >
        <Grid
          item
          xs
          container
          direction="column"
          alignItems="center"
          style={{
            width: '100%',
          }}
        >
          {this.renderMainContent()}
        </Grid>
        <Grid
          item
          style={{
            width: '100%',
          }}
        >
          {this.renderSectionOptionsFooter()}
        </Grid>
        <Zoom in={this.state.isFooterAvailable && !this.state.isFooterOpen}>
          <FooterToggleButton
            onClick={() =>
              this.setState({
                isFooterOpen: true,
              })
            }
          />
        </Zoom>
      </Grid>
    );
  }
}

FinancialWizardCashflow.propTypes = {
  intl: PropTypes.object,
  // setDataState: PropTypes.func,
  income: PropTypes.array,
  livingExpenses: PropTypes.array,
  loans: PropTypes.array,
  taxes: PropTypes.array,
  addIncome: PropTypes.func,
  addLivingExpense: PropTypes.func,
  addLoan: PropTypes.func,
  addTax: PropTypes.func,
  clearIncome: PropTypes.func,
  clearLivingExpenses: PropTypes.func,
  clearLoans: PropTypes.func,
  clearTaxes: PropTypes.func,
  changeIncomeType: PropTypes.func,
  changeIncomeCurrency: PropTypes.func,
  changeAnnualIncome: PropTypes.func,
  deleteIncomeItem: PropTypes.func,
  changeLivingExpenseType: PropTypes.func,
  changeLivingExpenseCurrency: PropTypes.func,
  changeLivingExpenseAnnualAmount: PropTypes.func,
  deleteLivingExpenseItem: PropTypes.func,
  changeLoanType: PropTypes.func,
  changeLoanCurrency: PropTypes.func,
  changeLoanMonthlyAmount: PropTypes.func,
  changeLoanTenureMonths: PropTypes.func,
  deleteLoanItem: PropTypes.func,
  changeTaxType: PropTypes.func,
  changeTaxCurrency: PropTypes.func,
  changeTaxAnnualAmount: PropTypes.func,
  deleteTaxItem: PropTypes.func,
  deletedIds: PropTypes.array,
  cashflows: PropTypes.array,
  options: PropTypes.object,
  onMounted: PropTypes.func,
  onSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  income: makeSelectIncome(),
  livingExpenses: makeSelectLivingExpenses(),
  loans: makeSelectLoans(),
  taxes: makeSelectTaxes(),
  deletedIds: makeSelectDeletedIds(),
});

function mapDispatchToProps(dispatch) {
  return {
    setDataState: data => dispatch(setDataStateAction(data)),
    addIncome: () => dispatch(addIncomeAction()),
    addLivingExpense: () => dispatch(addLivingExpenseAction()),
    addLoan: () => dispatch(addLoanAction()),
    addTax: () => dispatch(addTaxAction()),
    clearIncome: () => dispatch(clearIncomeAction()),
    clearLivingExpenses: () => dispatch(clearLivingExpensesAction()),
    clearLoans: () => dispatch(clearLoansAction()),
    clearTaxes: () => dispatch(clearTaxesAction()),
    changeIncomeType: (index, value) =>
      dispatch(changeIncomeTypeAction(index, value)),
    changeIncomeCurrency: (index, value) =>
      dispatch(changeIncomeCurrencyAction(index, value)),
    changeAnnualIncome: (index, value) =>
      dispatch(changeAnnualIncomeAction(index, value)),
    deleteIncomeItem: index => dispatch(deleteIncomeItemAction(index)),
    changeLivingExpenseType: (index, value) =>
      dispatch(changeLivingExpenseTypeAction(index, value)),
    changeLivingExpenseCurrency: (index, value) =>
      dispatch(changeLivingExpenseCurrencyAction(index, value)),
    changeLivingExpenseAnnualAmount: (index, value) =>
      dispatch(changeLivingExpenseAnnualAmountAction(index, value)),
    deleteLivingExpenseItem: index =>
      dispatch(deleteLivingExpenseItemAction(index)),
    changeLoanType: (index, value) =>
      dispatch(changeLoanTypeAction(index, value)),
    changeLoanCurrency: (index, value) =>
      dispatch(changeLoanCurrencyAction(index, value)),
    changeLoanMonthlyAmount: (index, value) =>
      dispatch(changeLoanMonthlyAmountAction(index, value)),
    changeLoanTenureMonths: (index, value) =>
      dispatch(changeLoanTenureMonthsAction(index, value)),
    deleteLoanItem: index => dispatch(deleteLoanItemAction(index)),
    changeTaxType: (index, value) =>
      dispatch(changeTaxTypeAction(index, value)),
    changeTaxCurrency: (index, value) =>
      dispatch(changeTaxCurrencyAction(index, value)),
    changeTaxAnnualAmount: (index, value) =>
      dispatch(changeTaxAnnualAmountAction(index, value)),
    deleteTaxItem: index => dispatch(deleteTaxItemAction(index)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'financialWizardCashflow', reducer });
const withSaga = injectSaga({ key: 'financialWizardCashflow', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
)(FinancialWizardCashflow);
