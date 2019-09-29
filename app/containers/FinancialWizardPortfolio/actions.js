/*
 *
 * FinancialWizardPortfolio actions
 *
 */

// Insurances
import {
  ADD_INSURANCE_ACTION,
  CLEAR_INSURANCES_ACTION,
  ADD_BENEFIT_ACTION,
  CHANGE_BENEFIT_INPUT_ACTION,
  DELETE_BENEFIT_ITEM_ACTION,
  CHANGE_INSURANCE_PROVIDER_ACTION,
  CHANGE_INSURANCE_CURRENCY_ACTION,
  CHANGE_INSURANCE_ANNUAL_PREMIUM_ACTION,
  CHANGE_INSURANCE_CURRENT_CASH_ACTION,
  DELETE_INSURANCE_ITEM_ACTION,
  CHANGE_MARKED_GOALS,
  ADD_INVESTMENT_ACTION,
  CLEAR_INVESTMENT_ACTION,
  CHANGE_INSTRUMENT_TYPE_ACTION,
  CHANGE_INSTRUMENT_PROVIDER_ACTION,
  CHANGE_INVESTMENT_CURRENT_VALUE_ACTION,
  CHANGE_INVESTMENT_CURRENCY_ACTION,
  CHANGE_INVESTMENT_ANNUAL_ACTION,
  CHANGE_INVESTMENT_RATE_ACTION,
  DELETE_INVESTMENT_ITEM_ACTION,
  ADD_PROPERTY_ACTION,
  CLEAR_PROPERTY_ACTION,
  CHANGE_PROPERTY_TYPE_ACTION,
  CHANGE_OWNERSHIP_TYPE_ACTION,
  CHANGE_OWNERSHIP_PERCENTAGE_ACTION,
  CHANGE_REALISABLE_ACTION,
  CHANGE_PROPERTY_RATE_ACTION,
  CHANGE_COUNTRY_LOCATION_ACTION,
  CHANGE_PROPERTY_ADDRESS_ACTION,
  DELETE_PROPERTY_ITEM_ACTION,
  CHANGE_PROPERTY_CURRENCY_ACTION,
  ADD_OTHER_ASSET_ACTION,
  CLEAR_OTHER_ASSET_ACTION,
  CHANGE_OTHER_ASSET_TYPE_ACTION,
  CHANGE_OTHER_ASSET_DESCRIPTION_ACTION,
  CHANGE_OTHER_ASSET_CURRENCY_ACTION,
  CHANGE_OTHER_ASSET_REALISABLE_VALUE_ACTION,
  CHANGE_OTHER_ASSET_RATE_ACTION,
  DELETE_OTHER_ASSET_ITEM_ACTION,
  SET_DATA_STATE_ACTION,
} from './constants';

export function setDataStateAction(portfolios) {
  return {
    type: SET_DATA_STATE_ACTION,
    payload: portfolios,
  };
}

