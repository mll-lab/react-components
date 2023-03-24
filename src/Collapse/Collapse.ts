import { Collapse as AntdCollapse } from 'antd';
import { CollapseProps as AntdCollapseProps } from 'antd/lib/collapse/Collapse';
import { CollapsePanelProps as AntdCollapsePanelProps } from 'antd/lib/collapse/CollapsePanel';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type CollapseProps = AntdCollapseProps;
export type CollapsePanelProps = AntdCollapsePanelProps;

const StyledCollapse: typeof AntdCollapse = styled(
  AntdCollapse,
)<AntdCollapseProps>`
  font-size: ${fontSizeFromTheme};
  .mll-ant-collapse-item > .mll-ant-collapse-header .mll-ant-collapse-arrow {
    font-size: ${fontSizeFromTheme};
  }
  .mll-ant-collapse-item > .mll-ant-collapse-header {
    align-items: center;
  }
`;

export const Collapse: typeof AntdCollapse = StyledCollapse;
Collapse.Panel = AntdCollapse.Panel;
