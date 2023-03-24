import { Card as AntdCard, CardProps as AntdCardProps } from 'antd';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type CardProps = AntdCardProps;

const StyledCard = styled(AntdCard)`
  &,
  .mll-ant-card-head,
  .mll-ant-card-head-title,
  .mll-ant-tabs-large > .mll-ant-tabs-nav .mll-ant-tabs-tab,
  .mll-ant-card-meta-title,
  .mll-ant-card-extra {
    font-size: ${fontSizeFromTheme};
  }
  &.mll-ant-card-bordered {
    border: 1px solid ${(props) => props.theme.containerBorderColor};
  }
`;

export const Card: typeof AntdCard = StyledCard;

Card.Grid = StyledCard.Grid;
Card.Meta = StyledCard.Meta;
