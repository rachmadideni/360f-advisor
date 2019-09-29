/*
 *
 * FinancialWizardPortfolio reducer
 *
 */

import { fromJS, List } from 'immutable';
import { forEach } from 'lodash/collection';
import {
  ADD_INSURANCE_ACTION,
  CLEAR_INSURANCES_ACTION,
  ADD_BENEFIT_ACTION,
  DELETE_BENEFIT_ITEM_ACTION,
  CHANGE_BENEFIT_INPUT_ACTION,
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
  CHANGE_PROPERTY_CURRENCY_ACTION,
  CHANGE_REALISABLE_ACTION,
  CHANGE_PROPERTY_RATE_ACTION,
  CHANGE_OWNERSHIP_PERCENTAGE_ACTION,
  CHANGE_COUNTRY_LOCATION_ACTION,
  CHANGE_PROPERTY_ADDRESS_ACTION,
  DELETE_PROPERTY_ITEM_ACTION,
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

import { mapPortfoliosToSections } from './helpers';

export const initialState = fromJS({
  deletedIds: [],
  data: {
    insurance: [],
    savingInvestments: [],
    propertyHeld: [],
    otherHeldAssets: [],
  },
});

// insurances,
// investments,
// propertyAssets,
// otherAssets,

function financialWizardPortfolioReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA_STATE_ACTION: {
      const groupedPortfolio = mapPortfoliosToSections(action.payload);
      
      return state
        .setIn(['data', 'insurance'], new List(groupedPortfolio.insurance))
        .setIn(
          ['data', 'savingInvestments'],
          new List(groupedPortfolio.savingInvestments),
        )
        .setIn(
          ['data', 'propertyHeld'],
          new List(groupedPortfolio.propertyHeld),
        )
        .setIn(
          ['data', 'otherHeldAssets'],
          new List(groupedPortfolio.otherHeldAssets),
        );
    }

    case ADD_INSURANCE_ACTION:
      return state.setIn(
        ['data', 'insurance'],
        state.getIn(['data', 'insurance']).push({
          portfolioType: '1',
          type:'',
          provider: '',
          currency: 'USD',
          annualPremium: '',
          currentCash: '',
          benefitPolicies: new List([
            {
              benefitType: '',
              upToAge: '',
              sumAssured: '',
            },
          ]),
          markedForGoals: false,
        }),
      );

    case CHANGE_BENEFIT_INPUT_ACTION:
      return state.setIn(
        [
          'data',
          'insurance',
          action.payload.itemIndex,
          'benefitPolicies',
          action.payload.benefitIndex,
          action.payload.key,
        ],
        action.payload.value,
      );

    case ADD_BENEFIT_ACTION: {
      return state.setIn(
        ['data', 'insurance', action.payload.itemIndex, 'benefitPolicies'],
        state
          .getIn([
            'data',
            'insurance',
            action.payload.itemIndex,
            'benefitPolicies',
          ])
          .push({
            benefitType: '',
            sumAssured: '',
            upToAge: '',
          }),
      );
    }

    case DELETE_BENEFIT_ITEM_ACTION:
      return state.deleteIn([
        'data',
        'insurance',
        action.payload.itemIndex,
        'benefitPolicies',
        action.payload.benefitIndex,
      ]);

    case CLEAR_INSURANCES_ACTION: {
      const insurances = state.getIn(['data', 'insurance']).toJS();
      const deletedIds = state.get('deletedIds').toJS();
      forEach(insurances, item => {
        if (!!item.id && deletedIds.indexOf(item.id) < 0) {
          deletedIds.push(item.id);
        }
      });
      return state
        .set('deletedIds', new List(deletedIds))
        .setIn(['data', 'insurance'], new List());
    }

    case CLEAR_INVESTMENT_ACTION: {
      const investments = state.getIn(['data', 'savingInvestments']).toJS();
      const deletedIds = state.get('deletedIds').toJS();
      forEach(investments, item => {
        if (!!item.id && deletedIds.indexOf(item.id) < 0) {
          deletedIds.push(item.id);
        }
      });
      return state
        .set('deletedIds', new List(deletedIds))
        .setIn(['data', 'savingInvestments'], new List());
    }

    case CLEAR_PROPERTY_ACTION: {
      const propertyHeld = state.getIn(['data', 'propertyHeld']).toJS();
      const deletedIds = state.get('deletedIds').toJS();
      forEach(propertyHeld, item => {
        if (!!item.id && deletedIds.indexOf(item.id) < 0) {
          deletedIds.push(item.id);
        }
      });
      return state
        .set('deletedIds', new List(deletedIds))
        .setIn(['data', 'propertyHeld'], new List());
    }

    case CLEAR_OTHER_ASSET_ACTION: {
      const otherHeldAssets = state.getIn(['data', 'otherHeldAssets']).toJS();
      const deletedIds = state.get('deletedIds').toJS();
      forEach(otherHeldAssets, item => {
        if (!!item.id && deletedIds.indexOf(item.id) < 0) {
          deletedIds.push(item.id);
        }
      });

      return state
        .set('deletedIds', new List(deletedIds))
        .setIn(['data', 'otherHeldAssets'], new List());
    }

    case CHANGE_INSURANCE_PROVIDER_ACTION:
      return state.setIn(
        ['data', 'insurance', action.payload.index, 'provider'],
        action.payload.value,
      );

    case CHANGE_INSURANCE_CURRENCY_ACTION:
      return state.setIn(
        ['data', 'insurance', action.payload.index, 'currency'],
        action.payload.value,
      );

    case CHANGE_INSURANCE_ANNUAL_PREMIUM_ACTION:
      return state.setIn(
        ['data', 'insurance', action.payload.index, 'annualPremium'],
        action.payload.value,
      );

    case CHANGE_INSURANCE_CURRENT_CASH_ACTION:
      return state.setIn(
        ['data', 'insurance', action.payload.index, 'currentCash'],
        action.payload.value,
      );

    case DELETE_INSURANCE_ITEM_ACTION:
      return state.deleteIn(['data', 'insurance', action.payload]);

    case CHANGE_MARKED_GOALS:
      return state.setIn(
        ['data', 'insurance', action.payload.index, 'markedForGoals'],
        action.payload.value,
      );

    case ADD_INVESTMENT_ACTION:
      return state.setIn(
        ['data', 'savingInvestments'],
        state.getIn(['data', 'savingInvestments']).push({
          portfolioType: '2',
          type:'',
          instrumentType: '',
          instrumentProvider: '',
          currency: 'USD',
          currentValue: '',
          annualContributions: '',
          rateOfReturn: '',
        }),
      );

    case CHANGE_INSTRUMENT_TYPE_ACTION:
      return state.setIn(
        ['data', 'savingInvestments', action.payload.index, 'instrumentType'],
        action.payload.value,
      );
    case CHANGE_INSTRUMENT_PROVIDER_ACTION:
      return state.setIn(
        [
          'data',
          'savingInvestments',
          action.payload.index,
          'instrumentProvider',
        ],
        action.payload.value,
      );
    case CHANGE_INVESTMENT_CURRENT_VALUE_ACTION:
      return state.setIn(
        ['data', 'savingInvestments', action.payload.index, 'currentValue'],
        action.payload.value,
      );
    case CHANGE_INVESTMENT_CURRENCY_ACTION:
      return state.setIn(
        ['data', 'savingInvestments', action.payload.index, 'currency'],
        action.payload.value,
      );
    case CHANGE_INVESTMENT_ANNUAL_ACTION:
      return state.setIn(
        [
          'data',
          'savingInvestments',
          action.payload.index,
          'annualContributions',
        ],
        action.payload.value,
      );
    case CHANGE_INVESTMENT_RATE_ACTION:
      return state.setIn(
        ['data', 'savingInvestments', action.payload.index, 'rateOfReturn'],
        action.payload.value,
      );
    case DELETE_INVESTMENT_ITEM_ACTION:
      return state.deleteIn(['data', 'savingInvestments', action.payload]);

    case ADD_PROPERTY_ACTION:
      return state.setIn(
        ['data', 'propertyHeld'],
        state.getIn(['data', 'propertyHeld']).push({
          portfolioType: '3',
          type:'',
          propertyType: '',
          ownershipType: '',
          percentageOfOwnership: '',
          currency: 'USD',
          currentRealisableValue: '',
          rateOfReturn: '',
          countryOfLocation: '',
          addressOfProperty: '',
        }),
      );

    case CHANGE_PROPERTY_TYPE_ACTION:
      return state.setIn(
        ['data', 'propertyHeld', action.payload.index, 'propertyType'],
        action.payload.value,
      );

    case CHANGE_OWNERSHIP_TYPE_ACTION:
      return state.setIn(
        ['data', 'propertyHeld', action.payload.index, 'ownershipType'],
        action.payload.value,
      );

    case CHANGE_OWNERSHIP_PERCENTAGE_ACTION:
      return state.setIn(
        ['data', 'propertyHeld', action.payload.index, 'percentageOfOwnership'],
        action.payload.value,
      );

    case CHANGE_PROPERTY_CURRENCY_ACTION:
      return state.setIn(
        ['data', 'propertyHeld', action.payload.index, 'currency'],
        action.payload.value,
      );

    case CHANGE_REALISABLE_ACTION:
      return state.setIn(
        [
          'data',
          'propertyHeld',
          action.payload.index,
          'currentRealisableValue',
        ],
        action.payload.value,
      );

    case CHANGE_PROPERTY_RATE_ACTION:
      return state.setIn(
        ['data', 'propertyHeld', action.payload.index, 'rateOfReturn'],
        action.payload.value,
      );

    case CHANGE_COUNTRY_LOCATION_ACTION:
      return state.setIn(
        ['data', 'propertyHeld', action.payload.index, 'countryOfLocation'],
        action.payload.value,
      );

    case CHANGE_PROPERTY_ADDRESS_ACTION:
      return state.setIn(
        ['data', 'propertyHeld', action.payload.index, 'addressOfProperty'],
        action.payload.value,
      );

    case DELETE_PROPERTY_ITEM_ACTION:
      return state.deleteIn(['data', 'propertyHeld', action.payload]);

    case ADD_OTHER_ASSET_ACTION:
      return state.setIn(
        ['data', 'otherHeldAssets'],
        state.getIn(['data', 'otherHeldAssets']).push({
          portfolioType: '4',
          type:'',
          assetType: '',
          assetDescription: '',
          currency: 'USD',
          realisableValue: '',
          rateOfReturn: '',
        }),
      );

    case CHANGE_OTHER_ASSET_TYPE_ACTION:
      return state.setIn(
        ['data', 'otherHeldAssets', action.payload.index, 'assetType'],
        action.payload.value,
      );

    case CHANGE_OTHER_ASSET_DESCRIPTION_ACTION:
      return state.setIn(
        ['data', 'otherHeldAssets', action.payload.index, 'assetDescription'],
        action.payload.value,
      );

    case CHANGE_OTHER_ASSET_CURRENCY_ACTION:
      return state.setIn(
        ['data', 'otherHeldAssets', action.payload.index, 'currency'],
        action.payload.value,
      );

    case CHANGE_OTHER_ASSET_REALISABLE_VALUE_ACTION:
      return state.setIn(
        ['data', 'otherHeldAssets', action.payload.index, 'realisableValue'],
        action.payload.value,
      );

    case CHANGE_OTHER_ASSET_RATE_ACTION:
      return state.setIn(
        ['data', 'otherHeldAssets', action.payload.index, 'rateOfReturn'],
        action.payload.value,
      );

    case DELETE_OTHER_ASSET_ITEM_ACTION:
      return state.deleteIn(['data', 'otherHeldAssets', action.payload]);

    /* return state.setIn([
        'data',
        'insurance',
        'benefitPolicies',
        action.payload.index,
        action.payload.value,
      ]); */

    // return state.updateIn(['data','insurance','benefitPolicies'], arr=>arr.push({}) )
    // initialState.updateIn(['foo', 'bar'], arr => arr.push(4))

    // arr=>arr.push(action.payload.value));
    // case DELETE_BENEFIT_ACTION:
    // 	return state.setIn(['data','insurance','benefitPolicies'],
    // 		state.getIn(['data','insurance','benefitPolicies']).push(action.payload));
    default:
      return state;
  }
}

export default financialWizardPortfolioReducer;
