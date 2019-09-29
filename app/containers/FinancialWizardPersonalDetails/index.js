/**
 *
 * FinancialWizardPersonalDetails
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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import globalMessages from 'containers/App/messages';
import { dimension } from 'styles/constants';
import SectionContainer from 'containers/FinancialWizardContainer/components/SectionContainer';
import Button from 'components/Button';
import {
  makeSelectPersonalDetailsData,
  makeSelectDependants,
  makeSelectDeletedDependantIds,
  makeSelectFileToUpload,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BasicInformation from './components/BasicInformation';
import WorkDetails from './components/WorkDetails';
import ContactDetails from './components/ContactDetails';
import Education from './components/Education';
import Health from './components/Health';
import PoliticalExposure from './components/PoliticalExposure';
import {
  changeInputAction,
  changeDependantInputAction,
  addDependantItemAction,
  deleteDependantItemAction,
  setDataStateAction,
  addFileAction,
  removeFileAction,
} from './actions';
import Dependants from './components/Dependants';

/* eslint-disable react/prefer-stateless-function */
export class FinancialWizardPersonalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSection: {
        basicInformation: true,
        workDetails: true,
        contactDetails: true,
        education: true,
        health: true,
        politicalExposure: true,
        dependants: true,
      },
      error: {
        basicInformation: false,
        workDetails: false,
        contactDetails: false,
        education: false,
        health: false,
        politicalExposure: false,
        dependants: false,
      },
      isSubmitting: false,
    };
  }

  setDataReduxState(props) {
    const { personalDetails, setDataState } = props;
    return setDataState(personalDetails);
  }

  componentDidMount() {
    const { onMounted } = this.props;
    this.setDataReduxState(this.props);
    onMounted();
  }

  componentDidUpdate(prevProps) {
    const { personalDetails } = this.props;
    // ========== START :: check original personalDetails state ========== //
    if (!isEqual(prevProps.personalDetails, personalDetails)) {
      this.setDataReduxState(this.props);
    }
    // ========== END   :: check original personalDetails state ========== //
  }

  handleInputChange(key, value) {
    const { changeInput } = this.props;
    return changeInput(key, value);
  }

  handleSectionHeadClick(section) {
    return this.setState(prevState => ({
      ...prevState,
      openSection: {
        ...prevState.openSection,
        [section]: !prevState.openSection[section],
      },
    }));
  }

  handleSectionValidation(section, isError) {
    return this.setState(prevState => ({
      ...prevState,
      error: {
        ...prevState.error,
        [section]: isError,
      },
    }));
  }

  handleSubmit() {
    this.setState({
      isSubmitting: true,
    });

    if (!this.validateForm()) {
      return false;
    }
    const {
      statePersonalDetails,
      deletedDependantIds,
      fileToUpload,
    } = this.props;
    return this.props.onSubmit(
      statePersonalDetails,
      deletedDependantIds,
      fileToUpload,
    );
  }

  validateForm() {
    const {
      basicInformation,
      workDetails,
      contactDetails,
      education,
      health,
      politicalExposure,
      dependants,
    } = this.state.error;
    return (
      !basicInformation &&
      !workDetails &&
      !contactDetails &&
      !education &&
      !health &&
      !politicalExposure &&
      !dependants
    );
  }

  renderBasicInformation() {
    const {
      intl,
      options,
      statePersonalDetails,
      addFile,
      fileToUpload,
    } = this.props;
    return (
      <SectionContainer
        open={this.state.openSection.basicInformation}
        title={intl.formatMessage(messages.basicInformation)}
        onHeadClick={() => this.handleSectionHeadClick('basicInformation')}
        notDeletable
      >
        <BasicInformation
          genderOptions={options.gender}
          maritalStatusOptions={options.maritalStatus}
          nationalityOptions={options.nationality}
          idTypeOptions={options.idType}
          personalDetails={statePersonalDetails}
          idFiles={fileToUpload.idFiles}
          onInputChange={(key, value) => this.handleInputChange(key, value)}
          onFileChange={file => addFile('idFiles', file)}
          validate={this.state.isSubmitting}
          onError={isError =>
            this.handleSectionValidation('basicInformation', isError)
          }
        />
      </SectionContainer>
    );
  }

  renderWorkDetails() {
    const {
      intl,
      options,
      statePersonalDetails,
      addFile,
      fileToUpload,
    } = this.props;
    return (
      <SectionContainer
        open={this.state.openSection.workDetails}
        title={intl.formatMessage(messages.workDetails)}
        onHeadClick={() => this.handleSectionHeadClick('workDetails')}
        notDeletable
      >
        <WorkDetails
          employmentStatusOptions={options.employmentStatus}
          industryOptions={options.industry}
          occupationOptions={options.occupation}
          countryPrefixOptions={options.countryPrefix}
          personalDetails={statePersonalDetails}
          companyFiles={fileToUpload.companyFiles}
          onInputChange={(key, value) => this.handleInputChange(key, value)}
          onFileChange={file => addFile('companyFiles', file)}
          validate={this.state.isSubmitting}
          onError={isError =>
            this.handleSectionValidation('workDetails', isError)
          }
        />
      </SectionContainer>
    );
  }

  renderContactDetails() {
    const { intl, options, statePersonalDetails } = this.props;
    return (
      <SectionContainer
        open={this.state.openSection.contactDetails}
        title={intl.formatMessage(messages.contactDetails)}
        onHeadClick={() => this.handleSectionHeadClick('contactDetails')}
        notDeletable
      >
        <ContactDetails
          countryPrefixOptions={options.countryPrefix}
          personalDetails={statePersonalDetails}
          onInputChange={(key, value) => this.handleInputChange(key, value)}
          validate={this.state.isSubmitting}
          onError={isError =>
            this.handleSectionValidation('contactDetails', isError)
          }
        />
      </SectionContainer>
    );
  }

  renderEducation() {
    const { intl, options, statePersonalDetails } = this.props;
    return (
      <SectionContainer
        open={this.state.openSection.education}
        title={intl.formatMessage(messages.education)}
        onHeadClick={() => this.handleSectionHeadClick('education')}
        notDeletable
      >
        <Education
          educationLevelOptions={options.educationLevel}
          personalDetails={statePersonalDetails}
          onInputChange={(key, value) => this.handleInputChange(key, value)}
          validate={this.state.isSubmitting}
          onError={isError =>
            this.handleSectionValidation('education', isError)
          }
        />
      </SectionContainer>
    );
  }

  renderHealth() {
    const { intl, statePersonalDetails } = this.props;
    return (
      <SectionContainer
        open={this.state.openSection.health}
        title={intl.formatMessage(messages.health)}
        onHeadClick={() => this.handleSectionHeadClick('health')}
        notDeletable
      >
        <Health
          personalDetails={statePersonalDetails}
          onInputChange={(key, value) => this.handleInputChange(key, value)}
        />
      </SectionContainer>
    );
  }

  renderPoliticalExposure() {
    const { intl, options, statePersonalDetails } = this.props;
    return (
      <SectionContainer
        open={this.state.openSection.politicalExposure}
        title={intl.formatMessage(messages.politicalExposure)}
        onHeadClick={() => this.handleSectionHeadClick('politicalExposure')}
        notDeletable
      >
        <PoliticalExposure
          pepRelationshipOptions={options.pepRelationship}
          countryOptions={options.country}
          personalDetails={statePersonalDetails}
          onInputChange={(key, value) => this.handleInputChange(key, value)}
          validate={this.state.isSubmitting}
          onError={isError =>
            this.handleSectionValidation('politicalExposure', isError)
          }
        />
      </SectionContainer>
    );
  }

  renderDependants() {
    const {
      intl,
      options,
      stateDependants,
      deleteDependantItem,
      addDependantItem,
      changeDependantInput,
    } = this.props;
    return (
      <SectionContainer
        open={this.state.openSection.dependants}
        title={intl.formatMessage(messages.dependants)}
        onHeadClick={() => this.handleSectionHeadClick('dependants')}
        notDeletable
      >
        <Dependants
          options={options}
          dependants={stateDependants}
          onDependantItemDelete={index => deleteDependantItem(index)}
          onDependantItemAdd={() => addDependantItem()}
          onInputChange={(index, key, value) =>
            changeDependantInput(index, key, value)
          }
          validate={this.state.isSubmitting}
          onError={isError =>
            this.handleSectionValidation('dependants', isError)
          }
        />
      </SectionContainer>
    );
  }

  render() {
    const { intl } = this.props;
    return (
      <Grid
        container
        direction="column"
        wrap="nowrap"
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
              padding: `0 ${dimension.spacing.m}px`,
            }}
          >
            {this.renderBasicInformation()}
            {this.renderWorkDetails()}
            {this.renderContactDetails()}
            {this.renderEducation()}
            {this.renderHealth()}
            {this.renderPoliticalExposure()}
            {this.renderDependants()}

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
                {intl.formatMessage(globalMessages.continue)}
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

