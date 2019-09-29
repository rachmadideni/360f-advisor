import { groupBy, map } from 'lodash/collection';
import { mapKeys } from 'lodash/object';
import LifeHealthIcon from 'icons/LifeHealthInsurance';
import SavingInvestmentIcon from 'icons/SavingInvestment';
import PropertyHeldIcon from 'icons/PropertyHeld';
import OtherHeldAssetIcon from 'icons/OtherHeldAsset';

export function getSectionIcon(value) {
  switch (value) {
    case '1':
      return LifeHealthIcon;
    case '2':
      return SavingInvestmentIcon;
    case '3':
      return PropertyHeldIcon;
    case '4':
      return OtherHeldAssetIcon;
    default:
      return null;
  }
}

export function getSectionKey(value) {
  switch (value) {
    case '1':
      return 'insurances';
    case '2':
      return 'investments';
    case '3':
      return 'propertyAssets';
    case '4':
      return 'otherAssets';
    default:
      return null;
  }
}

export function mapPortfoliosToSections(portfolios) {
  const adaptedPorfolios = map(portfolios, item => ({
    ...item,
  }));
  let grouped = groupBy(adaptedPorfolios, item => item.portfolioType); 
  grouped = mapKeys(grouped, (value, key) => getSectionKey(key));  
  return grouped;
}

export function mapSectionsToPortfolio(sections) {
  const { insurances } = sections;
  const { investments } = sections;
  const { propertyAssets } = sections;
  const { otherAssets } = sections;
  const portfolios = [
    ...insurances,
    ...investments,
    ...propertyAssets,
    ...otherAssets,
  ];
  return portfolios;
}
