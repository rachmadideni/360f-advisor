/**
 *
 * FinancialWizardPortfolio
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
  makeSelectLifeHealthInsurance,
  makeSelectSavingsInvestments,
  makeSelectPropertyHeldAssets,
  makeSelectOtherHeldAssets,
  makeSelectPortfoliosData,
  makeSelectDeletedIds,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  // PORTFOLIO_SECTIONS,
  // RATE_OF_RETURN,
  // PROPERTY_OPTIONS,
  // OWNERSHIP_TYPE_OPTIONS,
  // BENEFIT_OPTIONS,
  // CURRENCY_OPTIONS,
  INVESTMENT_TYPES,
} from './constants';

// ACTIONS
import {
  addInsuranceAction,
  clearInsurancesAction,
  addBenefitAction,
  changeBenefitInputAction,
  deleteBenefitItemAction,
  changeInsuranceProviderAction,
  changeInsuranceCurrencyAction,
  changeInsuranceAnnualPremiumAction,
  changeInsuranceCurrentCashAction,
  deleteInsuranceItemAction,
  changeMarkedGoalsAction,
  addInvestmentAction,
  changeInstrumentTypeAction,
  changeInstrumentProviderAction,
  changeInstrumentCurrentValueAction,
  changeInvestmentCurrencyAction,
  changeInvestmentAnnualAction,
  changeInvestmentRateAction,
  deleteInvestmentItemAction,
  clearInvestmentAction,
  addPropertyAction,
  clearPropertyAction,
  changePropertyTypeAction,
  changeOwnershipTypeAction,
  changeOwnershipPercentageAction,
  changeRealisableAction,
  changePropertyRateAction,
  changeCountryLocationAction,
  changePropertyAddressAction,
  changePropertyCurrencyAction,
  deletePropertyItemAction,
  addOtherAssetAction,
  clearOtherAssetAction,
  changeOtherAssetTypeAction,
  changeOtherAssetDescriptionAction,
  changeOtherAssetCurrencyAction,
  changeOtherAssetRealisableValueAction,
  changeOtherAssetRateAction,
  deleteOtherAssetItemAction,
  setDataStateAction,
} from './actions';

// SECTIONS HERE
import InsuranceSection from './InsuranceSection';
import InvestmentSection from './InvestmentSection';
import PropertyHeldSection from './PropertyHeldSection';
import OtherAssetsSection from './OtherAssetsSection';
import { getSectionIcon, mapSectionsToPortfolio } from './helpers';

/* eslint-disable react/prefer-stateless-function */
export class FinancialWizardPortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFooterOpen: false,
      isFooterAvailable: false,
      openSection: {
        insurances: false,
        investments: false,
        propertyAssets: false,
        otherAssets: false,
      },
      error: {
        insurances: {},
        investments: {},
        propertyAssets: {},
        otherAssets: {},
      },
      isSubmitting: false,
    };
  }

  setDataReduxState(props) {
    const { portfolios, setDataState } = props;
    return setDataState(portfolios);
  }

  componentDidMount() {
    const { insurances, investments, propertyAssets, otherAssets, onMounted } = this.props;
    this.setDataReduxState(this.props);
    onMounted();
    
    if (
      (insurances.length ||
        investments.length ||
        propertyAssets.length ||
        otherAssets.length) &&
      !this.state.isFooterAvailable
    ) {
      this.setState({
        isFooterAvailable: true,
        isFooterOpen: true,
      });
    }

    if (
      !insurances.length &&
      !investments.length &&
      !propertyAssets.length &&
      !otherAssets.length &&
      this.state.isFooterAvailable
    ) {
      this.setState({
        isFooterAvailable: false,
        isFooterOpen: false,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      insurances,
      investments,
      propertyAssets,
      otherAssets,
      portfolios,
    } = this.props;
    if (!isEqual(prevProps.portfolios, portfolios)) {
      this.setDataReduxState(this.props);
    }
    // ========== START :: set footer state ========== //
    if (
      (insurances.length ||
        investments.length ||
        propertyAssets.length ||
        otherAssets.length) &&
      !this.state.isFooterAvailable
    ) {
      this.setState({
        isFooterAvailable: true,
        isFooterOpen: true,
      });
    }

    if (
      !insurances.length &&
      !investments.length &&
      !propertyAssets.length &&
      !otherAssets.length &&
      this.state.isFooterAvailable
    ) {
      this.setState({
        isFooterAvailable: false,
        isFooterOpen: false,
        isSubmitting: false,
      });
    }
    // ========== END   :: set footer state ========== //

    // ========== START :: set insurances section state ========== //
    if (!prevProps.insurances.length && this.props.insurances.length) {
      this.setState(pState => ({
        ...pState,
        openSection: {
          ...pState.openSection,
          insurances: true,
        },
      }));
    }

    if (!this.props.insurances.length && prevProps.insurances.length) {
      this.setState(pState => ({
        ...pState,
        openSection: {
          ...pState.openSection,
          insurances: false,
        },
      }));
    }

    // ========== START   :: set investments section state ========== //

    if (!prevProps.investments.length && this.props.investments.length) {
      this.setState(pState => ({
        ...pState,
        openSection: {
          ...pState.openSection,
          investments: true,
        },
      }));
    }

    if (!this.props.investments.length && prevProps.investments.length) {
      this.setState(pState => ({
        ...pState,
        openSection: {
          ...pState.openSection,
          investments: false,
        },
      }));
    }

    if (!prevProps.propertyAssets.length && this.props.propertyAssets.length) {
      this.setState(pState => ({
        ...pState,
        openSection: {
          ...pState.openSection,
          propertyAssets: true,
        },
      }));
    }

    if (!this.props.propertyAssets.length && prevProps.propertyAssets.length) {
      this.setState(pState => ({
        ...pState,
        openSection: {
          ...pState.openSection,
          propertyAssets: false,
        },
      }));
    }

    if (!prevProps.otherAssets.length && this.props.otherAssets.length) {
      this.setState(pState => ({
        ...pState,
        openSection: {
          ...pState.openSection,
          otherAssets: true,
        },
      }));
    }

    if (!this.props.otherAssets.length && prevProps.otherAssets.length) {
      this.setState(pState => ({
        ...pState,
        openSection: {
          ...pState.openSection,
          otherAssets: false,
        },
      }));
    }
  }

  getSectionOptions() {
    const { options } = this.props;
    const sectionOptions = options.portfolioType.map(opt => ({
      value: opt.value,
      title: opt.title,
      icon: getSectionIcon(opt.value),
    }));
    return sectionOptions;
  }

  getSectionButtonActiveState(section) {
    const { insurances, investments, propertyAssets, otherAssets } = this.props;

    switch (section) {
      case '1':
        if (insurances.length > 0) {
          return true;
        }
        break;
      case '2':
        if (investments.length > 0) {
          return true;
        }
        break;
      case '3':
        if (propertyAssets.length > 0) {
          return true;
        }
        break;
      case '4':
        if (otherAssets.length > 0) {
          return true;
        }
        break;
      default:
        return false;
    }
    return false;
  }

  getMainErrorMessage() {
    const { intl, investments } = this.props;
    const { isSubmitting } = this.state;
    if (isSubmitting && !investments.length) {
      return intl.formatMessage(messages.pleaseEnterSavingInvestmentSection);
    }
    return false;
  }

  handleSectionButtonClick(section) {
    const {
      addInsurance,
      addInvestment,
      addProperty,
      addOtherAssets,
      clearInsurances,
      clearInvestment,
      clearProperty,
      clearOtherAsset,
      insurances,
      investments,
      propertyAssets,
      otherAssets,
    } = this.props;

    switch (section) {
      case '1':
        if (insurances.length > 0) {
          return clearInsurances();
        }
        return addInsurance();
      case '2':
        if (investments.length > 0) {
          return clearInvestment();
        }
        return addInvestment();
      case '3':
        if (propertyAssets.length > 0) {
          return clearProperty();
        }
        return addProperty();
      case '4':
        if (otherAssets.length > 0) {
          return clearOtherAsset();
        }
        return addOtherAssets();
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

    // submit condition
    const { insurances, investments, propertyAssets, otherAssets, deletedIds } = this.props;
    if (!investments.length) {
      return false;
    }

    if (!this.validateForm()) {
      return false;
    }
    const sections = {
      insurances,
      investments,
      propertyAssets,
      otherAssets,
    };

    const updatedPortfolios = mapSectionsToPortfolio(sections);
    return this.props.onSubmit(updatedPortfolios, deletedIds);
  }

  validateForm() {
    const { insurances, investments, propertyAssets, otherAssets } = this.state.error;
    return (
      (!insurances || !Object.keys(insurances).length) &&
      (!investments || !Object.keys(investments).length) &&
      (!propertyAssets || !Object.keys(propertyAssets).length) &&
      (!otherAssets || !Object.keys(otherAssets).length)
    );
  }

  renderMainSectionOptions() {
    const {
      intl,
      insurances,
      investments,
      propertyAssets,
      otherAssets,
    } = this.props;

    if (
      insurances.length ||
      investments.length ||
      propertyAssets.length ||
      otherAssets.length
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
            if (section.value === '2') {
              error = this.state.isSubmitting && !investments.length;
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
    const { investments } = this.props;
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
            if (section.value === '2') {
              error = this.state.isSubmitting && !investments.length;
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

  renderInsuranceSection() {
    const {
      intl,
      insurances,
      addInsurance,
      clearInsurances,
      changeInsuranceProvider,
      changeInsuranceCurrency,
      changeInsuranceAnnualPremium,
      changeInsuranceCurrentCash,
      changeMarkedGoals,
      deleteInsuranceItem,
      addBenefit,
      changeBenefitInput,
      deleteBenefitItem,
      options,
    } = this.props;

    return (
      <Fade in={!!insurances.length} unmountOnExit>
        <SectionContainer
          open={this.state.openSection.insurances}
          title={intl.formatMessage(
            financialWizardMessages.lifeandHealthInsurance,
          )}
          onHeadClick={() =>
            this.setState(prevState => ({
              ...prevState,
              openSection: {
                ...prevState.openSection,
                insurances: !prevState.openSection.insurances,
              },
            }))
          }
          onSectionDelete={() => clearInsurances()}
        >
          {insurances.map((data, index) => {            
            const keyItem = `insurance-item-${index}`;
            return (
              <InsuranceSection
                key={keyItem}
                intl={intl}
                insuranceProvider={data.provider}
                onChangeInsuranceProvider={value =>
                  changeInsuranceProvider(index, value)
                }
                currency={data.currency}
                currencyOptions={options.currency}
                onChangeInsuranceCurrency={value =>
                  changeInsuranceCurrency(index, value)
                }
                annualPremium={data.annualPremium}
                onChangeInsuranceAnnualPremium={value =>
                  changeInsuranceAnnualPremium(index, value)
                }
                currentCash={data.currentCash}
                onChangeInsuranceCurrentCash={value =>
                  changeInsuranceCurrentCash(index, value)
                }
                benefitOptions={options.benefitsType}
                addBenefit={() => addBenefit(index)}
                changeBenefitInput={(benefitIndex, key, value) =>
                  changeBenefitInput(index, benefitIndex, key, value)
                }
                deleteBenefitItem={benefitIndex =>
                  deleteBenefitItem(index, benefitIndex)
                }
                benefitsData={data.benefitPolicies}
                markedForGoals={data.markedForGoals}
                onChangeMarkedGoals={value => changeMarkedGoals(index, value)}
                onDelete={() => deleteInsuranceItem(index)}
                validate={this.state.isSubmitting}
                onError={isError =>
                  this.handleItemValidation('insurances', index, isError)
                }
              />
            );
          })}
          {insurances.length < 3 ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                if (insurances.length < 3) {
                  return addInsurance();
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

  renderInvestmentSection() {
    const {
      intl,
      investments,
      clearInvestment,
      changeInstrumentType,
      changeInstrumentProvider,
      changeInstrumentCurrentValue,
      changeInvestmentCurrency,
      changeInvestmentAnnual,
      changeInvestmentRate,
      deleteInvestmentItem,
      addInvestment,
      options,
    } = this.props;

    return (
      <Fade in={!!investments.length} unmountOnExit>
        <SectionContainer
          open={this.state.openSection.investments}
          title={intl.formatMessage(
            financialWizardMessages.savingAndInvestments,
          )}
          onHeadClick={() =>
            this.setState(prevState => ({
              ...prevState,
              openSection: {
                ...prevState.openSection,
                investments: !prevState.openSection.investments,
              },
            }))
          }
          onSectionDelete={() => clearInvestment()}
        >
          {investments.map((data, index) => {
            // const instrumentType = [...options.instrumentType];
            const key = `investment-item-${index}`;
            return (
              <InvestmentSection
                key={key}
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
                onDelete={() => deleteInvestmentItem(index)}
                validate={this.state.isSubmitting}
                onError={isError =>
                  this.handleItemValidation('investments', index, isError)
                }
              />
            );
          })}
          {investments.length < INVESTMENT_TYPES.length ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                if (investments.length < INVESTMENT_TYPES.length) {
                  return addInvestment();
                }
                return true;
              }}
            >
              {intl.formatMessage(messages.addInsuranceItem)}
            </Button>
          ) : null}
        </SectionContainer>
      </Fade>
    );
  }

  renderPropertySection() {
    const {
      intl,
      propertyAssets,
      clearProperty,
      deletePropertyItem,
      changePropertyType,
      changeOwnershipType,
      changePropertyCurrency,
      changeRealisable,
      changePropertyRate,
      changeOwnershipPercentage,
      changeCountryLocation,
      changePropertyAddress,
      addProperty,
      options,
    } = this.props;
    return (
      <Fade in={!!propertyAssets.length} unmountOnExit>
        <SectionContainer
          open={this.state.openSection.propertyAssets}
          title={intl.formatMessage(financialWizardMessages.propertyHeld)}
          onHeadClick={() =>
            this.setState(prevState => ({
              ...prevState,
              openSection: {
                ...prevState.openSection,
                propertyAssets: !prevState.openSection.propertyAssets,
              },
            }))
          }
          onSectionDelete={() => clearProperty()}
        >
          {propertyAssets.map((data, index) => {
            // const propertyOptions = [...options.property];
            const ownershipType = [...options.ownershipType];
            const ownershipTypeOptions = ownershipType.filter(
              type => type.title !== null,
            );
            // const currencyOptions = [...CURRENCY_OPTIONS];

            const key = `property-item-${index}`;
            return (
              <PropertyHeldSection
                key={key}
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
                onDelete={() => deletePropertyItem(index)}
                validate={this.state.isSubmitting}
                onError={isError =>
                  this.handleItemValidation('propertyAssets', index, isError)
                }
              />
            );
          })}

          {
            // propertyAssets.length <= PROPERTY_OPTIONS.length ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={
                () =>
                  // if (propertyAssets.length < PROPERTY_OPTIONS.length) {
                  addProperty()
                // return true;
              }
            >
              {intl.formatMessage(messages.addPropertyItem)}
            </Button>
            // ) : null
          }
        </SectionContainer>
      </Fade>
    );
  }

  renderOtherAssetsSection() {
    const {
      intl,
      otherAssets,
      clearOtherAsset,
      changeOtherAssetType,
      changeOtherAssetDescription,
      changeOtherAssetCurrency,
      changeOtherAssetRealisableValue,
      changeOtherAssetRate,
      deleteOtherAssetItem,
      addOtherAssets,
      options,
    } = this.props;
    return (
      <Fade in={!!otherAssets.length} unmountOnExit>
        <SectionContainer
          open={this.state.openSection.otherAssets}
          title={intl.formatMessage(financialWizardMessages.otherHeldAssets)}
          onHeadClick={() =>
            this.setState(prevState => ({
              ...prevState,
              openSection: {
                ...prevState.openSection,
                otherAssets: !prevState.openSection.otherAssets,
              },
            }))
          }
          onSectionDelete={() => clearOtherAsset()}
        >
          {otherAssets.map((data, index) => {
            // const currencyOptions = [...CURRENCY_OPTIONS];
            const key = `property-item-${index}`;
            return (
              <OtherAssetsSection
                key={key}
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
                onDelete={() => deleteOtherAssetItem(index)}
                validate={this.state.isSubmitting}
                onError={isError =>
                  this.handleItemValidation('otherAssets', index, isError)
                }
              />
            );
          })}
          {
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={
                () =>
                  // if (propertyAssets.length < PROPERTY_OPTIONS.length) {
                  addOtherAssets()
                // }
                // return true;
              }
            >
              {intl.formatMessage(messages.addOtherAssetItem)}
            </Button>
          }
        </SectionContainer>
      </Fade>
    );
  }

  renderMainContent() {
    const { intl, insurances, investments, propertyAssets, otherAssets } = this.props;

    if (
      insurances.length ||
      investments.length ||
      propertyAssets.length ||
      otherAssets.length
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
          {this.renderInsuranceSection()}
          {this.renderInvestmentSection()}
          {this.renderPropertySection()}
          {this.renderOtherAssetsSection()}
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

FinancialWizardPortfolio.propTypes = {
  intl: PropTypes.object,
  insurances: PropTypes.array,
  investments: PropTypes.array,
  propertyAssets: PropTypes.array,
  otherAssets: PropTypes.array,

  addInsurance: PropTypes.func,
  addBenefit: PropTypes.func,
  clearInsurances: PropTypes.func,
  changeInsuranceProvider: PropTypes.func,
  changeInsuranceCurrency: PropTypes.func,
  changeInsuranceAnnualPremium: PropTypes.func,
  changeInsuranceCurrentCash: PropTypes.func,
  deleteInsuranceItem: PropTypes.func,
  changeMarkedGoals: PropTypes.func,

  addInvestment: PropTypes.func,
  clearInvestment: PropTypes.func,
  changeInstrumentType: PropTypes.func,
  changeInstrumentProvider: PropTypes.func,
  changeInstrumentCurrentValue: PropTypes.func,
  changeInvestmentCurrency: PropTypes.func,
  changeInvestmentAnnual: PropTypes.func,
  changeInvestmentRate: PropTypes.func,
  deleteInvestmentItem: PropTypes.func,

  addOtherAssets: PropTypes.func,
  clearOtherAsset: PropTypes.func,
  changeOtherAssetType: PropTypes.func,
  changeOtherAssetDescription: PropTypes.func,
  changeOtherAssetCurrency: PropTypes.func,
  changeOtherAssetRealisableValue: PropTypes.func,
  changeOtherAssetRate: PropTypes.func,
  deleteOtherAssetItem: PropTypes.func,

  addProperty: PropTypes.func,
  clearProperty: PropTypes.func,
  changePropertyType: PropTypes.func,
  changeOwnershipType: PropTypes.func,
  changeOwnershipPercentage: PropTypes.func,
  changeRealisable: PropTypes.func,
  changePropertyRate: PropTypes.func,
  changeCountryLocation: PropTypes.func,
  changePropertyAddress: PropTypes.func,
  deletePropertyItem: PropTypes.func,
  changePropertyCurrency: PropTypes.func,
  options: PropTypes.object,
  onMounted: PropTypes.func,
  onSubmit: PropTypes.func,
  portfolios: PropTypes.array,
  deletedIds: PropTypes.array,
  changeBenefitInput: PropTypes.func,
  deleteBenefitItem: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  insurances: makeSelectLifeHealthInsurance(),
  investments: makeSelectSavingsInvestments(),
  propertyAssets: makeSelectPropertyHeldAssets(),
  otherAssets: makeSelectOtherHeldAssets(),
  statePortfolios: makeSelectPortfoliosData(),
  deletedIds: makeSelectDeletedIds(),
});

function mapDispatchToProps(dispatch) {
  return {
    setDataState: data => dispatch(setDataStateAction(data)),
    addInsurance: insurance => dispatch(addInsuranceAction(insurance)),
    addBenefit: itemIndex => dispatch(addBenefitAction(itemIndex)),
    changeBenefitInput: (itemIndex, benefitIndex, key, value) =>
      dispatch(changeBenefitInputAction(itemIndex, benefitIndex, key, value)),
    deleteBenefitItem: (itemIndex, benefitIndex) =>
      dispatch(deleteBenefitItemAction(itemIndex, benefitIndex)),

    clearInsurances: () => dispatch(clearInsurancesAction()),
    changeInsuranceProvider: (index, value) =>
      dispatch(changeInsuranceProviderAction(index, value)),
    changeInsuranceCurrency: (index, value) =>
      dispatch(changeInsuranceCurrencyAction(index, value)),
    changeInsuranceAnnualPremium: (index, value) =>
      dispatch(changeInsuranceAnnualPremiumAction(index, value)),
    changeInsuranceCurrentCash: (index, value) =>
      dispatch(changeInsuranceCurrentCashAction(index, value)),
    deleteInsuranceItem: index => dispatch(deleteInsuranceItemAction(index)),
    changeMarkedGoals: (index, value) =>
      dispatch(changeMarkedGoalsAction(index, value)),

    addInvestment: investment => dispatch(addInvestmentAction(investment)),
    clearInvestment: () => dispatch(clearInvestmentAction()),
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
    deleteInvestmentItem: index => dispatch(deleteInvestmentItemAction(index)),

    addProperty: property => dispatch(addPropertyAction(property)),
    clearProperty: () => dispatch(clearPropertyAction()),
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
    deletePropertyItem: index => dispatch(deletePropertyItemAction(index)),

    addOtherAssets: asset => dispatch(addOtherAssetAction(asset)),
    clearOtherAsset: () => dispatch(clearOtherAssetAction()),
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
    deleteOtherAssetItem: index => dispatch(deleteOtherAssetItemAction(index)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'financialWizardPortfolio', reducer });
const withSaga = injectSaga({ key: 'financialWizardPortfolio', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
)(FinancialWizardPortfolio);
