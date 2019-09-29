import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Collapse from '@material-ui/core/Collapse';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import Typography from 'components/Typography';
import { dimension, color } from 'styles/constants';

const Wrapper = styled.div`
  // width: 100%;
  margin-top: ${dimension.spacing.s}px;

  &:first-child {
    margin-top: ${dimension.spacing.m}px;
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
    font-size: 40px;
  }
`;

const SectionHead = styled(Grid)`
  && {
    background-color: ${color.babyBlue};
    color: ${color.grey[600]};
    font-weight: 600;
  }
`;

const ContentWrapper = styled(props => {
  const { hasPadding, ...baseProps } = props;
  return <div {...baseProps} />;
})`
  && {
    padding: ${props => (props.hasPadding ? `${dimension.spacing.s}px` : null)};
    background-color: ${color.grey[50]};
  }
`;

function SectionContainer(props) {
  const {
    onSectionDelete,
    onHeadClick,
    title,
    open,
    notDeletable,
    children,
    hasPadding,
  } = props;
  return (
    <Wrapper>
      <SectionHead container wrap="nowrap" alignItems="stretch">
        <Grid item xs>
          <ButtonBase
            onClick={onHeadClick}
            style={{
              width: '100%',
              paddingTop: dimension.spacing.xs,
              paddingBottom: dimension.spacing.xs,
            }}
          >
            <Grid container wrap="nowrap" alignItems="center">
              <Grid item>
                <StyledArrowIcon
                  open={open}
                  style={{
                    marginLeft: dimension.spacing.s,
                    marginRight: dimension.spacing.xs,
                  }}
                />
              </Grid>
              <Grid item xs>
                <Typography
                  variant="h3"
                  component="span"
                  align="left"
                  color="inherit"
                  weight={600}
                >
                  {title}
                </Typography>
              </Grid>
            </Grid>
          </ButtonBase>
        </Grid>
        {!notDeletable ? (
          <Grid item>
            <ButtonBase
              onClick={onSectionDelete}
              style={{
                height: '100%',
                fontSize: 40,
                paddingLeft: dimension.spacing.m,
                paddingRight: dimension.spacing.m,
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </ButtonBase>
          </Grid>
        ) : null}
      </SectionHead>
      <Collapse in={open}>
        <ContentWrapper hasPadding={hasPadding}>{children}</ContentWrapper>
      </Collapse>
    </Wrapper>
  );
}

SectionContainer.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  onSectionDelete: PropTypes.func,
  onHeadClick: PropTypes.func,
  children: PropTypes.node,
  notDeletable: PropTypes.bool,
  hasPadding: PropTypes.bool,
};

SectionContainer.defaultProps = {
  hasPadding: true,
};

export default SectionContainer;
