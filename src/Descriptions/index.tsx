import {
  Descriptions as AntdDescriptions,
  DescriptionsProps as AntdDescriptionsProps,
} from 'antd';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

const StyledDescriptions = styled(AntdDescriptions)`
  .mll-ant-descriptions-header {
    margin-bottom: 4px;
  }
  .mll-ant-descriptions-title {
    font-size: calc(${fontSizeFromTheme} + 1px);
    font-weight: bold;
  }
  .mll-ant-descriptions-item-label,
  .mll-ant-descriptions-item-content {
    font-size: ${fontSizeFromTheme};
  }
`;

export const Descriptions: typeof AntdDescriptions = StyledDescriptions;
export type DescriptionsProps = AntdDescriptionsProps;