FinancialWizardPersonalDetails.propTypes = {
  // setDataState: PropTypes.func,
  intl: PropTypes.object,
  options: PropTypes.object,
  personalDetails: PropTypes.object,
  statePersonalDetails: PropTypes.object,
  stateDependants: PropTypes.array,
  fileToUpload: PropTypes.object,
  changeInput: PropTypes.func,
  changeDependantInput: PropTypes.func,
  addDependantItem: PropTypes.func,
  deleteDependantItem: PropTypes.func,
  deletedDependantIds: PropTypes.array,
  addFile: PropTypes.func,
  removeFile: PropTypes.func,
  onSubmit: PropTypes.func,
  onMounted: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  statePersonalDetails: makeSelectPersonalDetailsData(),
  stateDependants: makeSelectDependants(),
  deletedDependantIds: makeSelectDeletedDependantIds(),
  fileToUpload: makeSelectFileToUpload(),
});

function mapDispatchToProps(dispatch) {
  return {
    setDataState: data => dispatch(setDataStateAction(data)),
    changeInput: (key, value) => dispatch(changeInputAction(key, value)),
    changeDependantInput: (index, key, value) =>
      dispatch(changeDependantInputAction(index, key, value)),
    addDependantItem: () => dispatch(addDependantItemAction()),
    deleteDependantItem: index => dispatch(deleteDependantItemAction(index)),
    addFile: (key, file) => dispatch(addFileAction(key, file)),
    removeFile: (source, key, index) =>
      dispatch(removeFileAction(source, key, index)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'financialWizardPersonalDetails',
  reducer,
});
const withSaga = injectSaga({ key: 'financialWizardPersonalDetails', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
)(FinancialWizardPersonalDetails);