export function changeInsuranceProviderAction(index, value) {
  return {
    type: CHANGE_INSURANCE_PROVIDER_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeInsuranceCurrencyAction(index, value) {
  return {
    type: CHANGE_INSURANCE_CURRENCY_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeInsuranceAnnualPremiumAction(index, value) {
  return {
    type: CHANGE_INSURANCE_ANNUAL_PREMIUM_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeInsuranceCurrentCashAction(index, value) {
  return {
    type: CHANGE_INSURANCE_CURRENT_CASH_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function deleteInsuranceItemAction(index) {
  return {
    type: DELETE_INSURANCE_ITEM_ACTION,
    payload: index,
  };
}

export function changeMarkedGoalsAction(index, value) {
  return {
    type: CHANGE_MARKED_GOALS,
    payload: {
      index,
      value,
    },
  };
}

export function addInsuranceAction(payload) {
  return {
    type: ADD_INSURANCE_ACTION,
    payload,
  };
}

export function clearInsurancesAction() {
  return {
    type: CLEAR_INSURANCES_ACTION,
  };
}

export function addBenefitAction(itemIndex) {
  return {
    type: ADD_BENEFIT_ACTION,
    payload: {
      itemIndex,
    },
  };
}

export function changeBenefitInputAction(itemIndex, benefitIndex, key, value) {
  return {
    type: CHANGE_BENEFIT_INPUT_ACTION,
    payload: {
      itemIndex,
      benefitIndex,
      key,
      value,
    },
  };
}

export function deleteBenefitItemAction(itemIndex, benefitIndex) {
  return {
    type: DELETE_BENEFIT_ITEM_ACTION,
    payload: {
      itemIndex,
      benefitIndex,
    },
  };
}

export function addOtherAssetAction() {
  return {
    type: ADD_OTHER_ASSET_ACTION,
  };
}

export function clearOtherAssetAction() {
  return {
    type: CLEAR_OTHER_ASSET_ACTION,
  };
}

export function changeOtherAssetTypeAction(index, value) {
  return {
    type: CHANGE_OTHER_ASSET_TYPE_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeOtherAssetDescriptionAction(index, value) {
  return {
    type: CHANGE_OTHER_ASSET_DESCRIPTION_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeOtherAssetCurrencyAction(index, value) {
  return {
    type: CHANGE_OTHER_ASSET_CURRENCY_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeOtherAssetRealisableValueAction(index, value) {
  return {
    type: CHANGE_OTHER_ASSET_REALISABLE_VALUE_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeOtherAssetRateAction(index, value) {
  return {
    type: CHANGE_OTHER_ASSET_RATE_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function deleteOtherAssetItemAction(index) {
  return {
    type: DELETE_OTHER_ASSET_ITEM_ACTION,
    payload: index,
  };
}

export function addPropertyAction() {
  return {
    type: ADD_PROPERTY_ACTION,
  };
}

export function clearPropertyAction() {
  return {
    type: CLEAR_PROPERTY_ACTION,
  };
}

export function changePropertyTypeAction(index, value) {
  return {
    type: CHANGE_PROPERTY_TYPE_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeOwnershipTypeAction(index, value) {
  return {
    type: CHANGE_OWNERSHIP_TYPE_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeOwnershipPercentageAction(index, value) {
  return {
    type: CHANGE_OWNERSHIP_PERCENTAGE_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changePropertyCurrencyAction(index, value) {
  return {
    type: CHANGE_PROPERTY_CURRENCY_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeRealisableAction(index, value) {
  return {
    type: CHANGE_REALISABLE_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changePropertyRateAction(index, value) {
  return {
    type: CHANGE_PROPERTY_RATE_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeCountryLocationAction(index, value) {
  return {
    type: CHANGE_COUNTRY_LOCATION_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changePropertyAddressAction(index, value) {
  return {
    type: CHANGE_PROPERTY_ADDRESS_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function deletePropertyItemAction(index) {
  return {
    type: DELETE_PROPERTY_ITEM_ACTION,
    payload: index,
  };
}

export function addInvestmentAction() {
  return {
    type: ADD_INVESTMENT_ACTION,
  };
}

export function changeInstrumentTypeAction(index, value) {
  return {
    type: CHANGE_INSTRUMENT_TYPE_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeInstrumentProviderAction(index, value) {
  return {
    type: CHANGE_INSTRUMENT_PROVIDER_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeInstrumentCurrentValueAction(index, value) {
  return {
    type: CHANGE_INVESTMENT_CURRENT_VALUE_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeInvestmentCurrencyAction(index, value) {
  return {
    type: CHANGE_INVESTMENT_CURRENCY_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeInvestmentAnnualAction(index, value) {
  return {
    type: CHANGE_INVESTMENT_ANNUAL_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function changeInvestmentRateAction(index, value) {
  return {
    type: CHANGE_INVESTMENT_RATE_ACTION,
    payload: {
      index,
      value,
    },
  };
}

export function deleteInvestmentItemAction(index) {
  return {
    type: DELETE_INVESTMENT_ITEM_ACTION,
    payload: index,
  };
}

export function clearInvestmentAction() {
  return {
    type: CLEAR_INVESTMENT_ACTION,
  };
}
