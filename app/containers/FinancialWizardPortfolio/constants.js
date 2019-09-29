/*
 *
 * FinancialWizardPortfolio constants
 *
 */
import LifeHealthIcon from 'icons/MoneyCoin';
import CalculatorIcon from 'icons/Calculator';
import ShieldProtectionIcon from 'icons/ShieldProtection';
import TaxReceiptIcon from 'icons/TaxReceipt';

import messages from './messages';

export const PORTFOLIO_SECTIONS = [
  {
    title: messages.lifeandHealthInsurance,
    icon: LifeHealthIcon,
    value: 'LIFE_HEALTH',
  },
  {
    title: messages.savingAndInvestments,
    icon: CalculatorIcon,
    value: 'SAVING_INVESTMENT',
  },
  {
    title: messages.propertyHeld,
    icon: ShieldProtectionIcon,
    value: 'PROPERTY_HELD',
  },
  {
    title: messages.otherHeldAssets,
    icon: TaxReceiptIcon,
    value: 'OTHER_HELD_ASSETS',
  },
];

export const CURRENCY_OPTIONS = [
  {
    ID: 1,
    CURRENCY_CODE: 'AUD',
    CURRENCY_NAME: 'AUSTRALIA DOLLAR',
  },
  {
    ID: 2,
    CURRENCY_CODE: 'CAD',
    CURRENCY_NAME: 'CANADA DOLLAR',
  },
  {
    ID: 3,
    CURRENCY_CODE: 'EUR',
    CURRENCY_NAME: 'EURO',
  },
  {
    ID: 4,
    CURRENCY_CODE: 'IDR',
    CURRENCY_NAME: 'INDONESIA RUPIAH',
  },
  {
    ID: 5,
    CURRENCY_CODE: 'MYR',
    CURRENCY_NAME: 'MYANMAR',
  },
  {
    ID: 6,
    CURRENCY_CODE: 'SGD',
    CURRENCY_NAME: 'SINGAPORE DOLLAR',
  },
  {
    ID: 7,
    CURRENCY_CODE: 'THB',
    CURRENCY_NAME: 'THAILAND BAT',
  },
  {
    ID: 8,
    CURRENCY_CODE: 'USD',
    CURRENCY_NAME: 'UNITED STATES DOLLAR',
  },
];

export const BENEFIT_OPTIONS = [
  {
    ID: 1,
    BENEFIT: 'Death',
  },
  {
    ID: 2,
    BENEFIT: 'Total & Permanent Disability',
  },
  {
    ID: 3,
    BENEFIT: 'Critical Illness',
  },
];

export const CUSTOMER_AGE = 30;
export const AGE_UPPER_BOUND = 100;

export const MAX_BENEFIT_TAKEN = 2;

// SAVINGS & INVESTMENTS
export const INVESTMENT_TYPES = [
  {
    title: messages.equityFund,
    value: 'Equity Fund',
  },
  {
    title: messages.incomeFund,
    value: 'Income Fund',
  },
  {
    title: messages.balancedFund,
    value: 'Balanced Fund',
  },
  {
    title: messages.stocks,
    value: 'Stocks',
  },
  {
    title: messages.bonds,
    value: 'Bonds',
  },
  {
    title: messages.deposits,
    value: 'Deposits',
  },
  {
    title: messages.cash,
    value: 'Cash',
  },
  {
    title: messages.others,
    value: 'Others',
  },
];

// Investment Rate of Return
export const RATE_OF_RETURN = ['7', '5', '6', '7', '5', '1.8', '0.125'];

// Property Held Constants
export const PROPERTY_OPTIONS = [
  {
    title: messages.investmentProperty,
    value: 'Investment Property',
  },
  {
    title: messages.residentialProperty,
    value: 'Residential Property',
  },
];

export const OWNERSHIP_TYPE_OPTIONS = [
  {
    title: messages.jointTenancy,
    value: 'Joint Tenancy',
  },
  {
    title: messages.tenancyInCommon,
    value: 'Tenancy-in-common',
  },
];

export const SET_DATA_STATE_ACTION =
  'app/FinancialWizardPortfolio/SET_DATA_STATE_ACTION';
export const ADD_INSURANCE_ACTION =
  'app/FinancialWizardPortfolio/ADD_INSURANCE_ACTION';
export const CLEAR_INSURANCES_ACTION =
  'app/FinancialWizardPortfolio/CLEAR_INSURANCES_ACTION';
export const ADD_BENEFIT_ACTION =
  'app/FinancialWizardPortfolio/ADD_BENEFIT_ACTION';

// ADD PENDING CONSTANT FOR INSURANCES BENEFIT
export const CHANGE_BENEFIT_INPUT_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_BENEFIT_INPUT_ACTION';

