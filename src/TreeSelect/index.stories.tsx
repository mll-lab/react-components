import { Story } from '@storybook/react';
import React from 'react';

import { TreeSelect, TreeSelectProps } from './index';

const { TreeNode } = TreeSelect;

export default {
  title: 'TreeSelect',
};

export const Default: Story<TreeSelectProps<string>> = function Default(args) {
  return (
    <TreeSelect<string> style={{ width: 120 }} {...args}>
      <TreeNode value="1" title="1">
        <TreeNode value="1-1" title="1-1"></TreeNode>
        <TreeNode value="1-2" title="1-2">
          <TreeNode value="1-2-1" title="1-2-1"></TreeNode>
        </TreeNode>
      </TreeNode>
      <TreeNode value="2" title="2"></TreeNode>
    </TreeSelect>
  );
};
