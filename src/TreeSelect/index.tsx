import {
  TreeSelect as AntdTreeSelect,
  TreeSelectProps as AntdTreeSelectProps,
} from 'antd';
import React from 'react';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type TreeSelectProps<T> = AntdTreeSelectProps<T>;

const StyledTreeSelect: typeof AntdTreeSelect = styled(
  AntdTreeSelect,
)<AntdTreeSelectProps>`
  &.mll-ant-select {
    font-size: ${fontSizeFromTheme};
  }
`;

const StyledDropdown = styled.div`
  .mll-ant-select-tree {
    font-size: ${fontSizeFromTheme};
  }
`;

export function TreeSelect<T>(props: AntdTreeSelectProps) {
  return (
    <StyledTreeSelect<T>
      dropdownRender={(originNode) => (
        <StyledDropdown>{originNode}</StyledDropdown>
      )}
      {...props}
    />
  );
}

TreeSelect.TreeNode = AntdTreeSelect.TreeNode;
