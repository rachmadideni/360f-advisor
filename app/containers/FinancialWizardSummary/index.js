/**
 *
 * FinancialWizardSummary
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
import { Grid, Button, withStyles } from '@material-ui/core';
import { dimension, color } from 'styles/constants';
import Typography from 'components/Typography';
import {
  makeSelectIncome,
  makeSelectLivingExpenses,
  makeSelectTaxes,
  makeSelectLoans,
} from 'containers/FinancialWizardCashflow/selectors';
import IncomeItem from 'containers/FinancialWizardCashflow/components/IncomeItem';

import {
  changeIncomeTypeAction,
  changeIncomeCurrencyAction,
  changeAnnualIncomeAction,
  changeLivingExpenseTypeAction,
  changeLivingExpenseCurrencyAction,
  changeLivingExpenseAnnualAmountAction,
  changeLoanTypeAction,
  changeLoanCurrencyAction,
  changeLoanMonthlyAmountAction,
  changeLoanTenureMonthsAction,
  changeTaxTypeAction,
  changeTaxCurrencyAction,
  changeTaxAnnualAmountAction,
} from 'containers/FinancialWizardCashflow/actions';

import {
  changeInsuranceProviderAction,
  changeInsuranceCurrencyAction,
  changeInsuranceCurrentCashAction,
  changeInsuranceAnnualPremiumAction,
  changeMarkedGoalsAction,
  changeInstrumentTypeAction,
  changeInstrumentProviderAction,
  changeInstrumentCurrentValueAction,
  changeInvestmentCurrencyAction,
  changeInvestmentAnnualAction,
  changeInvestmentRateAction,
  changePropertyTypeAction,
  changeOwnershipTypeAction,
  changeOwnershipPercentageAction,
  changeRealisableAction,
  changePropertyRateAction,
  changeCountryLocationAction,
  changePropertyAddressAction,
  changePropertyCurrencyAction,
  changeOtherAssetTypeAction,
  changeOtherAssetDescriptionAction,
  changeOtherAssetCurrencyAction,
  changeOtherAssetRealisableValueAction,
  changeOtherAssetRateAction,
} from 'containers/FinancialWizardPortfolio/actions';

import {
  makeSelectLifeHealthInsurance,
  makeSelectSavingsInvestments,
  makeSelectPropertyHeldAssets,
  makeSelectOtherHeldAssets,
} from 'containers/FinancialWizardPortfolio/selectors';
import LivingExpenseItem from 'containers/FinancialWizardCashflow/components/LivingExpenseItem';
import LoanItem from 'containers/FinancialWizardCashflow/components/LoanItem';
import TaxItem from 'containers/FinancialWizardCashflow/components/TaxItem';
import {
  makeSelectPersonalDetailsData,
  makeSelectDependants,
} from 'containers/FinancialWizardPersonalDetails/selectors';
import {
  changeInputAction,
  changeDependantInputAction,
} from 'containers/FinancialWizardPersonalDetails/actions';
import InsuranceSection from 'containers/FinancialWizardPortfolio/InsuranceSection';
import InvestmentSection from 'containers/FinancialWizardPortfolio/InvestmentSection';
import PropertyHeldSection from 'containers/FinancialWizardPortfolio/PropertyHeldSection';
import OtherAssetsSection from 'containers/FinancialWizardPortfolio/OtherAssetsSection';
import { mapSectionsToCashflows } from 'containers/FinancialWizardCashflow/helpers';
import { makeSelectGoal } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import SectionContainer from '../FinancialWizardContainer/components/SectionContainer';
import SubSectionContainer from './components/SubSectionContainer';
import BasicInformationItem from './components/BasicInformationItem';
import WorkDetailsItem from './components/WorkDetailsItem';
import ContactDetailsItem from './components/ContactDetailsItem';
import EducationItem from './components/EducationItem';
import HealthRiskItem from './components/HealthRiskItem';
import PoliticalExposureItem from './components/PoliticalExposureItem';
import Dependants from './components/DependantsItem';
import GoalItem from './components/GoalItem';
import {
  addGoalAction,
  deleteGoalAction,
  changeGoalAction,
  changeAllocateAction,
  changeAmountAction,
  changeYearAction,
  changeGenderAction,
} from './actions';
/* eslint-disable react/prefer-stateless-function */

const styles = {
  button: {
    width: 168,
    height: 40,
    backgroundColor: `${color.grey[50]}`,
    borderRadius: `${dimension.borderRadius.xs}px`,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: `${color.cyan[400]}`,
    color: `${color.cyan[400]}`,
    fontWeight: 600,
  },
  notifyWrapper: {
    minWidth: 355,
    minHeight: 40,
    backgroundColor: `${color.solidPurple}`,
    borderRadius: `${dimension.borderRadius.xs}px`,
  },
  contentPadding: {
    padding: `${dimension.spacing.m}px 0px ${dimension.spacing.m}px ${
      dimension.spacing.m
    }px`,
  },
};

