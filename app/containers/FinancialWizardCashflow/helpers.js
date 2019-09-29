import { groupBy, map } from 'lodash/collection';
import { mapKeys } from 'lodash/object';
import MoneyCoinIcon from 'icons/MoneyCoin';
import CalculatorIcon from 'icons/Calculator';
import ShieldProtectionIcon from 'icons/ShieldProtection';
import TaxReceiptIcon from 'icons/TaxReceipt';

export function getSectionIcon(value) {
  switch (value) {
    case '1':
      return MoneyCoinIcon;
    case '2':
      return CalculatorIcon;
    case '3':
      return ShieldProtectionIcon;
    case '4':
      return TaxReceiptIcon;
    default:
      return null;
  }
}

export function getSectionKey(value) {
  switch (value) {
    case '1':
      return 'income';
    case '2':
      return 'livingExpenses';
    case '3':
      return 'loans';
    case '4':
      return 'taxes';
    default:
      return null;
  }
}

export function mapCashflowsToSections(cashflows) {
  const adaptedCashflows = map(cashflows, item => ({
    ...item,
    annualAmount: item.annualAmount
      ? item.annualAmount.toString()
      : item.annualAmount,
    monthlyAmount: item.monthlyAmount
      ? item.monthlyAmount.toString()
      : item.monthlyAmount,
    tenureRemainingInMonths: item.tenureRemainingInMonths
      ? item.tenureRemainingInMonths.toString()
      : item.tenureRemainingInMonths,
  }));  

  let grouped = groupBy(adaptedCashflows, item => item.cashFlowType);
  // remap the keys
  grouped = mapKeys(grouped, (value, key) => getSectionKey(key));
  return grouped;
}

export function mapSectionsToCashflows(sections) {
  const { income } = sections;
  const { livingExpenses } = sections;
  const { loans } = sections;
  const { taxes } = sections;
  const cashflows = [...income, ...livingExpenses, ...loans, ...taxes];
  return cashflows;
}