export const DELETE_BENEFIT_ITEM_ACTION =
  'app/FinancialWizardPortfolio/DELETE_BENEFIT_ITEM_ACTION';

export const CHANGE_INSURANCE_PROVIDER_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_INSURANCE_PROVIDER_ACTION';
export const CHANGE_INSURANCE_CURRENCY_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_INSURANCE_CURRENCY_ACTION';
export const CHANGE_INSURANCE_ANNUAL_PREMIUM_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_INSURANCE_ANNUAL_PREMIUM_ACTION';
export const CHANGE_INSURANCE_CURRENT_CASH_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_INSURANCE_CURRENT_CASH_ACTION';
export const DELETE_INSURANCE_ITEM_ACTION =
  'app/FinancialWizardPortfolio/DELETE_INSURANCE_ITEM_ACTION';

export const CHANGE_MARKED_GOALS =
  'app/FinancialWizardPortfolio/CHANGE_MARKED_GOALS';

export const ADD_INVESTMENT_ACTION =
  'app/FinancialWizardPortfolio/ADD_INVESTMENT_ACTION';
export const CLEAR_INVESTMENT_ACTION =
  'app/FinancialWizardPortfolio/CLEAR_INVESTMENT_ACTION';
export const CHANGE_INSTRUMENT_TYPE_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_INSTRUMENT_TYPE_ACTION';
export const CHANGE_INSTRUMENT_PROVIDER_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_INSTRUMENT_PROVIDER_ACTION';
export const CHANGE_INVESTMENT_CURRENT_VALUE_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_INVESTMENT_CURRENT_VALUE_ACTION';
export const CHANGE_INVESTMENT_CURRENCY_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_INVESTMENT_CURRENCY_ACTION';
export const CHANGE_INVESTMENT_ANNUAL_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_INVESTMENT_ANNUAL_ACTION';
export const CHANGE_INVESTMENT_RATE_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_INVESTMENT_RATE_ACTION';
export const DELETE_INVESTMENT_ITEM_ACTION =
  'app/FinancialWizardPortfolio/DELETE_INVESTMENT_ITEM_ACTION';

export const ADD_PROPERTY_ACTION =
  'app/FinancialWizardPortfolio/ADD_PROPERTY_ACTION';
export const CLEAR_PROPERTY_ACTION =
  'app/FinancialWizardPortfolio/CLEAR_PROPERTY_ACTION';
export const CHANGE_PROPERTY_TYPE_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_PROPERTY_TYPE_ACTION';
export const CHANGE_OWNERSHIP_TYPE_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_OWNERSHIP_TYPE_ACTION';
export const CHANGE_OWNERSHIP_PERCENTAGE_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_OWNERSHIP_PERCENTAGE_ACTION';
export const CHANGE_PROPERTY_CURRENCY_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_PROPERTY_CURRENCY_ACTION';
export const CHANGE_REALISABLE_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_REALISABLE_ACTION';
export const CHANGE_PROPERTY_RATE_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_PROPERTY_RATE_ACTION';
export const CHANGE_COUNTRY_LOCATION_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_COUNTRY_LOCATION_ACTION';
export const CHANGE_PROPERTY_ADDRESS_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_PROPERTY_ADDRESS_ACTION';
export const DELETE_PROPERTY_ITEM_ACTION =
  'app/FinancialWizardPortfolio/DELETE_PROPERTY_ITEM_ACTION';

export const ADD_OTHER_ASSET_ACTION =
  'app/FinancialWizardPortfolio/ADD_OTHER_ASSET_ACTION';
export const CLEAR_OTHER_ASSET_ACTION =
  'app/FinancialWizardPortfolio/CLEAR_OTHER_ASSET_ACTION';
export const CHANGE_OTHER_ASSET_TYPE_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_OTHER_ASSET_TYPE_ACTION';
export const CHANGE_OTHER_ASSET_DESCRIPTION_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_OTHER_ASSET_DESCRIPTION_ACTION';
export const CHANGE_OTHER_ASSET_CURRENCY_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_OTHER_ASSET_CURRENCY_ACTION';
export const CHANGE_OTHER_ASSET_REALISABLE_VALUE_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_OTHER_ASSET_REALISABLE_VALUE_ACTION';
export const CHANGE_OTHER_ASSET_RATE_ACTION =
  'app/FinancialWizardPortfolio/CHANGE_OTHER_ASSET_RATE_ACTION';
export const DELETE_OTHER_ASSET_ITEM_ACTION =
  'app/FinancialWizardPortfolio/DELETE_OTHER_ASSET_ITEM_ACTION';