export class FinancialWizardSummary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isBasicEditing: false,
      isWorkDetailsEditing: false,
      isContactDetailsEditing: false,
      isEducationEditing: false,
      isHealthRiskEditing: false,
      isPoliticalExposureEditing: false,
      isDependantsEditing: false,
      isSubmitting: false,

      error: {
        income: {},
        livingExpenses: {},
        loans: {},
        taxes: {},
        personalDetails: {},
      },
      openSection: {
        personalDetails: false,
        subPersonalDetails: {
          basic: false,
          workDetails: false,
          contactDetails: false,
          education: false,
          healthRisk: false,
          political: false,
          dependant: false,
        },
        portfolio: false,
        cashFlow: false,
        goals: false,
        subPortfolio: {
          insurance: false,
          investment: false,
          property: false,
          otherAssets: false,
        },
        subCashFlow: {
          income: false,
          livingExpenses: false,
          loans: false,
          taxes: false,
        },
      },
    };
  }

  componentDidMount = () => {
    const { goals, addGoals } = this.props;
    if (goals.length === 0) {
      return addGoals();
    }
    return null;
  };

  validateForm() {
    const {
      income,
      livingExpenses,
      loans,
      taxes,
      personalDetails,
    } = this.state.error;

    console.log(this.state.error);
    return !!(
      (!income || !Object.keys(income).length) &&
      (!livingExpenses || !Object.keys(livingExpenses).length) &&
      (!loans || !Object.keys(loans).length) &&
      (!taxes || !Object.keys(taxes).length) &&
      personalDetails
    );
  }

  onPersonalDetailsClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        personalDetails: !prevState.openSection.personalDetails,
      },
    }));
  };

  onPortfolioClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        portfolio: !prevState.openSection.portfolio,
      },
    }));
  };

  onCashflowClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        cashFlow: !prevState.openSection.cashFlow,
      },
    }));
  };

  onGoalClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        goals: !prevState.openSection.goals,
      },
    }));
  };

  onWorkDetailsClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        subPersonalDetails: {
          ...prevState.openSection.subPersonalDetails,
          workDetails: !prevState.openSection.subPersonalDetails.workDetails,
        },
      },
    }));
  };

  onBasicInfoClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        subPersonalDetails: {
          ...prevState.openSection.subPersonalDetails,
          basic: !prevState.openSection.subPersonalDetails.basic,
        },
      },
    }));
  };

  onContactDetailsClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        subPersonalDetails: {
          ...prevState.openSection.subPersonalDetails,
          contactDetails: !prevState.openSection.subPersonalDetails
            .contactDetails,
        },
      },
    }));
  };

  onEducationClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        subPersonalDetails: {
          ...prevState.openSection.subPersonalDetails,
          education: !prevState.openSection.subPersonalDetails.education,
        },
      },
    }));
  };

  onHealthRiskClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        subPersonalDetails: {
          ...prevState.openSection.subPersonalDetails,
          healthRisk: !prevState.openSection.subPersonalDetails.healthRisk,
        },
      },
    }));
  };

  onPoliticalExposureClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        subPersonalDetails: {
          ...prevState.openSection.subPersonalDetails,
          political: !prevState.openSection.subPersonalDetails.political,
        },
      },
    }));
  };

  onDependantsClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        subPersonalDetails: {
          ...prevState.openSection.subPersonalDetails,
          dependant: !prevState.openSection.subPersonalDetails.dependant,
        },
      },
    }));
  };

  onInsuranceClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        subPortfolio: {
          ...prevState.openSection.subPortfolio,
          insurance: !prevState.openSection.subPortfolio.insurance,
        },
      },
    }));
  };

  onInvestmentClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        subPortfolio: {
          ...prevState.openSection.subPortfolio,
          investment: !prevState.openSection.subPortfolio.investment,
        },
      },
    }));
  };

  onPropertyClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        subPortfolio: {
          ...prevState.openSection.subPortfolio,
          property: !prevState.openSection.subPortfolio.property,
        },
      },
    }));
  };

  onOtherAssetsClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        subPortfolio: {
          ...prevState.openSection.subPortfolio,
          otherAssets: !prevState.openSection.subPortfolio.otherAssets,
        },
      },
    }));
  };

  onIncomeClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        subCashFlow: {
          ...prevState.openSection.subCashFlow,
          income: !prevState.openSection.subCashFlow.income,
        },
      },
    }));
  };

  onLivingExpensesClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        subCashFlow: {
          ...prevState.openSection.subCashFlow,
          livingExpenses: !prevState.openSection.subCashFlow.livingExpenses,
        },
      },
    }));
  };

  onLoansClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        subCashFlow: {
          ...prevState.openSection.subCashFlow,
          loans: !prevState.openSection.subCashFlow.loans,
        },
      },
    }));
  };

  onTaxesClick = () => {
    this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        subCashFlow: {
          ...prevState.openSection.subCashFlow,
          taxes: !prevState.openSection.subCashFlow.taxes,
        },
      },
    }));
  };

  handleAddGoalClick = () => {
    const { addGoals } = this.props;

    return addGoals();
  };

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

  handleInputChange(key, value) {
    const { changeInput } = this.props;
    return changeInput(key, value);
  }

  handleSubmit() {
    this.setState({
      isSubmitting: true,
    });

    if (!this.validateForm()) {
      return false;
    }

    const {
      personalDetails,
      income,
      livingExpenses,
      loans,
      taxes,
      dependants,
      insurances,
      investments,
      propertyAssets,
      otherAssets,
    } = this.props;

    const cashFlowSections = {
      income,
      livingExpenses,
      loans,
      taxes,
    };
    const updatedCashflows = mapSectionsToCashflows(cashFlowSections);

    return this.props.onSubmit(personalDetails, updatedCashflows);
  }

  /**
  |--------------------------------------------------
  | Render PERSONAL DETAILS section
  |--------------------------------------------------
  */
  renderPersonalDetailsSection() {
    const {
      intl,
      options,
      personalDetails,
      dependants,
      changeDependantInput,
    } = this.props;
    return (
      <SectionContainer
        notDeletable
        open={this.state.openSection.personalDetails}
        title={intl.formatMessage(messages.personalDetails)}
        onHeadClick={this.onPersonalDetailsClick}
      >
        <SubSectionContainer
          open={this.state.openSection.subPersonalDetails.basic}
          title={intl.formatMessage(messages.basicInformation)}
          isError={this.state.error.personalDetails[0]}
          status={
            this.state.error.personalDetails[0]
              ? intl.formatMessage(messages.pleaseFixThisError)
              : intl.formatMessage(messages.saved)
          }
          isEditMode={this.state.isBasicEditing}
          onEditClick={() => {
            this.setState(state => ({
              ...state,
              isBasicEditing: true,
            }));
          }}
          onHeadClick={this.onBasicInfoClick}
        >
          <BasicInformationItem
            data={personalDetails}
            onInputChange={(key, value) => this.handleInputChange(key, value)}
            genderOptions={options.gender}
            maritalStatusOptions={options.maritalStatus}
            nationalityOptions={options.nationality}
            idTypeOptions={options.idType}
            isEditMode={this.state.isBasicEditing}
            validate={this.state.isSubmitting}
            onError={isError =>
              this.handleItemValidation('personalDetails', 0, isError)
            }
          />
        </SubSectionContainer>
        <SubSectionContainer
          open={this.state.openSection.subPersonalDetails.workDetails}
          title={intl.formatMessage(messages.workDetails)}
          status=""
          isEditMode={this.state.isWorkDetailsEditing}
          onEditClick={() => {
            this.setState(state => ({
              ...state,
              isWorkDetailsEditing: true,
            }));
          }}
          onHeadClick={this.onWorkDetailsClick}
        >
          <WorkDetailsItem
            employmentStatusOptions={options.employmentStatus}
            industryOptions={options.industry}
            occupationOptions={options.occupation}
            countryPrefixOptions={options.countryPrefix}
            personalDetails={personalDetails}
            isEditMode={this.state.isWorkDetailsEditing}
            onInputChange={(key, value) => this.handleInputChange(key, value)}
          />
        </SubSectionContainer>
        <SubSectionContainer
          open={this.state.openSection.subPersonalDetails.contactDetails}
          title={intl.formatMessage(messages.contactDetails)}
          status=""
          isEditMode={this.state.isContactDetailsEditing}
          onEditClick={() => {
            this.setState(state => ({
              ...state,
              isContactDetailsEditing: true,
            }));
          }}
          onHeadClick={this.onContactDetailsClick}
        >
          <ContactDetailsItem
            personalDetails={personalDetails}
            isEditMode={this.state.isContactDetailsEditing}
            onInputChange={(key, value) => this.handleInputChange(key, value)}
          />
        </SubSectionContainer>
        <SubSectionContainer
          open={this.state.openSection.subPersonalDetails.education}
          title={intl.formatMessage(messages.education)}
          status=""
          isEditMode={this.state.isEducationEditing}
          onEditClick={() => {
            this.setState(state => ({
              ...state,
              isEducationEditing: true,
            }));
          }}
          onHeadClick={this.onEducationClick}
        >
          <EducationItem
            isEditMode={this.state.isEducationEditing}
            educationLevelOptions={options.educationLevel}
            personalDetails={personalDetails}
            onInputChange={(key, value) => this.handleInputChange(key, value)}
          />
        </SubSectionContainer>
        <SubSectionContainer
          open={this.state.openSection.subPersonalDetails.healthRisk}
          title={intl.formatMessage(messages.healthRisk)}
          status=""
          isEditMode={this.state.isHealthRiskEditing}
          onEditClick={() => {
            this.setState(state => ({
              ...state,
              isHealthRiskEditing: true,
            }));
          }}
          onHeadClick={this.onHealthRiskClick}
        >
          <HealthRiskItem
            personalDetails={personalDetails}
            onInputChange={(key, value) => this.handleInputChange(key, value)}
            isEditMode={this.state.isHealthRiskEditing}
          />
        </SubSectionContainer>
        <SubSectionContainer
          open={this.state.openSection.subPersonalDetails.political}
          title={intl.formatMessage(messages.politicalExposure)}
          status=""
          isEditMode={this.state.isPoliticalExposureEditing}
          onEditClick={() => {
            this.setState(state => ({
              ...state,
              isPoliticalExposureEditing: true,
            }));
          }}
          onHeadClick={this.onPoliticalExposureClick}
        >
          <PoliticalExposureItem
            pepRelationshipOptions={options.pepRelationship}
            countryOptions={options.country}
            personalDetails={personalDetails}
            onInputChange={(key, value) => this.handleInputChange(key, value)}
            isEditMode={this.state.isPoliticalExposureEditing}
          />
        </SubSectionContainer>
        <SubSectionContainer
          open={this.state.openSection.subPersonalDetails.dependant}
          title={intl.formatMessage(messages.dependants)}
          status=""
          isEditMode={this.state.isDependantsEditing}
          onEditClick={() => {
            this.setState(state => ({
              ...state,
              isDependantsEditing: true,
            }));
          }}
          onHeadClick={this.onDependantsClick}
        >
          <Dependants
            options={options}
            dependants={dependants}
            onInputChange={(index, key, value) =>
              changeDependantInput(index, key, value)
            }
            isEditMode={this.state.isDependantsEditing}
          />
        </SubSectionContainer>
      </SectionContainer>
    );
  }

  /**
  |--------------------------------------------------
  | End Render PERSONAL DETAILS section
  |--------------------------------------------------
  */

  renderPortfolioSection() {
    const { intl } = this.props;
    return (
      <SectionContainer
        notDeletable
        open={this.state.openSection.portfolio}
        title={intl.formatMessage(messages.portfolio)}
        onHeadClick={this.onPortfolioClick}
      >
        {this.renderInsuranceSection()}
        {this.renderInvestmentSection()}
        {this.renderPropertySection()}
        {this.renderOtherAssetsSection()}
      </SectionContainer>
    );
  }

  /**
  |--------------------------------------------------
  | Render CASH FLOW section
  |--------------------------------------------------
  */

  renderCashFlowSection() {
    const { intl } = this.props;
    return (
      <SectionContainer
        notDeletable
        open={this.state.openSection.cashFlow}
        title={intl.formatMessage(messages.cashFlowInformation)}
        onHeadClick={this.onCashflowClick}
      >
        {this.renderIncomeSection()}
        {this.renderLivingExpenseSection()}
        {this.renderLoanSection()}
        {this.renderTaxSection()}
      </SectionContainer>
    );
  }

  renderTaxSection() {
    const {
      intl,
      taxes,
      classes,
      changeTaxType,
      changeTaxCurrency,
      changeTaxAnnualAmount,
      options,
    } = this.props;
    return taxes.length > 0 ? (
      <SubSectionContainer
        open={this.state.openSection.subCashFlow.taxes}
        title={intl.formatMessage(messages.taxes)}
        status=""
        isEditMode
        onEditClick={() => {
          this.setState(state => ({
            ...state,
            openSection: {
              ...state.openSection,
              subCashFlow: {
                ...state.openSection.subCashFlow,
                taxes: true,
              },
            },
          }));
        }}
        onHeadClick={this.onTaxesClick}
      >
        {taxes.map((data, index) => {
          const key = `tax-item-${index}`;
          return (
            <div key={key} className={classes.contentPadding}>
              <TaxItem
                notDeletable
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
                onDelete={null}
                validate
                onError={isError =>
                  this.handleItemValidation('taxes', index, isError)
                }
              />
            </div>
          );
        })}
      </SubSectionContainer>
    ) : null;
  }

  renderLoanSection() {
    const {
      intl,
      classes,
      loans,
      changeLoanType,
      changeLoanCurrency,
      changeLoanMonthlyAmount,
      changeLoanTenureMonths,
      options,
    } = this.props;
    return loans.length > 0 ? (
      <SubSectionContainer
        open={this.state.openSection.subCashFlow.loans}
        title={intl.formatMessage(messages.loans)}
        status=""
        isEditMode
        onEditClick={() => {
          this.setState(state => ({
            ...state,
            openSection: {
              ...state.openSection,
              subCashFlow: {
                ...state.openSection.subCashFlow,
                loans: true,
              },
            },
          }));
        }}
        onHeadClick={this.onLoansClick}
      >
        {loans.map((data, index) => {
          const key = `loan-item-${index}`;
          return (
            <div key={key} className={classes.contentPadding}>
              <LoanItem
                notDeletable
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
                onDelete={null}
                validate={this.state.isSubmitting}
                onError={isError =>
                  this.handleItemValidation('loans', index, isError)
                }
              />
            </div>
          );
        })}
      </SubSectionContainer>
    ) : null;
  }

  renderInsuranceSection() {
    const {
      intl,
      classes,
      insurances,
      changeInsuranceProvider,
      changeInsuranceCurrency,
      changeInsuranceAnnualPremium,
      changeInsuranceCurrentCash,
      changeMarkedGoals,
      options,
    } = this.props;
    return insurances.length > 0 ? (
      <SubSectionContainer
        open={this.state.openSection.subPortfolio.insurance}
        title={intl.formatMessage(messages.lifeAndHealthInsurance)}
        status=""
        isEditMode
        onEditClick={() => {
          this.setState(state => ({
            ...state,
            openSection: {
              ...state.openSection,
              subPortfolio: {
                ...state.openSection.subPortfolio,
                insurance: true,
              },
            },
          }));
        }}
        onHeadClick={this.onInsuranceClick}
      >
        {insurances.map((data, index) => {
          const key = `insurance-item-${index}`;
          return (
            <div key={key} className={classes.contentPadding}>
              <InsuranceSection
                notDeletable
                intl={intl}
                insuranceProvider={data.provider}
                currencyOptions={options.currency}
                currency={data.currency}
                annualPremium={data.annualPremium}
                currentCash={data.currentCash}
                benefitOptions={options.benefitsType}
                markedForGoals={data.markedForGoals}
                addBenefit={null}
                onChangeInsuranceProvider={value =>
                  changeInsuranceProvider(index, value)
                }
                onChangeInsuranceCurrency={value =>
                  changeInsuranceCurrency(index, value)
                }
                onChangeInsuranceAnnualPremium={value =>
                  changeInsuranceAnnualPremium(index, value)
                }
                onChangeInsuranceCurrentCash={value =>
                  changeInsuranceCurrentCash(index, value)
                }
                onChangeMarkedGoals={value => changeMarkedGoals(index, value)}
                onDelete={null}
                validate={this.state.isSubmitting}
                onError={isError =>
                  this.handleItemValidation('insurances', index, isError)
                }
              />
            </div>
          );
        })}
      </SubSectionContainer>
    ) : null;
  }

  renderOtherAssetsSection() {
    const {
      intl,
      classes,
      otherAssets,
      changeOtherAssetType,
      changeOtherAssetDescription,
      changeOtherAssetCurrency,
      changeOtherAssetRealisableValue,
      changeOtherAssetRate,
      options,
    } = this.props;
    return otherAssets.length > 0 ? (
      <SubSectionContainer
        open={this.state.openSection.subPortfolio.otherAssets}
        title={intl.formatMessage(messages.otherHeldAssets)}
        status=""
        isEditMode
        onEditClick={() => {
          this.setState(state => ({
            ...state,
            openSection: {
              ...state.openSection,
              subPortfolio: {
                ...state.openSection.subPortfolio,
                otherAssets: true,
              },
            },
          }));
        }}
        onHeadClick={this.onOtherAssetsClick}
      >
        {otherAssets.map((data, index) => {
          const key = `other-assets-item-${index}`;
          return (
            <div key={key} className={classes.contentPadding}>
              <OtherAssetsSection
                notDeletable
                assetType={data.assetType}
                assetDescription={data.assetDescription}
                currency={data.currency}
                currencyOptions={options.currency}
                realisableValue={data.realisableValue}
                rateOfReturn={data.rateOfReturn}
                onChangeOtherAssetType={value =>
                  changeOtherAssetType(index, value)
                }
                onChangeOtherAssetDescription={value =>
                  changeOtherAssetDescription(index, value)
                }
                onChangeOtherAssetCurrency={value =>
                  changeOtherAssetCurrency(index, value)
                }
                onChangeOtherAssetRealisableValue={value =>
                  changeOtherAssetRealisableValue(index, value)
                }
                onChangeOtherAssetRate={value =>
                  changeOtherAssetRate(index, value)
                }
                onDelete={null}
                validate={this.state.isSubmitting}
                onError={isError =>
                  this.handleItemValidation('otherAssets', index, isError)
                }
              />
            </div>
          );
        })}
      </SubSectionContainer>
    ) : null;
  }

  renderPropertySection() {
    const {
      intl,
      classes,
      propertyAssets,
      changePropertyType,
      changeOwnershipType,
      changePropertyCurrency,
      changeRealisable,
      changePropertyRate,
      changeOwnershipPercentage,
      changeCountryLocation,
      changePropertyAddress,
      options,
    } = this.props;
    return propertyAssets.length > 0 ? (
      <SubSectionContainer
        open={this.state.openSection.subPortfolio.property}
        title={intl.formatMessage(messages.propertyHeld)}
        status=""
        isEditMode
        onEditClick={() => {
          this.setState(state => ({
            ...state,
            openSection: {
              ...state.openSection,
              subPortfolio: {
                ...state.openSection.subPortfolio,
                property: true,
              },
            },
          }));
        }}
        onHeadClick={this.onPropertyClick}
      >
        {propertyAssets.map((data, index) => {
          const ownershipType = [...options.ownershipType];
          const ownershipTypeOptions = ownershipType.filter(
            type => type.title !== null,
          );

          const key = `property-item-${index}`;
          return (
            <div key={key} className={classes.contentPadding}>
              <PropertyHeldSection
                notDeletable
                propertyType={data.propertyType}
                onChangePropertyType={value => changePropertyType(index, value)}
                propertyTypeOptions={options.propertyType}
                ownershipType={data.ownershipType}
                onChangeOwnershipType={value =>
                  changeOwnershipType(index, value)
                }
                ownershipTypeOptions={ownershipTypeOptions}
                currencyOptions={options.currency}
                currency={data.currency}
                onChangePropertyCurrency={value =>
                  changePropertyCurrency(index, value)
                }
                currentRealisableValue={data.currentRealisableValue}
                onChangeRealisable={value => changeRealisable(index, value)}
                rateOfReturn={data.rateOfReturn}
                onChangePropertyRate={value => changePropertyRate(index, value)}
                percentageOfOwnership={data.percentageOfOwnership}
                onChangeOwnershipPercentage={value =>
                  changeOwnershipPercentage(index, value)
                }
                countryOfLocation={data.countryOfLocation}
                onChangeCountryLocation={value =>
                  changeCountryLocation(index, value)
                }
                addressOfProperty={data.addressOfProperty}
                onChangePropertyAddress={value =>
                  changePropertyAddress(index, value)
                }
                onDelete={null}
                validate={this.state.isSubmitting}
                onError={isError =>
                  this.handleItemValidation('propertyAssets', index, isError)
                }
              />
            </div>
          );
        })}
      </SubSectionContainer>
    ) : null;
  }

  renderInvestmentSection() {
    const {
      intl,
      classes,
      investments,
      changeInstrumentType,
      changeInstrumentProvider,
      changeInstrumentCurrentValue,
      changeInvestmentCurrency,
      changeInvestmentAnnual,
      changeInvestmentRate,
      options,
    } = this.props;
    return investments.length > 0 ? (
      <SubSectionContainer
        open={this.state.openSection.subPortfolio.investment}
        title={intl.formatMessage(messages.savingAndInvestments)}
        status=""
        isEditMode
        onEditClick={() => {
          this.setState(state => ({
            ...state,
            openSection: {
              ...state.openSection,
              subPortfolio: {
                ...state.openSection.subPortfolio,
                investment: true,
              },
            },
          }));
        }}
        onHeadClick={this.onInvestmentClick}
      >
        {investments.map((data, index) => {
          const key = `investment-item-${index}`;
          return (
            <div key={key} className={classes.contentPadding}>
              <InvestmentSection
                notDeletable
                intl={intl}
                instrumentType={data.instrumentType}
                instrumentTypeOptions={options.instrumentType}
                instrumentProvider={data.instrumentProvider}
                annualContributions={data.annualContributions}
                rateOfReturn={data.rateOfReturn}
                currentValue={data.currentValue}
                currency={data.currency}
                currencyOptions={options.currency}
                onInstrumentTypeChange={value =>
                  changeInstrumentType(index, value)
                }
                onInstrumentProviderChange={value =>
                  changeInstrumentProvider(index, value)
                }
                onInstrumentCurrentValueChange={value =>
                  changeInstrumentCurrentValue(index, value)
                }
                onInvestmentCurrencyChange={value =>
                  changeInvestmentCurrency(index, value)
                }
                onInvestmentAnnualChange={value =>
                  changeInvestmentAnnual(index, value)
                }
                onInvestmentRateChange={value =>
                  changeInvestmentRate(index, value)
                }
                onDelete={null}
                validate={this.state.isSubmitting}
                onError={isError =>
                  this.handleItemValidation('investments', index, isError)
                }
              />
            </div>
          );
        })}
      </SubSectionContainer>
    ) : null;
  }

  renderIncomeSection() {
    const {
      intl,
      classes,
      income,
      changeIncomeType,
      changeIncomeCurrency,
      changeAnnualIncome,
      options,
    } = this.props;
    return income.length > 0 ? (
      <SubSectionContainer
        open={this.state.openSection.subCashFlow.income}
        title={intl.formatMessage(messages.income)}
        status=""
        isEditMode
        onEditClick={() => {
          this.setState(state => ({
            ...state,
            openSection: {
              ...state.openSection,
              subCashFlow: {
                ...state.openSection.subCashFlow,
                income: true,
              },
            },
          }));
        }}
        onHeadClick={this.onIncomeClick}
      >
        {income.map((data, index) => {
          const selectedTypes = income.map(inc => inc.type);
          const thisType = data.type;
          let incomeTypes = [...options.incomeType];
          incomeTypes = incomeTypes.filter(
            type =>
              selectedTypes.indexOf(type.value) < 0 || type.value === thisType,
          );

          const key = `income-item-${index}`;
          return (
            <div key={key} className={classes.contentPadding}>
              <IncomeItem
                notDeletable
                incomeType={data.type}
                currency={data.currency}
                annualIncome={data.annualAmount}
                onIncomeTypeChange={value => changeIncomeType(index, value)}
                onCurrencyChange={value => changeIncomeCurrency(index, value)}
                onAnnualIncomeChange={value => changeAnnualIncome(index, value)}
                incomeTypeOptions={incomeTypes}
                currencyOptions={options.currency}
                onDelete={null}
                validate={this.state.isSubmitting}
                onError={isError =>
                  this.handleItemValidation('income', index, isError)
                }
              />
            </div>
          );
        })}
      </SubSectionContainer>
    ) : null;
  }

  renderLivingExpenseSection() {
    const {
      intl,
      classes,
      livingExpenses,
      changeLivingExpenseType,
      changeLivingExpenseCurrency,
      changeLivingExpenseAnnualAmount,
      options,
    } = this.props;
    return livingExpenses.length > 0 ? (
      <SubSectionContainer
        open={this.state.openSection.subCashFlow.livingExpenses}
        title={intl.formatMessage(messages.livingExpenses)}
        status=""
        isEditMode
        onEditClick={() => {
          this.setState(state => ({
            ...state,
            openSection: {
              ...state.openSection,
              subCashFlow: {
                ...state.openSection.subCashFlow,
                livingExpenses: true,
              },
            },
          }));
        }}
        onHeadClick={this.onLivingExpensesClick}
      >
        {livingExpenses.map((data, index) => {
          const selectedTypes = livingExpenses.map(livExp => livExp.type);
          const thisType = data.type;
          let livExpTypes = [...options.livingExpenseType];
          livExpTypes = livExpTypes.filter(
            type =>
              selectedTypes.indexOf(type.value) < 0 || type.value === thisType,
          );

          const key = `living-expense-item-${index}`;
          return (
            <div key={key} className={classes.contentPadding}>
              <LivingExpenseItem
                notDeletable
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
                onDelete={null}
                validate={this.state.isSubmitting}
                onError={isError =>
                  this.handleItemValidation('livingExpenses', index, isError)
                }
              />
            </div>
          );
        })}
      </SubSectionContainer>
    ) : null;
  }
  /**
  |--------------------------------------------------
  | End Render CASH FLOW section
  |--------------------------------------------------
  */

  /**
  |--------------------------------------------------
  | Render GOAL section
  |--------------------------------------------------
  */

  renderGoalsSection() {
    const {
      intl,
      classes,
      goals,
      deleteGoal,
      goalChange,
      allocateChange,
      amountChange,
      yearChange,
    } = this.props;

    return (
      <SectionContainer
        notDeletable
        hasPadding={false}
        open={this.state.openSection.goals}
        title={intl.formatMessage(messages.goals)}
        onHeadClick={this.onGoalClick}
      >
        <Grid
          item
          xs
          container
          direction="column"
          alignItems="center"
          style={{
            width: '100%',
            padding: `${dimension.spacing.s}px`,
          }}
        >
          <Grid item>
            <Typography
              gutterBottom
              variant="h4"
              style={{ color: `${color.lightRed}` }}
            >
              {intl.formatMessage(messages.alternateCopyIfNumberIsZero)}
            </Typography>
          </Grid>
          <Grid item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className={classes.notifyWrapper}
            >
              <Typography variant="h4" style={{ color: `${color.white}` }}>
                {intl.formatMessage(messages.youHaveSetAside)}
              </Typography>
              <Typography
                variant="h4"
                style={{
                  padding: `0px 5px 0px 5px`,
                  fontWeight: 700,
                  color: `${color.cyan[400]}`,
                }}
              >
                {'$5m'}
              </Typography>
              <Typography variant="h4" style={{ color: `${color.white}` }}>
                {intl.formatMessage(messages.forYourGoals)}
              </Typography>
            </div>
          </Grid>
        </Grid>

        {goals.map((data, index) => {
          const key = `goal-item-${index}`;
          return (
            <Grid key={key} item>
              <GoalItem
                goal={data.goal}
                allocate={data.allocate}
                amount={data.amount}
                year={data.year}
                validate={this.state.isSubmitting}
                onGoalChange={value => goalChange(index, value)}
                onAllocateChange={value => allocateChange(index, value)}
                onYearChange={value => yearChange(index, value)}
                onAmountChange={value => amountChange(index, value)}
                onDelete={() => {
                  if (goals.length === 1) {
                    return null;
                  }
                  return deleteGoal(index);
                }}
              />
            </Grid>
          );
        })}
        {goals.length < 4 ? (
          <div
            style={{
              textAlign: 'center',
              position: 'relative',
              bottom: '30px',
            }}
          >
            <div
              style={{
                width: '200px',
                left: '50%',
                transform: 'translateX(-50%)',
                position: 'relative',
                backgroundColor: `${color.grey[50]}`,
              }}
            >
              <Button
                className={classes.button}
                onClick={this.handleAddGoalClick}
              >
                {intl.formatMessage(messages.addGoal)}
              </Button>
            </div>
          </div>
        ) : null}
      </SectionContainer>
    );
  }

  /**
  |--------------------------------------------------
  | End Render GOAL section
  |--------------------------------------------------
  */

  render() {
    const { intl } = this.props;
    return (
      <Grid
        wrap="nowrap"
        container
        direction="column"
        style={{
          height: '100%',
        }}
      >
        <Grid
          item
          xs
          style={{
            overflow: 'auto',
          }}
        >
          <div
            style={{
              padding: `0px ${dimension.spacing.m}px`,
            }}
          >
            {this.renderPersonalDetailsSection()}
            {this.renderPortfolioSection()}
            {this.renderCashFlowSection()}
            {this.renderGoalsSection()}
            <div
              style={{
                textAlign: 'right',
                padding: `${dimension.spacing.m}px 0px ${
                  dimension.spacing.m
                }px`,
              }}
            >
              <Button
                style={{
                  width: 180,
                  height: 40,
                  fontSize: 16,
                  fontWeight: 600,
                }}
                variant="contained"
                color="primary"
                onClick={() => this.handleSubmit()}
              >
                {intl.formatMessage(messages.save)}
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

FinancialWizardSummary.propTypes = {
  intl: PropTypes.object,
  classes: PropTypes.object,
  addGoals: PropTypes.func,
  goals: PropTypes.array,
  deleteGoal: PropTypes.func,
  goalChange: PropTypes.func,
  yearChange: PropTypes.func,
  amountChange: PropTypes.func,
  allocateChange: PropTypes.func,
  changeIncomeType: PropTypes.func,
  changeIncomeCurrency: PropTypes.func,
  changeAnnualIncome: PropTypes.func,
  income: PropTypes.array,
  livingExpenses: PropTypes.array,
  loans: PropTypes.array,
  taxes: PropTypes.array,
  insurances: PropTypes.array,
  investments: PropTypes.array,
  propertyAssets: PropTypes.array,
  otherAssets: PropTypes.array,
  changeLivingExpenseType: PropTypes.func,
  changeLivingExpenseCurrency: PropTypes.func,
  changeLivingExpenseAnnualAmount: PropTypes.func,
  changeLoanType: PropTypes.func,
  changeLoanCurrency: PropTypes.func,
  changeLoanMonthlyAmount: PropTypes.func,
  changeLoanTenureMonths: PropTypes.func,
  changeTaxType: PropTypes.func,
  changeTaxCurrency: PropTypes.func,
  changeTaxAnnualAmount: PropTypes.func,
  options: PropTypes.object,
  personalDetails: PropTypes.object,
  dependants: PropTypes.array,
  changeInput: PropTypes.func,
  changeDependantInput: PropTypes.func,
  changeInsuranceProvider: PropTypes.func,
  changeInsuranceCurrency: PropTypes.func,
  changeInsuranceAnnualPremium: PropTypes.func,
  changeInsuranceCurrentCash: PropTypes.func,
  changeMarkedGoals: PropTypes.func,
  changeInstrumentType: PropTypes.func,
  changeInstrumentProvider: PropTypes.func,
  changeInstrumentCurrentValue: PropTypes.func,
  changeInvestmentCurrency: PropTypes.func,
  changeInvestmentAnnual: PropTypes.func,
  changeInvestmentRate: PropTypes.func,

  changePropertyType: PropTypes.func,
  changeOwnershipType: PropTypes.func,
  changeOwnershipPercentage: PropTypes.func,
  changeRealisable: PropTypes.func,
  changePropertyRate: PropTypes.func,
  changeCountryLocation: PropTypes.func,
  changePropertyAddress: PropTypes.func,
  changePropertyCurrency: PropTypes.func,

  changeOtherAssetType: PropTypes.func,
  changeOtherAssetDescription: PropTypes.func,
  changeOtherAssetCurrency: PropTypes.func,
  changeOtherAssetRealisableValue: PropTypes.func,
  changeOtherAssetRate: PropTypes.func,

  onSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  goals: makeSelectGoal(),
  income: makeSelectIncome(),
  livingExpenses: makeSelectLivingExpenses(),
  loans: makeSelectLoans(),
  taxes: makeSelectTaxes(),
  personalDetails: makeSelectPersonalDetailsData(),
  dependants: makeSelectDependants(),
  insurances: makeSelectLifeHealthInsurance(),
  investments: makeSelectSavingsInvestments(),
  propertyAssets: makeSelectPropertyHeldAssets(),
  otherAssets: makeSelectOtherHeldAssets(),
});

function mapDispatchToProps(dispatch) {
  return {
    addGoals: () => dispatch(addGoalAction()),
    deleteGoal: index => dispatch(deleteGoalAction(index)),
    goalChange: (index, value) => dispatch(changeGoalAction(index, value)),
    amountChange: (index, value) => dispatch(changeAmountAction(index, value)),
    changeGender: (index, value) => dispatch(changeGenderAction(index, value)),
    changeInput: (key, value) => dispatch(changeInputAction(key, value)),
    changeDependantInput: (index, key, value) =>
      dispatch(changeDependantInputAction(index, key, value)),
    yearChange: (index, value) => dispatch(changeYearAction(index, value)),
    allocateChange: (index, value) =>
      dispatch(changeAllocateAction(index, value)),

    changeIncomeType: (index, value) =>
      dispatch(changeIncomeTypeAction(index, value)),
    changeIncomeCurrency: (index, value) =>
      dispatch(changeIncomeCurrencyAction(index, value)),
    changeAnnualIncome: (index, value) =>
      dispatch(changeAnnualIncomeAction(index, value)),
    changeLivingExpenseType: (index, value) =>
      dispatch(changeLivingExpenseTypeAction(index, value)),
    changeLivingExpenseCurrency: (index, value) =>
      dispatch(changeLivingExpenseCurrencyAction(index, value)),
    changeLivingExpenseAnnualAmount: (index, value) =>
      dispatch(changeLivingExpenseAnnualAmountAction(index, value)),

    changeLoanType: (index, value) =>
      dispatch(changeLoanTypeAction(index, value)),
    changeLoanCurrency: (index, value) =>
      dispatch(changeLoanCurrencyAction(index, value)),
    changeLoanMonthlyAmount: (index, value) =>
      dispatch(changeLoanMonthlyAmountAction(index, value)),
    changeLoanTenureMonths: (index, value) =>
      dispatch(changeLoanTenureMonthsAction(index, value)),

    changeTaxType: (index, value) =>
      dispatch(changeTaxTypeAction(index, value)),
    changeTaxCurrency: (index, value) =>
      dispatch(changeTaxCurrencyAction(index, value)),
    changeTaxAnnualAmount: (index, value) =>
      dispatch(changeTaxAnnualAmountAction(index, value)),

    changeInsuranceProvider: (index, value) =>
      dispatch(changeInsuranceProviderAction(index, value)),
    changeInsuranceCurrency: (index, value) =>
      dispatch(changeInsuranceCurrencyAction(index, value)),
    changeInsuranceAnnualPremium: (index, value) =>
      dispatch(changeInsuranceAnnualPremiumAction(index, value)),
    changeInsuranceCurrentCash: (index, value) =>
      dispatch(changeInsuranceCurrentCashAction(index, value)),
    changeMarkedGoals: (index, value) =>
      dispatch(changeMarkedGoalsAction(index, value)),

    changeInstrumentType: (index, value) =>
      dispatch(changeInstrumentTypeAction(index, value)),
    changeInstrumentProvider: (index, value) =>
      dispatch(changeInstrumentProviderAction(index, value)),
    changeInstrumentCurrentValue: (index, value) =>
      dispatch(changeInstrumentCurrentValueAction(index, value)),
    changeInvestmentCurrency: (index, value) =>
      dispatch(changeInvestmentCurrencyAction(index, value)),
    changeInvestmentAnnual: (index, value) =>
      dispatch(changeInvestmentAnnualAction(index, value)),
    changeInvestmentRate: (index, value) =>
      dispatch(changeInvestmentRateAction(index, value)),

    changePropertyType: (index, value) =>
      dispatch(changePropertyTypeAction(index, value)),
    changeOwnershipType: (index, value) =>
      dispatch(changeOwnershipTypeAction(index, value)),
    changeOwnershipPercentage: (index, value) =>
      dispatch(changeOwnershipPercentageAction(index, value)),
    changeRealisable: (index, value) =>
      dispatch(changeRealisableAction(index, value)),
    changePropertyRate: (index, value) =>
      dispatch(changePropertyRateAction(index, value)),
    changeCountryLocation: (index, value) =>
      dispatch(changeCountryLocationAction(index, value)),
    changePropertyAddress: (index, value) =>
      dispatch(changePropertyAddressAction(index, value)),
    changePropertyCurrency: (index, value) =>
      dispatch(changePropertyCurrencyAction(index, value)),

    changeOtherAssetType: (index, value) =>
      dispatch(changeOtherAssetTypeAction(index, value)),
    changeOtherAssetDescription: (index, value) =>
      dispatch(changeOtherAssetDescriptionAction(index, value)),
    changeOtherAssetCurrency: (index, value) =>
      dispatch(changeOtherAssetCurrencyAction(index, value)),
    changeOtherAssetRealisableValue: (index, value) =>
      dispatch(changeOtherAssetRealisableValueAction(index, value)),
    changeOtherAssetRate: (index, value) =>
      dispatch(changeOtherAssetRateAction(index, value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'financialWizardSummary', reducer });
const withSaga = injectSaga({ key: 'financialWizardSummary', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
)(withStyles(styles)(FinancialWizardSummary));
