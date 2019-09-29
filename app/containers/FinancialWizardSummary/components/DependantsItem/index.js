import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import DependantItem from './DependantsItem';

class Dependants extends React.Component {
  render() {
    const {
      intl,
      dependants,
      options,
      onDependantItemDelete,
      onDependantItemAdd,
      onInputChange,
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
              onDelete={null}
              onInputChange={(key, value) => onInputChange(index, key, value)}
            />
          );
        })}
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
};

export default injectIntl(Dependants);
