import { Story } from '@storybook/react';
import React from 'react';

import { Button } from '../Button';

import { FullScreenModal } from './FullScreenModal';
import { WithModal } from './WithModal';

import { ModalProps } from './index';

export default {
  title: 'Modal',
  argTypes: {
    width: { control: 'number' },
  },
};

export const OpenByButton: Story<ModalProps> = (args) => (
  <WithModal
    Component={Button}
    componentProps={{
      children: 'Click me to open modal',
    }}
    title="Basic Modal"
    {...args}
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </WithModal>
);

export const OpenFullScreenByButton: Story<ModalProps> = (args) => (
  <WithModal
    Component={Button}
    componentProps={{
      children: 'Click me to open full screen modal',
    }}
    ModalComponent={FullScreenModal}
    title="Full Screen Modal"
    {...args}
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </WithModal>
);
