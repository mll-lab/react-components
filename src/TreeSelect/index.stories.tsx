import { StoryFn } from '@storybook/react';
import React from 'react';

import { Provider } from '../Provider';

import { TreeSelect, TreeSelectProps } from './index';

export default {
  title: 'TreeSelect',
  argTypes: {
    size: {
      control: {
        type: 'inline-radio',
      },
      options: ['small', 'middle', 'large'],
    },
    status: {
      control: {
        type: 'inline-radio',
      },
      options: [undefined, 'warning', 'error'],
    },
    treeDefaultExpandAll: {
      control: {
        type: 'boolean',
      },
    },
  },
};

const treeData: TreeSelectProps<string>['treeData'] = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'leaf1',
        title: 'leaf1',
      },
      {
        value: 'leaf2',
        title: 'leaf2',
      },
    ],
  },
  {
    value: 'leaf3',
    title: 'leaf3',
  },
];

export const Default: StoryFn<TreeSelectProps<string>> = function Default(args) {
  return (
    <TreeSelect<string>
      treeData={treeData}
      style={{ width: '120px' }}
      {...args}
    />
  );
};

Default.args = {
  size: 'middle',
};

export const Checkable: StoryFn<TreeSelectProps<string>> = function Checkable(
  args,
) {
  return (
    <TreeSelect<string>
      treeData={treeData}
      style={{ width: '120px' }}
      treeCheckable
      {...args}
    />
  );
};

Checkable.args = {
  size: 'middle',
};

export const BigFont: StoryFn<TreeSelectProps<string>> = function BigFont(args) {
  return (
    <Provider theme={{ fontSize: '16px' }}>
      <TreeSelect<string>
        treeData={treeData}
        style={{ width: '120px' }}
        {...args}
      />
    </Provider>
  );
};

BigFont.args = {
  size: 'middle',
};
