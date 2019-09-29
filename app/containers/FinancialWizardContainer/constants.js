/*
 *
 * FinancialWizardContainer constants
 *
 */
import messages from './messages';

export const RESET_DATA_ACTION =
  'app/FinancialWizardContainer/RESET_DATA_ACTION';
export const GET_GENDERS_SUCCESS_ACTION =
  'app/FinancialWizardContainer/GET_GENDERS_SUCCESS_ACTION';
export const SET_COMPLETED_STEP_ACTION =
  'app/FinancialWizardContainer/SET_COMPLETED_STEP_ACTION';
export const GET_OPTIONS_ACTION =
  'app/FinancialWizardContainer/GET_OPTIONS_ACTION';
export const GET_OPTIONS_SUCCESS_ACTION =
  'app/FinancialWizardContainer/GET_OPTIONS_SUCCESS_ACTION';
export const GET_OPTIONS_ERROR_ACTION =
  'app/FinancialWizardContainer/GET_OPTIONS_ERROR_ACTION';
export const GET_PARTY_DETAILS_ACTION =
  'app/FinancialWizardContainer/GET_PARTY_DETAILS_ACTION';
export const GET_PARTY_DETAILS_SUCCESS_ACTION =
  'app/FinancialWizardContainer/GET_PARTY_DETAILS_SUCCESS_ACTION';
export const GET_PARTY_DETAILS_ERROR_ACTION =
  'app/FinancialWizardContainer/GET_PARTY_DETAILS_ERROR_ACTION';
export const CREATE_UPDATE_PARTY_ACTION =
  'app/FinancialWizardContainer/CREATE_UPDATE_PARTY_ACTION';
export const CREATE_UPDATE_PARTY_SUCCESS_ACTION =
  'app/FinancialWizardContainer/CREATE_UPDATE_PARTY_SUCCESS_ACTION';
export const CREATE_UPDATE_PARTY_ERROR_ACTION =
  'app/FinancialWizardContainer/CREATE_UPDATE_PARTY_ERROR_ACTION';
export const DELETE_DEPENDANTS_ACTION =
  'app/FinancialWizardContainer/DELETE_DEPENDANTS_ACTION';
export const DELETE_DEPENDANTS_SUCCESS_ACTION =
  'app/FinancialWizardContainer/DELETE_DEPENDANTS_SUCCESS_ACTION';
export const DELETE_DEPENDANTS_ERROR_ACTION =
  'app/FinancialWizardContainer/DELETE_DEPENDANTS_ERROR_ACTION';
export const CHANGE_PERSONAL_DETAILS_ACTION =
  'app/FinancialWizardContainer/CHANGE_PERSONAL_DETAILS_ACTION';
export const CREATE_UPDATE_PORTFOLIOS_ACTION =
  'app/FinancialWizardContainer/CREATE_UPDATE_PORTFOLIOS_ACTION';
export const CREATE_UPDATE_PORTFOLIOS_SUCCESS_ACTION =
  'app/FinancialWizardContainer/CREATE_UPDATE_PORTFOLIOS_SUCCESS_ACTION';
export const CREATE_UPDATE_PORTFOLIOS_ERROR_ACTION =
  'app/FinancialWizardContainer/CREATE_UPDATE_PORTFOLIOS_ERROR_ACTION';
export const CHANGE_PORTFOLIOS_ACTION =
  'app/FinancialWizardContainer/CHANGE_PORTFOLIOS_ACTION';
export const GET_PORTFOLIOS_ACTION =
  'app/FinancialWizardContainer/GET_PORTFOLIOS_ACTION';
export const GET_PORTFOLIOS_SUCCESS_ACTION =
  'app/FinancialWizardContainer/GET_PORTFOLIOS_SUCCESS_ACTION';
export const GET_PORTFOLIOS_ERROR_ACTION =
  'app/FinancialWizardContainer/GET_PORTFOLIOS_ERROR_ACTION';
export const CREATE_UPDATE_CASHFLOWS_ACTION =
  'app/FinancialWizardContainer/CREATE_UPDATE_CASHFLOWS_ACTION';
export const CREATE_UPDATE_CASHFLOWS_SUCCESS_ACTION =
  'app/FinancialWizardContainer/CREATE_UPDATE_CASHFLOWS_SUCCESS_ACTION';
export const CREATE_UPDATE_CASHFLOWS_ERROR_ACTION =
  'app/FinancialWizardContainer/CREATE_UPDATE_CASHFLOWS_ERROR_ACTION';
export const CHANGE_CASHFLOWS_ACTION =
  'app/FinancialWizardContainer/CHANGE_CASHFLOWS_ACTION';
export const GET_CASHFLOWS_ACTION =
  'app/FinancialWizardContainer/GET_CASHFLOWS_ACTION';
export const GET_CASHFLOWS_SUCCESS_ACTION =
  'app/FinancialWizardContainer/GET_CASHFLOWS_SUCCESS_ACTION';
export const GET_CASHFLOWS_ERROR_ACTION =
  'app/FinancialWizardContainer/GET_CASHFLOWS_ERROR_ACTION';
export const DELETE_CASHFLOWS_ACTION =
  'app/FinancialWizardContainer/DELETE_CASHFLOWS_ACTION';
export const DELETE_CASHFLOWS_SUCCESS_ACTION =
  'app/FinancialWizardContainer/DELETE_CASHFLOWS_SUCCESS_ACTION';
export const DELETE_CASHFLOWS_ERROR_ACTION =
  'app/FinancialWizardContainer/DELETE_CASHFLOWS_ERROR_ACTION';

export const FINANCIAL_WIZARD_STEPS = [
  {
    title: messages.personalDetails,
    value: 0,
    url: 'personal-details',
  },
  {
    title: messages.portfolio,
    value: 1,
    url: 'portfolio',
  },
  {
    title: messages.cashflow,
    value: 2,
    url: 'cashflow',
  },
  {
    title: messages.summary,
    value: 3,
    url: 'summary',
  },
];
