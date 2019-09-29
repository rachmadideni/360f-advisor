import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Collapse from '@material-ui/core/Collapse';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Typography from 'components/Typography';
import { injectIntl } from 'react-intl';
import { dimension, color } from '../../../styles/constants';
import messages from '../messages';

const Wrapper = styled.div`
  margin-top: ${dimension.spacing.s}px;

  &:first-child {
    margin-top: 0px;
  }
`;

const StyledArrowIcon = styled(props => {
  const { open, ...iconProps } = props;
  return <ArrowDownIcon {...iconProps} />;
})`
  && {
    ${props =>
      props.open
        ? `
      transform: rotate(180deg);
    `
        : null}
    transition: transform 200ms ease-in-out;
    position: absolute;
    left: ${dimension.spacing.s}px;
    font-size: 40px;
    color: ${color.grey[600]};
  }
`;

const SectionHead = styled(Grid)`
  && {
    background-color: ${color.grey[300]};
  }
`;

const ContentWrapper = styled.div`
  background-color: ${color.grey[200]};
`;

const StyledButtonBase = styled(props => {
  const { isEdit, ...buttonProps } = props;
  return <ButtonBase {...buttonProps} />;
})`
  && {
    height: 30px;
    width: 100px;
    border-radius: ${dimension.borderRadius.xxs}px;
    border-style: solid;
    border-color: ${color.grey[500]};
    border-width: 1px;
    position: absolute;
    right: ${dimension.spacing.s}px;
  }
`;

function SubSectionContainer(props) {
  const {
    intl,
    onHeadClick,
    title,
    open,
    children,
    status,
    isError,
    isEditMode,
    onEditClick,
  } = props;
  return (
    <Wrapper>
      <SectionHead container wrap="nowrap" alignItems="stretch">
        <Grid
          item
          xs
          container
          alignItems="center"
          style={{
            position: 'relative',
          }}
        >
          <StyledArrowIcon open={open} />
          <ButtonBase
            onClick={onHeadClick}
            style={{
              width: '100%',
              paddingTop: dimension.spacing.s,
              paddingBottom: dimension.spacing.s,
            }}
          >
            <Typography
              component="span"
              align="left"
              variant="h3"
              style={{
                marginLeft: dimension.spacing.xl,
                width: '100%',
                fontWeight: 600,
                color: color.grey[600],
              }}
            >
              {title}
            </Typography>
            {isEditMode && (
              <Typography
                variant="subtitle2"
                align="right"
                component="span"
                style={{
                  width: '50%',
                  color: isError ? 'red' : '#1942D8',
                  marginRight: dimension.spacing.m,
                }}
              >
                {status}
              </Typography>
            )}
          </ButtonBase>
          {!isEditMode && (
            <StyledButtonBase onClick={onEditClick}>
              <Typography
                variant="body1"
                component="span"
                style={{
                  align: 'center',
                }}
              >
                {intl.formatMessage(messages.editNow)}
              </Typography>
            </StyledButtonBase>
          )}
        </Grid>
      </SectionHead>
      <Collapse in={open} unmountOnExit>
        <ContentWrapper>{children}</ContentWrapper>
      </Collapse>
    </Wrapper>
  );
}

SubSectionContainer.propTypes = {
  isEditMode: PropTypes.bool,
  isError: PropTypes.bool,
  open: PropTypes.bool,
  status: PropTypes.string,
  title: PropTypes.string,
  onEditClick: PropTypes.func,
  onHeadClick: PropTypes.func,
  children: PropTypes.node,
  intl: PropTypes.object,
};

export default injectIntl(SubSectionContainer);
