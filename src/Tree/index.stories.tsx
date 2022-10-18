import { Story } from '@storybook/react';
import React from 'react';

import { Tree, TreeProps } from './index';

export default {
  title: 'Tree',
  component: Tree,
};

type TreeData = TreeProps['treeData'];

const treeData: TreeData = [
  {
    title: '1',
    key: '1',
    children: [
      {
        title: '1.1',
        key: '1.1',
      },
      {
        title: '1.2',
        key: '1.2',
        children: [
          {
            title: '1.2.1',
            key: '1.2.1',
          },
          {
            title: '1.2.2',
            key: '1.2.2',
          },
        ],
      },
      {
        title: '1.3',
        key: '1.3',
      },
    ],
  },
  {
    title: '2',
    key: '2',
    children: [
      {
        title: '2.1',
        key: '2.1',
      },
      {
        title: '2.2',
        key: '2.2',
      },
    ],
  },
];

export const Default: Story<TreeProps> = function Default(args) {
  return <Tree {...args} treeData={treeData} />;
};
