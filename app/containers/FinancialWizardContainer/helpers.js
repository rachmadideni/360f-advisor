/*
  option key is use in API Call as optional group parameter
 */

export function getOptionApiKey(optionKey) {
  switch (optionKey) {
    case 'currency':
      return 'currency';
    case 'cashflowType':
      return 'cash_flow_type';
    case 'incomeType':
      return 'income_type';
    case 'livingExpenseType':
      return 'living_expense_type';
    case 'loanType':
      return 'loan_type';
    case 'taxType':
      return 'tax_type';
    case 'gender':
      return 'gender';
    case 'nationality':
      return 'nationality';
    case 'idType':
      return 'identity_type';
    case 'maritalStatus':
      return 'marital_status';
    case 'employmentStatus':
      return 'employment_status';
    case 'educationLevel':
      return 'education_level';
    case 'pepRelationship':
      return 'pep_relationship';
    case 'dependantRelationship':
      return 'dependant_relationship';
    case 'country':
      return 'nationality';
    case 'industry':
      return 'industry';
    case 'occupation':
      return 'occupation';
    case 'instrumentType':
      return 'instrument_type';
    case 'rateOfReturn':
      return 'rate_of_return';
    case 'propertyType':
      return 'property_type';
    case 'ownershipType':
      return 'ownership_type';
    case 'portfolioType':
      return 'portfolio_type';
    case 'benefitsType':
      return 'life_health_insurance_benefit';
    default:
      return optionKey;
  }
}

export function mapOptionsResponseToDisplay(optionKey, response) {
  switch (optionKey) {
    case 'country':
    case 'nationality':
      return response.map(opt => ({
        value: opt.isoCode,
        title: opt.en,
      }));
    default:
      return response.map(opt => ({
        value: opt.code,
        title: opt.en,
      }));
  }
}
