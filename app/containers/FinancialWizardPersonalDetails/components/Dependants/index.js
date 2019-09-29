import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Button from 'components/Button';
import { isEqual } from 'lodash/lang';
import { forOwn } from 'lodash/object';
import DependantItem from './DependantItem';

import messages from '../../messages';

/* eslint-disable react/prefer-stateless-function */
class Dependants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.state.error, prevState.error)) {
      // this.props.onError(this.validateAll());
      let isError = false;
      forOwn(this.state.error, value => {
        isError = isError || !!value;
      });
      this.props.onError(isError);
    }
  }

  componentWillUnmount() {
    this.props.onError(false);
  }

  handleItemValidation(index, isError) {
    this.setState(prevState => {
      const stateError = { ...prevState.error };
      if (!isError) {
        delete stateError[index];
      } else {
        stateError[index] = isError;
      }
      return {
        ...prevState,
        error: stateError,
      };
    });
  }

  render() {
    const {
      intl,
      dependants,
      options,
      onDependantItemDelete,
      onDependantItemAdd,
      onInputChange,
      validate,
    } = this.props;
    return (
      <React.Fragment>
        {dependants.map((dep, index) => {
          const itemKey = `dependant-item-${index}`;
          return (
            <DependantItem
              key={itemKey}
              dependantRelationshipOptions={options.dependantRelationship}
              countryPrefixOptions={options.countryPrefix}
              dependant={dep}
              onDelete={() => onDependantItemDelete(index)}
              onInputChange={(key, value) => onInputChange(index, key, value)}
              validate={validate}
              onError={isError => this.handleItemValidation(index, isError)}
            />
          );
        })}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => onDependantItemAdd()}
        >
          {intl.formatMessage(messages.addDependant)}
        </Button>
      </React.Fragment>
    );
  }
}

Dependants.propTypes = {
  intl: PropTypes.object,
  options: PropTypes.object,
  dependants: PropTypes.array,
  onDependantItemDelete: PropTypes.func,
  onDependantItemAdd: PropTypes.func,
  onInputChange: PropTypes.func,
  validate: PropTypes.bool,
  onError: PropTypes.func,
};

export default injectIntl(Dependants);
