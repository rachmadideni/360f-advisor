import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';

import {
  PROFICIENCY_LANGUAGE_OPTIONS,
  PROFICIENCY_EDUCATION_OPTIONS,
} from '../../constants';

import messages from '../../messages';

class ProficiencyForm extends React.Component {
  constructor(props) {
    super(props);

    const language = this.getArrayLanguage('spoken');
    const spoken = this.getFilteredArray('spoken');
    const written = this.getFilteredArray('written');
    const education = this.getEducationList();

    this.state = {
      otherWrittenLanguage: '',
      otherWrittenLangIsDisabled: true,
      education: [
        'No formal education',
        'Primary',
        'Secondary',
        'Diploma',
        'Degree and higher',
      ],
      language: [...language],
      spokenLanguage: [...spoken],
      writtenLanguage: [...written],
      levelEducation: [...education],
    };
  }

  getEducationList() {
    const wl = _.map(PROFICIENCY_EDUCATION_OPTIONS, item => item);
    const wl2 = _.without(wl, null);
    return wl2;
  }

  // TODO : move to helper file
  getArrayLanguage(category) {
    const wl = _.map(PROFICIENCY_LANGUAGE_OPTIONS, item =>
      item.category === category ? item.language : null,
    );
    const wl2 = _.without(wl, null);
    return wl2;
  }

  getFilteredArray(category) {
    // TODO : array should come from global state. for now use constants
    const wl = _.map(PROFICIENCY_LANGUAGE_OPTIONS, item =>
      item.category === category ? item : null,
    );
    const wl2 = _.without(wl, null);
    return wl2;
  }

  handleSpokenLanguage(field, value) {
    const { spokenLanguage } = this.state;
    const newData = spokenLanguage.map(el => {
      if (el.language === field) {
        return Object.assign({}, el, { value });
      }
      return el;
    });

    this.setState({
      spokenLanguage: newData,
    });
  }

  handleWrittenLanguage(field, value) {
    const { writtenLanguage } = this.state;
    const isOtherWrittenDisabled = !(field === 'others' && value === true);
    const newData = writtenLanguage.map(el => {
      if (el.language === field) {
        return Object.assign({}, el, { value });
      }
      return el;
    });

    this.setState({
      writtenLanguage: newData,
      otherWrittenLangIsDisabled: isOtherWrittenDisabled,
    });
  }

  handleEducationLevel(field, value) {
    const { levelEducation } = this.state;
    const newData = levelEducation.map(el => {
      if (el.level === field) {
        return Object.assign({}, el, { value });
      }
      return el;
    });

    this.setState({
      levelEducation: newData,
    });
  }

  handleInputChange(field, value) {
    return this.setState(prevState => ({
      ...prevState.otherWrittenLanguage,
      [field]: value,
    }));
  }

  render() {
    const { intl } = this.props;
    const {
      language,
      education,
      spokenLanguage,
      writtenLanguage,
      levelEducation,
      otherWrittenLanguage,
      otherWrittenLangIsDisabled,
    } = this.state;

    return (
      <Grid
        container
        wrap="nowrap"
        direction="column"
        style={{
          height: '100%',
        }}
      >
        <Grid
          item
          style={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            paddingBottom: '50px',
          }}
        >
          <Grid
            style={{
              marginBottom: '25px',
            }}
          >
            <Typography variant="h1" gutterBottom>
              {intl.formatMessage(messages.proficiency)}
            </Typography>

            <FormControl component="fieldset" style={{ paddingRight: '15px' }}>
              <FormLabel component="legend">
                {intl.formatMessage(messages.conversationInSpokenLanguage)}
              </FormLabel>
              <FormGroup style={{ padding: 0 }}>
                {language.map((lang, index) => (
                  <FormControlLabel
                    key={spokenLanguage[index].id}
                    style={{ padding: 0, margin: 0 }}
                    control={
                      <Checkbox
                        checked={spokenLanguage[index].value}
                        value={spokenLanguage[index].lang}
                        onChange={event =>
                          this.handleSpokenLanguage(lang, event.target.checked)
                        }
                      />
                    }
                    label={lang}
                  />
                ))}
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">
                {intl.formatMessage(messages.proficientInWrittenLanguage)}
              </FormLabel>
              <FormGroup>
                {language.map((lang, index) => (
                  <FormControlLabel
                    key={writtenLanguage[index].id}
                    control={
                      <Checkbox
                        checked={writtenLanguage[index].value}
                        onChange={e =>
                          this.handleWrittenLanguage(lang, e.target.checked)
                        }
                        value={writtenLanguage[index].lang}
                      />
                    }
                    label={lang}
                  />
                ))}

                <TextField
                  id="other-written-language"
                  margin="dense"
                  autoComplete="off"
                  value={otherWrittenLanguage}
                  disabled={otherWrittenLangIsDisabled}
                  onChange={e =>
                    this.handleInputChange(
                      'otherWrittenLanguage',
                      e.target.value,
                    )
                  }
                  placeholder={intl.formatMessage(
                    messages.proficiencyOtherInputPlaceholder,
                  )}
                />
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid style={{ paddingBottom: '50px' }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                {intl.formatMessage(messages.highestLevelEducation)}
              </FormLabel>
              <FormGroup>
                {education.map((level, index) => (
                  <FormControlLabel
                    key={levelEducation[index].id}
                    control={
                      <Checkbox
                        checked={levelEducation[index].value}
                        onChange={e =>
                          this.handleEducationLevel(level, e.target.checked)
                        }
                        value={levelEducation[index].level}
                      />
                    }
                    label={level}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ProficiencyForm.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(ProficiencyForm);
