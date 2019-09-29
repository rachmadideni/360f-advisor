import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from '@material-ui/icons/DeleteOutline';
import ButtonBase from '@material-ui/core/ButtonBase';
import { isString } from 'lodash/lang';

import { color, dimension } from 'styles/constants';

const Wrapper = styled.div`
  display: inline-flex;
  width: 130px;
  height: 130px;
  border-radius: ${dimension.borderRadius.xxs}px;
`;

const EmptyContainer = styled(ButtonBase)`
  && {
    border: 1px dashed ${color.grey[400]};
    background-color: ${color.grey[100]};
    position: relative;
    flex-direction: column;
    flex-wrap: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 40px;
    border-radius: ${dimension.borderRadius.xxs}px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${dimension.borderRadius.xxs}px;
`;

class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.inputFile = React.createRef();
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange(event) {
    const { onFileChange } = this.props;
    if (!!event.target.files && !!event.target.files[0]) {
      return onFileChange(event.target.files[0]);
    }
    return false;
  }

  renderDisplay() {
    const { file, emptyLabel } = this.props;
    if (file) {
      let src;
      if (file instanceof File) {
        src = URL.createObjectURL(file);
      } else if (isString(file)) {
        src = file;
      }
      return <Image src={src} />;
    }
    return (
      <EmptyContainer
        onClick={() => {
          this.inputFile.current.click();
        }}
      >
        <div>
          <AddIcon fontSize="inherit" color="primary" />
        </div>
        <div>{emptyLabel}</div>
      </EmptyContainer>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Wrapper>{this.renderDisplay()}</Wrapper>
        <input
          ref={this.inputFile}
          type="file"
          accept="image/x-png,image/jpeg"
          style={{
            display: 'none',
          }}
          onChange={this.handleFileChange}
        />
      </React.Fragment>
    );
  }
}

FileUpload.propTypes = {
  onFileChange: PropTypes.func,
  file: PropTypes.oneOfType([PropTypes.instanceOf(File), PropTypes.string]),
  emptyLabel: PropTypes.node,
};

export default FileUpload;
