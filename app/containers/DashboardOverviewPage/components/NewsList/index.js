/**
 *
 * NewsList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

function NewsList(props) {
  if (!props.index > -1) {
    return (
      <React.Fragment>
        <li style={{ marginLeft: '18px' }}>{props.content}</li>
      </React.Fragment>
    );
  }
  return <React.Fragment>no result</React.Fragment>;
}

NewsList.propTypes = {
  index: PropTypes.number,
  content: PropTypes.string,
};

export default NewsList;
